import * as React from 'react'
import { Body, Button, Container, Head, Heading, Html, Preview, Section, Text } from '@react-email/components'
import { styles, SITE_NAME } from './_brand'

interface InviteEmailProps {
  siteName?: string
  siteUrl?: string
  confirmationUrl?: string
}

export const InviteEmail = ({ siteName = SITE_NAME, confirmationUrl = '#' }: InviteEmailProps) => (
  <Html lang="th" dir="ltr">
    <Head />
    <Preview>คุณได้รับเชิญให้เข้าร่วม {siteName}</Preview>
    <Body style={styles.main}>
      <Container style={styles.container}>
        <Section style={styles.brandBar}>{siteName}</Section>
        <Section style={styles.card}>
          <Heading style={styles.h1}>คุณได้รับเชิญ</Heading>
          <Text style={styles.text}>
            คุณได้รับเชิญให้เข้าร่วมทีม <strong>{siteName}</strong> — กดปุ่มด้านล่างเพื่อตอบรับและสร้างบัญชี
          </Text>
          <div style={{ textAlign: 'center', margin: '24px 0' }}>
            <Button style={styles.button} href={confirmationUrl}>ตอบรับคำเชิญ</Button>
          </div>
          <Text style={styles.footer}>หากไม่ได้คาดหวังคำเชิญนี้ สามารถละเว้นอีเมลได้</Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default InviteEmail
