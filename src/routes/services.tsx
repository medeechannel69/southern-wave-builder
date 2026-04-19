import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Store,
  Building2,
  UtensilsCrossed,
  Hotel,
  Home,
  ShieldCheck,
  Stethoscope,
  Check,
  MessageSquare,
  PenTool,
  Code2,
  Bug,
  Rocket,
  HeartHandshake,
} from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "บริการรับทำเว็บไซต์ — MedeeWeb" },
      { name: "description", content: "บริการทำเว็บไซต์ครบวงจรสำหรับทุกธุรกิจ ร้านอาหาร โรงแรม บริษัท อสังหาฯ ตัวแทนประกัน หน่วยงานราชการ" },
      { property: "og:title", content: "บริการรับทำเว็บไซต์ — MedeeWeb" },
      { property: "og:description", content: "บริการทำเว็บไซต์ครบวงจรสำหรับทุกธุรกิจ" },
      { property: "og:image", content: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80&auto=format&fit=crop" },
      { name: "twitter:image", content: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80&auto=format&fit=crop" },
    ],
    links: [{ rel: "canonical", href: "https://medeeweb.com/services" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "หน้าแรก", item: "https://medeeweb.com" },
            { "@type": "ListItem", position: 2, name: "บริการ", item: "https://medeeweb.com/services" },
          ],
        }),
      },
    ],
  }),
  component: ServicesPage,
});

type ServiceItem = {
  icon: typeof Store;
  title: string;
  desc: string;
  features: string[];
  priceFrom: number;
  demoSlug: string | null;
};

const services: ServiceItem[] = [
  {
    icon: Store,
    title: "เว็บไซต์ธุรกิจ / ร้านค้า",
    desc: "เว็บแนะนำธุรกิจ-ร้านค้า ออกแบบสวย โหลดไว ใช้งานง่ายทุกอุปกรณ์",
    features: ["1–5 หน้า ปรับแต่งได้", "Mobile Responsive 100%", "โดเมน .com + Hosting ฟรี 1 ปี", "ติดตั้ง LINE/Facebook CTA", "รองรับ Google Maps + ติดต่อ"],
    priceFrom: 5000,
    demoSlug: "company",
  },
  {
    icon: Building2,
    title: "เว็บไซต์บริษัท / องค์กร",
    desc: "เว็บองค์กรมืออาชีพ น่าเชื่อถือ พร้อม CMS แก้ไขเองได้",
    features: ["หน้าบริษัท + บริการ + ทีมงาน", "ระบบ CMS หลังบ้าน", "หน้า Career / รับสมัครงาน", "Google Analytics + Search Console", "SEO พื้นฐาน on-page"],
    priceFrom: 9000,
    demoSlug: "company",
  },
  {
    icon: UtensilsCrossed,
    title: "เว็บไซต์ร้านอาหาร / คาเฟ่",
    desc: "เมนูออนไลน์ จองโต๊ะ แสดงโปรโมชั่น พร้อม Gallery รูปอาหาร",
    features: ["ระบบเมนู + ฟิลเตอร์หมวดหมู่", "ฟอร์มจองโต๊ะออนไลน์", "Gallery + วิดีโอบรรยากาศร้าน", "Google Maps + เวลาเปิด-ปิด", "เชื่อม LINE OA สั่งอาหาร"],
    priceFrom: 7000,
    demoSlug: "restaurant",
  },
  {
    icon: Hotel,
    title: "เว็บไซต์โรงแรม / รีสอร์ท",
    desc: "ระบบจองห้องพัก แสดงห้อง สิ่งอำนวยความสะดวก พร้อมแกลเลอรี",
    features: ["หน้าห้องพัก พร้อมราคา", "ระบบส่งคำขอจอง", "Gallery รูปห้อง + พื้นที่ส่วนกลาง", "หน้าสิ่งอำนวยความสะดวก", "รองรับหลายภาษา (TH/EN)"],
    priceFrom: 12000,
    demoSlug: "hotel",
  },
  {
    icon: Home,
    title: "เว็บไซต์อสังหาริมทรัพย์",
    desc: "ลงประกาศบ้าน คอนโด ที่ดิน พร้อมระบบค้นหา-กรอง และแผนที่",
    features: ["ระบบลงประกาศไม่จำกัด", "ฟิลเตอร์ขาย/เช่า/ราคา/ทำเล", "หน้ารายละเอียดพร้อม Gallery", "Google Maps แสดงตำแหน่ง", "ฟอร์มสนใจส่งให้นายหน้าทันที"],
    priceFrom: 12000,
    demoSlug: "realestate",
  },
  {
    icon: ShieldCheck,
    title: "เว็บไซต์ตัวแทนประกัน",
    desc: "แสดงแผนประกัน คำนวณเบี้ย ระบบขอใบเสนอราคา และ LINE CTA",
    features: ["หน้าแผนประกันแยกตามประเภท", "เครื่องคำนวณเบี้ยเบื้องต้น", "ฟอร์มขอข้อมูลเพิ่มเติม", "เชื่อม LINE OA อัตโนมัติ", "หน้าเคลม + เอกสารดาวน์โหลด"],
    priceFrom: 9000,
    demoSlug: "insurance",
  },
  {
    icon: Stethoscope,
    title: "เว็บไซต์คลินิก / รพ.สต.",
    desc: "เว็บคลินิก-โรงพยาบาลส่งเสริมสุขภาพ ข่าวสาร นัดหมายออนไลน์",
    features: ["หน้าบริการ + บุคลากร", "ระบบนัดหมายออนไลน์", "ตารางออกหน่วย / คลินิก", "ข่าวสาร + ประกาศ", "ดีไซน์เป็นทางการ น่าเชื่อถือ"],
    priceFrom: 9000,
    demoSlug: "clinic",
  },
];

const processSteps = [
  { icon: MessageSquare, title: "1. ปรึกษาฟรี", desc: "คุยรายละเอียด เข้าใจธุรกิจของคุณ ประเมินขอบเขตงาน" },
  { icon: PenTool, title: "2. ออกแบบ Mockup", desc: "ส่งภาพต้นแบบเว็บให้ดูก่อนทำจริง แก้ไขจนพอใจ" },
  { icon: Code2, title: "3. พัฒนาเว็บไซต์", desc: "ทำเว็บตามที่ตกลง พร้อมระบบหลังบ้าน" },
  { icon: Bug, title: "4. ส่งทดสอบ", desc: "ลูกค้าเข้าทดสอบ แก้ไขฟรี 3 รอบ" },
  { icon: Rocket, title: "5. เปิดเว็บออนไลน์", desc: "อัปโหลดขึ้นโดเมน + โฮสติ้ง พร้อมใช้งาน" },
  { icon: HeartHandshake, title: "6. ดูแลหลังบ้าน", desc: "รับประกัน 30 วัน + ดูแลต่อรายปี" },
];

function ServicesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="บริการของเรา"
        title="บริการสร้างเว็บไซต์สำหรับทุกธุรกิจ"
        subtitle="เลือกบริการที่ใช่สำหรับธุรกิจของคุณ ราคาเริ่มต้น 5,000 บาท พร้อมโดเมน + โฮสติ้งฟรี 1 ปี"
      />

      {/* 7 service cards */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div
                key={s.title}
                className="flex flex-col rounded-2xl border border-border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]"
              >
                <div className="why-icon mb-4">
                  <s.icon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold text-primary">{s.title}</h3>
                <p className="mt-2 text-sm text-foreground/70" style={{ lineHeight: 1.6 }}>{s.desc}</p>

                <ul className="mt-4 flex-1 space-y-2">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span className="text-foreground/80">{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex items-baseline gap-1.5 border-t border-border pt-4">
                  <span className="text-xs text-muted-foreground">เริ่มต้น</span>
                  <span className="text-2xl font-bold text-orange">{s.priceFrom.toLocaleString()}</span>
                  <span className="text-sm text-muted-foreground">บาท</span>
                </div>

                <div className="mt-4 flex flex-col gap-2">
                  {s.demoSlug ? (
                    <Link to="/demo/$slug" params={{ slug: s.demoSlug }}>
                      <Button variant="outline" className="w-full rounded-full border-primary text-primary hover:bg-primary hover:text-white">
                        ดู Demo <ArrowRight className="ml-1.5 h-4 w-4" />
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/demo">
                      <Button variant="outline" className="w-full rounded-full border-primary text-primary hover:bg-primary hover:text-white">
                        ดูตัวอย่าง <ArrowRight className="ml-1.5 h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                  <Link to="/quote">
                    <Button className="w-full rounded-full bg-orange text-orange-foreground hover:bg-orange/90 font-semibold">
                      ขอใบเสนอราคา <ArrowRight className="ml-1.5 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process timeline */}
      <section className="bg-soft-teal py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <h2 className="section-heading">ขั้นตอน<span className="heading-accent">การทำงาน</span></h2>
          <p className="section-sub mx-auto max-w-2xl">ทำงานเป็นระบบ โปร่งใส ส่งมอบตรงเวลา ตั้งแต่ปรึกษาจนถึงดูแลหลังบ้าน</p>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((p) => (
              <div key={p.title} className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="why-icon mb-4">
                  <p.icon className="h-7 w-7" />
                </div>
                <h3 className="text-base font-bold text-primary">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground" style={{ lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center md:px-8">
          <h2 className="section-heading">พร้อมสร้างเว็บไซต์<span className="heading-accent">ของคุณแล้วหรือยัง?</span></h2>
          <p className="section-sub mx-auto max-w-2xl">ปรึกษาฟรี ไม่มีค่าใช้จ่าย — ทีมงานพร้อมให้คำแนะนำที่ตรงกับธุรกิจของคุณ</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/quote">
              <Button className="rounded-full bg-orange px-7 text-orange-foreground hover:bg-orange/90">
                ขอใบเสนอราคาฟรี <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/packages">
              <Button variant="outline" className="rounded-full px-7 border-primary text-primary hover:bg-primary hover:text-white">
                ดูแพ็กเกจราคา
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
