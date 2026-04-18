/**
 * Public notify helper — used by anonymous form submissions (order, lead, quote).
 * Posts to /api/notify which uses service-role auth and a template allowlist.
 * Fails silently so UI flow continues even if email is degraded.
 */
interface NotifyParams {
  templateName: 'order-confirmation' | 'lead-notification' | 'quote-received'
  /** Single email or array of emails — when array, sends to each individually. */
  recipientEmail: string | string[]
  idempotencyKey?: string
  templateData?: Record<string, any>
}

async function postOne(params: Omit<NotifyParams, 'recipientEmail'> & { recipientEmail: string }) {
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

export async function notify(params: NotifyParams) {
  const recipients = Array.isArray(params.recipientEmail)
    ? params.recipientEmail
    : [params.recipientEmail]
  const results = await Promise.all(
    recipients.filter(Boolean).map((to, i) =>
      postOne({
        ...params,
        recipientEmail: to,
        idempotencyKey: params.idempotencyKey
          ? `${params.idempotencyKey}-${i}`
          : undefined,
      }),
    ),
  )
  return results.every(Boolean)
}

/**
 * Admin emails for internal notifications (Lead/Order/Quote alerts).
 * Add more team emails (เช่น sales@) ในรายการนี้ได้เลย.
 */
export const ADMIN_EMAILS: string[] = [
  'medeechannel69@gmail.com',
]

/** Backward-compatible alias — primary admin email (first in list). */
export const ADMIN_EMAIL: string = ADMIN_EMAILS[0]
