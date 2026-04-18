import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";
import { Card } from "@/components/ui/card";
import { Anchor, Compass, Languages, Zap, Heart, Target, Eye, Award, Handshake, Lightbulb, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "เกี่ยวกับ MedeeWeb — เว็บไซต์อันดับ 1 ของคนใต้" },
      { name: "description", content: "MedeeWeb ทีมงานคนใต้แท้ ทำเว็บไซต์ด้วยความเข้าใจในวัฒนธรรมและภาษา ครอบคลุม 14 จังหวัดภาคใต้" },
      { property: "og:title", content: "เกี่ยวกับ MedeeWeb" },
      { property: "og:description", content: "ทีมงานคนใต้แท้ — ครอบคลุม 14 จังหวัดภาคใต้" },
    ],
    links: [{ rel: "canonical", href: "https://medeeweb.com/about" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "หน้าแรก", item: "https://medeeweb.com" },
            { "@type": "ListItem", position: 2, name: "เกี่ยวกับเรา", item: "https://medeeweb.com/about" },
          ],
        }),
      },
    ],
  }),
  component: AboutPage,
});

const reasons = [
  { icon: Compass, title: "เชี่ยวชาญตลาดภาคใต้", desc: "ครอบคลุม 14 จังหวัดภาคใต้ เข้าใจลูกค้าและพฤติกรรมท้องถิ่น" },
  { icon: Award, title: "อันดับ 1 ด้านเว็บไซต์ในภาคใต้", desc: "มากกว่า 100+ โปรเจ็กต์ที่ส่งมอบสำเร็จ ลูกค้าพอใจทุกราย" },
  { icon: Languages, title: "สื่อสารภาษาใต้", desc: "ไม่มีกำแพงภาษา คุยง่าย เข้าใจไว แก้ปัญหาได้ทันที" },
  { icon: Zap, title: "ดูแลรวดเร็ว", desc: "ไม่ต้องรอ Agency กรุงเทพ ทีมงานพร้อมช่วยเหลือทันที" },
  { icon: Heart, title: "ราคาคนใต้ คุณภาพระดับชาติ", desc: "ราคามิตรภาพ คุณภาพมาตรฐานระดับประเทศ คุ้มค่าทุกบาท" },
];

const provinces = [
  "กระบี่", "พังงา", "ภูเก็ต", "สุราษฎร์ธานี", "ชุมพร", "ระนอง", "นครศรีธรรมราช",
  "พัทลุง", "ตรัง", "สตูล", "สงขลา", "ปัตตานี", "ยะลา", "นราธิวาส",
];

const process = [
  { step: 1, title: "ปรึกษาฟรี", desc: "คุยรายละเอียด เข้าใจธุรกิจของคุณ" },
  { step: 2, title: "ออกแบบ Mockup", desc: "ส่งภาพต้นแบบเว็บให้ดูก่อนทำจริง" },
  { step: 3, title: "พัฒนาเว็บไซต์", desc: "ทำเว็บตามที่ตกลง พร้อมระบบหลังบ้าน" },
  { step: 4, title: "ส่งทดสอบ", desc: "ลูกค้าเข้าทดสอบ แก้ไขฟรี 3 รอบ" },
  { step: 5, title: "เปิดเว็บออนไลน์", desc: "อัปโหลดขึ้นโดเมน + โฮสติ้ง" },
  { step: 6, title: "ดูแลหลังบ้าน", desc: "รับประกันการใช้งาน 30 วัน + ดูแลต่อรายปี" },
];

const values = [
  { icon: Handshake, title: "ซื่อสัตย์", desc: "ราคาโปร่งใส ไม่มีค่าซ่อนเร้น" },
  { icon: Lightbulb, title: "สร้างสรรค์", desc: "ออกแบบไม่ซ้ำใคร เหมาะกับธุรกิจ" },
  { icon: ShieldCheck, title: "เชื่อถือได้", desc: "ส่งมอบตรงเวลา รับประกันคุณภาพ" },
  { icon: Heart, title: "ใส่ใจ", desc: "ดูแลลูกค้าเหมือนคนในครอบครัว" },
];

function AboutPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="เกี่ยวกับเรา"
        title="เกี่ยวกับ MedeeWeb"
        subtitle="ทีมงานคนใต้แท้ที่หลงรักการสร้างเว็บไซต์ ด้วยใจรักในวัฒนธรรมท้องถิ่นและความเข้าใจในธุรกิจของคนใต้"
      />

      {/* Story */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <h2 className="section-heading">เรื่องราว<span className="heading-accent">ของเรา</span></h2>
          <p className="mt-6 text-base md:text-lg text-foreground/80" style={{ lineHeight: 1.8 }}>
            MedeeWeb ก่อตั้งขึ้นด้วยความตั้งใจที่จะนำเทคโนโลยีดิจิทัลที่ทันสมัยมาสู่ธุรกิจในภาคใต้
            เราเชื่อว่าทุกธุรกิจ ไม่ว่าเล็กหรือใหญ่ ก็ควรมีเว็บไซต์มืออาชีพในราคาที่จับต้องได้
            ตลอดเส้นทางที่ผ่านมา เราได้ส่งมอบเว็บไซต์มากกว่า 100+ โปรเจ็กต์ ให้กับลูกค้าทั่วภาคใต้
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-soft-teal py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="rounded-2xl border-border bg-white p-8 shadow-sm">
              <Target className="h-10 w-10 text-accent" />
              <h3 className="mt-4 text-2xl font-bold text-primary">พันธกิจ (Mission)</h3>
              <p className="mt-3 text-foreground/80" style={{ lineHeight: 1.7 }}>
                ส่งมอบเว็บไซต์คุณภาพในราคาที่เป็นธรรม ช่วยให้ธุรกิจในภาคใต้เติบโตในยุคดิจิทัล
              </p>
            </Card>
            <Card className="rounded-2xl border-border bg-white p-8 shadow-sm">
              <Eye className="h-10 w-10 text-accent" />
              <h3 className="mt-4 text-2xl font-bold text-primary">วิสัยทัศน์ (Vision)</h3>
              <p className="mt-3 text-foreground/80" style={{ lineHeight: 1.7 }}>
                เป็นผู้นำด้านการพัฒนาเว็บไซต์อันดับ 1 ของภาคใต้ ที่คนใต้ไว้วางใจที่สุด
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <h2 className="section-heading">เราคือเว็บไซต์<span className="heading-accent">อันดับ 1 ของคนใต้</span></h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {reasons.map((r) => (
              <div key={r.title} className="text-center">
                <div className="why-icon mx-auto mb-4"><r.icon className="h-9 w-9" /></div>
                <h3 className="text-base font-semibold text-primary">{r.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Provinces */}
      <section className="bg-soft-teal py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-8 text-center">
          <h2 className="section-heading">ครอบคลุม<span className="heading-accent">14 จังหวัดภาคใต้</span></h2>
          <div className="mt-8 flex flex-wrap justify-center gap-2 md:gap-3">
            {provinces.map((p) => (
              <span key={p} className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-primary shadow-sm">
                <Anchor className="h-3.5 w-3.5 text-accent" /> {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 md:px-8">
          <h2 className="section-heading">ขั้นตอน<span className="heading-accent">การทำงาน</span></h2>
          <div className="mt-12 space-y-6">
            {process.map((p) => (
              <div key={p.step} className="flex items-start gap-5 rounded-xl bg-soft-teal p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange text-lg font-bold text-white">
                  {p.step}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary">{p.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-soft-teal py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <h2 className="section-heading">คุณค่า<span className="heading-accent">ที่เรายึดถือ</span></h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <Card key={v.title} className="rounded-2xl border-border bg-white p-6 text-center shadow-sm">
                <div className="why-icon mx-auto mb-4"><v.icon className="h-8 w-8" /></div>
                <h3 className="text-base font-semibold text-primary">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
