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
          mainEntity: [
            { "@type": "Question", name: "ราคาทำเว็บเริ่มต้นเท่าไหร่?", acceptedAnswer: { "@type": "Answer", text: "เริ่มต้น 5,000 บาท สำหรับแพ็กเกจ Starter" } },
            { "@type": "Question", name: "ใช้เวลาทำเว็บนานเท่าไหร่?", acceptedAnswer: { "@type": "Answer", text: "ขึ้นอยู่กับแพ็กเกจ Starter 7 วัน Business 14 วัน Pro 21 วัน" } },
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
