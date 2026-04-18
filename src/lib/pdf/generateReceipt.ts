import jsPDF from "jspdf";
import { registerSarabun } from "./font-loader";

export interface ReceiptOrder {
  order_code: string;
  customer_name: string;
  customer_phone: string;
  package_name: string;
  package_price: number;
  addons?: { name: string; price: number }[] | null;
  total: number;
  created_at: string;
}

export async function generateReceiptPDF(order: ReceiptOrder, isDeposit = false): Promise<void> {
  const doc = new jsPDF();
  await registerSarabun(doc);

  doc.setFont("Sarabun", "bold");
  doc.setFontSize(20);
  doc.text("MedeeWeb", 105, 20, { align: "center" });
  doc.setFont("Sarabun", "normal");
  doc.setFontSize(10);
  doc.text("Web & App Solutions | medeeweb.com", 105, 27, { align: "center" });

  doc.setFont("Sarabun", "bold");
  doc.setFontSize(16);
  const title = isDeposit ? "ใบเสร็จมัดจำ / Deposit Receipt" : "ใบเสร็จรับเงิน / Receipt";
  doc.text(title, 105, 40, { align: "center" });

  doc.setFont("Sarabun", "normal");
  doc.setFontSize(10);
  const receiptNo = `RCP-${order.order_code}-${isDeposit ? "DEP" : "FULL"}`;
  doc.text(`เลขที่: ${receiptNo}`, 20, 55);
  doc.text(`วันที่: ${new Date().toLocaleDateString("th-TH")}`, 140, 55);
  doc.line(20, 60, 190, 60);

  doc.setFont("Sarabun", "bold");
  doc.text("ได้รับเงินจาก:", 20, 70);
  doc.setFont("Sarabun", "normal");
  doc.text(`${order.customer_name} (${order.customer_phone})`, 20, 78);

  doc.setFont("Sarabun", "bold");
  doc.text("รายการ", 20, 92);
  doc.text("ราคา", 160, 92);
  doc.line(20, 95, 190, 95);

  doc.setFont("Sarabun", "normal");
  let y = 103;
  doc.text(`แพ็กเกจ ${order.package_name}`, 20, y);
  doc.text(`${order.package_price.toLocaleString()} บาท`, 160, y);
  y += 8;

  if (order.addons) {
    order.addons.forEach((a) => {
      doc.text(`+ ${a.name}`, 25, y);
      doc.text(`${a.price.toLocaleString()} บาท`, 160, y);
      y += 8;
    });
  }

  doc.line(20, y + 2, 190, y + 2);
  const amount = isDeposit ? order.total * 0.5 : order.total;
  doc.setFont("Sarabun", "bold");
  doc.setFontSize(12);
  const amountLabel = isDeposit ? "ยอดมัดจำ (50%)" : "ยอดรวม";
  doc.text(`${amountLabel}: ${amount.toLocaleString()} บาท`, 105, y + 12, { align: "center" });

  if (isDeposit) {
    doc.setFontSize(10);
    doc.setFont("Sarabun", "normal");
    doc.text(
      `ยอดคงเหลือ: ${(order.total * 0.5).toLocaleString()} บาท (ชำระเมื่อรับงาน)`,
      105,
      y + 22,
      { align: "center" },
    );
  }

  doc.setFontSize(8);
  doc.text("MedeeWeb | medeeweb.com | 099-625-2499", 105, 285, { align: "center" });

  doc.save(`MedeeWeb-${isDeposit ? "Deposit" : "Receipt"}-${receiptNo}.pdf`);
}
