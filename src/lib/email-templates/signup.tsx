import * as React from 'react'
import { Body, Button, Container, Head, Heading, Html, Preview, Section, Text } from '@react-email/components'
import { styles, SITE_NAME } from './_brand'

interface SignupEmailProps {
  siteName?: string
  siteUrl?: string
  recipient?: string
  confirmationUrl?: string
}

export const SignupEmail = ({ siteName = SITE_NAME, confirmationUrl = '#' }: SignupEmailProps) => (
  <Html lang="th" dir="ltr">
    <Head />
    <Preview>ยืนยันอีเมลของคุณกับ {siteName}</Preview>
    <Body style={styles.main}>
      <Container style={styles.container}>
        <Section style={styles.brandBar}>{siteName}</Section>
        <Section style={styles.card}>
          <Heading style={styles.h1}>ยืนยันอีเมลของคุณ</Heading>
          <Text style={styles.text}>
            ขอบคุณที่สมัครใช้งาน <strong>{siteName}</strong> — กรุณายืนยันอีเมลโดยกดปุ่มด้านล่าง
          </Text>
          <div style={{ textAlign: 'center', margin: '24px 0' }}>
            <Button style={styles.button} href={confirmationUrl}>ยืนยันอีเมล</Button>
          </div>
          <Text style={styles.footer}>หากคุณไม่ได้สมัครใช้งาน สามารถละเว้นอีเมลนี้ได้</Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default SignupEmail
