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
import { Plus, Trash2, Pencil, ArrowUp, ArrowDown } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Item = Database["public"]["Tables"]["portfolio_items"]["Row"];

export const Route = createFileRoute("/admin/portfolio")({
  head: () => ({ meta: [{ title: "ผลงาน — Admin" }] }),
  component: () => <RequireAdmin><PortfolioPage /></RequireAdmin>,
});

function PortfolioPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [editing, setEditing] = useState<Partial<Item> | null>(null);

  async function load() {
    const { data } = await supabase.from("portfolio_items").select("*").order("sort_order");
    setItems(data ?? []);
  }
  useEffect(() => { load(); }, []);

  async function save() {
    if (!editing?.name || !editing?.category) { toast.error("กรอกชื่อและหมวด"); return; }
    const { error } = editing.id
      ? await supabase.from("portfolio_items").update(editing).eq("id", editing.id)
      : await supabase.from("portfolio_items").insert(editing as Item);
    if (error) toast.error(error.message);
    else { toast.success("บันทึกแล้ว"); setEditing(null); load(); }
  }

  async function uploadImage(file: File) {
    const path = `portfolio/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("site-assets").upload(path, file);
    if (error) { toast.error(error.message); return; }
    const { data } = supabase.storage.from("site-assets").getPublicUrl(path);
    setEditing((p) => ({ ...p!, image_url: data.publicUrl }));
  }

  async function toggleVisible(it: Item) {
    await supabase.from("portfolio_items").update({ visible: !it.visible }).eq("id", it.id);
    load();
  }

  async function move(it: Item, dir: -1 | 1) {
    const idx = items.findIndex((x) => x.id === it.id);
    const swap = items[idx + dir]; if (!swap) return;
    await supabase.from("portfolio_items").update({ sort_order: swap.sort_order }).eq("id", it.id);
    await supabase.from("portfolio_items").update({ sort_order: it.sort_order }).eq("id", swap.id);
    load();
  }

  async function remove(id: string) {
    if (!confirm("ลบผลงานนี้?")) return;
    await supabase.from("portfolio_items").delete().eq("id", id);
    load();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold text-primary">จัดการผลงาน</h1>
        <Button onClick={() => setEditing({ visible: true, sort_order: items.length + 1 })}><Plus className="h-4 w-4" /> เพิ่ม</Button>
      </div>

      {editing && (
        <Card><CardContent className="p-4 grid gap-3 md:grid-cols-2">
          <div><Label>ชื่อ *</Label><Input value={editing.name ?? ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></div>
          <div><Label>หมวด *</Label><Input value={editing.category ?? ""} onChange={(e) => setEditing({ ...editing, category: e.target.value })} placeholder="ร้านอาหาร / โรงแรม / บริษัท / อสังหาฯ" /></div>
          <div><Label>Demo URL</Label><Input value={editing.demo_url ?? ""} onChange={(e) => setEditing({ ...editing, demo_url: e.target.value })} /></div>
          <div><Label>Image URL</Label><Input value={editing.image_url ?? ""} onChange={(e) => setEditing({ ...editing, image_url: e.target.value })} /></div>
          <div className="md:col-span-2"><Label>หรืออัปโหลดรูป</Label><Input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0])} /></div>
          {editing.image_url && <img src={editing.image_url} alt="" className="md:col-span-2 h-32 w-auto object-cover rounded border" />}
          <div className="md:col-span-2"><Label>คำอธิบาย</Label><Textarea value={editing.description ?? ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} /></div>
          <div className="flex items-center gap-3"><Switch checked={editing.visible ?? true} onCheckedChange={(v) => setEditing({ ...editing, visible: v })} /><span>แสดงในเว็บไซต์</span></div>
          <div className="flex items-center gap-3"><Switch checked={editing.is_real ?? false} onCheckedChange={(v) => setEditing({ ...editing, is_real: v })} /><span>ผลงานจริง</span></div>
          <div className="md:col-span-2 flex gap-2"><Button onClick={save}>บันทึก</Button><Button variant="outline" onClick={() => setEditing(null)}>ยกเลิก</Button></div>
        </CardContent></Card>
      )}

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <Card key={it.id}><CardContent className="p-4 space-y-2">
            {it.image_url && <img src={it.image_url} alt={it.name} className="h-32 w-full object-cover rounded" />}
            <div className="flex items-start justify-between gap-2">
              <div><div className="font-semibold">{it.name}</div><div className="text-xs text-muted-foreground">{it.category}</div></div>
              <Switch checked={it.visible} onCheckedChange={() => toggleVisible(it)} />
            </div>
            {it.demo_url && <a href={it.demo_url} className="text-xs text-primary underline" target="_blank" rel="noreferrer">{it.demo_url}</a>}
            <div className="flex items-center gap-1 pt-2 border-t">
              <Button size="sm" variant="ghost" onClick={() => move(it, -1)}><ArrowUp className="h-3 w-3" /></Button>
              <Button size="sm" variant="ghost" onClick={() => move(it, 1)}><ArrowDown className="h-3 w-3" /></Button>
              <div className="ml-auto flex gap-1">
                <Button size="sm" variant="ghost" onClick={() => setEditing(it)}><Pencil className="h-3 w-3" /></Button>
                <Button size="sm" variant="ghost" onClick={() => remove(it.id)}><Trash2 className="h-3 w-3 text-destructive" /></Button>
              </div>
            </div>
          </CardContent></Card>
        ))}
      </div>
    </div>
  );
}
