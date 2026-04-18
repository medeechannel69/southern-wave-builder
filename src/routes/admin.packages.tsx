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
import { Plus, Trash2, Pencil } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Pkg = Database["public"]["Tables"]["packages"]["Row"];

export const Route = createFileRoute("/admin/packages")({
  head: () => ({ meta: [{ title: "แพ็กเกจ — Admin" }] }),
  component: () => <RequireAdmin><PackagesPage /></RequireAdmin>,
});

function PackagesPage() {
  const [items, setItems] = useState<Pkg[]>([]);
  const [editing, setEditing] = useState<(Partial<Pkg> & { _featuresText?: string }) | null>(null);

  async function load() {
    const { data } = await supabase.from("packages").select("*").order("sort_order");
    setItems(data ?? []);
  }
  useEffect(() => { load(); }, []);

  async function save() {
    if (!editing?.name) { toast.error("กรอกชื่อแพ็กเกจ"); return; }
    const features = (editing._featuresText ?? "").split("\n").map((s) => s.trim()).filter(Boolean);
    const payload: any = { ...editing, features };
    delete payload._featuresText;
    const { error } = editing.id
      ? await supabase.from("packages").update(payload).eq("id", editing.id)
      : await supabase.from("packages").insert(payload);
    if (error) toast.error(error.message);
    else { toast.success("บันทึกแล้ว"); setEditing(null); load(); }
  }

  async function remove(id: string) {
    if (!confirm("ลบแพ็กเกจนี้?")) return;
    await supabase.from("packages").delete().eq("id", id); load();
  }

  function startEdit(p?: Pkg) {
    if (p) setEditing({ ...p, _featuresText: (p.features as string[]).join("\n") });
    else setEditing({ visible: true, recommended: false, price: 0, sort_order: items.length + 1, _featuresText: "" });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold text-primary">จัดการแพ็กเกจ</h1>
        <Button onClick={() => startEdit()}><Plus className="h-4 w-4" /> เพิ่ม</Button>
      </div>

      {editing && (
        <Card><CardContent className="p-4 grid gap-3 md:grid-cols-2">
          <div><Label>ชื่อ</Label><Input value={editing.name ?? ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></div>
          <div><Label>ราคา (บาท)</Label><Input type="number" value={editing.price?.toString() ?? "0"} onChange={(e) => setEditing({ ...editing, price: parseFloat(e.target.value) || 0 })} /></div>
          <div><Label>Badge</Label><Input value={editing.badge ?? ""} onChange={(e) => setEditing({ ...editing, badge: e.target.value || null })} placeholder="ยอดนิยม / แนะนำ" /></div>
          <div><Label>ส่งมอบ (วัน)</Label><Input type="number" value={editing.delivery_days?.toString() ?? ""} onChange={(e) => setEditing({ ...editing, delivery_days: e.target.value ? parseInt(e.target.value) : null })} /></div>
          <div className="md:col-span-2"><Label>ฟีเจอร์ (1 บรรทัด/รายการ)</Label><Textarea rows={6} value={editing._featuresText ?? ""} onChange={(e) => setEditing({ ...editing, _featuresText: e.target.value })} /></div>
          <div className="flex items-center gap-2"><Switch checked={editing.recommended ?? false} onCheckedChange={(v) => setEditing({ ...editing, recommended: v })} /><span>แนะนำ</span></div>
          <div className="flex items-center gap-2"><Switch checked={editing.visible ?? true} onCheckedChange={(v) => setEditing({ ...editing, visible: v })} /><span>แสดง</span></div>
          <div className="md:col-span-2 flex gap-2"><Button onClick={save}>บันทึก</Button><Button variant="outline" onClick={() => setEditing(null)}>ยกเลิก</Button></div>
        </CardContent></Card>
      )}

      <div className="grid gap-3 md:grid-cols-3">
        {items.map((p) => (
          <Card key={p.id}><CardContent className="p-4 space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-bold text-lg">{p.name} {p.badge && <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded ml-1">{p.badge}</span>}</div>
                <div className="text-2xl font-bold text-primary">{p.price.toLocaleString()} ฿</div>
              </div>
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" onClick={() => startEdit(p)}><Pencil className="h-3 w-3" /></Button>
                <Button size="sm" variant="ghost" onClick={() => remove(p.id)}><Trash2 className="h-3 w-3 text-destructive" /></Button>
              </div>
            </div>
            <ul className="text-sm space-y-1 list-disc pl-5">
              {(p.features as string[]).map((f, i) => <li key={i}>{f}</li>)}
            </ul>
            <div className="text-xs text-muted-foreground pt-2 border-t">
              {p.recommended && "⭐ แนะนำ · "}
              {p.visible ? "แสดงผล" : "ซ่อน"}
            </div>
          </CardContent></Card>
        ))}
      </div>
    </div>
  );
}
