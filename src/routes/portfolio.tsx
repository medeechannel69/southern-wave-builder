import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { PageShell, PageHero } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Award } from "lucide-react";
import mkRestaurant from "@/assets/mockup-restaurant.jpg";
import mkHotel from "@/assets/mockup-hotel.jpg";
import mkCompany from "@/assets/mockup-company.jpg";
import mkRealEstate from "@/assets/mockup-realestate.jpg";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "ผลงานของเรา — MedeeWeb" },
      { name: "description", content: "ผลงานเว็บไซต์ที่ MedeeWeb ทำให้ลูกค้า — ร้านอาหาร โรงแรม บริษัท อสังหาฯ และอื่นๆ" },
      { property: "og:title", content: "ผลงานของเรา — MedeeWeb" },
      { property: "og:description", content: "ผลงานเว็บไซต์จริงจากทีม MedeeWeb" },
      { property: "og:image", content: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80&auto=format&fit=crop" },
      { name: "twitter:image", content: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80&auto=format&fit=crop" },
    ],
    links: [{ rel: "canonical", href: "https://medeeweb.com/portfolio" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "หน้าแรก", item: "https://medeeweb.com" },
            { "@type": "ListItem", position: 2, name: "ผลงาน", item: "https://medeeweb.com/portfolio" },
          ],
        }),
      },
    ],
  }),
  component: PortfolioPage,
});

type Item = {
  id: string;
  name: string;
  category: string;
  image_url: string | null;
  demo_url: string | null;
  is_real: boolean;
};

// Map category → fallback mockup image when DB row has no image_url
const fallbackImage = (cat: string) => {
  switch (cat) {
    case "ร้านอาหาร": return mkRestaurant;
    case "โรงแรม": return mkHotel;
    case "บริษัท": return mkCompany;
    case "อสังหาฯ": return mkRealEstate;
    default: return mkCompany;
  }
};

function PortfolioPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<string>("ทั้งหมด");

  useEffect(() => {
    supabase
      .from("portfolio_items")
      .select("id, name, category, image_url, demo_url, is_real")
      .eq("visible", true)
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        setItems(data ?? []);
        setLoading(false);
      });
  }, []);

  const cats = useMemo(() => {
    const set = new Set<string>(items.map((i) => i.category));
    return ["ทั้งหมด", ...Array.from(set)];
  }, [items]);

  const filtered = active === "ทั้งหมด" ? items : items.filter((i) => i.category === active);

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
          {loading ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-72 animate-pulse rounded-xl bg-secondary/50" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <p className="mt-10 text-center text-muted-foreground">ยังไม่มีผลงาน</p>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((item) => (
                <Card key={item.id} className="group overflow-hidden rounded-xl border-border/60 bg-white p-0 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
                  <div className="relative aspect-[4/3] overflow-hidden bg-secondary/30">
                    <img
                      src={item.image_url ?? fallbackImage(item.category)}
                      alt={item.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {item.is_real && (
                      <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-orange px-3 py-1 text-xs font-bold text-white shadow-lg">
                        <Award className="h-3 w-3" /> ผลงานจริง
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-3 p-4">
                    <div>
                      <p className="text-base font-semibold text-primary">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.category}</p>
                    </div>
                    {item.demo_url && (
                      <a href={item.demo_url}>
                        <Button size="sm" variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-white">
                          ดู <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </a>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
