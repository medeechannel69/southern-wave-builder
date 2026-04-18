import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, PageHero } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/track")({
  head: () => ({
    meta: [
      { title: "ตรวจสอบสถานะโปรเจค — MedeeWeb" },
      { name: "description", content: "ติดตามสถานะโปรเจคเว็บไซต์ของคุณด้วยรหัสคำสั่งซื้อและเบอร์โทร" },
    ],
  }),
  component: TrackPage,
});

function TrackPage() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [orderCode, setOrderCode] = useState("");
  const [phone, setPhone] = useState("");

  const lookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.from("orders").select("id,order_code,customer_phone").eq("order_code", orderCode.trim()).maybeSingle();
    setLoading(false);
    if (error || !data) { toast.error("ไม่พบรหัสคำสั่งซื้อนี้"); return; }
    if (data.customer_phone.replace(/\D/g, "") !== phone.replace(/\D/g, "")) { toast.error("เบอร์โทรไม่ตรง"); return; }
    nav({ to: "/track/$orderCode", params: { orderCode: data.order_code } });
  };

  return (
    <PageShell>
      <PageHero eyebrow="Client Portal" title="ตรวจสอบสถานะโปรเจค" subtitle="ระบุรหัสคำสั่งซื้อและเบอร์โทรเพื่อดูความคืบหน้า" />
      <section className="bg-white py-16">
        <form onSubmit={lookup} className="mx-auto max-w-md space-y-4 px-4">
          <div><Label>รหัสคำสั่งซื้อ</Label><Input required value={orderCode} onChange={(e) => setOrderCode(e.target.value)} placeholder="เช่น MW2604180001" /></div>
          <div><Label>เบอร์โทร</Label><Input required value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
          <Button disabled={loading} type="submit" size="lg" className="w-full rounded-full bg-orange text-orange-foreground hover:bg-orange/90 font-semibold">
            {loading ? "กำลังค้นหา..." : "ตรวจสอบสถานะ"}
          </Button>
        </form>
      </section>
    </PageShell>
  );
}
