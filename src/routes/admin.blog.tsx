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

type Post = Database["public"]["Tables"]["blog_posts"]["Row"];

export const Route = createFileRoute("/admin/blog")({
  head: () => ({ meta: [{ title: "บล็อก — Admin" }] }),
  component: () => <RequireAdmin><BlogPage /></RequireAdmin>,
});

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^\w\s-ก-๙]/g, "").replace(/\s+/g, "-").slice(0, 100);
}

function BlogPage() {
  const [items, setItems] = useState<Post[]>([]);
  const [editing, setEditing] = useState<Partial<Post> | null>(null);

  async function load() {
    const { data } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
    setItems(data ?? []);
  }
  useEffect(() => { load(); }, []);

  async function save() {
    if (!editing?.title || !editing?.slug) { toast.error("กรอก title และ slug"); return; }
    const payload = { ...editing, published_at: editing.published && !editing.published_at ? new Date().toISOString() : editing.published_at };
    const { error } = editing.id
      ? await supabase.from("blog_posts").update(payload).eq("id", editing.id)
      : await supabase.from("blog_posts").insert(payload as Post);
    if (error) toast.error(error.message);
    else { toast.success("บันทึกแล้ว"); setEditing(null); load(); }
  }

  async function togglePublish(p: Post) {
    await supabase.from("blog_posts").update({ published: !p.published, published_at: !p.published ? new Date().toISOString() : p.published_at }).eq("id", p.id);
    load();
  }
  async function remove(id: string) { if (confirm("ลบโพสต์?")) { await supabase.from("blog_posts").delete().eq("id", id); load(); } }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold text-primary">จัดการบทความ</h1>
        <Button onClick={() => setEditing({ published: false })}><Plus className="h-4 w-4" /> เพิ่มโพสต์</Button>
      </div>

      {editing && (
        <Card><CardContent className="p-4 grid gap-3 md:grid-cols-2">
          <div><Label>หัวข้อ *</Label><Input value={editing.title ?? ""} onChange={(e) => setEditing({ ...editing, title: e.target.value, slug: editing.slug || slugify(e.target.value) })} /></div>
          <div><Label>Slug *</Label><Input value={editing.slug ?? ""} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} /></div>
          <div><Label>หมวด</Label><Input value={editing.category ?? ""} onChange={(e) => setEditing({ ...editing, category: e.target.value })} /></div>
          <div><Label>Cover Image URL</Label><Input value={editing.cover_image_url ?? ""} onChange={(e) => setEditing({ ...editing, cover_image_url: e.target.value })} /></div>
          <div className="md:col-span-2"><Label>Excerpt</Label><Textarea rows={2} value={editing.excerpt ?? ""} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} /></div>
          <div className="md:col-span-2"><Label>เนื้อหา (Markdown / HTML)</Label><Textarea rows={12} value={editing.content ?? ""} onChange={(e) => setEditing({ ...editing, content: e.target.value })} /></div>
          <div className="flex items-center gap-2"><Switch checked={editing.published ?? false} onCheckedChange={(v) => setEditing({ ...editing, published: v })} /><span>เผยแพร่</span></div>
          <div className="md:col-span-2 flex gap-2"><Button onClick={save}>บันทึก</Button><Button variant="outline" onClick={() => setEditing(null)}>ยกเลิก</Button></div>
        </CardContent></Card>
      )}

      <Card><CardContent className="p-0">
        <Table>
          <TableHeader><TableRow><TableHead>หัวข้อ</TableHead><TableHead>หมวด</TableHead><TableHead>สถานะ</TableHead><TableHead>วันที่</TableHead><TableHead></TableHead></TableRow></TableHeader>
          <TableBody>
            {items.map((p) => (
              <TableRow key={p.id}>
                <TableCell><div className="font-medium">{p.title}</div><div className="text-xs font-mono text-muted-foreground">{p.slug}</div></TableCell>
                <TableCell>{p.category}</TableCell>
                <TableCell>
                  <button onClick={() => togglePublish(p)} className={`text-xs px-2 py-0.5 rounded-full ${p.published ? "bg-green-600 text-white" : "bg-muted text-muted-foreground"}`}>
                    {p.published ? "เผยแพร่" : "ฉบับร่าง"}
                  </button>
                </TableCell>
                <TableCell className="text-xs">{p.published_at ? new Date(p.published_at).toLocaleDateString("th-TH") : "—"}</TableCell>
                <TableCell className="text-right"><Button size="sm" variant="ghost" onClick={() => setEditing(p)}><Pencil className="h-4 w-4" /></Button><Button size="sm" variant="ghost" onClick={() => remove(p.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent></Card>
    </div>
  );
}
