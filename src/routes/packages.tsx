import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageShell, PageHero } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Check, X, Flame } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      { title: "แพ็กเกจราคาทำเว็บไซต์ — MedeeWeb เริ่ม 5,000 บาท" },
      { name: "description", content: "แพ็กเกจทำเว็บไซต์ Starter 5,000 / Business 9,000 / Pro 15,000 บาท ราคาคุ้มค่า ไม่มีค่าซ่อนเร้น พร้อมโดเมน+โฮสติ้ง 1 ปี" },
      { property: "og:title", content: "แพ็กเกจราคาทำเว็บไซต์ — MedeeWeb" },
      { property: "og:description", content: "Starter 5,000 / Business 9,000 / Pro 15,000 บาท" },
      { property: "og:image", content: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80&auto=format&fit=crop" },
      { name: "twitter:image", content: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80&auto=format&fit=crop" },
    ],
    links: [{ rel: "canonical", href: "https://medeeweb.com/packages" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "หน้าแรก", item: "https://medeeweb.com" },
            { "@type": "ListItem", position: 2, name: "แพ็กเกจ", item: "https://medeeweb.com/packages" },
          ],
        }),
      },
    ],
  }),
  component: PackagesPage,
});

type Pkg = {
  id: string;
  name: string;
  price: number;
  badge: string | null;
  recommended: boolean;
  features: string[];
  delivery_days: number | null;
};

const compareRows = [
  ["จำนวนหน้า", "1", "5", "10"],
  ["Mobile Responsive", true, true, true],
  ["โดเมน + Hosting 1 ปี", true, true, true],
  ["SEO พื้นฐาน", false, true, true],
  ["SEO ครบเครื่อง", false, false, true],
  ["ระบบบล็อก", false, false, true],
  ["Google Analytics", false, false, true],
  ["ระบบฟอร์มขั้นสูง", false, false, true],
  ["รองรับลูกค้า 30 วัน", true, true, true],
] as const;

function PackagesPage() {
  const [packages, setPackages] = useState<Pkg[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("packages")
      .select("id, name, price, badge, recommended, features, delivery_days")
      .eq("visible", true)
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        setPackages(
          (data ?? []).map((p) => ({
            ...p,
            features: Array.isArray(p.features) ? (p.features as string[]) : [],
          })),
        );
        setLoading(false);
      });
  }, []);

  return (
    <PageShell>
      <PageHero
        eyebrow="แพ็กเกจราคา"
        title="เลือกแพ็กเกจที่ใช่สำหรับธุรกิจของคุณ"
        subtitle="ราคาคุ้มค่า โปร่งใส ไม่มีค่าซ่อนเร้น พร้อมโดเมน + โฮสติ้งฟรี 1 ปีทุกแพ็กเกจ"
      />
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          {loading ? (
            <div className="grid gap-6 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 animate-pulse rounded-2xl bg-secondary/50" />
              ))}
            </div>
          ) : packages.length === 0 ? (
            <p className="text-center text-muted-foreground">ยังไม่มีแพ็กเกจ</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              {packages.map((p) => (
                <div
                  key={p.id}
                  className={`relative flex flex-col rounded-2xl bg-white p-8 shadow-[0_8px_30px_rgba(0,168,157,0.12)] transition-transform hover:-translate-y-1 ${
                    p.recommended ? "border-2 border-orange ring-4 ring-orange/10" : "border border-border"
                  }`}
                >
                  {p.badge && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-orange px-4 py-1 text-xs font-bold text-white shadow-lg">
                      {p.badge}
                    </span>
                  )}
                  <h3 className="text-center text-xl font-bold text-primary">{p.name}</h3>
                  <div className="mt-3 text-center">
                    <span className="text-4xl font-bold text-primary">{p.price.toLocaleString()}</span>
                    <span className="ml-1 text-sm text-muted-foreground">บาท</span>
                  </div>
                  {p.delivery_days && (
                    <div className="mt-2 inline-flex w-fit mx-auto items-center gap-1 rounded-full bg-orange/10 px-3 py-1 text-xs font-semibold text-orange">
                      <Flame className="h-3 w-3" /> ส่งมอบภายใน {p.delivery_days} วัน
                    </div>
                  )}
                  <ul className="mt-6 flex-1 space-y-3">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/quote" className="mt-8">
                    <Button className="w-full rounded-full bg-orange text-orange-foreground hover:bg-orange/90 font-semibold">
                      ขอใบเสนอราคา
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          )}

          {/* Comparison */}
          <div className="mt-16">
            <h2 className="section-heading">ตารางเปรียบเทียบ<span className="heading-accent">แพ็กเกจ</span></h2>
            <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-white shadow-sm">
              <table className="w-full text-sm">
                <thead className="bg-soft-teal">
                  <tr>
                    <th className="px-4 py-4 text-left font-semibold text-primary">ฟีเจอร์</th>
                    <th className="px-4 py-4 text-center font-semibold text-primary">Starter</th>
                    <th className="px-4 py-4 text-center font-semibold text-primary">Business</th>
                    <th className="px-4 py-4 text-center font-semibold text-primary">Pro</th>
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row, i) => (
                    <tr key={i} className="border-t border-border">
                      <td className="px-4 py-3 font-medium">{row[0]}</td>
                      {row.slice(1).map((v, j) => (
                        <td key={j} className="px-4 py-3 text-center">
                          {typeof v === "boolean" ? (
                            v ? <Check className="mx-auto h-5 w-5 text-accent" /> : <X className="mx-auto h-5 w-5 text-muted-foreground/40" />
                          ) : (
                            v
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-16">
            <h2 className="section-heading">คำถามที่พบบ่อย<span className="heading-accent">เกี่ยวกับแพ็กเกจ</span></h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {[
                { q: "ราคารวมโดเมน + โฮสติ้งหรือไม่?", a: "รวมแล้ว — ทุกแพ็กเกจแถมโดเมน .com + โฮสติ้งฟรี 1 ปี ไม่มีค่าใช้จ่ายเพิ่ม" },
                { q: "ผ่อนชำระได้ไหม?", a: "ผ่อน 2 งวด 50/50 — มัดจำ 50% เริ่มงาน, อีก 50% ก่อนส่งมอบ" },
                { q: "แก้ไขฟรีกี่รอบ?", a: "ฟรี 3 รอบ (batch แก้รวมต่อรอบ) หลังจากนั้นคิดค่าแก้ไขตามขอบเขตงาน" },
                { q: "ใช้เวลาทำกี่วัน?", a: "Starter 3 วันทำการ, Business 7 วันทำการ, Pro 14 วันทำการ — นับจากวันที่ลูกค้าส่งข้อมูลครบ" },
                { q: "ปีถัดไปต้องจ่ายเท่าไหร่?", a: "ค่าต่อโดเมน + โฮสติ้ง ประมาณ 2,000 บาท/ปี" },
                { q: "เปลี่ยนแพ็กเกจระหว่างทางได้ไหม?", a: "ได้ — อัปเกรดได้ตลอด จ่ายเฉพาะส่วนต่าง" },
              ].map((f) => (
                <div key={f.q} className="rounded-xl border border-border bg-white p-5 shadow-sm">
                  <p className="font-semibold text-primary">{f.q}</p>
                  <p className="mt-2 text-sm text-muted-foreground" style={{ lineHeight: 1.6 }}>{f.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 rounded-3xl bg-soft-teal p-8 text-center md:p-12">
            <h2 className="text-2xl font-bold text-primary md:text-3xl">พร้อมเริ่มเว็บไซต์ของคุณแล้วใช่ไหม?</h2>
            <p className="mt-3 text-foreground/70">เลือกแพ็กเกจ สั่งทำได้เลย ทีมงานเริ่มงานทันทีหลังยืนยัน</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link to="/order">
                <Button className="rounded-full bg-orange px-7 text-orange-foreground hover:bg-orange/90 font-semibold">สั่งทำได้เลย</Button>
              </Link>
              <Link to="/quote">
                <Button variant="outline" className="rounded-full px-7 border-primary text-primary hover:bg-primary hover:text-white">ขอใบเสนอราคา</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
