import * as React from 'react'
import { Body, Button, Container, Head, Heading, Html, Preview, Section, Text } from '@react-email/components'
import { styles, SITE_NAME } from './_brand'

interface RecoveryEmailProps {
  siteName?: string
  confirmationUrl?: string
}

export const RecoveryEmail = ({ siteName = SITE_NAME, confirmationUrl = '#' }: RecoveryEmailProps) => (
  <Html lang="th" dir="ltr">
    <Head />
    <Preview>รีเซ็ตรหัสผ่านของคุณกับ {siteName}</Preview>
    <Body style={styles.main}>
      <Container style={styles.container}>
        <Section style={styles.brandBar}>{siteName}</Section>
        <Section style={styles.card}>
          <Heading style={styles.h1}>รีเซ็ตรหัสผ่าน</Heading>
          <Text style={styles.text}>
            เราได้รับคำขอรีเซ็ตรหัสผ่านสำหรับบัญชี {siteName} ของคุณ — กดปุ่มด้านล่างเพื่อตั้งรหัสผ่านใหม่
          </Text>
          <div style={{ textAlign: 'center', margin: '24px 0' }}>
            <Button style={styles.button} href={confirmationUrl}>รีเซ็ตรหัสผ่าน</Button>
          </div>
          <Text style={styles.footer}>หากคุณไม่ได้ขอรีเซ็ตรหัสผ่าน สามารถละเว้นอีเมลนี้ได้</Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default RecoveryEmail
