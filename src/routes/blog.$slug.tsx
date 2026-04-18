import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("id, slug, title, excerpt, content, cover_image_url, category, published, published_at")
      .eq("slug", params.slug)
      .eq("published", true)
      .maybeSingle();
    if (error || !data) throw notFound();
    return { post: data };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.post.title} — MedeeWeb Blog` },
          { name: "description", content: loaderData.post.excerpt ?? "" },
          { property: "og:title", content: loaderData.post.title },
          { property: "og:description", content: loaderData.post.excerpt ?? "" },
          { property: "og:type", content: "article" },
          ...(loaderData.post.cover_image_url ? [{ property: "og:image", content: loaderData.post.cover_image_url }, { name: "twitter:image", content: loaderData.post.cover_image_url }] : []),
        ]
      : [{ title: "บทความ — MedeeWeb" }],
    links: loaderData
      ? [{ rel: "canonical", href: `https://medeeweb.com/blog/${loaderData.post.slug}` }]
      : [{ rel: "canonical", href: "https://medeeweb.com/blog" }],
    scripts: loaderData
      ? [
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: loaderData.post.title,
              description: loaderData.post.excerpt ?? "",
              author: { "@type": "Organization", name: "MedeeWeb" },
              publisher: { "@type": "Organization", name: "MedeeWeb", url: "https://medeeweb.com" },
              datePublished: loaderData.post.published_at ?? "",
              url: `https://medeeweb.com/blog/${loaderData.post.slug}`,
              ...(loaderData.post.cover_image_url ? { image: loaderData.post.cover_image_url } : {}),
            }),
          },
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "หน้าแรก", item: "https://medeeweb.com" },
                { "@type": "ListItem", position: 2, name: "บล็อก", item: "https://medeeweb.com/blog" },
                { "@type": "ListItem", position: 3, name: loaderData.post.title, item: `https://medeeweb.com/blog/${loaderData.post.slug}` },
              ],
            }),
          },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <PageShell>
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1>ไม่พบบทความ</h1>
        <Link to="/blog" className="mt-6 inline-block">
          <Button variant="outline">กลับไปหน้าบล็อก</Button>
        </Link>
      </div>
    </PageShell>
  ),
  component: BlogPostPage,
});

function BlogPostPage() {
  const { post } = Route.useLoaderData();
  return (
    <PageShell>
      <article className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 md:px-8">
          <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-accent">
            <ArrowLeft className="h-4 w-4" /> กลับไปหน้าบล็อก
          </Link>
          <h1 className="mt-4 font-display font-bold text-primary">{post.title}</h1>
          {post.published_at && (
            <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" /> {new Date(post.published_at).toLocaleDateString("th-TH")}
            </div>
          )}
          {post.cover_image_url ? (
            <img src={post.cover_image_url} alt={post.title} className="mt-8 aspect-video w-full rounded-2xl object-cover" />
          ) : (
            <div className="mt-8 aspect-video rounded-2xl bg-gradient-to-br from-soft-teal to-secondary" />
          )}
          <div className="prose mt-8 max-w-none text-foreground/85" style={{ lineHeight: 1.85 }}>
            {post.excerpt && <p className="text-lg font-medium">{post.excerpt}</p>}
            {post.content && (
              <div className="mt-6 whitespace-pre-wrap">{post.content}</div>
            )}
          </div>
          <div className="mt-12 rounded-2xl bg-soft-teal p-6 text-center">
            <p className="font-semibold text-primary">สนใจทำเว็บไซต์? ปรึกษาฟรี</p>
            <Link to="/quote" className="mt-4 inline-block">
              <Button className="rounded-full bg-orange text-orange-foreground hover:bg-orange/90 font-semibold">ขอใบเสนอราคา</Button>
            </Link>
          </div>
        </div>
      </article>
    </PageShell>
  );
}
