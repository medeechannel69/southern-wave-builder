import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageShell } from "@/components/PageShell";
import { FAQChatWidget } from "@/components/FAQChatWidget";
import heroKrabi from "@/assets/hero-krabi-waves.webp";
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
  ArrowRight, Wallet, Send, Smartphone, TrendingUp, Bot,
  Sparkles, Monitor, Tablet, Phone as PhoneIcon,
} from "lucide-react";

type DeviceView = "desktop" | "tablet" | "mobile";
const deviceWidths: Record<DeviceView, string> = {
  desktop: "100%",
  tablet: "640px",
  mobile: "320px",
};

export const Route = createFileRoute("/")({
  head: () => ({
    links: [{ rel: "canonical", href: "https://medeeweb.com/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "MedeeWeb",
          description: "รับทำเว็บไซต์และ Web Application สำหรับธุรกิจในภาคใต้ 14 จังหวัด",
          url: "https://medeeweb.com",
          telephone: "099-625-2499",
          email: "suthee@medeeweb.com",
          address: {
            "@type": "PostalAddress",
            streetAddress: "355/70 หมู่ 6 ต.กระบี่น้อย อ.เมือง",
            addressLocality: "กระบี่",
            addressRegion: "กระบี่",
            postalCode: "81000",
            addressCountry: "TH",
          },
          geo: { "@type": "GeoCoordinates", latitude: 8.0863, longitude: 98.9063 },
          openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "09:00",
            closes: "18:00",
          },
          priceRange: "฿฿",
          areaServed: [
            "สงขลา", "นครศรีธรรมราช", "สุราษฎร์ธานี", "ภูเก็ต", "กระบี่",
            "ตรัง", "พัทลุง", "ชุมพร", "ระนอง", "สตูล", "ปัตตานี", "ยะลา", "นราธิวาส", "พังงา",
          ],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "แพ็กเกจทำเว็บไซต์",
            itemListElement: [
              { "@type": "Offer", name: "Starter Package", price: "5000", priceCurrency: "THB", description: "เว็บ 1 หน้า พร้อม domain + hosting 1 ปี" },
              { "@type": "Offer", name: "Business Package", price: "9000", priceCurrency: "THB", description: "เว็บ 5 หน้า พร้อม SEO พื้นฐาน" },
              { "@type": "Offer", name: "Pro Package", price: "15000", priceCurrency: "THB", description: "เว็บ 10 หน้า พร้อม Blog + SEO ครบ" },
            ],
          },
        }),
      },
    ],
  }),
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
  { icon: Wallet, title: "ราคาเริ่มต้น 5,000 บาท", desc: "คุ้มค่า ราคามิตรภาพ ไม่มีค่าซ่อนเร้น" },
  { icon: Send, title: "ทำงานเร็ว ฟรีโดเมน", desc: "ส่งมอบเร็ว พร้อมโดเมน .com ฟรี 1 ปี" },
  { icon: Smartphone, title: "รองรับมือถือทุกเครื่อง", desc: "Responsive Design ใช้งานทุกอุปกรณ์" },
  { icon: TrendingUp, title: "พร้อมระบบ SEO", desc: "ติดอันดับ Google ค้นหาเจอแน่นอน" },
  { icon: Bot, title: "พร้อมระบบ AEO", desc: "ติดหน้าแรกคำแนะนำของ AI เช่น ChatGPT, Gemini" },
];

const portfolioCategories = ["Restaurant", "Hotel", "Company", "Contractor", "Real Estate"] as const;
type Category = typeof portfolioCategories[number];

const portfolioItems: Record<Category, { img: string; name: string }[]> = {
  Restaurant: [
    {
      img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1280&q=80&auto=format&fit=crop",
      name: "ครัวไทยต้นตำรับ",
    },
    {
      img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1280&q=80&auto=format&fit=crop",
      name: "Green Leaf Cafe",
    },
    {
      img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1280&q=80&auto=format&fit=crop",
      name: "Andaman Seafood",
    },
    {
      img: mkRestaurant,
      name: "Spicy Kitchen",
    },
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
  const [device, setDevice] = useState<DeviceView>("desktop");
  const [stats, setStats] = useState({ projects: 120, years: 5, satisfaction: 98, clients: 100 });

  useEffect(() => {
    supabase
      .from("site_settings")
      .select("stats_projects, stats_years, stats_satisfaction, stats_clients")
      .eq("id", 1)
      .maybeSingle()
      .then(({ data }) => {
        if (!data) return;
        setStats({
          projects: data.stats_projects ?? 120,
          years: data.stats_years ?? 5,
          satisfaction: data.stats_satisfaction ?? 98,
          clients: data.stats_clients ?? 100,
        });
      });
  }, []);

  return (
    <PageShell>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#F4FAFC]">
        {/* Background illustration */}
        <div className="absolute inset-0">
          <img
            src={heroKrabi}
            alt=""
            aria-hidden="true"
            width={1920}
            height={1080}
            fetchPriority="high"
            loading="eager"
            decoding="async"
            sizes="100vw"
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
              <span className="whitespace-nowrap">เริ่มต้นเพียง <span className="text-orange">5,000</span> บาท</span>
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
      <section id="services" className="bg-soft-teal py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="section-heading">
              <span className="whitespace-nowrap">บริการสร้างเว็บไซต์<span className="heading-accent">สำหรับทุกธุรกิจ</span></span>
            </h2>
            <p className="section-sub inline-flex items-center gap-2 flex-wrap justify-center">
              <Sparkles className="h-4 w-4 text-accent" />
              MedeeWeb เว็บไซต์ทำเงินอันดับ 1 ของคนใต้
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {services.map((s) => (
              <div key={s.title} className="service-card group">
                <div className="aspect-[4/3] overflow-hidden bg-secondary/40">
                  <img src={s.img} alt={s.title} width={1024} height={768} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col p-5 text-center">
                  <h3 className="text-[16px] font-semibold" style={{ color: "#1B4F9B" }}>{s.title}</h3>
                  <p className="mt-2 text-[14px] flex-1" style={{ color: "#555" }}>{s.desc}</p>
                  <Button size="sm" className="mx-auto mt-4 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-5 font-medium">
                    ดูรายละเอียด <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Wave to white */}
        <svg className="block w-full h-auto mt-16 -mb-px" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
          <path fill="#ffffff" d="M0,40 C240,80 480,0 720,32 C960,64 1200,80 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </section>

      {/* WHY US */}
      <section id="why" className="why-section relative overflow-hidden bg-white" style={{ borderTop: "4px solid #00A89D", contentVisibility: "auto", containIntrinsicSize: "0 600px" }}>
        {/* Faint wave illustration backdrop */}
        <img
          src={heroKrabi}
          alt=""
          aria-hidden="true"
          width={1920}
          height={1080}
          loading="lazy"
          decoding="async"
          style={{ contentVisibility: "auto" }}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.07]"
        />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="why-heading">
              ทำไมต้อง <span className="heading-accent">MedeeWeb</span>
            </h2>
            <p className="mt-4 text-base md:text-lg text-[#555]" style={{ lineHeight: 1.7 }}>
              เหตุผลที่ลูกค้าเลือกเรา มากกว่า 100+ โปรเจกต์
            </p>
          </div>
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
            {reasons.map((r) => (
              <div key={r.title} className="text-center">
                <div className="why-icon-lg mx-auto mb-6">
                  <r.icon className="h-9 w-9" />
                </div>
                <h3 className="why-feature-title">{r.title}</h3>
                <p className="why-feature-desc mt-3">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <svg className="relative block w-full h-auto mt-16 -mb-px" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
          <path fill="#EBF6F8" d="M0,40 C240,80 480,0 720,32 C960,64 1200,80 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </section>

      {/* PORTFOLIO / PACKAGES */}
      <section id="portfolio" className="relative overflow-hidden bg-soft-teal pt-20 md:pt-24 pb-0" style={{ contentVisibility: "auto", containIntrinsicSize: "0 800px" }}>
        {/* Faint wave illustration backdrop */}
        <img
          src={heroKrabi}
          alt=""
          aria-hidden="true"
          width={1920}
          height={1080}
          loading="lazy"
          decoding="async"
          style={{ contentVisibility: "auto" }}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.08]"
        />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading">
              แพ็กเกจ<span className="heading-accent">ทำเว็บไซต์</span>
            </h2>
            <p className="section-sub">เลือกประเภทธุรกิจของคุณ ดูตัวอย่างเว็บที่เราทำมา</p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {portfolioCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`rounded-full px-5 py-2.5 text-sm md:text-base font-semibold transition-all ${
                  activeCat === cat
                    ? "bg-primary text-white shadow-[var(--shadow-elegant)]"
                    : "bg-white text-primary hover:bg-white/80 border border-border/60"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Demo Switcher Bar — moved above preview */}
          <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center justify-between gap-4 rounded-full border border-border/60 bg-white px-6 py-3 shadow-[var(--shadow-elegant)] sm:flex-row">
            <div className="flex items-center gap-3 text-primary">
              <span className="text-sm md:text-base font-semibold">Demo Switcher</span>
              <div className="flex items-center gap-1">
                {([
                  { key: "desktop", icon: Monitor, label: "Desktop" },
                  { key: "tablet", icon: Tablet, label: "Tablet" },
                  { key: "mobile", icon: PhoneIcon, label: "Mobile" },
                ] as const).map(({ key, icon: Icon, label }) => (
                  <button
                    key={key}
                    onClick={() => setDevice(key)}
                    aria-label={label}
                    aria-pressed={device === key}
                    className={`rounded-full p-2 transition-colors ${
                      device === key
                        ? "bg-primary text-white"
                        : "text-primary hover:bg-secondary"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </button>
                ))}
              </div>
            </div>
            <Button className="rounded-full bg-orange text-orange-foreground hover:bg-orange/90 shadow-[var(--shadow-warm)] px-6 font-semibold">
              ดูหน้าเว็บทั้งหมด <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Device Preview Frame */}
          <div className="mt-10 flex justify-center">
            <div
              className="mx-auto w-full transition-all duration-500 ease-out"
              style={{ maxWidth: deviceWidths[device] }}
            >
              <div className="rounded-[28px] border-[10px] border-primary/90 bg-primary/90 shadow-[var(--shadow-elegant)] overflow-hidden">
                <div className="flex items-center gap-1.5 bg-primary/90 px-3 py-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                  <span className="ml-3 truncate text-[11px] font-medium text-white/80">
                    {portfolioItems[activeCat][0].name.toLowerCase().replace(/\s+/g, "")}.com
                  </span>
                </div>
                <div className="bg-white">
                  <img
                    src={portfolioItems[activeCat][0].img}
                    alt={portfolioItems[activeCat][0].name}
                    width={1280}
                    height={960}
                    loading="lazy"
                    className="block w-full h-auto"
                  />
                </div>
              </div>
              <p className="mt-3 text-center text-sm font-semibold text-primary">
                {portfolioItems[activeCat][0].name} — {device.toUpperCase()}
              </p>
            </div>
          </div>

          {/* Thumbnail grid (other examples) */}
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
        </div>

        {/* Wave to CTA */}
        <div className="relative mt-20 -mb-px">
          <svg className="block w-full h-auto" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true">
            <path fill="#1B4F9B" d="M0,60 C240,10 480,100 720,50 C960,0 1200,80 1440,30 L1440,100 L0,100 Z" />
          </svg>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-soft-teal py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: stats.projects, suffix: "+", label: "โปรเจกต์" },
              { value: stats.clients, suffix: "+", label: "ลูกค้า" },
              { value: stats.years, suffix: " ปี", label: "ประสบการณ์" },
              { value: stats.satisfaction, suffix: "%", label: "ความพึงพอใจ" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl bg-white p-6 shadow-[var(--shadow-elegant)]">
                <div className="font-display text-3xl md:text-4xl font-bold text-primary">
                  {s.value}{s.suffix}
                </div>
                <div className="mt-1 text-sm md:text-base text-foreground/70">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-deep-blue text-white py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-4 md:px-8 text-center">
          <h2 className="text-white" style={{ fontSize: "clamp(1.75rem, 4.5vw, 2.25rem)", fontWeight: 700, color: "#ffffff" }}>
            พร้อมเริ่มต้นเว็บไซต์ของคุณแล้วหรือยัง?
          </h2>
          <p className="mt-4 text-base md:text-lg text-white/85" style={{ lineHeight: 1.7 }}>
            <span className="whitespace-nowrap">ปรึกษาฟรี ไม่มีค่าใช้จ่าย — ทีมงานพร้อมแนะนำแพ็กเกจ</span>ที่ใช่สำหรับธุรกิจคุณ
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link to="/quote">
              <Button size="lg" className="h-14 rounded-full bg-orange text-orange-foreground hover:bg-orange/90 shadow-[var(--shadow-warm)] px-8 text-base font-semibold">
                ปรึกษาฟรี <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <a href="tel:0996252499">
              <Button size="lg" variant="outline" className="h-14 rounded-full border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary px-8 text-base font-semibold">
                โทร 099-625-2499
              </Button>
            </a>
          </div>
        </div>
      </section>
      <FAQChatWidget />
    </PageShell>
  );
}
