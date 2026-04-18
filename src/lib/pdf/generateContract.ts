import jsPDF from "jspdf";
import { registerSarabun } from "./font-loader";

export interface ContractOrder {
  order_code: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string | null;
  package_name: string;
  package_price: number;
  addons?: { name: string; price: number }[] | null;
  total: number;
  created_at: string;
}

export async function generateContractPDF(order: ContractOrder): Promise<void> {
  const doc = new jsPDF();
  await registerSarabun(doc);

  // Header
  doc.setFont("Sarabun", "bold");
  doc.setFontSize(20);
  doc.text("MedeeWeb", 105, 20, { align: "center" });
  doc.setFont("Sarabun", "normal");
  doc.setFontSize(10);
  doc.text("Web & App Solutions | medeeweb.com", 105, 27, { align: "center" });

  // Title
  doc.setFont("Sarabun", "bold");
  doc.setFontSize(16);
  doc.text("สัญญาจ้างทำเว็บไซต์ / Service Agreement", 105, 40, { align: "center" });

  // Contract no + date
  doc.setFont("Sarabun", "normal");
  doc.setFontSize(10);
  doc.text(`เลขที่สัญญา: MW-${order.order_code}`, 20, 55);
  doc.text(`วันที่: ${new Date(order.created_at).toLocaleDateString("th-TH")}`, 140, 55);
  doc.line(20, 60, 190, 60);

  // Customer info
  doc.setFont("Sarabun", "bold");
  doc.setFontSize(12);
  doc.text("ข้อมูลลูกค้า", 20, 70);
  doc.setFont("Sarabun", "normal");
  doc.setFontSize(10);
  doc.text(`ชื่อ: ${order.customer_name}`, 20, 78);
  doc.text(`โทร: ${order.customer_phone}`, 20, 85);
  if (order.customer_email) doc.text(`อีเมล: ${order.customer_email}`, 20, 92);

  // Service details
  doc.setFont("Sarabun", "bold");
  doc.setFontSize(12);
  doc.text("รายละเอียดบริการ", 20, 105);
  doc.setFont("Sarabun", "normal");
  doc.setFontSize(10);
  doc.text(`แพ็กเกจ: ${order.package_name}`, 20, 113);
  doc.text(`ราคา: ${order.package_price.toLocaleString()} บาท`, 140, 113);

  let y = 120;
  if (order.addons && order.addons.length > 0) {
    doc.text("บริการเสริม:", 20, y);
    y += 7;
    order.addons.forEach((a) => {
      doc.text(`  + ${a.name}`, 25, y);
      doc.text(`${a.price.toLocaleString()} บาท`, 140, y);
      y += 7;
    });
  }

  // Total
  doc.line(20, y + 3, 190, y + 3);
  doc.setFont("Sarabun", "bold");
  doc.setFontSize(12);
  doc.text(`ยอดรวม: ${order.total.toLocaleString()} บาท`, 140, y + 12);

  // Payment terms
  y += 25;
  doc.setFontSize(10);
  doc.setFont("Sarabun", "bold");
  doc.text("เงื่อนไขการชำระเงิน", 20, y);
  doc.setFont("Sarabun", "normal");
  doc.text(`มัดจำ 50%: ${(order.total * 0.5).toLocaleString()} บาท (ก่อนเริ่มงาน)`, 20, y + 7);
  doc.text(`ส่วนที่เหลือ 50%: ${(order.total * 0.5).toLocaleString()} บาท (เมื่อรับงาน)`, 20, y + 14);

  // Terms
  y += 30;
  doc.setFont("Sarabun", "bold");
  doc.text("ข้อกำหนดและเงื่อนไข", 20, y);
  doc.setFont("Sarabun", "normal");
  const terms = [
    "1. แก้ไขฟรี 3 ครั้ง (Batch) หลังส่งงาน เกินกว่านั้นคิดครั้งละ 500 บาท",
    "2. ส่งมอบพร้อม Domain + Hosting 1 ปี + Admin Credentials + คู่มือ",
    "3. รับประกัน Bug 30 วัน หลังส่งมอบงาน",
    "4. ลิขสิทธิ์เว็บไซต์เป็นของลูกค้า หลังชำระครบตามสัญญา",
    "5. การยืนยันออนไลน์ถือเป็นการยอมรับสัญญาตาม พ.ร.บ. ธุรกรรมอิเล็กทรอนิกส์ พ.ศ. 2544",
  ];
  terms.forEach((t, i) => {
    doc.text(t, 20, y + 8 + i * 7);
  });

  // Signature
  y += 55;
  doc.line(20, y + 15, 80, y + 15);
  doc.line(120, y + 15, 180, y + 15);
  doc.text("ลูกค้า / Customer", 35, y + 20);
  doc.text("MedeeWeb (ผู้ให้บริการ)", 130, y + 20);
  doc.text(`(${order.customer_name})`, 25, y + 27);

  // Footer
  doc.setFontSize(8);
  doc.text("MedeeWeb | medeeweb.com | 099-625-2499 | medeechannel69@gmail.com", 105, 285, { align: "center" });

  doc.save(`MedeeWeb-Contract-${order.order_code}.pdf`);
}
