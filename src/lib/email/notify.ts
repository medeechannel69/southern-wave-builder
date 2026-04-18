/**
 * Public notify helper — used by anonymous form submissions (order, lead, quote).
 * Posts to /api/notify which uses service-role auth and a template allowlist.
 * Fails silently so UI flow continues even if email is degraded.
 */
interface NotifyParams {
  templateName: 'order-confirmation' | 'lead-notification' | 'quote-received'
  recipientEmail: string
  idempotencyKey?: string
  templateData?: Record<string, any>
}

export async function notify(params: NotifyParams) {
  try {
    const res = await fetch('/api/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    })
    if (!res.ok) console.warn('notify failed', res.status)
    return res.ok
  } catch (e) {
    console.warn('notify error', e)
    return false
  }
}

/** Admin email for internal notifications (lead alerts). */
export const ADMIN_EMAIL = 'admin@medeeweb.com'
