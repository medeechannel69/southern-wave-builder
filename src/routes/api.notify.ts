import * as React from 'react'
import { render } from '@react-email/render'
import { createClient } from '@supabase/supabase-js'
import { createFileRoute } from '@tanstack/react-router'
import { TEMPLATES } from '@/lib/email-templates/registry'

// Public, unauthenticated email-trigger route used by anonymous form submissions
// (order, lead, quote). Only whitelisted templates can be sent. Each call sends
// to a single recipient — no bulk/marketing.

const ALLOWED_TEMPLATES = new Set([
  'order-confirmation',
  'lead-notification',
  'quote-received',
  'order-status-update',
])

const SITE_NAME = 'MedeeWeb'
const SENDER_DOMAIN = 'notify.medeeweb.com'
const FROM_DOMAIN = 'medeeweb.com'

function generateToken(): string {
  const bytes = new Uint8Array(32)
  crypto.getRandomValues(bytes)
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('')
}

function redact(email?: string | null) {
  if (!email) return '***'
  const [l, d] = email.split('@')
  if (!l || !d) return '***'
  return `${l[0]}***@${d}`
}

export const Route = createFileRoute('/api/notify')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
        if (!supabaseUrl || !supabaseServiceKey) {
          return Response.json({ error: 'Server configuration error' }, { status: 500 })
        }

        let body: any
        try { body = await request.json() } catch {
          return Response.json({ error: 'Invalid JSON' }, { status: 400 })
        }

        const templateName: string = body.templateName
        const recipientEmail: string = body.recipientEmail
        const templateData: Record<string, any> = body.templateData ?? {}
        const idempotencyKey: string = body.idempotencyKey ?? crypto.randomUUID()

        if (!templateName || !ALLOWED_TEMPLATES.has(templateName)) {
          return Response.json({ error: 'Template not allowed' }, { status: 400 })
        }
        const tpl = TEMPLATES[templateName]
        if (!tpl) return Response.json({ error: 'Template not found' }, { status: 404 })

        const effectiveRecipient = (tpl.to || recipientEmail || '').trim()
        if (!effectiveRecipient || !effectiveRecipient.includes('@')) {
          return Response.json({ error: 'Invalid recipient' }, { status: 400 })
        }

        const supabase = createClient(supabaseUrl, supabaseServiceKey)
        const messageId = crypto.randomUUID()
        const normalized = effectiveRecipient.toLowerCase()

        // suppression check
        const { data: sup } = await supabase
          .from('suppressed_emails').select('id').eq('email', normalized).maybeSingle()
        if (sup) {
          await supabase.from('email_send_log').insert({
            message_id: messageId, template_name: templateName,
            recipient_email: effectiveRecipient, status: 'suppressed',
          })
          return Response.json({ success: false, reason: 'email_suppressed' })
        }

        // unsubscribe token (one per email)
        let unsubscribeToken: string
        const { data: existing } = await supabase
          .from('email_unsubscribe_tokens').select('token, used_at').eq('email', normalized).maybeSingle()
        if (existing && !existing.used_at) {
          unsubscribeToken = existing.token
        } else if (!existing) {
          unsubscribeToken = generateToken()
          await supabase.from('email_unsubscribe_tokens').upsert(
            { token: unsubscribeToken, email: normalized },
            { onConflict: 'email', ignoreDuplicates: true },
          )
          const { data: stored } = await supabase
            .from('email_unsubscribe_tokens').select('token').eq('email', normalized).maybeSingle()
          unsubscribeToken = stored?.token ?? unsubscribeToken
        } else {
          return Response.json({ success: false, reason: 'email_suppressed' })
        }

        // render
        const element = React.createElement(tpl.component, templateData)
        const html = await render(element)
        const text = await render(element, { plainText: true })
        const subject = typeof tpl.subject === 'function' ? tpl.subject(templateData) : tpl.subject

        await supabase.from('email_send_log').insert({
          message_id: messageId, template_name: templateName,
          recipient_email: effectiveRecipient, status: 'pending',
        })

        const { error: enqErr } = await supabase.rpc('enqueue_email', {
          queue_name: 'transactional_emails',
          payload: {
            message_id: messageId,
            to: effectiveRecipient,
            from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
            sender_domain: SENDER_DOMAIN,
            subject,
            html, text,
            purpose: 'transactional',
            label: templateName,
            idempotency_key: idempotencyKey,
            unsubscribe_token: unsubscribeToken,
            queued_at: new Date().toISOString(),
          },
        })

        if (enqErr) {
          console.error('notify enqueue failed', { templateName, recipient: redact(effectiveRecipient), error: enqErr })
          await supabase.from('email_send_log').insert({
            message_id: messageId, template_name: templateName,
            recipient_email: effectiveRecipient, status: 'failed',
            error_message: 'Failed to enqueue email',
          })
          return Response.json({ error: 'Failed to enqueue' }, { status: 500 })
        }

        return Response.json({ success: true, queued: true })
      },
    },
  },
})
