import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Plus, Search, FileText, Calendar, Home, ShieldCheck, Wrench, Video, Sparkles } from "lucide-react";

export const Route = createFileRoute("/topup")({
  head: () => ({
    meta: [
      { title: "บริการเสริม Top-Up — MedeeWeb" },
      { name: "description", content: "บริการเสริมสำหรับเว็บไซต์ของคุณ เพิ่มหน้า ติดตั้ง SEO ระบบบล็อก ระบบจอง AI Marketing และอื่นๆ" },
      { property: "og:title", content: "บริการเสริม Top-Up — MedeeWeb" },
      { property: "og:description", content: "เพิ่มความสามารถให้เว็บไซต์ของคุณ" },
    ],
  }),
  component: TopupPage,
});

const items = [
  { icon: Plus, name: "เพิ่มหน้าเว็บ", price: "500", unit: "บาท/หน้า" },
  { icon: Search, name: "ติดตั้ง SEO", price: "2,000", unit: "บาท" },
  { icon: FileText, name: "ระบบบล็อก", price: "3,000", unit: "บาท" },
  { icon: Calendar, name: "ระบบจองออนไลน์", price: "8,000", unit: "บาท" },
  { icon: Home, name: "ระบบอสังหาฯ", price: "7,000", unit: "บาท" },
  { icon: Wrench, name: "ค่าดูแลรายปี", price: "2,000", unit: "บาท/ปี" },
  { icon: ShieldCheck, name: "ระบบตัวแทนประกัน", price: "5,000", unit: "บาท" },
  { icon: Video, name: "ทำคลิป AI", price: "3,000", unit: "บาท/คลิป" },
  { icon: Sparkles, name: "AI Marketing", price: "2,500", unit: "บาท/เดือน" },
];

function TopupPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="บริการเสริม"
        title="Top-Up เสริมพลังให้เว็บไซต์ของคุณ"
        subtitle="เลือกบริการเสริมที่ตรงกับความต้องการ เพิ่มได้ทุกเมื่อ ไม่บังคับซื้อตอนสั่งทำ"
      />
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((it) => (
              <div key={it.name} className="service-card">
                <div className="flex flex-1 flex-col items-center p-6 text-center">
                  <div className="why-icon mb-4"><it.icon className="h-9 w-9" /></div>
                  <h3 className="text-lg font-semibold" style={{ color: "#1B4F9B" }}>{it.name}</h3>
                  <div className="mt-3">
                    <span className="text-3xl font-bold text-orange">{it.price}</span>
                    <span className="ml-1 text-sm text-muted-foreground">{it.unit}</span>
                  </div>
                  <Link to="/quote" className="mt-5 w-full">
                    <Button className="w-full rounded-full bg-primary text-white hover:bg-primary/90">เพิ่มลงคำสั่งซื้อ</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
