import * as React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { TemplateEntry } from "./registry";
import { styles, SITE_NAME } from "./_brand";

interface QuoteReceivedProps {
  customerName?: string;
  packageName?: string;
  budget?: string;
  quoteNumber?: string;
  totalAmount?: number;
  deliveryDays?: number;
  estimatedDeliveryDate?: string;
  addons?: { name: string; price: number }[];
}

const QuoteReceivedEmail = ({
  customerName = "ลูกค้า",
  packageName,
  budget,
  quoteNumber,
  totalAmount,
  deliveryDays,
  estimatedDeliveryDate,
  addons = [],
}: QuoteReceivedProps) => (
  <Html lang="th" dir="ltr">
    <Head />
    <Preview>
      ใบเสนอราคา {quoteNumber ?? "อัตโนมัติ"} — {SITE_NAME}
    </Preview>
    <Body style={styles.main}>
      <Container style={styles.container}>
        <Section style={styles.brandBar}>{SITE_NAME}</Section>
        <Section style={styles.card}>
          <Heading style={styles.h1}>สร้างใบเสนอราคาเรียบร้อย</Heading>
          <Text style={styles.text}>
            สวัสดีคุณ <strong>{customerName}</strong> —
            ระบบได้รับข้อมูลของคุณและสร้างใบเสนอราคาเบื้องต้นให้แล้ว
          </Text>
          {(quoteNumber || packageName || budget || totalAmount) && (
            <Section style={styles.infoBox}>
              {quoteNumber && (
                <Text style={styles.infoRow}>
                  <strong>เลขที่ใบเสนอราคา:</strong> {quoteNumber}
                </Text>
              )}
              {packageName && (
                <Text style={styles.infoRow}>
                  <strong>แพ็กเกจ:</strong> {packageName}
                </Text>
              )}
              {addons.length > 0 && (
                <Text style={styles.infoRow}>
                  <strong>บริการเสริม:</strong>{" "}
                  {addons
                    .map((addon) => `${addon.name} (+${addon.price.toLocaleString("th-TH")} บาท)`)
                    .join(", ")}
                </Text>
              )}
              {totalAmount !== undefined && (
                <Text style={styles.infoRow}>
                  <strong>ยอดรวมโดยประมาณ:</strong> {totalAmount.toLocaleString("th-TH")} บาท
                </Text>
              )}
              {budget && (
                <Text style={styles.infoRow}>
                  <strong>งบประมาณที่แจ้ง:</strong> {budget}
                </Text>
              )}
              {deliveryDays && (
                <Text style={styles.infoRow}>
                  <strong>กำหนดส่งโดยประมาณ:</strong> ภายใน {deliveryDays} วันทำการ
                  {estimatedDeliveryDate ? ` (${estimatedDeliveryDate})` : ""}
                </Text>
              )}
            </Section>
          )}
          <Text style={styles.text}>
            ราคานี้เป็นการประเมินจากข้อมูลเบื้องต้น
            ทีมงานจะติดต่อกลับเพื่อยืนยันขอบเขตงานและรายละเอียดก่อนเริ่มพัฒนา
          </Text>
          <Text style={styles.footer}>ขอบคุณที่ไว้วางใจ {SITE_NAME}</Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export const template = {
  component: QuoteReceivedEmail,
  subject: `สร้างใบเสนอราคาเรียบร้อย — ${SITE_NAME}`,
  displayName: "Automatic quotation received",
  previewData: {
    customerName: "สมชาย ใจดี",
    packageName: "Starter 5,000",
    budget: "5,000 - 10,000",
    quoteNumber: "MDW-20260825-DEMO1",
    totalAmount: 5000,
    deliveryDays: 3,
    estimatedDeliveryDate: "28 สิงหาคม 2569",
    addons: [],
  },
} satisfies TemplateEntry;
