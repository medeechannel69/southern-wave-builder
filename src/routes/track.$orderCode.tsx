import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageShell, PageHero } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Check, Circle, Clock } from "lucide-react";

export const Route = createFileRoute("/track/$orderCode")({
  head: ({ params }) => ({
    meta: [
      { title: `สถานะโปรเจค ${params.orderCode} — MedeeWeb` },
      { name: "description", content: "ติดตามความคืบหน้าโปรเจคเว็บไซต์ของคุณ" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: TrackDetail,
});

const PIPELINE = [
  "ยืนยันคำสั่งซื้อ",
  "รับชำระเงินมัดจำ",
  "เก็บข้อมูล/เนื้อหา",
  "ออกแบบ Mockup",
  "พัฒนาเว็บไซต์",
  "ส่งตัวอย่างให้ตรวจ",
  "แก้ไขตามรอบ",
  "ส่งมอบงาน + เปิดใช้",
];

function TrackDetail() {
  const { orderCode } = Route.useParams();
  const [order, setOrder] = useState<any>(null);
  const [updates, setUpdates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data: o } = await supabase.from("orders").select("*").eq("order_code", orderCode).maybeSingle();
      if (o) {
        const { data: u } = await supabase.from("project_updates").select("*").eq("order_id", o.id).order("step");
        setOrder(o);
        setUpdates(u || []);
      }
      setLoading(false);
    })();
  }, [orderCode]);

  if (loading) return <PageShell><div className="py-24 text-center">กำลังโหลด...</div></PageShell>;
  if (!order) return <PageShell><div className="py-24 text-center"><p>ไม่พบคำสั่งซื้อ</p><Link to="/track"><Button className="mt-4 rounded-full">กลับ</Button></Link></div></PageShell>;

  const currentStep = updates.filter((u) => u.is_complete).length;

  return (
    <PageShell>
      <PageHero eyebrow={`Order #${order.order_code}`} title={order.customer_name} subtitle={`แพ็กเกจ: ${order.package_name} • สถานะ: ${order.status}`} />
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-2xl font-bold text-primary">ความคืบหน้าโปรเจค</h2>
          <ol className="mt-6 space-y-3">
            {PIPELINE.map((name, i) => {
              const done = i < currentStep;
              const active = i === currentStep;
              return (
                <li key={name} className={`flex items-start gap-3 rounded-xl border p-4 ${done ? "border-accent bg-accent/5" : active ? "border-orange bg-orange/5" : "border-border bg-white"}`}>
                  {done ? <Check className="h-6 w-6 shrink-0 text-accent" /> : active ? <Clock className="h-6 w-6 shrink-0 text-orange" /> : <Circle className="h-6 w-6 shrink-0 text-muted-foreground/40" />}
                  <div>
                    <p className={`font-semibold ${done || active ? "text-primary" : "text-muted-foreground"}`}>{i + 1}. {name}</p>
                    {updates[i]?.message && <p className="mt-1 text-sm text-muted-foreground">{updates[i].message}</p>}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    </PageShell>
  );
}
