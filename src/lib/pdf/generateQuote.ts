import jsPDF from "jspdf";
import { registerSarabun } from "./font-loader";
import { formatThaiDate, type QuoteBreakdown } from "@/lib/quote";

export type QuoteCustomer = {
  name: string;
  phone: string;
  email?: string | null;
  lineId?: string | null;
};

export async function generateQuotePDF(
  quoteNumber: string,
  customer: QuoteCustomer,
  quote: QuoteBreakdown,
): Promise<void> {
  const doc = new jsPDF();
  await registerSarabun(doc);

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const right = pageWidth - margin;
  let y = 20;

  doc.setFont("Sarabun", "bold");
  doc.setFontSize(22);
  doc.setTextColor(27, 79, 155);
  doc.text("MedeeWeb", margin, y);
  doc.setFont("Sarabun", "normal");
  doc.setFontSize(10);
  doc.setTextColor(90, 90, 90);
  doc.text("Web & App Solutions | medeeweb.com", margin, y + 7);
  doc.text("099-625-2499 | suthee@medeeweb.com", right, y + 7, { align: "right" });

  y += 27;
  doc.setDrawColor(244, 130, 32);
  doc.setLineWidth(0.8);
  doc.line(margin, y, right, y);
  y += 16;

  doc.setFont("Sarabun", "bold");
  doc.setFontSize(18);
  doc.setTextColor(27, 79, 155);
  doc.text("ใบเสนอราคา", margin, y);
  doc.setFont("Sarabun", "normal");
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  doc.text(`เลขที่: ${quoteNumber}`, right, y - 7, { align: "right" });
  doc.text(`วันที่: ${formatThaiDate(new Date())}`, right, y, { align: "right" });
  y += 16;

  doc.setFillColor(244, 250, 252);
  doc.roundedRect(margin, y, right - margin, 31, 3, 3, "F");
  doc.setFont("Sarabun", "bold");
  doc.setFontSize(11);
  doc.setTextColor(27, 79, 155);
  doc.text("ข้อมูลลูกค้า", margin + 6, y + 8);
  doc.setFont("Sarabun", "normal");
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  doc.text(`ชื่อ: ${customer.name}`, margin + 6, y + 16);
  doc.text(`โทร: ${customer.phone}`, margin + 6, y + 24);
  if (customer.email) doc.text(`อีเมล: ${customer.email}`, right - 6, y + 16, { align: "right" });
  if (customer.lineId)
    doc.text(`LINE ID: ${customer.lineId}`, right - 6, y + 24, { align: "right" });
  y += 43;

  doc.setFont("Sarabun", "bold");
  doc.setFontSize(12);
  doc.setTextColor(27, 79, 155);
  doc.text("รายละเอียดบริการ", margin, y);
  y += 8;

  const tableTop = y;
  const descriptionX = margin + 5;
  const amountX = right - 5;
  doc.setFillColor(27, 79, 155);
  doc.rect(margin, tableTop, right - margin, 10, "F");
  doc.setFont("Sarabun", "bold");
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text("รายการ", descriptionX, tableTop + 7);
  doc.text("จำนวนเงิน", amountX, tableTop + 7, { align: "right" });
  y = tableTop + 18;

  doc.setFont("Sarabun", "normal");
  doc.setTextColor(55, 55, 55);
  doc.text(`แพ็กเกจ ${quote.package.label}`, descriptionX, y);
  doc.text(`${quote.package.price.toLocaleString("th-TH")} บาท`, amountX, y, { align: "right" });
  y += 8;
  quote.addons.forEach((addon) => {
    doc.text(`บริการเสริม: ${addon.name}`, descriptionX, y);
    doc.text(`${addon.price.toLocaleString("th-TH")} บาท`, amountX, y, { align: "right" });
    y += 8;
  });
  if (quote.addons.length === 0) {
    doc.setTextColor(110, 110, 110);
    doc.text("ไม่มีบริการเสริม", descriptionX, y);
    y += 8;
  }

  doc.setDrawColor(210, 220, 225);
  doc.setLineWidth(0.3);
  doc.line(margin, y + 2, right, y + 2);
  y += 12;
  doc.setFont("Sarabun", "bold");
  doc.setFontSize(14);
  doc.setTextColor(244, 130, 32);
  doc.text(`ยอดรวมสุทธิ ${quote.total.toLocaleString("th-TH")} บาท`, amountX, y, {
    align: "right",
  });
  y += 18;

  doc.setFillColor(255, 247, 237);
  doc.roundedRect(margin, y, right - margin, 25, 3, 3, "F");
  doc.setFont("Sarabun", "bold");
  doc.setFontSize(11);
  doc.setTextColor(146, 64, 14);
  doc.text("กำหนดส่งโดยประมาณ", margin + 6, y + 9);
  doc.setFont("Sarabun", "normal");
  doc.setFontSize(10);
  doc.text(
    `ภายใน ${quote.deliveryDays} วันทำการ · ${formatThaiDate(quote.estimatedDeliveryDate)}`,
    margin + 6,
    y + 18,
  );
  y += 38;

  doc.setFont("Sarabun", "bold");
  doc.setFontSize(11);
  doc.setTextColor(27, 79, 155);
  doc.text("เงื่อนไขเบื้องต้น", margin, y);
  y += 8;
  doc.setFont("Sarabun", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(70, 70, 70);
  [
    "ราคานี้เป็นประมาณการจากข้อมูลที่ลูกค้าแจ้ง และอาจปรับตามขอบเขตงานจริง",
    "เริ่มนับวันทำการหลังได้รับข้อมูลและไฟล์ที่จำเป็นครบถ้วน",
    "แก้ไขฟรี 3 รอบ และรับประกันบั๊ก 30 วันหลังส่งมอบ",
    "การชำระเงินและขอบเขตงานจะยืนยันอีกครั้งก่อนเริ่มพัฒนา",
  ].forEach((text, index) => {
    const lines = doc.splitTextToSize(`${index + 1}. ${text}`, right - margin);
    doc.text(lines, margin, y);
    y += 6 + (lines.length - 1) * 4;
  });

  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text("เอกสารนี้สร้างโดยระบบใบเสนอราคาอัตโนมัติของ MedeeWeb", pageWidth / 2, 285, {
    align: "center",
  });
  doc.save(`MedeeWeb-Quotation-${quoteNumber}.pdf`);
}
