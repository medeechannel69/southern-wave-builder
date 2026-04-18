import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Check, X, Flame } from "lucide-react";

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      { title: "แพ็กเกจราคาทำเว็บไซต์ — MedeeWeb เริ่ม 5,000 บาท" },
      { name: "description", content: "แพ็กเกจทำเว็บไซต์ Starter 5,000 / Business 9,000 / Pro 15,000 บาท ราคาคุ้มค่า ไม่มีค่าซ่อนเร้น พร้อมโดเมน+โฮสติ้ง 1 ปี" },
      { property: "og:title", content: "แพ็กเกจราคาทำเว็บไซต์ — MedeeWeb" },
      { property: "og:description", content: "Starter 5,000 / Business 9,000 / Pro 15,000 บาท" },
    ],
  }),
  component: PackagesPage,
});

const packages = [
  {
    name: "STARTER",
    price: "5,000",
    badge: null,
    interest: 12,
    features: ["เว็บไซต์ 1 หน้า (One-page)", "Mobile Responsive", "ปุ่มติดต่อ + Google Map", "ฟอร์มติดต่อ", "โดเมน + โฮสติ้ง 1 ปี ฟรี", "ส่งมอบภายใน 7 วัน"],
  },
  {
    name: "BUSINESS",
    price: "9,000",
    badge: "ยอดนิยม",
    interest: 28,
    features: ["เว็บไซต์ 5 หน้า", "หน้าบริการ + แกลเลอรี่", "หน้าเกี่ยวกับเรา + ติดต่อ", "SEO พื้นฐาน", "โดเมน + โฮสติ้ง 1 ปี ฟรี", "ส่งมอบภายใน 14 วัน"],
  },
  {
    name: "PRO",
    price: "15,000",
    badge: "แนะนำ",
    interest: 18,
    features: ["เว็บไซต์ 10 หน้า", "ระบบบล็อก + บทความ", "SEO ครบเครื่อง + Analytics", "ฟอร์มขั้นสูง", "โดเมน + โฮสติ้ง 1 ปี ฟรี", "ส่งมอบภายใน 21 วัน"],
  },
];

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
  return (
    <PageShell>
      <PageHero
        eyebrow="แพ็กเกจราคา"
        title="เลือกแพ็กเกจที่ใช่สำหรับธุรกิจของคุณ"
        subtitle="ราคาคุ้มค่า โปร่งใส ไม่มีค่าซ่อนเร้น พร้อมโดเมน + โฮสติ้งฟรี 1 ปีทุกแพ็กเกจ"
      />
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {packages.map((p) => (
              <div
                key={p.name}
                className={`relative flex flex-col rounded-2xl bg-white p-8 shadow-[0_8px_30px_rgba(0,168,157,0.12)] transition-transform hover:-translate-y-1 ${
                  p.badge === "ยอดนิยม" ? "border-2 border-orange ring-4 ring-orange/10" : "border border-border"
                }`}
              >
                {p.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-orange px-4 py-1 text-xs font-bold text-white shadow-lg">
                    {p.badge}
                  </span>
                )}
                <h3 className="text-center text-xl font-bold" style={{ color: "#1B4F9B" }}>{p.name}</h3>
                <div className="mt-3 text-center">
                  <span className="text-4xl font-bold" style={{ color: "#1B4F9B" }}>{p.price}</span>
                  <span className="ml-1 text-sm text-muted-foreground">บาท</span>
                </div>
                <div className="mt-2 inline-flex w-fit mx-auto items-center gap-1 rounded-full bg-orange/10 px-3 py-1 text-xs font-semibold text-orange">
                  <Flame className="h-3 w-3" /> {p.interest} คนสนใจแพ็กเกจนี้
                </div>
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
        </div>
      </section>
    </PageShell>
  );
}
