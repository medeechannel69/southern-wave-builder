import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { RequireAdmin } from "@/components/admin/RequireAdmin";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Plus, Trash2, Pencil, Star, BadgeCheck } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Review = Database["public"]["Tables"]["reviews"]["Row"];

export const Route = createFileRoute("/admin/reviews")({
  head: () => ({ meta: [{ title: "รีวิว — Admin" }] }),
  component: () => <RequireAdmin><ReviewsPage /></RequireAdmin>,
});

function ReviewsPage() {
  const [items, setItems] = useState<Review[]>([]);
  const [editing, setEditing] = useState<Partial<Review> | null>(null);

  async function load() {
    const { data } = await supabase.from("reviews").select("*").order("sort_order");
    setItems(data ?? []);
  }
  useEffect(() => { load(); }, []);

  async function save() {
    if (!editing?.customer_name || !editing?.text) { toast.error("กรอกชื่อและข้อความ"); return; }
    const { error } = editing.id
      ? await supabase.from("reviews").update(editing).eq("id", editing.id)
      : await supabase.from("reviews").insert(editing as Review);
    if (error) toast.error(error.message);
    else { toast.success("บันทึกแล้ว"); setEditing(null); load(); }
  }

  async function toggle(r: Review, key: "visible" | "verified") {
    await supabase.from("reviews").update({ [key]: !r[key] }).eq("id", r.id); load();
  }
  async function remove(id: string) { if (confirm("ลบ?")) { await supabase.from("reviews").delete().eq("id", id); load(); } }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold text-primary">รีวิวลูกค้า</h1>
        <Button onClick={() => setEditing({ visible: true, verified: false, rating: 5, sort_order: items.length + 1 })}><Plus className="h-4 w-4" /> เพิ่ม</Button>
      </div>

      {editing && (
        <Card><CardContent className="p-4 grid gap-3 md:grid-cols-2">
          <div><Label>ชื่อลูกค้า</Label><Input value={editing.customer_name ?? ""} onChange={(e) => setEditing({ ...editing, customer_name: e.target.value })} /></div>
          <div><Label>ประเภทธุรกิจ</Label><Input value={editing.business_type ?? ""} onChange={(e) => setEditing({ ...editing, business_type: e.target.value })} /></div>
          <div><Label>แพลตฟอร์ม</Label><Input value={editing.platform ?? ""} onChange={(e) => setEditing({ ...editing, platform: e.target.value })} placeholder="Facebook / Google / LINE" /></div>
          <div><Label>คะแนน (1-5)</Label><Input type="number" min={1} max={5} value={editing.rating ?? 5} onChange={(e) => setEditing({ ...editing, rating: parseInt(e.target.value) || 5 })} /></div>
          <div className="md:col-span-2"><Label>ข้อความรีวิว</Label><Textarea rows={4} value={editing.text ?? ""} onChange={(e) => setEditing({ ...editing, text: e.target.value })} /></div>
          <div className="flex items-center gap-2"><Switch checked={editing.verified ?? false} onCheckedChange={(v) => setEditing({ ...editing, verified: v })} /><span>ยืนยันแล้ว</span></div>
          <div className="flex items-center gap-2"><Switch checked={editing.visible ?? true} onCheckedChange={(v) => setEditing({ ...editing, visible: v })} /><span>แสดง</span></div>
          <div className="md:col-span-2 flex gap-2"><Button onClick={save}>บันทึก</Button><Button variant="outline" onClick={() => setEditing(null)}>ยกเลิก</Button></div>
        </CardContent></Card>
      )}

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {items.map((r) => (
          <Card key={r.id}><CardContent className="p-4 space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-semibold flex items-center gap-1">{r.customer_name} {r.verified && <BadgeCheck className="h-4 w-4 text-blue-500" />}</div>
                <div className="text-xs text-muted-foreground">{r.business_type} · {r.platform}</div>
              </div>
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" onClick={() => setEditing(r)}><Pencil className="h-3 w-3" /></Button>
                <Button size="sm" variant="ghost" onClick={() => remove(r.id)}><Trash2 className="h-3 w-3 text-destructive" /></Button>
              </div>
            </div>
            <div className="flex">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`h-3 w-3 ${i < r.rating ? "fill-orange-400 text-orange-400" : "text-muted-foreground/30"}`} />)}</div>
            <p className="text-sm">"{r.text}"</p>
            <div className="flex items-center gap-3 pt-2 border-t text-xs">
              <label className="flex items-center gap-1"><Switch checked={r.visible} onCheckedChange={() => toggle(r, "visible")} /> แสดง</label>
              <label className="flex items-center gap-1"><Switch checked={r.verified} onCheckedChange={() => toggle(r, "verified")} /> ยืนยัน</label>
            </div>
          </CardContent></Card>
        ))}
      </div>
    </div>
  );
}
