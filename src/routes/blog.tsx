import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { PageShell, PageHero } from "@/components/PageShell";
import { Card } from "@/components/ui/card";
import { Calendar, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "บทความและบล็อก — MedeeWeb" },
      { name: "description", content: "บทความความรู้เกี่ยวกับเว็บไซต์ การตลาดออนไลน์ SEO และเคล็ดลับสำหรับธุรกิจ" },
      { property: "og:title", content: "บทความและบล็อก — MedeeWeb" },
      { property: "og:description", content: "ความรู้สำหรับธุรกิจในยุคดิจิทัล" },
    ],
    links: [{ rel: "canonical", href: "https://medeeweb.com/blog" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "หน้าแรก", item: "https://medeeweb.com" },
            { "@type": "ListItem", position: 2, name: "บล็อก", item: "https://medeeweb.com/blog" },
          ],
        }),
      },
    ],
  }),
  component: BlogPage,
});

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image_url: string | null;
  published_at: string | null;
  category: string | null;
};

function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<string>("ทั้งหมด");

  useEffect(() => {
    supabase
      .from("blog_posts")
      .select("id, slug, title, excerpt, cover_image_url, published_at, category")
      .eq("published", true)
      .order("published_at", { ascending: false, nullsFirst: false })
      .then(({ data }) => {
        setPosts(data ?? []);
        setLoading(false);
      });
  }, []);

  const cats = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.category && set.add(p.category));
    return ["ทั้งหมด", ...Array.from(set)];
  }, [posts]);

  const filtered = active === "ทั้งหมด" ? posts : posts.filter((p) => p.category === active);

  return (
    <PageShell>
      <PageHero eyebrow="บทความ" title="บทความและความรู้" subtitle="ความรู้เกี่ยวกับเว็บไซต์ การตลาดออนไลน์ และเคล็ดลับสำหรับเจ้าของธุรกิจ" />
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          {cats.length > 1 && (
            <div className="mb-8 flex flex-wrap justify-center gap-2 md:gap-3">
              {cats.map((c) => (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                    active === c ? "bg-primary text-white shadow-[var(--shadow-elegant)]" : "bg-white text-primary border border-border hover:bg-secondary"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          )}

          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-80 animate-pulse rounded-2xl bg-secondary/50" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-muted-foreground">ยังไม่มีบทความในหมวดนี้</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <Card key={p.slug} className="group flex flex-col overflow-hidden rounded-2xl border-border bg-white p-0 transition-all hover:-translate-y-1 hover:shadow-lg">
                  {p.cover_image_url ? (
                    <img src={p.cover_image_url} alt={p.title} loading="lazy" className="aspect-video w-full object-cover" />
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-soft-teal to-secondary" />
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-3 text-xs">
                      {p.category && (
                        <span className="rounded-full bg-soft-teal px-2.5 py-0.5 font-semibold text-primary">{p.category}</span>
                      )}
                      {p.published_at && (
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5" /> {new Date(p.published_at).toLocaleDateString("th-TH")}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-primary group-hover:text-accent transition-colors">{p.title}</h3>
                    {p.excerpt && (
                      <p className="mt-2 flex-1 text-sm text-foreground/70" style={{ lineHeight: 1.6 }}>{p.excerpt}</p>
                    )}
                    <Link to="/blog/$slug" params={{ slug: p.slug }} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                      อ่านต่อ <ArrowRight className="h-4 w-4" />
                    </Link>
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
