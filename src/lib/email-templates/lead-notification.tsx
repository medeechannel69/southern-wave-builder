import * as React from 'react'
import { Body, Container, Head, Heading, Html, Preview, Section, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'
import { styles, SITE_NAME } from './_brand'

interface LeadNotificationProps {
  leadName?: string
  phone?: string
  lineId?: string
  businessType?: string
  budget?: string
  preferredTime?: string
  message?: string
}

const LeadNotificationEmail = ({
  leadName = '-', phone = '-', lineId, businessType, budget, preferredTime, message,
}: LeadNotificationProps) => (
  <Html lang="th" dir="ltr">
    <Head />
    <Preview>มีลูกค้าใหม่ฝากเบอร์: {leadName}</Preview>
    <Body style={styles.main}>
      <Container style={styles.container}>
        <Section style={styles.brandBar}>{SITE_NAME} — Lead ใหม่</Section>
        <Section style={styles.card}>
          <Heading style={styles.h1}>📞 มีลูกค้าใหม่ฝากเบอร์</Heading>
          <Text style={styles.text}>กรุณาติดต่อกลับโดยเร็วตามเวลาที่ลูกค้าสะดวก</Text>
          <Section style={styles.infoBox}>
            <Text style={styles.infoRow}><strong>ชื่อ:</strong> {leadName}</Text>
            <Text style={styles.infoRow}><strong>เบอร์โทร:</strong> {phone}</Text>
            {lineId && <Text style={styles.infoRow}><strong>LINE ID:</strong> {lineId}</Text>}
            {businessType && <Text style={styles.infoRow}><strong>ประเภทธุรกิจ:</strong> {businessType}</Text>}
            {budget && <Text style={styles.infoRow}><strong>งบประมาณ:</strong> {budget}</Text>}
            {preferredTime && <Text style={styles.infoRow}><strong>เวลาสะดวก:</strong> {preferredTime}</Text>}
            {message && <Text style={styles.infoRow}><strong>ข้อความ:</strong> {message}</Text>}
          </Section>
          <Text style={styles.footer}>เปิดหลังบ้านเพื่ออัปเดตสถานะ Lead นี้</Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: LeadNotificationEmail,
  subject: (d: Record<string, any>) => `🔔 Lead ใหม่: ${d.leadName ?? 'ลูกค้า'} (${d.phone ?? '-'})`,
  displayName: 'Lead notification (admin)',
  previewData: {
    leadName: 'คุณสมหญิง',
    phone: '081-234-5678',
    lineId: '@somying',
    businessType: 'ร้านอาหาร',
    budget: '5,000 - 10,000',
    preferredTime: '10:00 - 12:00',
  },
} satisfies TemplateEntry
