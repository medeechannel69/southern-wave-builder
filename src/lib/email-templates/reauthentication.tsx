import * as React from 'react'
import { Body, Container, Head, Heading, Html, Preview, Section, Text } from '@react-email/components'
import { styles, SITE_NAME } from './_brand'

interface ReauthenticationEmailProps {
  token?: string
}

export const ReauthenticationEmail = ({ token = '------' }: ReauthenticationEmailProps) => (
  <Html lang="th" dir="ltr">
    <Head />
    <Preview>รหัสยืนยันของคุณ</Preview>
    <Body style={styles.main}>
      <Container style={styles.container}>
        <Section style={styles.brandBar}>{SITE_NAME}</Section>
        <Section style={styles.card}>
          <Heading style={styles.h1}>ยืนยันตัวตน</Heading>
          <Text style={styles.text}>ใช้รหัสด้านล่างเพื่อยืนยันตัวตนของคุณ:</Text>
          <Text style={styles.code}>{token}</Text>
          <Text style={styles.footer}>รหัสนี้จะหมดอายุในอีกไม่นาน หากคุณไม่ได้ขอรหัสนี้ ละเว้นอีเมลนี้ได้</Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default ReauthenticationEmail
