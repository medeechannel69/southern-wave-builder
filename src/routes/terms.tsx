import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "เงื่อนไขการใช้งาน — MedeeWeb" },
      { name: "description", content: "เงื่อนไขการใช้บริการของ MedeeWeb" },
      { property: "og:title", content: "เงื่อนไขการใช้งาน — MedeeWeb" },
      { property: "og:description", content: "เงื่อนไขการใช้บริการ" },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <PageShell>
      <PageHero title="เงื่อนไขการใช้งาน" subtitle="ปรับปรุงล่าสุด: 1 มกราคม 2025" />
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl space-y-6 px-4 md:px-8 text-foreground/85" style={{ lineHeight: 1.85 }}>
          <h2 className="text-xl font-bold text-primary">1. การให้บริการ</h2>
          <p>MedeeWeb ให้บริการพัฒนาเว็บไซต์และบริการเสริมที่เกี่ยวข้อง ตามรายละเอียดและราคาที่ระบุไว้ในแต่ละแพ็กเกจ</p>
          <h2 className="text-xl font-bold text-primary">2. การชำระเงิน</h2>
          <p>ลูกค้าต้องชำระค่าบริการตามเงื่อนไข — ผ่อน 2 งวด 50/50 หรือชำระเต็มจำนวน ตามที่ตกลงในใบเสนอราคา</p>
          <h2 className="text-xl font-bold text-primary">3. การแก้ไขงาน</h2>
          <p>ลูกค้าสามารถขอแก้ไขงานได้ฟรี 3 รอบ (batch แก้รวมต่อรอบ) หลังจากนั้นคิดค่าแก้ไขตามขอบเขตงาน</p>
          <h2 className="text-xl font-bold text-primary">4. การรับประกัน</h2>
          <p>เรารับประกันการใช้งานเว็บไซต์ 30 วันหลังส่งมอบ หากเจอบั๊กแก้ฟรี (ไม่รวมการเพิ่มฟีเจอร์ใหม่)</p>
          <h2 className="text-xl font-bold text-primary">5. ลิขสิทธิ์</h2>
          <p>ลูกค้าเป็นเจ้าของเว็บไซต์ที่ได้รับมอบหลังจากชำระเงินครบถ้วน — MedeeWeb สงวนสิทธิ์ในการนำผลงานไปแสดงในพอร์ตโฟลิโอ</p>
          <h2 className="text-xl font-bold text-primary">6. การยกเลิก</h2>
          <p>หากลูกค้ายกเลิกระหว่างทำงาน เงินมัดจำจะไม่สามารถคืนได้ ขึ้นอยู่กับขั้นตอนงานที่ทำไปแล้ว</p>
        </div>
      </section>
    </PageShell>
  );
}
