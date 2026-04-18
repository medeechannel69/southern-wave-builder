import { supabase } from '@/integrations/supabase/client'

interface SendTransactionalEmailParams {
  templateName: string
  recipientEmail: string
  idempotencyKey?: string
  templateData?: Record<string, any>
}

/**
 * Send a transactional email via the in-app server route.
 * Fails silently (logs only) so UI flows are not blocked by email issues.
 */
export async function sendTransactionalEmail(params: SendTransactionalEmailParams) {
  try {
    const { data: { session } } = await supabase.auth.getSession()
    const headers: Record<string, string> = { 'Content-Type': 'application/json' }
    if (session?.access_token) headers['Authorization'] = `Bearer ${session.access_token}`

    const res = await fetch('/lovable/email/transactional/send', {
      method: 'POST',
      headers,
      body: JSON.stringify(params),
    })
    if (!res.ok) {
      console.warn('sendTransactionalEmail failed', res.status, await res.text().catch(() => ''))
    }
    return res.ok
  } catch (e) {
    console.warn('sendTransactionalEmail error', e)
    return false
  }
}
