import * as React from 'react'
import { Body, Button, Container, Head, Heading, Html, Preview, Section, Text } from '@react-email/components'
import { styles, SITE_NAME } from './_brand'

interface EmailChangeEmailProps {
  siteName?: string
  email?: string
  newEmail?: string
  confirmationUrl?: string
}

export const EmailChangeEmail = ({
  siteName = SITE_NAME, email = '', newEmail = '', confirmationUrl = '#',
}: EmailChangeEmailProps) => (
  <Html lang="th" dir="ltr">
    <Head />
    <Preview>ยืนยันการเปลี่ยนอีเมลของคุณกับ {siteName}</Preview>
    <Body style={styles.main}>
      <Container style={styles.container}>
        <Section style={styles.brandBar}>{siteName}</Section>
        <Section style={styles.card}>
          <Heading style={styles.h1}>ยืนยันการเปลี่ยนอีเมล</Heading>
          <Text style={styles.text}>
            คุณได้ขอเปลี่ยนอีเมลของบัญชี {siteName} จาก <strong>{email}</strong> เป็น <strong>{newEmail}</strong>
          </Text>
          <div style={{ textAlign: 'center', margin: '24px 0' }}>
            <Button style={styles.button} href={confirmationUrl}>ยืนยันการเปลี่ยนอีเมล</Button>
          </div>
          <Text style={styles.footer}>หากคุณไม่ได้ขอเปลี่ยน กรุณาเข้าสู่ระบบและรักษาความปลอดภัยบัญชีของคุณทันที</Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default EmailChangeEmail
