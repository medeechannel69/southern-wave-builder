import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar } from "lucide-react";
import { blogPosts } from "./blog";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = blogPosts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.post.title} — MedeeWeb Blog` },
          { name: "description", content: loaderData.post.excerpt },
          { property: "og:title", content: loaderData.post.title },
          { property: "og:description", content: loaderData.post.excerpt },
          { property: "og:type", content: "article" },
        ]
      : [{ title: "บทความ — MedeeWeb" }],
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
          <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" /> {post.date}
          </div>
          <div className="mt-8 aspect-video rounded-2xl bg-gradient-to-br from-soft-teal to-secondary" />
          <div className="prose mt-8 max-w-none text-foreground/85" style={{ lineHeight: 1.85 }}>
            <p className="text-lg font-medium">{post.excerpt}</p>
            <p className="mt-6">
              นี่คือเนื้อหาบทความตัวอย่าง สามารถจัดการเนื้อหาได้จากหน้า Admin ในอนาคต — เนื้อหาบทความจะถูกเก็บไว้ในฐานข้อมูลและสามารถแก้ไขได้ผ่าน CMS ของ MedeeWeb
            </p>
            <p className="mt-4">
              MedeeWeb เชื่อว่าเว็บไซต์ที่ดีต้องตอบโจทย์ทั้งผู้ใช้และเจ้าของธุรกิจ — เร็ว สวย ใช้งานง่าย และเข้าถึงลูกค้าได้จริงผ่าน SEO ที่ทำมาอย่างดี
            </p>
            <p className="mt-4">
              หากคุณสนใจสร้างเว็บไซต์ที่จะช่วยให้ธุรกิจของคุณเติบโต ทักทีมงานเราได้ทุกเมื่อ ปรึกษาฟรี ไม่มีค่าใช้จ่าย
            </p>
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
