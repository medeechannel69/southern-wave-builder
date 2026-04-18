import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageShell, PageHero } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import * as Icons from "lucide-react";
import { Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/topup")({
  head: () => ({
    meta: [
      { title: "บริการเสริม Top-Up — MedeeWeb" },
      { name: "description", content: "บริการเสริมสำหรับเว็บไซต์ของคุณ เพิ่มหน้า ติดตั้ง SEO ระบบบล็อก ระบบจอง AI Marketing และอื่นๆ" },
      { property: "og:title", content: "บริการเสริม Top-Up — MedeeWeb" },
      { property: "og:description", content: "เพิ่มความสามารถให้เว็บไซต์ของคุณ" },
    ],
  }),
  component: TopupPage,
});

type Item = { id: string; name: string; price: string; unit: string | null; icon: string | null };

function getIcon(name: string | null) {
  if (!name) return Sparkles;
  const Comp = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[name];
  return Comp ?? Sparkles;
}

function TopupPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("topup_items")
      .select("id, name, price, unit, icon")
      .eq("visible", true)
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        setItems(data ?? []);
        setLoading(false);
      });
  }, []);

  return (
    <PageShell>
      <PageHero
        eyebrow="บริการเสริม"
        title="Top-Up เสริมพลังให้เว็บไซต์ของคุณ"
        subtitle="เลือกบริการเสริมที่ตรงกับความต้องการ เพิ่มได้ทุกเมื่อ ไม่บังคับซื้อตอนสั่งทำ"
      />
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          {loading ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-56 animate-pulse rounded-2xl bg-secondary/50" />
              ))}
            </div>
          ) : items.length === 0 ? (
            <p className="text-center text-muted-foreground">ยังไม่มีบริการเสริม</p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((it) => {
                const Icon = getIcon(it.icon);
                return (
                  <div key={it.id} className="service-card">
                    <div className="flex flex-1 flex-col items-center p-6 text-center">
                      <div className="why-icon mb-4"><Icon className="h-9 w-9" /></div>
                      <h3 className="text-lg font-semibold text-primary">{it.name}</h3>
                      <div className="mt-3">
                        <span className="text-3xl font-bold text-orange">{it.price}</span>
                        {it.unit && <span className="ml-1 text-sm text-muted-foreground">{it.unit}</span>}
                      </div>
                      <Link to="/quote" className="mt-5 w-full">
                        <Button className="w-full rounded-full bg-primary text-white hover:bg-primary/90">เพิ่มลงคำสั่งซื้อ</Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
