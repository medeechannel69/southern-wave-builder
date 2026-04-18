import * as React from 'react'
import { Body, Button, Container, Head, Heading, Html, Preview, Section, Text } from '@react-email/components'
import { styles, SITE_NAME } from './_brand'

interface MagicLinkEmailProps {
  siteName?: string
  confirmationUrl?: string
}

export const MagicLinkEmail = ({ siteName = SITE_NAME, confirmationUrl = '#' }: MagicLinkEmailProps) => (
  <Html lang="th" dir="ltr">
    <Head />
    <Preview>ลิงก์เข้าสู่ระบบของคุณกับ {siteName}</Preview>
    <Body style={styles.main}>
      <Container style={styles.container}>
        <Section style={styles.brandBar}>{siteName}</Section>
        <Section style={styles.card}>
          <Heading style={styles.h1}>ลิงก์เข้าสู่ระบบ</Heading>
          <Text style={styles.text}>กดปุ่มด้านล่างเพื่อเข้าสู่ระบบ {siteName} ลิงก์นี้จะหมดอายุในอีกไม่นาน</Text>
          <div style={{ textAlign: 'center', margin: '24px 0' }}>
            <Button style={styles.button} href={confirmationUrl}>เข้าสู่ระบบ</Button>
          </div>
          <Text style={styles.footer}>หากคุณไม่ได้ขอลิงก์นี้ สามารถละเว้นอีเมลนี้ได้</Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default MagicLinkEmail
