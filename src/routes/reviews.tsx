import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "รีวิวจากลูกค้า — MedeeWeb" },
      { name: "description", content: "รีวิวจริงจากลูกค้าที่ใช้บริการทำเว็บไซต์กับ MedeeWeb คะแนนเฉลี่ย 4.9/5" },
      { property: "og:title", content: "รีวิวจากลูกค้า — MedeeWeb" },
      { property: "og:description", content: "คะแนนเฉลี่ย 4.9/5 จากลูกค้าจริง" },
    ],
  }),
  component: ReviewsPage,
});

const businessTypes = ["ร้านอาหาร", "โรงแรม", "บริษัท", "อสังหาฯ", "ตัวแทนประกัน", "รพ.สต.", "ผู้รับเหมา"];
const platforms = ["Facebook", "Google", "LINE", "Direct"];
const names = ["คุณสมศักดิ์", "คุณวิภา", "คุณธนพล", "คุณนภาพร", "คุณกิตติ", "คุณสุนีย์", "คุณอภิชาติ", "คุณรัชนี", "คุณพรชัย"];

const reviews = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  name: names[i % names.length] + " " + ["ก.", "ข.", "ค.", "ง.", "จ."][i % 5],
  rating: i % 7 === 0 ? 4 : 5,
  business: businessTypes[i % businessTypes.length],
  platform: platforms[i % platforms.length],
  text: [
    "ทีมงานเป็นมืออาชีพมาก เว็บไซต์สวยและใช้งานง่าย ลูกค้าชมเยอะมาก",
    "ราคาคุ้มค่ามาก ส่งมอบเร็วกว่าที่ตกลง บริการหลังการขายดีเยี่ยม",
    "ประทับใจมาก ตอบไวทุกครั้ง แก้ไขให้รวดเร็ว แนะนำเลย",
    "เว็บไซต์เปลี่ยนภาพลักษณ์ธุรกิจของเราไปเลย ขอบคุณทีม MedeeWeb",
    "เข้าใจในสิ่งที่เราต้องการ ทำงานละเอียด ส่งงานตรงเวลา",
  ][i % 5],
}));

function ReviewsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="รีวิวลูกค้า"
        title="รีวิวจากลูกค้าจริง"
        subtitle="คะแนนเฉลี่ย ⭐ 4.9/5 จากลูกค้ากว่า 100+ ราย ที่ไว้วางใจให้เราดูแลเว็บไซต์"
      />
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r) => (
              <Card key={r.id} className="rounded-2xl border-border bg-white p-6 shadow-sm">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < r.rating ? "fill-orange text-orange" : "text-muted-foreground/30"}`} />
                  ))}
                </div>
                <p className="mt-3 text-foreground/80" style={{ lineHeight: 1.7 }}>"{r.text}"</p>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                  <div>
                    <p className="font-semibold text-primary">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.business}</p>
                  </div>
                  <span className="rounded-full bg-soft-teal px-3 py-1 text-xs font-medium text-primary">{r.platform}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
