import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, PageHero } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, MessageCircle, Check } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "ติดต่อ MedeeWeb — ปรึกษาฟรี" },
      { name: "description", content: "ติดต่อ MedeeWeb ปรึกษาเรื่องเว็บไซต์ฟรี โทร 099-625-2499 หรือทักไลน์ได้เลย" },
      { property: "og:title", content: "ติดต่อ MedeeWeb" },
      { property: "og:description", content: "ปรึกษาเรื่องเว็บไซต์ฟรี — โทร 099-625-2499" },
    ],
    links: [{ rel: "canonical", href: "https://medeeweb.com/contact" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "หน้าแรก", item: "https://medeeweb.com" },
            { "@type": "ListItem", position: 2, name: "ติดต่อ", item: "https://medeeweb.com/contact" },
          ],
        }),
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    setSubmitted(true);
    toast.success("ส่งข้อความสำเร็จ — ทีมงานจะติดต่อกลับโดยเร็วที่สุด");
  };
  return (
    <PageShell>
      <PageHero eyebrow="ติดต่อเรา" title="ติดต่อ MedeeWeb" subtitle="ปรึกษาฟรี ไม่มีค่าใช้จ่าย — ทีมงานพร้อมตอบทุกคำถาม" />
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2 md:px-8">
          {/* Form */}
          <div>
            <h2 className="text-2xl font-bold text-primary">ส่งข้อความหาเรา</h2>
            {submitted ? (
              <div className="mt-6 rounded-xl border border-accent bg-accent/10 p-6 text-center">
                <Check className="mx-auto h-12 w-12 text-accent" />
                <p className="mt-3 font-semibold text-primary">ส่งข้อความสำเร็จ</p>
                <p className="mt-1 text-sm text-muted-foreground">ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mt-6 space-y-4">
                <div>
                  <Label htmlFor="name">ชื่อ-นามสกุล</Label>
                  <Input id="name" required placeholder="ชื่อของคุณ" />
                </div>
                <div>
                  <Label htmlFor="phone">เบอร์โทรศัพท์</Label>
                  <Input id="phone" type="tel" required placeholder="08X-XXX-XXXX" />
                </div>
                <div>
                  <Label htmlFor="msg">ข้อความ</Label>
                  <Textarea id="msg" required rows={5} placeholder="รายละเอียดที่ต้องการสอบถาม" />
                </div>
                <Button disabled={loading} type="submit" className="w-full rounded-full bg-orange text-orange-foreground hover:bg-orange/90 font-semibold">
                  {loading ? "กำลังส่ง..." : "ส่งข้อความ"}
                </Button>
              </form>
            )}
          </div>
          {/* Info */}
          <div className="space-y-5">
            <h2 className="text-2xl font-bold text-primary">ช่องทางติดต่อ</h2>
            {[
              { icon: Phone, label: "โทรศัพท์", value: "099-625-2499", href: "tel:0996252499" },
              { icon: Mail, label: "อีเมล", value: "suthee@medeeweb.com", href: "mailto:suthee@medeeweb.com" },
              { icon: MessageCircle, label: "LINE Official", value: "@medeeweb", href: "https://line.me/R/ti/p/@medeeweb" },
              { icon: MapPin, label: "ที่ตั้ง", value: "อ.เมือง จ.กระบี่ 81000", href: "#map" },
            ].map((c) => (
              <a key={c.label} href={c.href} className="flex items-center gap-4 rounded-xl border border-border bg-white p-4 transition-shadow hover:shadow-md">
                <div className="why-icon" style={{ width: 56, height: 56 }}>
                  <c.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{c.label}</p>
                  <p className="font-semibold text-primary">{c.value}</p>
                </div>
              </a>
            ))}
            <div id="map" className="mt-4 aspect-video overflow-hidden rounded-xl border border-border bg-soft-teal">
              <iframe
                title="MedeeWeb location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31735.5!2d98.91!3d8.06!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1z4LiB4Lij4Liw4Lia4Li14LmI!5e0!3m2!1sen!2sth!4v1700000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
