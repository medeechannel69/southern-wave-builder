import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink, Sparkles } from "lucide-react";
import { PageShell, PageHero } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { DEMOS } from "@/components/demo/demoData";

export const Route = createFileRoute("/demo")({
  head: () => ({
    meta: [
      { title: "ตัวอย่างเว็บไซต์ 8 ธุรกิจ — MedeeWeb" },
      {
        name: "description",
        content: "ดูตัวอย่างเว็บไซต์จริงสำหรับร้านอาหาร โรงแรม บริษัท ผู้รับเหมา อสังหาฯ ประกัน คลินิก และโฮมสเตย์",
      },
      { property: "og:title", content: "ตัวอย่างเว็บไซต์ 8 ธุรกิจ — MedeeWeb" },
      {
        property: "og:description",
        content: "เว็บไซต์ตัวอย่างที่ใช้งานได้จริง คลิกดูเลย",
      },
    ],
  }),
  component: DemoHub,
});

function DemoHub() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Demo Sites"
        title="ตัวอย่างเว็บไซต์ 8 ธุรกิจ"
        subtitle="คลิกที่ตัวอย่างเพื่อดูเว็บไซต์ที่ใช้งานได้จริง พร้อมหน้าภายในครบทุกหน้า"
      />
      <section className="bg-soft-teal py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {DEMOS.map((d) => (
              <Link
                key={d.slug}
                to="/demo/$slug"
                params={{ slug: d.slug }}
                className="group overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={d.cover}
                    alt={d.brand}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.6) 100%)",
                    }}
                  />
                  <span
                    className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold text-white"
                    style={{ background: d.theme.primary }}
                  >
                    {d.industry}
                  </span>
                  <div className="absolute bottom-3 left-3 text-white">
                    <div className="text-base font-bold">{d.brand}</div>
                    <div className="text-xs opacity-90">{d.tagline}</div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-foreground/70">{d.description}</p>
                  <div className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                    เปิดดูตัวอย่าง <ExternalLink className="h-3.5 w-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 rounded-2xl bg-white p-6 text-center shadow-md md:p-10">
            <Sparkles className="mx-auto h-10 w-10 text-orange" />
            <h2 className="mt-3 section-heading">
              ชอบแบบไหน? <span className="heading-accent">เราทำให้ได้</span>
            </h2>
            <p className="section-sub mx-auto max-w-2xl">
              เลือกแบบที่ใช่แล้วบอกเรา ทีม MedeeWeb ปรับให้ตรงกับธุรกิจคุณภายใน 7 วัน
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Link to="/quote">
                <Button className="rounded-full bg-orange px-6 text-orange-foreground hover:bg-orange/90">
                  ขอใบเสนอราคา
                </Button>
              </Link>
              <Link to="/packages">
                <Button variant="outline" className="rounded-full px-6">
                  ดูแพ็กเกจราคา
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
