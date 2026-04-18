import * as React from 'react'
import { Body, Container, Head, Heading, Html, Preview, Section, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'
import { styles, SITE_NAME } from './_brand'

interface QuoteReceivedProps {
  customerName?: string
  packageName?: string
  budget?: string
}

const QuoteReceivedEmail = ({
  customerName = 'ลูกค้า', packageName, budget,
}: QuoteReceivedProps) => (
  <Html lang="th" dir="ltr">
    <Head />
    <Preview>ได้รับคำขอใบเสนอราคาเรียบร้อย — {SITE_NAME}</Preview>
    <Body style={styles.main}>
      <Container style={styles.container}>
        <Section style={styles.brandBar}>{SITE_NAME}</Section>
        <Section style={styles.card}>
          <Heading style={styles.h1}>ขอบคุณสำหรับคำขอใบเสนอราคา 🙏</Heading>
          <Text style={styles.text}>
            สวัสดีคุณ <strong>{customerName}</strong> — เราได้รับคำขอใบเสนอราคาของคุณเรียบร้อย ทีมงานจะจัดทำและส่งกลับภายใน <strong>24 ชั่วโมง</strong>
          </Text>
          {(packageName || budget) && (
            <Section style={styles.infoBox}>
              {packageName && <Text style={styles.infoRow}><strong>แพ็กเกจที่สนใจ:</strong> {packageName}</Text>}
              {budget && <Text style={styles.infoRow}><strong>งบประมาณ:</strong> {budget}</Text>}
            </Section>
          )}
          <Text style={styles.text}>หากต้องการเร่งด่วน สามารถทักไลน์ทีมงานได้ตลอดเวลาทำการ</Text>
          <Text style={styles.footer}>ขอบคุณที่ไว้วางใจ {SITE_NAME}</Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: QuoteReceivedEmail,
  subject: `ได้รับคำขอใบเสนอราคาเรียบร้อย — ${SITE_NAME}`,
  displayName: 'Quote received',
  previewData: {
    customerName: 'สมชาย ใจดี',
    packageName: 'Business 9,000',
    budget: '5,000 - 10,000',
  },
} satisfies TemplateEntry
