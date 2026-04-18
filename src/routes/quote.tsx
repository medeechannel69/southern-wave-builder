import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, PageHero } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { notify, ADMIN_EMAILS } from "@/lib/email/notify";
import { sanitizeText } from "@/lib/sanitize";

export const Route = createFileRoute("/quote")({
  head: () => ({
    meta: [
      { title: "ขอใบเสนอราคา — MedeeWeb" },
      { name: "description", content: "ขอใบเสนอราคาทำเว็บไซต์ฟรี — บอกความต้องการ ทีมงานติดต่อกลับภายใน 24 ชม." },
      { property: "og:title", content: "ขอใบเสนอราคา — MedeeWeb" },
      { property: "og:description", content: "ขอใบเสนอราคาทำเว็บไซต์ฟรี ทีมงานติดต่อกลับภายใน 24 ชม." },
    ],
    links: [{ rel: "canonical", href: "https://medeeweb.com/quote" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "หน้าแรก", item: "https://medeeweb.com" },
            { "@type": "ListItem", position: 2, name: "ขอใบเสนอราคา", item: "https://medeeweb.com/quote" },
          ],
        }),
      },
    ],
  }),
  component: QuotePage,
});

const businessTypes = ["ร้านอาหาร", "โรงแรม/รีสอร์ท", "บริษัท", "อสังหาฯ", "ผู้รับเหมา", "ตัวแทนประกัน", "หน่วยงานราชการ", "อื่นๆ"];
const packages = ["Starter 5,000", "Business 9,000", "Pro 15,000", "ยังไม่ตัดสินใจ"];
const addonOptions = ["SEO", "ระบบบล็อก", "ระบบจองออนไลน์", "ระบบอสังหาฯ", "AI Marketing"];
const budgets = ["น้อยกว่า 5,000", "5,000 - 10,000", "10,000 - 20,000", "มากกว่า 20,000"];

function QuotePage() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [addons, setAddons] = useState<string[]>([]);
  const [form, setForm] = useState({
    name: "", phone: "", email: "", line_id: "",
    business_type: businessTypes[0], package_name: packages[0],
    budget: budgets[0], details: "",
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from("quotes").insert({
      name: sanitizeText(form.name, 200),
      phone: sanitizeText(form.phone, 50),
      email: sanitizeText(form.email, 255),
      line_id: sanitizeText(form.line_id, 100),
      business_type: sanitizeText(form.business_type, 100),
      package_name: sanitizeText(form.package_name, 100),
      budget: sanitizeText(form.budget, 100),
      details: sanitizeText(form.details, 2000),
      addons,
    });
    setLoading(false);
    if (error) { toast.error("เกิดข้อผิดพลาด: " + error.message); return; }
    if (form.email) {
      void notify({
        templateName: 'quote-received',
        recipientEmail: form.email,
        idempotencyKey: `quote-${form.email}-${Date.now()}`,
        templateData: { customerName: form.name, packageName: form.package_name, budget: form.budget },
      });
    }
    void notify({
      templateName: 'lead-notification',
      recipientEmail: ADMIN_EMAILS,
      idempotencyKey: `quote-admin-${form.phone}-${Date.now()}`,
      templateData: {
        leadName: form.name, phone: form.phone, lineId: form.line_id,
        businessType: form.business_type, budget: form.budget,
        message: `ขอใบเสนอราคา: ${form.package_name} | ${form.details}`,
      },
    });
    toast.success("ส่งคำขอใบเสนอราคาสำเร็จ!");
    nav({ to: "/thank-you" });
  };

  return (
    <PageShell>
      <PageHero eyebrow="ขอใบเสนอราคา" title="บอกเราถึงโปรเจคของคุณ" subtitle="ทีมงานจะติดต่อกลับพร้อมใบเสนอราคาภายใน 24 ชั่วโมง" />
      <section className="bg-white py-16 md:py-20">
        <form onSubmit={submit} className="mx-auto max-w-3xl space-y-5 px-4 md:px-8">
          <div className="grid gap-5 md:grid-cols-2">
            <div><Label>ชื่อ-นามสกุล *</Label><Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div><Label>เบอร์โทร *</Label><Input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
            <div><Label>อีเมล</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
            <div><Label>LINE ID</Label><Input value={form.line_id} onChange={(e) => setForm({ ...form, line_id: e.target.value })} /></div>
            <div>
              <Label>ประเภทธุรกิจ</Label>
              <select className="mt-1 h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm" value={form.business_type} onChange={(e) => setForm({ ...form, business_type: e.target.value })}>
                {businessTypes.map((b) => <option key={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <Label>แพ็กเกจที่สนใจ</Label>
              <select className="mt-1 h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm" value={form.package_name} onChange={(e) => setForm({ ...form, package_name: e.target.value })}>
                {packages.map((p) => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <Label>งบประมาณ</Label>
              <select className="mt-1 h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })}>
                {budgets.map((b) => <option key={b}>{b}</option>)}
              </select>
            </div>
          </div>
          <div>
            <Label>บริการเสริม</Label>
            <div className="mt-2 grid grid-cols-2 gap-3 md:grid-cols-3">
              {addonOptions.map((a) => (
                <label key={a} className="flex items-center gap-2 rounded-lg border border-border p-3 text-sm">
                  <Checkbox checked={addons.includes(a)} onCheckedChange={(c) => setAddons(c ? [...addons, a] : addons.filter((x) => x !== a))} />
                  {a}
                </label>
              ))}
            </div>
          </div>
          <div>
            <Label>รายละเอียดเพิ่มเติม</Label>
            <Textarea rows={5} value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} placeholder="บอกเราเกี่ยวกับธุรกิจและความต้องการ" />
          </div>
          <Button disabled={loading} type="submit" size="lg" className="w-full rounded-full bg-orange text-orange-foreground hover:bg-orange/90 font-semibold">
            {loading ? "กำลังส่ง..." : "ส่งคำขอใบเสนอราคา"}
          </Button>
        </form>
      </section>
    </PageShell>
  );
}
