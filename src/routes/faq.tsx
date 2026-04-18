import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "คำถามที่พบบ่อย — MedeeWeb" },
      { name: "description", content: "คำถามที่พบบ่อยเกี่ยวกับการทำเว็บไซต์ ราคา ระยะเวลา การชำระเงิน และอื่นๆ" },
      { property: "og:title", content: "คำถามที่พบบ่อย — MedeeWeb" },
      { property: "og:description", content: "ตอบทุกคำถามที่คุณสงสัย" },
      {
        name: "structured-data",
        content: "FAQPage",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            { "@type": "Question", name: "ราคาทำเว็บเริ่มต้นเท่าไหร่?", acceptedAnswer: { "@type": "Answer", text: "เริ่มต้น 5,000 บาท สำหรับแพ็กเกจ Starter" } },
            { "@type": "Question", name: "ใช้เวลาทำเว็บนานเท่าไหร่?", acceptedAnswer: { "@type": "Answer", text: "ขึ้นอยู่กับแพ็กเกจ Starter 7 วัน Business 14 วัน Pro 21 วัน" } },
          ],
        }),
      },
    ],
  }),
  component: FaqPage,
});

const categories = [
  {
    name: "ราคาและแพ็กเกจ",
    items: [
      { q: "ราคาทำเว็บเริ่มต้นเท่าไหร่?", a: "เริ่มต้น 5,000 บาท สำหรับแพ็กเกจ Starter ครอบคลุมเว็บ 1 หน้า + โดเมน + โฮสติ้ง 1 ปี" },
      { q: "มีค่าใช้จ่ายซ่อนเร้นหรือไม่?", a: "ไม่มีค่าซ่อนเร้น ราคาที่แจ้งคือราคาที่ต้องชำระจริง" },
      { q: "สามารถผ่อนชำระได้หรือไม่?", a: "ได้ ผ่อน 2 งวด 50/50 (มัดจำ 50% เริ่มงาน อีก 50% ก่อนส่งมอบ)" },
    ],
  },
  {
    name: "ระยะเวลาและการส่งมอบ",
    items: [
      { q: "ใช้เวลาทำเว็บนานเท่าไหร่?", a: "Starter 7 วัน, Business 14 วัน, Pro 21 วัน — นับจากวันที่ลูกค้าส่งข้อมูลครบ" },
      { q: "แก้ไขฟรีได้กี่ครั้ง?", a: "ฟรี 3 รอบ (batch แก้รวมต่อรอบ) หลังจากนั้นคิดค่าแก้ไขตามขอบเขตงาน" },
      { q: "หลังส่งมอบมีการรับประกันหรือไม่?", a: "รับประกันการใช้งาน 30 วัน หากเจอบั๊กแก้ฟรี" },
    ],
  },
  {
    name: "ฟีเจอร์เว็บไซต์",
    items: [
      { q: "เว็บไซต์รองรับมือถือหรือไม่?", a: "รองรับทุกอุปกรณ์ — มือถือ แท็บเล็ต คอมพิวเตอร์ ดีไซน์ Responsive 100%" },
      { q: "มีระบบหลังบ้านสำหรับแก้ไขเองได้หรือไม่?", a: "แพ็กเกจ Business และ Pro มาพร้อม CMS แก้ไขได้เอง" },
      { q: "ทำ SEO ให้ติด Google ได้หรือไม่?", a: "Business มี SEO พื้นฐาน, Pro มี SEO ครบเครื่อง + Analytics" },
    ],
  },
  {
    name: "โดเมน & โฮสติ้ง",
    items: [
      { q: "โดเมน .com แถมฟรีจริงหรือไม่?", a: "ใช่ แถมโดเมน .com ฟรี 1 ปี ทุกแพ็กเกจ" },
      { q: "ปีถัดไปต้องจ่ายเท่าไหร่?", a: "ค่าต่อโดเมน + โฮสติ้ง ประมาณ 2,000 บาท/ปี" },
      { q: "ย้ายโดเมนเข้ามาได้หรือไม่?", a: "ได้ ฟรี — ทีมงานช่วยย้ายให้" },
    ],
  },
  {
    name: "การติดต่อ & หลังขาย",
    items: [
      { q: "ติดต่อทีมงานได้ทางไหนบ้าง?", a: "โทร 099-625-2499, LINE @medeeweb, อีเมล suthee@medeeweb.com" },
      { q: "ทำงานวันอะไร?", a: "จันทร์-เสาร์ 9:00-18:00 (ฉุกเฉินติดต่อได้ 24 ชั่วโมงทาง LINE)" },
      { q: "อยู่ภาคใต้ทุกจังหวัดสามารถใช้บริการได้หรือไม่?", a: "ได้ ครอบคลุม 14 จังหวัดภาคใต้ ทำงาน Online ได้ 100%" },
    ],
  },
];

function FaqPage() {
  return (
    <PageShell>
      <PageHero eyebrow="คำถามที่พบบ่อย" title="คำถามที่พบบ่อย" subtitle="รวมคำถามที่ลูกค้าถามเรามากที่สุด — หากไม่พบคำตอบ ทักไลน์เราได้เลย" />
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 md:px-8 space-y-10">
          {categories.map((cat) => (
            <div key={cat.name}>
              <h2 className="text-2xl font-bold text-primary">{cat.name}</h2>
              <Accordion type="single" collapsible className="mt-4">
                {cat.items.map((item, i) => (
                  <AccordionItem key={i} value={`${cat.name}-${i}`} className="border-border">
                    <AccordionTrigger className="text-left text-base font-medium hover:no-underline">{item.q}</AccordionTrigger>
                    <AccordionContent className="text-foreground/80">{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
