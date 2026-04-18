import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "นโยบายความเป็นส่วนตัว — MedeeWeb" },
      { name: "description", content: "นโยบายความเป็นส่วนตัวของ MedeeWeb เราเคารพข้อมูลของคุณ" },
      { property: "og:title", content: "นโยบายความเป็นส่วนตัว — MedeeWeb" },
      { property: "og:description", content: "เราเคารพข้อมูลของคุณ" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <PageShell>
      <PageHero title="นโยบายความเป็นส่วนตัว" subtitle="ปรับปรุงล่าสุด: 1 มกราคม 2025" />
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl space-y-6 px-4 md:px-8 text-foreground/85" style={{ lineHeight: 1.85 }}>
          <h2 className="text-xl font-bold text-primary">1. ข้อมูลที่เราเก็บรวบรวม</h2>
          <p>เราเก็บข้อมูลที่คุณให้กับเราโดยตรง เช่น ชื่อ เบอร์โทร อีเมล LINE ID เมื่อคุณกรอกฟอร์ม ขอใบเสนอราคา หรือสั่งซื้อบริการ</p>
          <h2 className="text-xl font-bold text-primary">2. การใช้ข้อมูล</h2>
          <p>เราใช้ข้อมูลของคุณเพื่อให้บริการ ติดต่อกลับ ส่งใบเสนอราคา และอัปเดตสถานะโปรเจ็กต์ของคุณเท่านั้น</p>
          <h2 className="text-xl font-bold text-primary">3. การเปิดเผยข้อมูล</h2>
          <p>เราจะไม่ขายหรือเปิดเผยข้อมูลของคุณกับบุคคลที่สาม ยกเว้นกรณีที่กฎหมายกำหนด</p>
          <h2 className="text-xl font-bold text-primary">4. คุกกี้</h2>
          <p>เว็บไซต์นี้ใช้คุกกี้เพื่อปรับปรุงประสบการณ์การใช้งาน คุณสามารถปฏิเสธคุกกี้ได้ผ่านการตั้งค่าเบราว์เซอร์</p>
          <h2 className="text-xl font-bold text-primary">5. สิทธิของคุณ</h2>
          <p>คุณมีสิทธิเข้าถึง แก้ไข หรือลบข้อมูลส่วนบุคคลของคุณ ติดต่อเราได้ที่ suthee@medeeweb.com</p>
        </div>
      </section>
    </PageShell>
  );
}
