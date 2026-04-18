import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, PageHero } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Award } from "lucide-react";
import mkRestaurant from "@/assets/mockup-restaurant.jpg";
import mkHotel from "@/assets/mockup-hotel.jpg";
import mkCompany from "@/assets/mockup-company.jpg";
import mkRealEstate from "@/assets/mockup-realestate.jpg";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "ผลงานของเรา — MedeeWeb" },
      { name: "description", content: "ผลงานเว็บไซต์ที่ MedeeWeb ทำให้ลูกค้า — ร้านอาหาร โรงแรม บริษัท อสังหาฯ และอื่นๆ" },
      { property: "og:title", content: "ผลงานของเรา — MedeeWeb" },
      { property: "og:description", content: "ผลงานเว็บไซต์จริงจากทีม MedeeWeb" },
    ],
  }),
  component: PortfolioPage,
});

const cats = ["ทั้งหมด", "ร้านอาหาร", "โรงแรม", "บริษัท", "อสังหาฯ"] as const;
type Cat = typeof cats[number];

const items = [
  { name: "สบายดีโฮม", cat: "อสังหาฯ" as const, img: mkRealEstate, real: true, link: "/demo/sabaidi-home" },
  { name: "Thai Bistro", cat: "ร้านอาหาร" as const, img: mkRestaurant, real: false, link: "/demo/restaurant" },
  { name: "Krabi Resort", cat: "โรงแรม" as const, img: mkHotel, real: false, link: "/demo/hotel" },
  { name: "South Tech", cat: "บริษัท" as const, img: mkCompany, real: false, link: "/demo/company" },
  { name: "Ocean View Hotel", cat: "โรงแรม" as const, img: mkHotel, real: false, link: "/demo/hotel" },
  { name: "Andaman Homes", cat: "อสังหาฯ" as const, img: mkRealEstate, real: false, link: "/demo/realestate" },
];

function PortfolioPage() {
  const [active, setActive] = useState<Cat>("ทั้งหมด");
  const filtered = active === "ทั้งหมด" ? items : items.filter((i) => i.cat === active);
  return (
    <PageShell>
      <PageHero
        eyebrow="ผลงานของเรา"
        title="ผลงานเว็บไซต์ที่เราภูมิใจ"
        subtitle="ดูตัวอย่างเว็บไซต์ที่เราทำให้ลูกค้าจริง — กว่า 100+ โปรเจ็กต์ทั่วภาคใต้"
      />
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`rounded-full px-5 py-2.5 text-sm md:text-base font-semibold transition-all ${
                  active === c ? "bg-primary text-white shadow-[var(--shadow-elegant)]" : "bg-white text-primary border border-border hover:bg-secondary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item, i) => (
              <Card key={i} className="group overflow-hidden rounded-xl border-border/60 bg-white p-0 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
                <div className="relative aspect-[4/3] overflow-hidden bg-secondary/30">
                  <img src={item.img} alt={item.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  {item.real && (
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-orange px-3 py-1 text-xs font-bold text-white shadow-lg">
                      <Award className="h-3 w-3" /> ผลงานจริง
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between gap-3 p-4">
                  <div>
                    <p className="text-base font-semibold text-primary">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.cat}</p>
                  </div>
                  <Link to={item.link}>
                    <Button size="sm" variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-white">
                      ดู <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
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
