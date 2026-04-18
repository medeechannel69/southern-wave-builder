import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, PageHero } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { notify, ADMIN_EMAIL } from "@/lib/email/notify";

export const Route = createFileRoute("/interest")({
  head: () => ({
    meta: [
      { title: "ฝากเบอร์ให้ติดต่อกลับ — MedeeWeb" },
      { name: "description", content: "ฝากเบอร์โทร ทีมงาน MedeeWeb ติดต่อกลับโดยเร็ว" },
    ],
  }),
  component: InterestPage,
});

function InterestPage() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", line_id: "", business_type: "", budget: "", preferred_time: "" });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from("leads").insert(form);
    setLoading(false);
    if (error) { toast.error("เกิดข้อผิดพลาด: " + error.message); return; }
    void notify({
      templateName: 'lead-notification',
      recipientEmail: ADMIN_EMAIL,
      idempotencyKey: `lead-${form.phone}-${Date.now()}`,
      templateData: {
        leadName: form.name, phone: form.phone, lineId: form.line_id,
        businessType: form.business_type, budget: form.budget, preferredTime: form.preferred_time,
      },
    });
    setDone(true);
    toast.success("รับเรื่องเรียบร้อย — ทีมงานจะติดต่อกลับ");
  };

  return (
    <PageShell>
      <PageHero eyebrow="ติดต่อกลับ" title="ฝากเบอร์ไว้ เราโทรหา" subtitle="กรอกข้อมูลสั้นๆ ทีมงานจะติดต่อกลับในเวลาที่คุณสะดวก" />
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-xl px-4 md:px-8">
          {done ? (
            <div className="rounded-2xl border border-accent bg-accent/10 p-8 text-center">
              <Check className="mx-auto h-14 w-14 text-accent" />
              <h2 className="mt-4 text-xl font-bold text-primary">รับเรื่องเรียบร้อย</h2>
              <p className="mt-2 text-muted-foreground">ทีมงานจะโทรกลับตามเวลาที่ท่านสะดวก</p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <div><Label>ชื่อ-นามสกุล *</Label><Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
              <div><Label>เบอร์โทร *</Label><Input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
              <div><Label>LINE ID</Label><Input value={form.line_id} onChange={(e) => setForm({ ...form, line_id: e.target.value })} /></div>
              <div><Label>ประเภทธุรกิจ</Label><Input value={form.business_type} onChange={(e) => setForm({ ...form, business_type: e.target.value })} /></div>
              <div><Label>งบประมาณ</Label><Input value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} placeholder="เช่น 5,000 - 10,000" /></div>
              <div><Label>เวลาสะดวกให้ติดต่อ</Label><Input value={form.preferred_time} onChange={(e) => setForm({ ...form, preferred_time: e.target.value })} placeholder="เช่น 10:00 - 12:00" /></div>
              <Button disabled={loading} type="submit" size="lg" className="w-full rounded-full bg-orange text-orange-foreground hover:bg-orange/90 font-semibold">
                {loading ? "กำลังส่ง..." : "ส่งข้อมูล"}
              </Button>
            </form>
          )}
        </div>
      </section>
    </PageShell>
  );
}
