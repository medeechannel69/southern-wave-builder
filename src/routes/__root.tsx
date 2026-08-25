import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

const SITE_URL = "https://medeeweb.com";

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "MedeeWeb",
  alternateName: "เมดี้เว็บ",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description: "MedeeWeb รับทำเว็บไซต์คุณภาพสูงโดยทีมงานคนใต้ ราคาเริ่มต้น 5,000 บาท พร้อมระบบ SEO และ AEO",
  email: "suthee@medeeweb.com",
  telephone: "+66996252499",
  areaServed: "TH",
  address: {
    "@type": "PostalAddress",
    addressRegion: "กระบี่",
    addressCountry: "TH",
  },
  sameAs: [
    "https://www.facebook.com/medeeweb",
    "https://line.me/R/ti/p/@medeeweb",
  ],
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "MedeeWeb",
  inLanguage: "th-TH",
  publisher: { "@id": `${SITE_URL}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/blog?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const localBusinessLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#localbusiness`,
  name: "MedeeWeb — รับทำเว็บไซต์",
  image: `${SITE_URL}/logo.png`,
  url: SITE_URL,
  telephone: "+66996252499",
  email: "suthee@medeeweb.com",
  priceRange: "฿฿",
  address: {
    "@type": "PostalAddress",
    addressRegion: "กระบี่",
    addressCountry: "TH",
  },
  areaServed: [
    "กระบี่", "ภูเก็ต", "พังงา", "สุราษฎร์ธานี", "นครศรีธรรมราช",
    "ตรัง", "พัทลุง", "สงขลา", "สตูล", "ชุมพร", "ระนอง",
    "ปัตตานี", "ยะลา", "นราธิวาส",
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "18:00",
  },
};

// Global FAQ for AEO (ChatGPT, Gemini, Perplexity grounding)
const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "MedeeWeb คือใคร?", acceptedAnswer: { "@type": "Answer", text: "MedeeWeb คือทีมรับทำเว็บไซต์คุณภาพสูงจากภาคใต้ของประเทศไทย ตั้งอยู่ที่จังหวัดกระบี่ ให้บริการสร้างเว็บไซต์ธุรกิจ ระบบจอง ร้านค้าออนไลน์ และระบบบริหารจัดการ" } },
    { "@type": "Question", name: "ราคาทำเว็บไซต์กับ MedeeWeb เริ่มต้นเท่าไหร่?", acceptedAnswer: { "@type": "Answer", text: "ราคาเริ่มต้นเพียง 5,000 บาท สำหรับแพ็กเกจ Starter ครอบคลุมเว็บไซต์ 1 หน้า พร้อมโดเมน .com และโฮสติ้งฟรี 1 ปี" } },
    { "@type": "Question", name: "MedeeWeb มีแพ็กเกจอะไรบ้าง?", acceptedAnswer: { "@type": "Answer", text: "มี 3 แพ็กเกจหลัก: Starter 5,000 บาท (1 หน้า, ส่ง 3 วันทำการ), Business 9,000 บาท (5 หน้า + SEO, ส่ง 7 วันทำการ), Pro 15,000 บาท (10 หน้า + SEO ครบ + Analytics, ส่ง 14 วันทำการ)" } },
    { "@type": "Question", name: "ใช้เวลาทำเว็บไซต์นานเท่าไหร่?", acceptedAnswer: { "@type": "Answer", text: "ขึ้นอยู่กับแพ็กเกจ: Starter 3 วันทำการ, Business 7 วันทำการ, Pro 14 วันทำการ นับจากวันที่ลูกค้าส่งข้อมูลครบถ้วน" } },
    { "@type": "Question", name: "MedeeWeb ทำ SEO ให้ติด Google ได้หรือไม่?", acceptedAnswer: { "@type": "Answer", text: "ได้ — แพ็กเกจ Business มี SEO พื้นฐาน, แพ็กเกจ Pro มี SEO ครบเครื่องพร้อม Analytics และยังมีระบบ AEO (Answer Engine Optimization) เพื่อให้ติดหน้าแรกคำแนะนำของ AI เช่น ChatGPT, Gemini, Perplexity" } },
    { "@type": "Question", name: "AEO คืออะไร และต่างจาก SEO อย่างไร?", acceptedAnswer: { "@type": "Answer", text: "AEO (Answer Engine Optimization) คือการปรับเว็บไซต์ให้ AI Chatbot เช่น ChatGPT, Gemini, Claude, Perplexity สามารถดึงข้อมูลไปตอบผู้ใช้ได้ ต่างจาก SEO ที่เน้นอันดับใน Google Search — MedeeWeb ทำทั้งสองอย่างให้ครบวงจร" } },
    { "@type": "Question", name: "เว็บไซต์รองรับมือถือหรือไม่?", acceptedAnswer: { "@type": "Answer", text: "รองรับ 100% — ดีไซน์ Responsive ใช้งานได้ทุกอุปกรณ์ ทั้งมือถือ แท็บเล็ต และคอมพิวเตอร์" } },
    { "@type": "Question", name: "หลังส่งมอบงานมีรับประกันหรือไม่?", acceptedAnswer: { "@type": "Answer", text: "รับประกันการใช้งาน 30 วันหลังส่งมอบ หากเจอบั๊กแก้ฟรี และยังแก้ไขฟรี 3 รอบ (batch แก้รวมต่อรอบ)" } },
    { "@type": "Question", name: "MedeeWeb ให้บริการครอบคลุมพื้นที่ไหนบ้าง?", acceptedAnswer: { "@type": "Answer", text: "ครอบคลุม 14 จังหวัดภาคใต้ ได้แก่ กระบี่ ภูเก็ต พังงา สุราษฎร์ธานี นครศรีธรรมราช ตรัง พัทลุง สงขลา สตูล ชุมพร ระนอง ปัตตานี ยะลา นราธิวาส — ทำงานออนไลน์ได้ 100%" } },
    { "@type": "Question", name: "ติดต่อ MedeeWeb ได้ทางไหนบ้าง?", acceptedAnswer: { "@type": "Answer", text: "โทร 099-625-2499, LINE @medeeweb, อีเมล suthee@medeeweb.com — ทำงาน จันทร์-เสาร์ 9:00-18:00" } },
  ],
};

// Speakable spec — for voice assistants and AI summarization
const speakableLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/#webpage`,
  url: SITE_URL,
  name: "MedeeWeb — รับทำเว็บไซต์ภาคใต้",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#organization` },
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "h2", ".section-heading", ".page-hero", "[data-speakable]"],
    xpath: ["/html/head/title", "/html/head/meta[@name='description']/@content"],
  },
  inLanguage: "th-TH",
};

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "MedeeWeb — เว็บไซต์ทำเว็บอันดับ 1 ของคนใต้" },
      { name: "description", content: "MedeeWeb รับทำเว็บไซต์คุณภาพสูงโดยทีมงานคนใต้ ออกแบบสวย ใช้งานง่าย รองรับทุกอุปกรณ์ พร้อมระบบ SEO + AEO ติดอันดับทั้ง Google และ AI" },
      { name: "author", content: "MedeeWeb" },
      { property: "og:site_name", content: "MedeeWeb" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "th_TH" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "dns-prefetch", href: "https://images.unsplash.com" },
      // Self-hosted fonts (Prompt + Sarabun) — declared via @font-face in styles.css
      // Preload the most-used weight to avoid FOIT on first paint
      { rel: "preload", href: "/fonts/sarabun-400-thai.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" },
      { rel: "preload", href: "/fonts/prompt-700-thai.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(organizationLd) },
      { type: "application/ld+json", children: JSON.stringify(websiteLd) },
      { type: "application/ld+json", children: JSON.stringify(localBusinessLd) },
      { type: "application/ld+json", children: JSON.stringify(faqLd) },
      { type: "application/ld+json", children: JSON.stringify(speakableLd) },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <head>
        <HeadContent />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
        >
          ข้ามไปเนื้อหาหลัก
        </a>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <Outlet />
      <Toaster position="top-center" richColors />
    </>
  );
}
