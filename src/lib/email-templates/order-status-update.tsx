import * as React from 'react'
import { Body, Button, Container, Head, Heading, Html, Preview, Section, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'
import { styles, SITE_NAME, SITE_URL } from './_brand'

interface OrderStatusUpdateProps {
  customerName?: string
  orderCode?: string
  status?: string
  statusLabel?: string
  message?: string
  trackUrl?: string
}

const STATUS_LABELS: Record<string, string> = {
  pending_slip: 'รอตรวจสอบสลิป',
  confirmed: 'ยืนยันการชำระเงินแล้ว ✅',
  in_progress: 'กำลังดำเนินการ 🛠️',
  delivered: 'ส่งมอบงานแล้ว 🚀',
  completed: 'ปิดงานเรียบร้อย 🎉',
  cancelled: 'ยกเลิกคำสั่งซื้อ',
}

const STATUS_MESSAGES: Record<string, string> = {
  pending_slip: 'เราได้รับคำสั่งซื้อของคุณแล้ว กำลังรอตรวจสอบสลิปการชำระเงิน',
  confirmed: 'เรายืนยันการชำระเงินของคุณเรียบร้อย ทีมงานจะเริ่มงานในไม่ช้า',
  in_progress: 'ทีมงานกำลังพัฒนาเว็บไซต์ของคุณอยู่ จะแจ้งความคืบหน้าเป็นระยะ',
  delivered: 'งานของคุณพร้อมส่งมอบแล้ว กรุณาตรวจสอบและยืนยันรับงาน',
  completed: 'ขอบคุณที่ใช้บริการ! งานปิดเรียบร้อย หากต้องการดูแลรายปีติดต่อทีมงานได้เลย',
  cancelled: 'คำสั่งซื้อนี้ถูกยกเลิกแล้ว หากมีข้อสงสัยกรุณาติดต่อทีมงาน',
}

const OrderStatusUpdateEmail = ({
  customerName = 'ลูกค้า',
  orderCode = 'XXXX',
  status = 'confirmed',
  statusLabel,
  message,
  trackUrl,
}: OrderStatusUpdateProps) => {
  const label = statusLabel ?? STATUS_LABELS[status] ?? status
  const body = message ?? STATUS_MESSAGES[status] ?? 'สถานะคำสั่งซื้อของคุณมีการอัปเดต'
  return (
    <Html lang="th" dir="ltr">
      <Head />
      <Preview>อัปเดตสถานะคำสั่งซื้อ #{orderCode} — {label}</Preview>
      <Body style={styles.main}>
        <Container style={styles.container}>
          <Section style={styles.brandBar}>{SITE_NAME}</Section>
          <Section style={styles.card}>
            <Heading style={styles.h1}>อัปเดตสถานะคำสั่งซื้อ</Heading>
            <Text style={styles.text}>สวัสดีคุณ <strong>{customerName}</strong></Text>
            <Section style={styles.infoBox}>
              <Text style={styles.infoRow}><strong>รหัสคำสั่งซื้อ:</strong> #{orderCode}</Text>
              <Text style={styles.infoRow}><strong>สถานะปัจจุบัน:</strong> {label}</Text>
            </Section>
            <Text style={styles.text}>{body}</Text>
            {trackUrl && (
              <div style={{ textAlign: 'center', margin: '24px 0' }}>
                <Button style={styles.button} href={trackUrl}>ดูรายละเอียดงาน</Button>
              </div>
            )}
            <Text style={styles.footer}>มีคำถาม? ตอบกลับอีเมลนี้หรือทักไลน์เราได้เลย</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: OrderStatusUpdateEmail,
  subject: (d: Record<string, any>) => {
    const label = d.statusLabel ?? STATUS_LABELS[d.status] ?? d.status ?? ''
    return `อัปเดตคำสั่งซื้อ #${d.orderCode ?? ''} — ${label}`
  },
  displayName: 'Order status update',
  previewData: {
    customerName: 'สมชาย ใจดี',
    orderCode: 'A1B2C3',
    status: 'confirmed',
    trackUrl: `${SITE_URL}/track/A1B2C3`,
  },
} satisfies TemplateEntry
