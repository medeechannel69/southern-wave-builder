import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageShell, PageHero } from "@/components/PageShell";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "คำถามที่พบบ่อย — MedeeWeb" },
      { name: "description", content: "คำถามที่พบบ่อยเกี่ยวกับการทำเว็บไซต์ ราคา ระยะเวลา การชำระเงิน และอื่นๆ" },
      { property: "og:title", content: "คำถามที่พบบ่อย — MedeeWeb" },
      { property: "og:description", content: "ตอบทุกคำถามที่คุณสงสัย" },
    ],
    links: [{ rel: "canonical", href: "https://medeeweb.com/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          speakable: {
            "@type": "SpeakableSpecification",
            cssSelector: ["[data-speakable]", "h2", "h3"],
          },
          mainEntity: [
            { "@type": "Question", name: "ราคาทำเว็บเริ่มต้นเท่าไหร่?", acceptedAnswer: { "@type": "Answer", text: "เริ่มต้น 5,000 บาท สำหรับแพ็กเกจ Starter ครอบคลุมเว็บ 1 หน้า + โดเมน + โฮสติ้ง 1 ปี" } },
            { "@type": "Question", name: "มีค่าใช้จ่ายซ่อนเร้นหรือไม่?", acceptedAnswer: { "@type": "Answer", text: "ไม่มีค่าซ่อนเร้น ราคาที่แจ้งคือราคาที่ต้องชำระจริง" } },
            { "@type": "Question", name: "สามารถผ่อนชำระได้หรือไม่?", acceptedAnswer: { "@type": "Answer", text: "ได้ ผ่อน 2 งวด 50/50 (มัดจำ 50% เริ่มงาน อีก 50% ก่อนส่งมอบ)" } },
            { "@type": "Question", name: "ใช้เวลาทำเว็บนานเท่าไหร่?", acceptedAnswer: { "@type": "Answer", text: "Starter 7 วัน, Business 14 วัน, Pro 21 วัน — นับจากวันที่ลูกค้าส่งข้อมูลครบ" } },
            { "@type": "Question", name: "แก้ไขฟรีได้กี่ครั้ง?", acceptedAnswer: { "@type": "Answer", text: "ฟรี 3 รอบ (batch แก้รวมต่อรอบ) หลังจากนั้นคิดค่าแก้ไขตามขอบเขตงาน" } },
            { "@type": "Question", name: "เว็บไซต์รองรับมือถือหรือไม่?", acceptedAnswer: { "@type": "Answer", text: "รองรับทุกอุปกรณ์ — มือถือ แท็บเล็ต คอมพิวเตอร์ ดีไซน์ Responsive 100%" } },
            { "@type": "Question", name: "หลังส่งมอบมีการรับประกันหรือไม่?", acceptedAnswer: { "@type": "Answer", text: "รับประกันการใช้งาน 30 วัน หากเจอบั๊กแก้ฟรี" } },
            { "@type": "Question", name: "มีระบบหลังบ้านสำหรับแก้ไขเองได้หรือไม่?", acceptedAnswer: { "@type": "Answer", text: "แพ็กเกจ Business และ Pro มาพร้อม CMS แก้ไขได้เอง" } },
            { "@type": "Question", name: "ทำ SEO ให้ติด Google ได้หรือไม่?", acceptedAnswer: { "@type": "Answer", text: "Business มี SEO พื้นฐาน, Pro มี SEO ครบเครื่อง + Analytics" } },
            { "@type": "Question", name: "โดเมน .com แถมฟรีจริงหรือไม่?", acceptedAnswer: { "@type": "Answer", text: "ใช่ แถมโดเมน .com ฟรี 1 ปี ทุกแพ็กเกจ" } },
            { "@type": "Question", name: "ปีถัดไปต้องจ่ายเท่าไหร่?", acceptedAnswer: { "@type": "Answer", text: "ค่าต่อโดเมน + โฮสติ้ง ประมาณ 2,000 บาท/ปี" } },
            { "@type": "Question", name: "ย้ายโดเมนเข้ามาได้หรือไม่?", acceptedAnswer: { "@type": "Answer", text: "ได้ ฟรี — ทีมงานช่วยย้ายให้" } },
            { "@type": "Question", name: "ติดต่อทีมงานได้ทางไหนบ้าง?", acceptedAnswer: { "@type": "Answer", text: "โทร 099-625-2499, LINE @medeeweb, อีเมล suthee@medeeweb.com" } },
            { "@type": "Question", name: "ทำงานวันอะไร?", acceptedAnswer: { "@type": "Answer", text: "จันทร์-เสาร์ 9:00-18:00 (ฉุกเฉินติดต่อได้ 24 ชั่วโมงทาง LINE)" } },
            { "@type": "Question", name: "อยู่ภาคใต้ทุกจังหวัดสามารถใช้บริการได้หรือไม่?", acceptedAnswer: { "@type": "Answer", text: "ได้ ครอบคลุม 14 จังหวัดภาคใต้ ทำงาน Online ได้ 100%" } },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "หน้าแรก", item: "https://medeeweb.com" },
            { "@type": "ListItem", position: 2, name: "คำถามที่พบบ่อย", item: "https://medeeweb.com/faq" },
          ],
        }),
      },
    ],
  }),
  component: FaqPage,
});

type FaqItem = { id: string; category: string; question: string; answer: string };

function FaqPage() {
  const [items, setItems] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("faq_items")
      .select("id, category, question, answer")
      .eq("visible", true)
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        setItems(data ?? []);
        setLoading(false);
      });
  }, []);

  // Group by category preserving sort order
  const categories = items.reduce<Record<string, FaqItem[]>>((acc, it) => {
    (acc[it.category] ??= []).push(it);
    return acc;
  }, {});

  return (
    <PageShell>
      <PageHero eyebrow="คำถามที่พบบ่อย" title="คำถามที่พบบ่อย" subtitle="รวมคำถามที่ลูกค้าถามเรามากที่สุด — หากไม่พบคำตอบ ทักไลน์เราได้เลย" />
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 md:px-8 space-y-10">
          {loading ? (
            [1, 2, 3].map((i) => <div key={i} className="h-32 animate-pulse rounded-2xl bg-secondary/50" />)
          ) : items.length === 0 ? (
            <p className="text-center text-muted-foreground">ยังไม่มีคำถาม</p>
          ) : (
            Object.entries(categories).map(([cat, list]) => (
              <div key={cat}>
                <h2 className="text-2xl font-bold text-primary">{cat}</h2>
                <Accordion type="single" collapsible className="mt-4">
                  {list.map((item) => (
                    <AccordionItem key={item.id} value={item.id} className="border-border">
                      <AccordionTrigger className="text-left text-base font-medium hover:no-underline">{item.question}</AccordionTrigger>
                      <AccordionContent className="text-foreground/80">{item.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))
          )}
        </div>
      </section>
    </PageShell>
  );
}
