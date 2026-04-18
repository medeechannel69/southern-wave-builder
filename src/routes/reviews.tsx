import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageShell, PageHero } from "@/components/PageShell";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "รีวิวจากลูกค้า — MedeeWeb" },
      { name: "description", content: "รีวิวจริงจากลูกค้าที่ใช้บริการทำเว็บไซต์กับ MedeeWeb คะแนนเฉลี่ย 4.9/5" },
      { property: "og:title", content: "รีวิวจากลูกค้า — MedeeWeb" },
      { property: "og:description", content: "คะแนนเฉลี่ย 4.9/5 จากลูกค้าจริง" },
    ],
    links: [{ rel: "canonical", href: "https://medeeweb.com/reviews" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "หน้าแรก", item: "https://medeeweb.com" },
            { "@type": "ListItem", position: 2, name: "รีวิว", item: "https://medeeweb.com/reviews" },
          ],
        }),
      },
    ],
  }),
  component: ReviewsPage,
});

type Review = {
  id: string;
  customer_name: string;
  rating: number;
  business_type: string | null;
  platform: string | null;
  text: string;
};

function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("reviews")
      .select("id, customer_name, rating, business_type, platform, text")
      .eq("visible", true)
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        setReviews(data ?? []);
        setLoading(false);
      });
  }, []);

  return (
    <PageShell>
      <PageHero
        eyebrow="รีวิวลูกค้า"
        title="รีวิวจากลูกค้าจริง"
        subtitle="คะแนนเฉลี่ย ⭐ 4.9/5 จากลูกค้ากว่า 100+ ราย ที่ไว้วางใจให้เราดูแลเว็บไซต์"
      />
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          {loading ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-48 animate-pulse rounded-2xl bg-secondary/50" />
              ))}
            </div>
          ) : reviews.length === 0 ? (
            <p className="text-center text-muted-foreground">ยังไม่มีรีวิว</p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((r) => (
                <Card key={r.id} className="rounded-2xl border-border bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < r.rating ? "fill-orange text-orange" : "text-muted-foreground/30"}`} />
                    ))}
                  </div>
                  <p className="mt-3 text-foreground/80" style={{ lineHeight: 1.7 }}>"{r.text}"</p>
                  <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                    <div>
                      <p className="font-semibold text-primary">{r.customer_name}</p>
                      {r.business_type && <p className="text-xs text-muted-foreground">{r.business_type}</p>}
                    </div>
                    {r.platform && (
                      <span className="rounded-full bg-soft-teal px-3 py-1 text-xs font-medium text-primary">{r.platform}</span>
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
