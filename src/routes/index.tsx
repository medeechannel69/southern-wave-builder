import { createFileRoute } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import heroIllustration from "@/assets/hero-illustration.jpg";
import waveDivider from "@/assets/wave-divider.jpg";
import svcBusiness from "@/assets/service-business.jpg";
import svcHotel from "@/assets/service-hotel.jpg";
import svcRestaurant from "@/assets/service-restaurant.jpg";
import svcCorporate from "@/assets/service-corporate.jpg";
import svcRealEstate from "@/assets/service-realestate.jpg";
import svcContractor from "@/assets/service-contractor.jpg";
import {
  ArrowRight, Check, Wallet, Rocket, Smartphone, TrendingUp,
  Sparkles, Code2, HeartHandshake,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

const services = [
  { img: svcBusiness, title: "เว็บไซต์ธุรกิจ", desc: "เว็บแนะนำธุรกิจ บริษัท ร้านค้า ออกแบบสวย ใช้งานง่าย" },
  { img: svcHotel, title: "เว็บไซต์โรงแรม", desc: "ระบบจองห้องพัก แสดงห้อง โปรโมชั่น พร้อมระบบหลังบ้าน" },
  { img: svcRestaurant, title: "เว็บไซต์ร้านอาหาร", desc: "เมนูอาหาร จองโต๊ะ สั่งออนไลน์ ครบจบในเว็บเดียว" },
  { img: svcCorporate, title: "เว็บไซต์องค์กร", desc: "เว็บองค์กรขนาดใหญ่ ระบบหลายภาษา ดูเป็นมืออาชีพ" },
  { img: svcRealEstate, title: "เว็บไซต์อสังหา", desc: "ค้นหาที่อยู่อาศัย คอนโด บ้าน ระบบฟิลเตอร์อัจฉริยะ" },
  { img: svcContractor, title: "เว็บไซต์รับเหมา", desc: "พอร์ตผลงาน บริการ ใบเสนอราคา ติดต่อลูกค้า" },
];

const reasons = [
  { icon: Wallet, title: "ราคาเริ่มต้น", desc: "เริ่มเพียง 5,000 บาท", color: "text-orange", bg: "bg-orange/15" },
  { icon: Rocket, title: "ทำเว็บไว", desc: "ส่งมอบเร็ว ภายในเวลา", color: "text-accent", bg: "bg-accent/15" },
  { icon: Smartphone, title: "รองรับมือถือ", desc: "ทุกหน้าจอ ทุกอุปกรณ์", color: "text-primary", bg: "bg-primary/15" },
  { icon: TrendingUp, title: "พร้อมระบบ SEO", desc: "ติดอันดับ Google", color: "text-orange", bg: "bg-orange/15" },
];

function Index() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* NAV */}
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-24 max-w-7xl items-center justify-between gap-4 px-4 md:px-8">
          <Logo className="h-16 md:h-20 w-auto" />
          <nav className="hidden items-center gap-6 lg:gap-8 md:flex">
            <a href="#services" className="text-base font-medium text-primary transition-colors hover:text-accent">บริการ</a>
            <a href="#why" className="text-base font-medium text-primary transition-colors hover:text-accent">ทำไมเรา</a>
            <a href="#pricing" className="text-base font-medium text-primary transition-colors hover:text-accent">ราคา</a>
            <a href="#contact" className="text-base font-medium text-primary transition-colors hover:text-accent">ติดต่อ</a>
          </nav>
          <Button className="bg-orange text-orange-foreground hover:bg-orange/90 shadow-[var(--shadow-warm)] rounded-full px-6 text-sm md:text-base font-semibold">
            เริ่มต้นเลย
          </Button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Sky gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #BEE7F5 0%, #7FCBE8 50%, #4FB3DB 100%)",
          }}
          aria-hidden="true"
        />
        {/* Illustration on right */}
        <img
          src={heroIllustration}
          alt=""
          width={1920}
          height={1080}
          className="absolute right-0 top-0 h-full w-full object-cover object-right md:w-[65%]"
          aria-hidden="true"
        />
        {/* White fade on left for text legibility on mobile */}
        <div
          className="pointer-events-none absolute inset-0 md:hidden"
          style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.2) 60%, transparent 100%)" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-16 md:grid-cols-2 md:px-8 md:py-28 lg:py-36">
          <div className="relative z-10 max-w-xl">
            <h1 className="font-display font-bold leading-[1.15] text-primary">
              สร้างเว็บไซต์ธุรกิจ
              <br />
              เริ่มต้นเพียง{" "}
              <span style={{ color: "#F7941D" }}>5,000</span> บาท
            </h1>
            <p className="mt-5 text-base md:text-lg text-primary/90 font-medium" style={{ lineHeight: 1.7 }}>
              MedeeWeb เว็บไซต์ทำเว็บอันดับ 1 ของคนใต้
              <br />
              ออกแบบสวย รวดเร็ว รองรับทุกอุปกรณ์
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="h-14 rounded-full bg-orange text-orange-foreground hover:bg-orange/90 shadow-[var(--shadow-warm)] px-8 text-base font-semibold">
                ดูแพ็คเกจ <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="h-14 rounded-full border-2 border-white bg-white/90 text-primary hover:bg-white px-8 text-base font-semibold">
                ดูตัวอย่างเว็บไซต์
              </Button>
            </div>
          </div>
          {/* Spacer for desktop where illustration shows */}
          <div className="hidden md:block min-h-[400px]" />
        </div>
        {/* Bottom wave divider */}
        <div className="relative -mt-px">
          <img src={waveDivider} alt="" width={1920} height={200} className="block w-full h-auto" loading="lazy" aria-hidden="true" />
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-primary">
              บริการสร้างเว็บไซต์<span style={{ color: "#F7941D" }}>สำหรับทุกธุรกิจ</span>
            </h2>
            <p className="mt-4 text-base md:text-lg text-foreground/80 inline-flex items-center gap-2 flex-wrap justify-center">
              <Sparkles className="h-5 w-5 text-accent" />
              MedeeWeb เว็บไซต์ทำเว็บอันดับ 1 ของคนใต้
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Card key={s.title} className="group overflow-hidden rounded-2xl border-border/60 bg-white p-0 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
                <div className="aspect-[4/3] overflow-hidden bg-secondary/40">
                  <img src={s.img} alt={s.title} width={1024} height={768} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <h3 className="text-primary">{s.title}</h3>
                  <p className="mt-2 text-base text-foreground/80">{s.desc}</p>
                  <Button className="mt-5 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-6 font-medium">
                    ดูรายละเอียด <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section id="why" className="relative overflow-hidden py-16 md:py-24" style={{ background: "linear-gradient(180deg, #E8F4F8 0%, #C5E8EE 100%)" }}>
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center">
            <h2 className="text-primary">
              ทำไมต้อง <span style={{ color: "#F7941D" }}>MedeeWeb</span>
            </h2>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r) => (
              <div key={r.title} className="text-center">
                <div className={`mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-2xl ${r.bg} shadow-sm`}>
                  <r.icon className={`h-10 w-10 ${r.color}`} />
                </div>
                <h3 className="text-primary">{r.title}</h3>
                <p className="mt-2 text-base text-foreground/80">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { num: "100+", label: "โปรเจ็กต์" },
              { num: "5★", label: "รีวิวจากลูกค้า" },
              { num: "24/7", label: "บริการหลังการขาย" },
              { num: "10+", label: "ปีประสบการณ์" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-4xl md:text-5xl font-bold text-primary">{s.num}</div>
                <div className="mt-1 text-sm md:text-base text-foreground/75">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-16 md:py-20" style={{ background: "linear-gradient(135deg, #1B4F9B 0%, #00A89D 100%)" }}>
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 px-4 text-center md:flex-row md:px-8 md:text-left">
          <div>
            <h3 className="font-display font-bold text-white" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}>
              พร้อมเริ่มโปรเจ็กต์ของคุณหรือยัง?
            </h3>
            <p className="mt-2 text-base md:text-lg text-white/95">
              ปรึกษาฟรี ไม่มีค่าใช้จ่าย ทีมงานคนใต้พร้อมดูแลคุณ
            </p>
          </div>
          <Button size="lg" className="h-14 shrink-0 rounded-full bg-orange text-orange-foreground hover:bg-orange/90 shadow-[var(--shadow-warm)] px-8 text-base font-semibold">
            ติดต่อเราเลย <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="bg-primary text-white">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-16 md:py-20">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="inline-block logo-pad">
                <Logo className="h-14 w-auto" />
              </div>
              <p className="mt-5 max-w-md text-base text-white/90" style={{ lineHeight: 1.7 }}>
                เว็บไซต์ทำเว็บอันดับ 1 ของคนใต้ — สร้างสรรค์ทุกโปรเจ็กต์ด้วยใจรักและความเข้าใจในวัฒนธรรมท้องถิ่น
              </p>
              <div className="mt-5 flex items-center gap-2 text-sm text-white/80">
                <HeartHandshake className="h-4 w-4" />
                Medee with love from Southern Thailand
              </div>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-white inline-flex items-center gap-2">
                <Code2 className="h-4 w-4" /> บริการ
              </h4>
              <ul className="space-y-2 text-base text-white/90">
                <li>เว็บไซต์ธุรกิจ</li>
                <li>เว็บไซต์โรงแรม</li>
                <li>เว็บไซต์ร้านอาหาร</li>
                <li>SEO &amp; การตลาด</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-white">ติดต่อ</h4>
              <ul className="space-y-2 text-base text-white/90 break-words">
                <li>📧 suthee@medeeweb.com</li>
                <li>📱 099-625-2499</li>
                <li>🌐 www.medeeweb.com</li>
                <li>📍 กระบี่ ประเทศไทย</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-white/20 pt-8 text-center text-sm text-white/80">
            © {new Date().getFullYear()} MedeeWeb. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
