import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Service",
              "@id": "https://medeeweb.com/services#business-website",
              name: "เว็บไซต์ธุรกิจ",
              description: "เว็บแนะนำธุรกิจและร้านค้า ออกแบบสวย ใช้งานง่าย รองรับทุกอุปกรณ์ เริ่มต้น 5,000 บาท",
              serviceType: "Web Development",
              provider: { "@id": "https://medeeweb.com/#organization" },
              areaServed: { "@type": "Country", name: "Thailand" },
              offers: { "@type": "Offer", price: "5000", priceCurrency: "THB", availability: "https://schema.org/InStock" },
              url: "https://medeeweb.com/services",
            },
            {
              "@type": "Service",
              "@id": "https://medeeweb.com/services#corporate-website",
              name: "เว็บไซต์บริษัท",
              description: "เว็บองค์กรขนาดใหญ่ ดูเป็นมืออาชีพ น่าเชื่อถือ พร้อมระบบ CMS",
              serviceType: "Web Development",
              provider: { "@id": "https://medeeweb.com/#organization" },
              areaServed: { "@type": "Country", name: "Thailand" },
              offers: { "@type": "Offer", price: "9000", priceCurrency: "THB", availability: "https://schema.org/InStock" },
              url: "https://medeeweb.com/services",
            },
            {
              "@type": "Service",
              "@id": "https://medeeweb.com/services#restaurant-website",
              name: "เว็บไซต์ร้านอาหาร",
              description: "ระบบเมนู จองโต๊ะ สั่งออนไลน์ ครบจบในเว็บเดียว",
              serviceType: "Web Development",
              provider: { "@id": "https://medeeweb.com/#organization" },
              areaServed: { "@type": "Country", name: "Thailand" },
              url: "https://medeeweb.com/services",
            },
            {
              "@type": "Service",
              "@id": "https://medeeweb.com/services#hotel-website",
              name: "เว็บไซต์โรงแรมและรีสอร์ท",
              description: "ระบบจองห้องพัก แสดงห้อง ราคา พร้อมระบบหลังบ้าน",
              serviceType: "Web Development",
              provider: { "@id": "https://medeeweb.com/#organization" },
              areaServed: { "@type": "Country", name: "Thailand" },
              url: "https://medeeweb.com/services",
            },
            {
              "@type": "Service",
              "@id": "https://medeeweb.com/services#realestate-website",
              name: "เว็บไซต์อสังหาริมทรัพย์",
              description: "แสดงโครงการ บ้าน คอนโด ที่ดิน พร้อมระบบค้นหาและกรอง",
              serviceType: "Web Development",
              provider: { "@id": "https://medeeweb.com/#organization" },
              areaServed: { "@type": "Country", name: "Thailand" },
              url: "https://medeeweb.com/services",
            },
            {
              "@type": "Service",
              "@id": "https://medeeweb.com/services#ecommerce",
              name: "ร้านค้าออนไลน์ (E-commerce)",
              description: "ระบบขายสินค้าออนไลน์ ตะกร้า ชำระเงิน PromptPay/บัตรเครดิต",
              serviceType: "E-commerce Development",
              provider: { "@id": "https://medeeweb.com/#organization" },
              areaServed: { "@type": "Country", name: "Thailand" },
              url: "https://medeeweb.com/services",
            },
            {
              "@type": "Service",
              "@id": "https://medeeweb.com/services#seo-aeo",
              name: "บริการ SEO + AEO",
              description: "ปรับเว็บไซต์ให้ติดอันดับ Google และติดหน้าแรกคำแนะนำของ AI เช่น ChatGPT, Gemini, Claude, Perplexity",
              serviceType: "Search Engine Optimization",
              provider: { "@id": "https://medeeweb.com/#organization" },
              areaServed: { "@type": "Country", name: "Thailand" },
              url: "https://medeeweb.com/services",
            },
          ],
        }),
      },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    title: "เว็บไซต์ธุรกิจ",
    desc: "เว็บแนะนำธุรกิจ ร้านค้า ออกแบบสวย ใช้งานง่าย เริ่มต้น 5,000 บาท",
    img: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1200&q=80&auto=format&fit=crop",
    alt: "หน้าร้านธุรกิจไทยสไตล์โมเดิร์น",
  },
  {
    title: "เว็บไซต์บริษัท",
    desc: "เว็บองค์กรขนาดใหญ่ ดูเป็นมืออาชีพ น่าเชื่อถือ พร้อม CMS",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80&auto=format&fit=crop",
    alt: "อาคารสำนักงานสมัยใหม่",
  },
  {
    title: "เว็บไซต์ร้านอาหาร",
    desc: "เมนู จองโต๊ะ สั่งออนไลน์ ครบจบในเว็บเดียว",
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80&auto=format&fit=crop",
    alt: "ภายในร้านอาหารไทย",
  },
  {
    title: "เว็บไซต์โรงแรม",
    desc: "ระบบจองห้องพัก แสดงห้อง พร้อมระบบหลังบ้าน",
    img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80&auto=format&fit=crop",
    alt: "รีสอร์ทริมทะเลพร้อมสระว่ายน้ำ",
  },
  {
    title: "เว็บไซต์อสังหาริมทรัพย์",
    desc: "ค้นหาบ้าน คอนโด ระบบฟิลเตอร์อัจฉริยะ พร้อมแบบบ้าน 360°",
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80&auto=format&fit=crop",
    alt: "บ้านสมัยใหม่สไตล์ไทย",
  },
  {
    title: "เว็บไซต์ตัวแทนประกัน",
    desc: "แสดงแผนประกัน คำนวณเบี้ย ระบบขอใบเสนอราคา และ LINE CTA",
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80&auto=format&fit=crop",
    alt: "ตัวแทนประกันให้คำปรึกษา",
  },
  {
    title: "เว็บไซต์ราชการ / รพ.สต.",
    desc: "เว็บหน่วยงาน ข่าวสาร นัดหมายออนไลน์ ดีไซน์เป็นทางการ",
    img: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1200&q=80&auto=format&fit=crop",
    alt: "บุคลากรทางการแพทย์",
  },
];

function ServicesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="บริการของเรา"
        title="บริการสร้างเว็บไซต์สำหรับทุกธุรกิจ"
        subtitle="เลือกบริการที่ใช่สำหรับธุรกิจของคุณ ราคาเริ่มต้น 5,000 บาท พร้อมโดเมน + โฮสติ้งฟรี 1 ปี"
      />
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div key={s.title} className="service-card group">
                <div className="aspect-[4/3] overflow-hidden bg-secondary/40">
                  <img
                    src={s.img}
                    alt={s.alt}
                    width={1200}
                    height={900}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 text-center">
                  <h3 className="text-lg font-semibold" style={{ color: "#1B4F9B" }}>{s.title}</h3>
                  <p className="mt-2 flex-1 text-sm" style={{ color: "#555", lineHeight: 1.6 }}>{s.desc}</p>
                  <div className="mt-5 flex flex-col gap-2 w-full">
                    <Link to="/demo">
                      <Button variant="outline" className="w-full rounded-full border-primary text-primary hover:bg-primary hover:text-white">
                        ดู Demo
                      </Button>
                    </Link>
                    <Link to="/quote">
                      <Button className="w-full rounded-full bg-orange text-orange-foreground hover:bg-orange/90 font-semibold">
                        ขอใบเสนอราคา <ArrowRight className="ml-1.5 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
