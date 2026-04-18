import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";
import { Card } from "@/components/ui/card";
import { Calendar, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "บทความและบล็อก — MedeeWeb" },
      { name: "description", content: "บทความความรู้เกี่ยวกับเว็บไซต์ การตลาดออนไลน์ SEO และเคล็ดลับสำหรับธุรกิจ" },
      { property: "og:title", content: "บทความและบล็อก — MedeeWeb" },
      { property: "og:description", content: "ความรู้สำหรับธุรกิจในยุคดิจิทัล" },
    ],
  }),
  component: BlogPage,
});

export const blogPosts = [
  { slug: "why-business-needs-website", title: "ทำไมธุรกิจในปี 2025 ถึงต้องมีเว็บไซต์?", excerpt: "เว็บไซต์ไม่ใช่ทางเลือกอีกต่อไป แต่เป็นเครื่องมือสำคัญที่ทุกธุรกิจต้องมี...", date: "2025-01-15" },
  { slug: "seo-basics-2025", title: "SEO เบื้องต้นที่ทุกเจ้าของเว็บต้องรู้", excerpt: "ทำเว็บแล้วต้องทำให้คนเจอ มาเรียนรู้ SEO พื้นฐานกัน...", date: "2025-01-10" },
  { slug: "choose-domain-name", title: "วิธีเลือกชื่อโดเมนให้เหมาะกับธุรกิจ", excerpt: "ชื่อโดเมนคือใบหน้าของแบรนด์ออนไลน์ เลือกอย่างไรให้จำง่าย...", date: "2025-01-05" },
  { slug: "mobile-first-design", title: "Mobile-First Design สำคัญแค่ไหน?", excerpt: "70% ของผู้ใช้งานเข้าเว็บผ่านมือถือ การออกแบบให้รองรับมือถือคือ...", date: "2024-12-28" },
  { slug: "convert-visitors-to-customers", title: "5 เทคนิคเปลี่ยนผู้เยี่ยมชมเป็นลูกค้า", excerpt: "เว็บที่ดีไม่ใช่แค่สวย แต่ต้องเปลี่ยนคนดูให้กลายเป็นลูกค้าได้...", date: "2024-12-20" },
];

function BlogPage() {
  return (
    <PageShell>
      <PageHero eyebrow="บทความ" title="บทความและความรู้" subtitle="ความรู้เกี่ยวกับเว็บไซต์ การตลาดออนไลน์ และเคล็ดลับสำหรับเจ้าของธุรกิจ" />
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((p) => (
              <Card key={p.slug} className="group flex flex-col overflow-hidden rounded-2xl border-border bg-white p-0 transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className="aspect-video bg-gradient-to-br from-soft-teal to-secondary" />
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" /> {p.date}
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-primary group-hover:text-accent transition-colors">{p.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-foreground/70" style={{ lineHeight: 1.6 }}>{p.excerpt}</p>
                  <Link to="/blog/$slug" params={{ slug: p.slug }} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                    อ่านต่อ <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
