import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { RequireAdmin } from "@/components/admin/RequireAdmin";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import type { Database } from "@/integrations/supabase/types";

type Settings = Database["public"]["Tables"]["site_settings"]["Row"];

export const Route = createFileRoute("/admin/settings")({
  head: () => ({ meta: [{ title: "ตั้งค่าเว็บไซต์ — Admin" }] }),
  component: () => <RequireAdmin><SettingsPage /></RequireAdmin>,
});

function SettingsPage() {
  const [s, setS] = useState<Partial<Settings>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [provincesText, setProvincesText] = useState("");

  async function load() {
    const { data } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
    if (data) {
      setS(data);
      setProvincesText(Array.isArray(data.province_coverage) ? (data.province_coverage as string[]).join(", ") : "");
    }
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  function set<K extends keyof Settings>(k: K, v: Settings[K]) { setS((prev) => ({ ...prev, [k]: v })); }

  async function save() {
    setSaving(true);
    const provinces = provincesText.split(",").map((x) => x.trim()).filter(Boolean);
    const payload = { ...s, id: 1, province_coverage: provinces };
    const { error } = await supabase.from("site_settings").upsert(payload as Settings);
    setSaving(false);
    if (error) toast.error(error.message);
    else toast.success("บันทึกแล้ว");
  }

  async function uploadQR(file: File) {
    const path = `promptpay/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("site-assets").upload(path, file, { upsert: true });
    if (error) { toast.error(error.message); return; }
    const { data } = supabase.storage.from("site-assets").getPublicUrl(path);
    set("promptpay_qr_url", data.publicUrl);
    toast.success("อัปโหลด QR แล้ว");
  }

  if (loading) return <div className="text-muted-foreground">กำลังโหลด...</div>;

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold text-primary">ตั้งค่าเว็บไซต์</h1>
        <Button onClick={save} disabled={saving}>{saving ? "กำลังบันทึก..." : "บันทึกทั้งหมด"}</Button>
      </div>

      <Card>
        <CardHeader><CardTitle>ข้อมูลบริษัท</CardTitle></CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <Field label="ชื่อบริษัท" value={s.company_name} onChange={(v) => set("company_name", v)} />
          <Field label="Tagline" value={s.company_tagline} onChange={(v) => set("company_tagline", v)} />
          <Field label="อีเมล" value={s.company_email} onChange={(v) => set("company_email", v)} />
          <Field label="โทรศัพท์" value={s.company_phone} onChange={(v) => set("company_phone", v)} />
          <Field label="LINE ID" value={s.company_line_id} onChange={(v) => set("company_line_id", v)} />
          <div className="md:col-span-2">
            <Label>ที่อยู่</Label>
            <Textarea value={s.company_address ?? ""} onChange={(e) => set("company_address", e.target.value)} />
          </div>
          <div className="md:col-span-2">
            <Label>เกี่ยวกับเรา (about text)</Label>
            <Textarea rows={5} value={s.about_text ?? ""} onChange={(e) => set("about_text", e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>การชำระเงิน — PromptPay</CardTitle></CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <Field label="PromptPay ID" value={s.promptpay_id} onChange={(v) => set("promptpay_id", v)} />
          <div>
            <Label>อัปโหลด QR</Label>
            <Input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && uploadQR(e.target.files[0])} />
          </div>
          {s.promptpay_qr_url && <div className="md:col-span-2"><img src={s.promptpay_qr_url} alt="QR" className="h-40 w-40 object-contain border rounded" /></div>}
          <div className="md:col-span-2">
            <Label>ข้อมูลบัญชีธนาคาร</Label>
            <Textarea value={s.bank_account_info ?? ""} onChange={(e) => set("bank_account_info", e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Email SMTP</CardTitle></CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <Field label="SMTP Host" value={s.smtp_host} onChange={(v) => set("smtp_host", v)} />
          <Field label="SMTP Port" type="number" value={s.smtp_port?.toString()} onChange={(v) => set("smtp_port", v ? parseInt(v) : null)} />
          <Field label="SMTP User" value={s.smtp_user} onChange={(v) => set("smtp_user", v)} />
          <Field label="From Name" value={s.smtp_from_name} onChange={(v) => set("smtp_from_name", v)} />
          <Field label="From Email" value={s.smtp_from_email} onChange={(v) => set("smtp_from_email", v)} />
          <p className="md:col-span-2 text-xs text-muted-foreground">รหัสผ่าน SMTP เก็บใน Supabase secrets (SMTP_PASS)</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>โซเชียลมีเดีย</CardTitle></CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <Field label="Facebook URL" value={s.social_facebook} onChange={(v) => set("social_facebook", v)} />
          <Field label="Instagram URL" value={s.social_instagram} onChange={(v) => set("social_instagram", v)} />
          <Field label="TikTok URL" value={s.social_tiktok} onChange={(v) => set("social_tiktok", v)} />
          <Field label="YouTube URL" value={s.social_youtube} onChange={(v) => set("social_youtube", v)} />
          <Field label="LINE OA URL" value={s.social_line_oa} onChange={(v) => set("social_line_oa", v)} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>การวัดผล / Integration</CardTitle></CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <Field label="GA4 Measurement ID" value={s.ga4_id} onChange={(v) => set("ga4_id", v)} placeholder="G-XXXXXXXXXX" />
          <Field label="LINE OA Webhook URL" value={s.line_webhook_url} onChange={(v) => set("line_webhook_url", v)} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>ตัวเลขสถิติ (แสดงในหน้าแรก)</CardTitle></CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-4">
          <Field label="ลูกค้า" type="number" value={s.stats_clients?.toString()} onChange={(v) => set("stats_clients", v ? parseInt(v) : 0)} />
          <Field label="โปรเจกต์" type="number" value={s.stats_projects?.toString()} onChange={(v) => set("stats_projects", v ? parseInt(v) : 0)} />
          <Field label="ความพึงพอใจ %" type="number" value={s.stats_satisfaction?.toString()} onChange={(v) => set("stats_satisfaction", v ? parseInt(v) : 0)} />
          <Field label="ปีประสบการณ์" type="number" value={s.stats_years?.toString()} onChange={(v) => set("stats_years", v ? parseInt(v) : 0)} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>โปรโมชั่น/Countdown</CardTitle></CardHeader>
        <CardContent className="grid gap-4">
          <div>
            <Label>ข้อความโปรโมชั่น</Label>
            <Textarea value={s.promo_text ?? ""} onChange={(e) => set("promo_text", e.target.value)} />
          </div>
          <Field label="Countdown สิ้นสุด (ISO)" type="datetime-local"
            value={s.promo_countdown_end ? new Date(s.promo_countdown_end).toISOString().slice(0, 16) : ""}
            onChange={(v) => set("promo_countdown_end", v ? new Date(v).toISOString() : null)} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>จังหวัดที่ให้บริการ</CardTitle></CardHeader>
        <CardContent>
          <Label>คั่นด้วย comma (เช่น ภูเก็ต, กระบี่, สงขลา)</Label>
          <Textarea value={provincesText} onChange={(e) => setProvincesText(e.target.value)} />
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={save} disabled={saving} size="lg">{saving ? "กำลังบันทึก..." : "บันทึกทั้งหมด"}</Button>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", placeholder }: { label: string; value: string | null | undefined; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <div>
      <Label>{label}</Label>
      <Input type={type} value={value ?? ""} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
