import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import heroKrabi from "@/assets/hero-krabi-waves.jpg";
import svcBusiness from "@/assets/service-business.jpg";
import svcHotel from "@/assets/service-hotel.jpg";
import svcRestaurant from "@/assets/service-restaurant.jpg";
import svcCorporate from "@/assets/service-corporate.jpg";
import svcRealEstate from "@/assets/service-realestate.jpg";
import mkRestaurant from "@/assets/mockup-restaurant.jpg";
import mkHotel from "@/assets/mockup-hotel.jpg";
import mkCompany from "@/assets/mockup-company.jpg";
import mkContractor from "@/assets/mockup-contractor.jpg";
import mkRealEstate from "@/assets/mockup-realestate.jpg";
import {
  ArrowRight, Wallet, Send, Smartphone, TrendingUp,
  Sparkles, Monitor, Tablet, Phone as PhoneIcon, Code2, HeartHandshake,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

const services = [
  { img: svcBusiness, title: "เว็บไซต์ธุรกิจ", desc: "เว็บแนะนำธุรกิจ ร้านค้า ออกแบบสวย ใช้งานง่าย" },
  { img: svcCorporate, title: "เว็บไซต์บริษัท", desc: "เว็บองค์กรขนาดใหญ่ ดูเป็นมืออาชีพ น่าเชื่อถือ" },
  { img: svcRestaurant, title: "เว็บไซต์ร้านอาหาร", desc: "เมนู จองโต๊ะ สั่งออนไลน์ ครบจบในเว็บเดียว" },
  { img: svcHotel, title: "เว็บไซต์โรงแรม", desc: "ระบบจองห้องพัก แสดงห้อง พร้อมระบบหลังบ้าน" },
  { img: svcRealEstate, title: "เว็บไซต์อสังหา", desc: "ค้นหาบ้าน คอนโด ระบบฟิลเตอร์อัจฉริยะ" },
];

const reasons = [
  { icon: Wallet, title: "ราคาเริ่มต้น 5,000 บาท", desc: "คุ้มค่า ราคามิตรภาพ ไม่มีค่าซ่อนเร้น", color: "text-orange", bg: "bg-orange/15" },
  { icon: Send, title: "ทำงานเร็ว ฟรีโดเมน", desc: "ส่งมอบเร็ว พร้อมโดเมน .com ฟรี 1 ปี", color: "text-accent", bg: "bg-accent/15" },
  { icon: Smartphone, title: "รองรับมือถือทุกเครื่อง", desc: "Responsive Design ใช้งานทุกอุปกรณ์", color: "text-primary", bg: "bg-primary/15" },
  { icon: TrendingUp, title: "พร้อมระบบ SEO", desc: "ติดอันดับ Google ค้นหาเจอแน่นอน", color: "text-orange", bg: "bg-orange/15" },
];

const portfolioCategories = ["Restaurant", "Hotel", "Company", "Contractor", "Real Estate"] as const;
type Category = typeof portfolioCategories[number];

const portfolioItems: Record<Category, { img: string; name: string }[]> = {
  Restaurant: [
    { img: mkRestaurant, name: "Thai Bistro" },
    { img: mkRestaurant, name: "Spicy Kitchen" },
    { img: mkRestaurant, name: "Ocean Cafe" },
    { img: mkRestaurant, name: "Green Garden" },
  ],
  Hotel: [
    { img: mkHotel, name: "Krabi Resort" },
    { img: mkHotel, name: "Ocean View Hotel" },
    { img: mkHotel, name: "Beach Villa" },
    { img: mkHotel, name: "Sunset Inn" },
  ],
  Company: [
    { img: mkCompany, name: "MedeeCorp" },
    { img: mkCompany, name: "Tech Solutions" },
    { img: mkCompany, name: "Andaman Group" },
    { img: mkCompany, name: "South Trade" },
  ],
  Contractor: [
    { img: mkContractor, name: "Build Pro" },
    { img: mkContractor, name: "Krabi Construct" },
    { img: mkContractor, name: "Master Build" },
    { img: mkContractor, name: "Home Crafters" },
  ],
  "Real Estate": [
    { img: mkRealEstate, name: "Andaman Homes" },
    { img: mkRealEstate, name: "Phuket Villas" },
    { img: mkRealEstate, name: "Coast Property" },
    { img: mkRealEstate, name: "Dream House" },
  ],
};

function Index() {
  const [activeCat, setActiveCat] = useState<Category>("Restaurant");

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* NAV */}
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-24 max-w-7xl items-center justify-between gap-4 px-4 md:px-8">
          <Logo className="h-16 md:h-20 w-auto" />
          <nav className="hidden items-center gap-6 lg:gap-8 md:flex">
            <a href="#services" className="text-base font-medium text-primary transition-colors hover:text-accent">บริการ</a>
            <a href="#why" className="text-base font-medium text-primary transition-colors hover:text-accent">ทำไมเรา</a>
            <a href="#portfolio" className="text-base font-medium text-primary transition-colors hover:text-accent">ผลงาน</a>
            <a href="#contact" className="text-base font-medium text-primary transition-colors hover:text-accent">ติดต่อ</a>
          </nav>
          <Button className="bg-orange text-orange-foreground hover:bg-orange/90 shadow-[var(--shadow-warm)] rounded-full px-6 text-sm md:text-base font-semibold">
            เริ่มต้นเลย
          </Button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#F4FAFC]">
        {/* Background illustration */}
        <div className="absolute inset-0">
          <img
            src={heroKrabi}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
          />
          {/* Soft readability veil */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(100deg, rgba(244,250,252,0.92) 0%, rgba(244,250,252,0.78) 45%, rgba(244,250,252,0.35) 75%, rgba(244,250,252,0.15) 100%)",
            }}
          />
        </div>

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 py-20 md:grid-cols-12 md:px-8 md:py-32">
          <div className="relative z-10 max-w-xl text-center md:col-span-7 md:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/80 px-4 py-1.5 text-xs md:text-sm font-semibold text-primary backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-orange" />
              เว็บไซต์ทำเงินอันดับ 1 ของคนใต้
            </span>
            <h1 className="mt-5 font-display font-bold leading-[1.15] text-primary">
              สร้างเว็บไซต์ธุรกิจ
              <br />
              เริ่มต้นเพียง{" "}
              <span className="text-orange">5,000</span> บาท
            </h1>
            <p className="mt-5 text-base md:text-lg text-foreground/80 font-medium" style={{ lineHeight: 1.7 }}>
              MedeeWeb ออกแบบสวยงาม รองรับมือถือทุกเครื่อง
              <br className="hidden sm:block" />
              พร้อมระบบหลังบ้านใช้งานจริง — แรงบันดาลใจจากท้องทะเลกระบี่
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
              <Button size="lg" className="h-14 rounded-full bg-orange text-orange-foreground hover:bg-orange/90 shadow-[var(--shadow-warm)] px-8 text-base font-semibold">
                ดูแพ็กเกจ <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="h-14 rounded-full border-2 border-primary bg-white/90 text-primary hover:bg-white px-8 text-base font-semibold backdrop-blur">
                ดูเว็บตัวอย่าง
              </Button>
            </div>
          </div>
          <div className="hidden md:block md:col-span-5" aria-hidden="true" />
        </div>

        {/* Wave divider into white */}
        <svg className="relative block w-full h-auto" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true">
          <path fill="#ffffff" d="M0,50 C240,100 480,10 720,40 C960,70 1200,100 1440,55 L1440,100 L0,100 Z" />
        </svg>
      </section>

      {/* SERVICES */}
      <section id="services" className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-primary">
              บริการสร้างเว็บไซต์<span style={{ color: "#F7941D" }}>สำหรับทุกธุรกิจ</span>
            </h2>
            <p className="mt-4 text-base md:text-lg text-foreground/80 inline-flex items-center gap-2 flex-wrap justify-center">
              <Sparkles className="h-5 w-5 text-accent" />
              MedeeWeb เว็บไซต์ทำเงินอันดับ 1 ของคนใต้
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {services.map((s) => (
              <Card key={s.title} className="group overflow-hidden rounded-2xl border-border/60 bg-white p-0 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
                <div className="aspect-[4/3] overflow-hidden bg-secondary/40">
                  <img src={s.img} alt={s.title} width={1024} height={768} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-primary text-lg">{s.title}</h3>
                  <p className="mt-2 text-sm text-foreground/75 min-h-[2.5rem]">{s.desc}</p>
                  <Button size="sm" className="mt-4 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-5 font-medium">
                    ดูรายละเอียด <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
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
                <h3 className="text-primary text-lg">{r.title}</h3>
                <p className="mt-2 text-base text-foreground/80">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Bottom wave divider */}
        <svg className="block w-full h-auto mt-12" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
          <path fill="#ffffff" d="M0,40 C240,100 480,0 720,50 C960,100 1200,30 1440,80 L1440,120 L0,120 Z" />
        </svg>
      </section>

      {/* PORTFOLIO / PACKAGES */}
      <section id="portfolio" className="relative overflow-hidden bg-white pt-16 md:pt-24 pb-0">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center">
            <h2 className="text-primary">
              แพ็กเกจ<span style={{ color: "#F7941D" }}>ทำเว็บไซต์</span>
            </h2>
            <p className="mt-4 text-base md:text-lg text-foreground/80">
              เลือกประเภทธุรกิจของคุณ ดูตัวอย่างเว็บที่เราทำมา
            </p>
          </div>

          {/* Tabs */}
          <div className="mt-10 flex flex-wrap justify-center gap-2 md:gap-3">
            {portfolioCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`rounded-full px-5 py-2.5 text-sm md:text-base font-semibold transition-all ${
                  activeCat === cat
                    ? "bg-primary text-white shadow-[var(--shadow-elegant)]"
                    : "bg-secondary text-primary hover:bg-secondary/70"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery */}
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {portfolioItems[activeCat].map((item, i) => (
              <Card key={i} className="group overflow-hidden rounded-xl border-border/60 bg-white p-0 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
                <div className="aspect-[4/3] overflow-hidden bg-secondary/30">
                  <img src={item.img} alt={item.name} width={1280} height={800} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="px-4 py-3 text-center">
                  <p className="text-sm font-semibold text-primary truncate">{item.name}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Demo Switcher Bar */}
          <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center justify-between gap-4 rounded-full border border-border/60 bg-white px-6 py-3 shadow-[var(--shadow-elegant)] sm:flex-row">
            <div className="flex items-center gap-3 text-primary">
              <span className="text-sm md:text-base font-semibold">Demo Switcher</span>
              <div className="flex items-center gap-1">
                <button className="rounded-full p-2 text-primary hover:bg-secondary transition-colors" aria-label="Desktop"><Monitor className="h-4 w-4" /></button>
                <button className="rounded-full p-2 text-primary hover:bg-secondary transition-colors" aria-label="Tablet"><Tablet className="h-4 w-4" /></button>
                <button className="rounded-full p-2 text-primary hover:bg-secondary transition-colors" aria-label="Mobile"><PhoneIcon className="h-4 w-4" /></button>
              </div>
            </div>
            <Button className="rounded-full bg-orange text-orange-foreground hover:bg-orange/90 shadow-[var(--shadow-warm)] px-6 font-semibold">
              ดูหน้าเว็บทั้งหมด <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Wave transition into footer */}
        <div className="mt-16 -mb-px">
          <svg className="block w-full h-auto" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
            <path fill="#1B4F9B" d="M0,80 C240,20 480,120 720,60 C960,0 1200,80 1440,40 L1440,120 L0,120 Z" />
          </svg>
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
