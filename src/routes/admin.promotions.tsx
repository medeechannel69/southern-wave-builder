import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { RequireAdmin } from "@/components/admin/RequireAdmin";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import type { Database } from "@/integrations/supabase/types";

type Promo = Database["public"]["Tables"]["promotions"]["Row"];

export const Route = createFileRoute("/admin/promotions")({
  head: () => ({ meta: [{ title: "โปรโมชั่น — Admin" }] }),
  component: () => <RequireAdmin><PromosPage /></RequireAdmin>,
});

function PromosPage() {
  const [promos, setPromos] = useState<Promo[]>([]);
  const [text, setText] = useState("");
  const [buttonUrl, setButtonUrl] = useState("");
  const [endAt, setEndAt] = useState("");

  async function load() {
    const { data } = await supabase.from("promotions").select("*").order("created_at", { ascending: false });
    setPromos(data ?? []);
  }
  useEffect(() => { load(); }, []);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.from("promotions").insert({
      text, button_url: buttonUrl || null, end_at: endAt ? new Date(endAt).toISOString() : null, enabled: true,
    });
    if (error) toast.error(error.message);
    else { toast.success("เพิ่มโปรโมชั่นแล้ว"); setText(""); setButtonUrl(""); setEndAt(""); load(); }
  }

  async function toggle(p: Promo) {
    await supabase.from("promotions").update({ enabled: !p.enabled }).eq("id", p.id);
    load();
  }

  async function remove(id: string) {
    if (!confirm("ลบโปรโมชั่นนี้?")) return;
    await supabase.from("promotions").delete().eq("id", id);
    load();
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-display font-bold text-primary">จัดการโปรโมชั่น</h1>

      <Card>
        <CardHeader><CardTitle>เพิ่มโปรโมชั่นใหม่</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={add} className="space-y-3">
            <div>
              <Label>ข้อความ Banner</Label>
              <Textarea required value={text} onChange={(e) => setText(e.target.value)} placeholder="เช่น 🔥 Hot Sale ลด 20%!" />
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <Label>ลิงก์ปุ่ม (เลือกใส่)</Label>
                <Input value={buttonUrl} onChange={(e) => setButtonUrl(e.target.value)} placeholder="/order" />
              </div>
              <div>
                <Label>หมดอายุ (เลือกใส่)</Label>
                <Input type="datetime-local" value={endAt} onChange={(e) => setEndAt(e.target.value)} />
              </div>
            </div>
            <Button type="submit">เพิ่มโปรโมชั่น</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>โปรโมชั่นทั้งหมด ({promos.length})</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {promos.length === 0 ? <p className="text-sm text-muted-foreground">ยังไม่มี</p> :
            promos.map((p) => (
              <div key={p.id} className="flex items-start gap-3 border rounded-lg p-3">
                <Switch checked={p.enabled} onCheckedChange={() => toggle(p)} />
                <div className="flex-1">
                  <div className="font-medium">{p.text}</div>
                  <div className="text-xs text-muted-foreground">
                    {p.button_url && <>ลิงก์: {p.button_url} • </>}
                    {p.end_at && <>หมดอายุ: {new Date(p.end_at).toLocaleString("th-TH")}</>}
                  </div>
                </div>
                <Button size="sm" variant="ghost" onClick={() => remove(p.id)}>ลบ</Button>
              </div>
            ))}
        </CardContent>
      </Card>
    </div>
  );
}
