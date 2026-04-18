import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Store, UtensilsCrossed, Hotel, Home, Shield, Stethoscope } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "บริการรับทำเว็บไซต์ — MedeeWeb" },
      { name: "description", content: "บริการทำเว็บไซต์ครบวงจรสำหรับทุกธุรกิจ ร้านอาหาร โรงแรม บริษัท อสังหาฯ ตัวแทนประกัน หน่วยงานราชการ" },
      { property: "og:title", content: "บริการรับทำเว็บไซต์ — MedeeWeb" },
      { property: "og:description", content: "บริการทำเว็บไซต์ครบวงจรสำหรับทุกธุรกิจ" },
    ],
  }),
  component: ServicesPage,
});

const services = [
  { icon: Store, title: "เว็บไซต์ธุรกิจ", desc: "เว็บแนะนำธุรกิจ ร้านค้า ออกแบบสวย ใช้งานง่าย เริ่มต้น 5,000 บาท" },
  { icon: Building2, title: "เว็บไซต์บริษัท", desc: "เว็บองค์กรขนาดใหญ่ ดูเป็นมืออาชีพ น่าเชื่อถือ พร้อม CMS" },
  { icon: UtensilsCrossed, title: "เว็บไซต์ร้านอาหาร", desc: "เมนู จองโต๊ะ สั่งออนไลน์ ครบจบในเว็บเดียว" },
  { icon: Hotel, title: "เว็บไซต์โรงแรม", desc: "ระบบจองห้องพัก แสดงห้อง พร้อมระบบหลังบ้าน" },
  { icon: Home, title: "เว็บไซต์อสังหาริมทรัพย์", desc: "ค้นหาบ้าน คอนโด ระบบฟิลเตอร์อัจฉริยะ พร้อมแบบบ้าน 360°" },
  { icon: Shield, title: "เว็บไซต์ตัวแทนประกัน", desc: "แสดงแผนประกัน คำนวณเบี้ย ระบบขอใบเสนอราคา และ LINE CTA" },
  { icon: Stethoscope, title: "เว็บไซต์ราชการ / รพ.สต.", desc: "เว็บหน่วยงาน ข่าวสาร นัดหมายออนไลน์ ดีไซน์เป็นทางการ" },
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
              <div key={s.title} className="service-card">
                <div className="flex flex-1 flex-col items-center p-6 text-center">
                  <div className="why-icon mb-4">
                    <s.icon className="h-9 w-9" />
                  </div>
                  <h3 className="text-lg font-semibold" style={{ color: "#1B4F9B" }}>{s.title}</h3>
                  <p className="mt-2 flex-1 text-sm" style={{ color: "#555" }}>{s.desc}</p>
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
