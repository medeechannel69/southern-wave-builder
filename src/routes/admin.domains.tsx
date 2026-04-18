import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { RequireAdmin } from "@/components/admin/RequireAdmin";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Download, Plus, Trash2, Pencil } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Domain = Database["public"]["Tables"]["domains"]["Row"];

export const Route = createFileRoute("/admin/domains")({
  head: () => ({ meta: [{ title: "โดเมน/โฮสต์ — Admin" }] }),
  component: () => <RequireAdmin><DomainsPage /></RequireAdmin>,
});

function statusFor(expiry: string | null): { label: string; cls: string; days: number | null } {
  if (!expiry) return { label: "ไม่มีข้อมูล", cls: "bg-muted text-muted-foreground", days: null };
  const days = Math.floor((new Date(expiry).getTime() - Date.now()) / 86400000);
  if (days < 7) return { label: "วิกฤต", cls: "bg-red-600 text-white", days };
  if (days < 30) return { label: "เร่งด่วน", cls: "bg-orange-500 text-white", days };
  if (days < 90) return { label: "ใกล้หมด", cls: "bg-yellow-500 text-white", days };
  return { label: "ปกติ", cls: "bg-green-600 text-white", days };
}

function DomainsPage() {
  const [items, setItems] = useState<Domain[]>([]);
  const [editing, setEditing] = useState<Partial<Domain> | null>(null);

  async function load() {
    const { data } = await supabase.from("domains").select("*").order("hosting_expiry", { ascending: true, nullsFirst: false });
    setItems(data ?? []);
  }
  useEffect(() => { load(); }, []);

  async function save() {
    if (!editing?.customer_name || !editing?.domain) { toast.error("กรอกชื่อลูกค้าและโดเมน"); return; }
    const { error } = editing.id
      ? await supabase.from("domains").update(editing).eq("id", editing.id)
      : await supabase.from("domains").insert(editing as Domain);
    if (error) toast.error(error.message);
    else { toast.success("บันทึกแล้ว"); setEditing(null); load(); }
  }

  async function remove(id: string) {
    if (!confirm("ลบโดเมนนี้?")) return;
    await supabase.from("domains").delete().eq("id", id);
    load();
  }

  function exportCSV() {
    const headers = ["ลูกค้า", "โทรศัพท์", "อีเมล", "โดเมน", "ผู้ให้บริการ", "หมดอายุโดเมน", "หมดอายุโฮสต์", "สถานะ"];
    const rows = items.map((d) => [d.customer_name, d.customer_phone ?? "", d.customer_email ?? "", d.domain, d.hosting_provider ?? "", d.domain_expiry ?? "", d.hosting_expiry ?? "", statusFor(d.hosting_expiry).label]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${(c ?? "").toString().replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `domains-${Date.now()}.csv`; a.click();
    URL.revokeObjectURL(url);
  }

  const summary = useMemo(() => {
    const buckets = { ปกติ: 0, ใกล้หมด: 0, เร่งด่วน: 0, วิกฤต: 0 };
    items.forEach((d) => { const l = statusFor(d.hosting_expiry).label; if (l in buckets) (buckets as any)[l]++; });
    return buckets;
  }, [items]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-display font-bold text-primary">โดเมน & โฮสติ้ง</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportCSV}><Download className="h-4 w-4" /> Export CSV</Button>
          <Button onClick={() => setEditing({})}><Plus className="h-4 w-4" /> เพิ่มโดเมน</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {Object.entries(summary).map(([k, v]) => (
          <Card key={k}><CardContent className="p-4"><div className="text-xs text-muted-foreground">{k}</div><div className="text-2xl font-bold">{v}</div></CardContent></Card>
        ))}
      </div>

      {editing && (
        <Card><CardContent className="p-4 grid gap-3 md:grid-cols-2">
          <div><Label>ชื่อลูกค้า *</Label><Input value={editing.customer_name ?? ""} onChange={(e) => setEditing({ ...editing, customer_name: e.target.value })} /></div>
          <div><Label>โดเมน *</Label><Input value={editing.domain ?? ""} onChange={(e) => setEditing({ ...editing, domain: e.target.value })} /></div>
          <div><Label>โทรศัพท์</Label><Input value={editing.customer_phone ?? ""} onChange={(e) => setEditing({ ...editing, customer_phone: e.target.value })} /></div>
          <div><Label>อีเมล</Label><Input value={editing.customer_email ?? ""} onChange={(e) => setEditing({ ...editing, customer_email: e.target.value })} /></div>
          <div><Label>ผู้ให้บริการโฮสต์</Label><Input value={editing.hosting_provider ?? ""} onChange={(e) => setEditing({ ...editing, hosting_provider: e.target.value })} /></div>
          <div><Label>หมดอายุโดเมน</Label><Input type="date" value={editing.domain_expiry ?? ""} onChange={(e) => setEditing({ ...editing, domain_expiry: e.target.value || null })} /></div>
          <div><Label>หมดอายุโฮสต์</Label><Input type="date" value={editing.hosting_expiry ?? ""} onChange={(e) => setEditing({ ...editing, hosting_expiry: e.target.value || null })} /></div>
          <div className="md:col-span-2"><Label>หมายเหตุ</Label><Textarea value={editing.notes ?? ""} onChange={(e) => setEditing({ ...editing, notes: e.target.value })} /></div>
          <div className="md:col-span-2 flex gap-2"><Button onClick={save}>บันทึก</Button><Button variant="outline" onClick={() => setEditing(null)}>ยกเลิก</Button></div>
        </CardContent></Card>
      )}

      <Card><CardContent className="p-0">
        <Table>
          <TableHeader><TableRow>
            <TableHead>ลูกค้า</TableHead><TableHead>โดเมน</TableHead><TableHead>โฮสต์หมด</TableHead><TableHead>เหลือ</TableHead><TableHead>สถานะ</TableHead><TableHead></TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {items.map((d) => {
              const st = statusFor(d.hosting_expiry);
              return (
                <TableRow key={d.id}>
                  <TableCell><div className="font-medium">{d.customer_name}</div><div className="text-xs text-muted-foreground">{d.customer_phone}</div></TableCell>
                  <TableCell className="font-mono text-sm">{d.domain}</TableCell>
                  <TableCell>{d.hosting_expiry ?? "—"}</TableCell>
                  <TableCell>{st.days !== null ? `${st.days} วัน` : "—"}</TableCell>
                  <TableCell><span className={`rounded-full px-2 py-0.5 text-xs ${st.cls}`}>{st.label}</span></TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="ghost" onClick={() => setEditing(d)}><Pencil className="h-4 w-4" /></Button>
                    <Button size="sm" variant="ghost" onClick={() => remove(d.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </TableCell>
                </TableRow>
              );
            })}
            {items.length === 0 && <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">ยังไม่มีข้อมูล</TableCell></TableRow>}
          </TableBody>
        </Table>
      </CardContent></Card>
    </div>
  );
}
