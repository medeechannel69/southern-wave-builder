import type { ComponentType } from 'react'

export interface TemplateEntry {
  component: ComponentType<any>
  subject: string | ((data: Record<string, any>) => string)
  displayName?: string
  previewData?: Record<string, any>
  /** Fixed recipient — overrides caller-provided recipientEmail when set. */
  to?: string
}

import { template as orderConfirmation } from './order-confirmation'
import { template as leadNotification } from './lead-notification'
import { template as quoteReceived } from './quote-received'
import { template as orderStatusUpdate } from './order-status-update'

export const TEMPLATES: Record<string, TemplateEntry> = {
  'order-confirmation': orderConfirmation,
  'lead-notification': leadNotification,
  'quote-received': quoteReceived,
  'order-status-update': orderStatusUpdate,
}
