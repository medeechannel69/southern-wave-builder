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

type Seo = Database["public"]["Tables"]["page_seo"]["Row"];

export const Route = createFileRoute("/admin/seo")({
  head: () => ({ meta: [{ title: "SEO — Admin" }] }),
  component: () => <RequireAdmin><SeoPage /></RequireAdmin>,
});

function SeoPage() {
  const [items, setItems] = useState<Seo[]>([]);
  const [editing, setEditing] = useState<Partial<Seo> | null>(null);

  async function load() {
    const { data } = await supabase.from("page_seo").select("*").order("route");
    setItems(data ?? []);
  }
  useEffect(() => { load(); }, []);

  async function save() {
    if (!editing?.route) { toast.error("ระบุ route"); return; }
    const { error } = editing.id
      ? await supabase.from("page_seo").update(editing).eq("id", editing.id)
      : await supabase.from("page_seo").insert(editing as Seo);
    if (error) toast.error(error.message);
    else { toast.success("บันทึกแล้ว"); setEditing(null); load(); }
  }

  async function remove(id: string) { if (confirm("ลบ?")) { await supabase.from("page_seo").delete().eq("id", id); load(); } }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold text-primary">SEO Manager</h1>
        <Button onClick={() => setEditing({ enabled: true })}><Plus className="h-4 w-4" /> เพิ่ม route</Button>
      </div>
      <p className="text-sm text-muted-foreground">แก้ไข meta title และ description รายหน้า — ค่าจะ override ค่าใน head() ของ route (ต้องมี loader หรือ component ที่อ่านจาก DB)</p>

      {editing && (
        <Card><CardContent className="p-4 grid gap-3">
          <div><Label>Route * (เช่น /, /services, /packages)</Label><Input value={editing.route ?? ""} onChange={(e) => setEditing({ ...editing, route: e.target.value })} /></div>
          <div><Label>Meta Title</Label><Input value={editing.title ?? ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} maxLength={60} /><p className="text-xs text-muted-foreground mt-1">{(editing.title ?? "").length}/60</p></div>
          <div><Label>Meta Description</Label><Textarea rows={3} value={editing.description ?? ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} maxLength={160} /><p className="text-xs text-muted-foreground mt-1">{(editing.description ?? "").length}/160</p></div>
          <div><Label>OG Image URL</Label><Input value={editing.og_image_url ?? ""} onChange={(e) => setEditing({ ...editing, og_image_url: e.target.value })} /></div>
          <div className="flex items-center gap-2"><Switch checked={editing.enabled ?? true} onCheckedChange={(v) => setEditing({ ...editing, enabled: v })} /><span>เปิดใช้งาน</span></div>
          <div className="flex gap-2"><Button onClick={save}>บันทึก</Button><Button variant="outline" onClick={() => setEditing(null)}>ยกเลิก</Button></div>
        </CardContent></Card>
      )}

      <Card><CardContent className="p-0">
        <Table>
          <TableHeader><TableRow><TableHead>Route</TableHead><TableHead>Title</TableHead><TableHead>Description</TableHead><TableHead>Status</TableHead><TableHead></TableHead></TableRow></TableHeader>
          <TableBody>
            {items.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="font-mono text-sm">{s.route}</TableCell>
                <TableCell className="max-w-xs truncate">{s.title}</TableCell>
                <TableCell className="max-w-md truncate text-xs text-muted-foreground">{s.description}</TableCell>
                <TableCell><span className={`text-xs px-2 py-0.5 rounded-full ${s.enabled ? "bg-green-600 text-white" : "bg-muted text-muted-foreground"}`}>{s.enabled ? "เปิด" : "ปิด"}</span></TableCell>
                <TableCell className="text-right"><Button size="sm" variant="ghost" onClick={() => setEditing(s)}><Pencil className="h-4 w-4" /></Button><Button size="sm" variant="ghost" onClick={() => remove(s.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent></Card>
    </div>
  );
}
