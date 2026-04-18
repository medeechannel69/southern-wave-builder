import * as React from 'react'
import { Body, Button, Container, Head, Heading, Html, Preview, Section, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'
import { styles, SITE_NAME, SITE_URL } from './_brand'

interface OrderConfirmationProps {
  customerName?: string
  orderCode?: string
  packageName?: string
  total?: number
  trackUrl?: string
}

const fmt = (n: number) => n.toLocaleString('th-TH')

const OrderConfirmationEmail = ({
  customerName = 'ลูกค้า',
  orderCode = 'XXXX',
  packageName = '-',
  total = 0,
  trackUrl,
}: OrderConfirmationProps) => (
  <Html lang="th" dir="ltr">
    <Head />
    <Preview>ยืนยันคำสั่งซื้อ #{orderCode} จาก {SITE_NAME}</Preview>
    <Body style={styles.main}>
      <Container style={styles.container}>
        <Section style={styles.brandBar}>{SITE_NAME}</Section>
        <Section style={styles.card}>
          <Heading style={styles.h1}>ขอบคุณสำหรับคำสั่งซื้อ! 🎉</Heading>
          <Text style={styles.text}>
            สวัสดีคุณ <strong>{customerName}</strong> — เราได้รับคำสั่งซื้อของคุณเรียบร้อยแล้ว ทีมงานจะติดต่อกลับโดยเร็วเพื่อยืนยันการชำระเงินและเริ่มงาน
          </Text>
          <Section style={styles.infoBox}>
            <Text style={styles.infoRow}><strong>รหัสคำสั่งซื้อ:</strong> #{orderCode}</Text>
            <Text style={styles.infoRow}><strong>แพ็กเกจ:</strong> {packageName}</Text>
            <Text style={styles.infoRow}><strong>ยอดรวม:</strong> {fmt(total)} บาท</Text>
          </Section>
          {trackUrl && (
            <div style={{ textAlign: 'center', margin: '24px 0' }}>
              <Button style={styles.button} href={trackUrl}>ติดตามสถานะงาน</Button>
            </div>
          )}
          <Text style={styles.footer}>มีคำถาม? ตอบกลับอีเมลนี้หรือทักไลน์เราได้เลย</Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: OrderConfirmationEmail,
  subject: (d: Record<string, any>) => `ยืนยันคำสั่งซื้อ #${d.orderCode ?? ''} — ${SITE_NAME}`,
  displayName: 'Order confirmation',
  previewData: {
    customerName: 'สมชาย ใจดี',
    orderCode: 'A1B2C3',
    packageName: 'BUSINESS',
    total: 9000,
    trackUrl: `${SITE_URL}/track/A1B2C3`,
  },
} satisfies TemplateEntry
