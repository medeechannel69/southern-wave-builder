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

type Faq = Database["public"]["Tables"]["faq_items"]["Row"];

export const Route = createFileRoute("/admin/faq")({
  head: () => ({ meta: [{ title: "FAQ — Admin" }] }),
  component: () => <RequireAdmin><FaqPage /></RequireAdmin>,
});

function FaqPage() {
  const [items, setItems] = useState<Faq[]>([]);
  const [editing, setEditing] = useState<Partial<Faq> | null>(null);

  async function load() {
    const { data } = await supabase.from("faq_items").select("*").order("category").order("sort_order");
    setItems(data ?? []);
  }
  useEffect(() => { load(); }, []);

  async function save() {
    if (!editing?.question || !editing?.answer || !editing?.category) { toast.error("กรอกครบ"); return; }
    const { error } = editing.id
      ? await supabase.from("faq_items").update(editing).eq("id", editing.id)
      : await supabase.from("faq_items").insert(editing as Faq);
    if (error) toast.error(error.message);
    else { toast.success("บันทึกแล้ว"); setEditing(null); load(); }
  }

  async function move(it: Faq, dir: -1 | 1) {
    const same = items.filter((x) => x.category === it.category);
    const idx = same.findIndex((x) => x.id === it.id);
    const swap = same[idx + dir]; if (!swap) return;
    await supabase.from("faq_items").update({ sort_order: swap.sort_order }).eq("id", it.id);
    await supabase.from("faq_items").update({ sort_order: it.sort_order }).eq("id", swap.id);
    load();
  }
  async function remove(id: string) { if (confirm("ลบ?")) { await supabase.from("faq_items").delete().eq("id", id); load(); } }

  const grouped = items.reduce<Record<string, Faq[]>>((acc, f) => { (acc[f.category] = acc[f.category] || []).push(f); return acc; }, {});

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold text-primary">จัดการ FAQ</h1>
        <Button onClick={() => setEditing({ visible: true, sort_order: items.length + 1 })}><Plus className="h-4 w-4" /> เพิ่ม</Button>
      </div>

      {editing && (
        <Card><CardContent className="p-4 grid gap-3 md:grid-cols-2">
          <div><Label>หมวด *</Label><Input value={editing.category ?? ""} onChange={(e) => setEditing({ ...editing, category: e.target.value })} list="faq-cats" />
            <datalist id="faq-cats">{Object.keys(grouped).map((c) => <option key={c} value={c} />)}</datalist>
          </div>
          <div className="flex items-center gap-2"><Switch checked={editing.visible ?? true} onCheckedChange={(v) => setEditing({ ...editing, visible: v })} /><span>แสดง</span></div>
          <div className="md:col-span-2"><Label>คำถาม *</Label><Input value={editing.question ?? ""} onChange={(e) => setEditing({ ...editing, question: e.target.value })} /></div>
          <div className="md:col-span-2"><Label>คำตอบ *</Label><Textarea rows={4} value={editing.answer ?? ""} onChange={(e) => setEditing({ ...editing, answer: e.target.value })} /></div>
          <div className="md:col-span-2 flex gap-2"><Button onClick={save}>บันทึก</Button><Button variant="outline" onClick={() => setEditing(null)}>ยกเลิก</Button></div>
        </CardContent></Card>
      )}

      {Object.entries(grouped).map(([cat, list]) => (
        <Card key={cat}>
          <CardContent className="p-4">
            <h2 className="font-bold text-primary mb-3">{cat}</h2>
            <div className="space-y-2">
              {list.map((f) => (
                <div key={f.id} className="border rounded p-3 flex gap-2 items-start">
                  <div className="flex-1">
                    <div className="font-medium text-sm">{f.question}</div>
                    <div className="text-xs text-muted-foreground mt-1">{f.answer}</div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Button size="sm" variant="ghost" onClick={() => move(f, -1)}><ArrowUp className="h-3 w-3" /></Button>
                    <Button size="sm" variant="ghost" onClick={() => move(f, 1)}><ArrowDown className="h-3 w-3" /></Button>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Button size="sm" variant="ghost" onClick={() => setEditing(f)}><Pencil className="h-3 w-3" /></Button>
                    <Button size="sm" variant="ghost" onClick={() => remove(f.id)}><Trash2 className="h-3 w-3 text-destructive" /></Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
