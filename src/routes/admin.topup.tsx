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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Plus, Trash2, Pencil } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Item = Database["public"]["Tables"]["topup_items"]["Row"];

export const Route = createFileRoute("/admin/topup")({
  head: () => ({ meta: [{ title: "บริการเสริม — Admin" }] }),
  component: () => <RequireAdmin><TopupPage /></RequireAdmin>,
});

function TopupPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [editing, setEditing] = useState<Partial<Item> | null>(null);

  async function load() {
    const { data } = await supabase.from("topup_items").select("*").order("sort_order");
    setItems(data ?? []);
  }
  useEffect(() => { load(); }, []);

  async function save() {
    if (!editing?.name || !editing?.price) { toast.error("กรอกชื่อและราคา"); return; }
    const { error } = editing.id
      ? await supabase.from("topup_items").update(editing).eq("id", editing.id)
      : await supabase.from("topup_items").insert(editing as Item);
    if (error) toast.error(error.message);
    else { toast.success("บันทึกแล้ว"); setEditing(null); load(); }
  }

  async function toggle(it: Item) { await supabase.from("topup_items").update({ visible: !it.visible }).eq("id", it.id); load(); }
  async function remove(id: string) { if (confirm("ลบ?")) { await supabase.from("topup_items").delete().eq("id", id); load(); } }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold text-primary">บริการเสริม Top-Up</h1>
        <Button onClick={() => setEditing({ visible: true, sort_order: items.length + 1 })}><Plus className="h-4 w-4" /> เพิ่ม</Button>
      </div>

      {editing && (
        <Card><CardContent className="p-4 grid gap-3 md:grid-cols-2">
          <div><Label>ชื่อ</Label><Input value={editing.name ?? ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></div>
          <div><Label>ราคา</Label><Input value={editing.price ?? ""} onChange={(e) => setEditing({ ...editing, price: e.target.value })} /></div>
          <div><Label>หน่วย</Label><Input value={editing.unit ?? ""} onChange={(e) => setEditing({ ...editing, unit: e.target.value })} placeholder="บาท / บาท/หน้า" /></div>
          <div><Label>Icon (lucide name)</Label><Input value={editing.icon ?? ""} onChange={(e) => setEditing({ ...editing, icon: e.target.value })} placeholder="Plus, Search, FileText..." /></div>
          <div className="md:col-span-2"><Label>คำอธิบาย</Label><Textarea value={editing.description ?? ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} /></div>
          <div className="flex items-center gap-2"><Switch checked={editing.visible ?? true} onCheckedChange={(v) => setEditing({ ...editing, visible: v })} /><span>แสดง</span></div>
          <div className="md:col-span-2 flex gap-2"><Button onClick={save}>บันทึก</Button><Button variant="outline" onClick={() => setEditing(null)}>ยกเลิก</Button></div>
        </CardContent></Card>
      )}

      <Card><CardContent className="p-0">
        <Table>
          <TableHeader><TableRow><TableHead>ชื่อ</TableHead><TableHead>ราคา</TableHead><TableHead>แสดง</TableHead><TableHead></TableHead></TableRow></TableHeader>
          <TableBody>
            {items.map((it) => (
              <TableRow key={it.id}>
                <TableCell><div className="font-medium">{it.name}</div><div className="text-xs text-muted-foreground">{it.description}</div></TableCell>
                <TableCell>{it.price} {it.unit}</TableCell>
                <TableCell><Switch checked={it.visible} onCheckedChange={() => toggle(it)} /></TableCell>
                <TableCell className="text-right"><Button size="sm" variant="ghost" onClick={() => setEditing(it)}><Pencil className="h-4 w-4" /></Button><Button size="sm" variant="ghost" onClick={() => remove(it.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent></Card>
    </div>
  );
}
