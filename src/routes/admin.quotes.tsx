import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { RequireAdmin } from "@/components/admin/RequireAdmin";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import type { Database } from "@/integrations/supabase/types";

type Quote = Database["public"]["Tables"]["quotes"]["Row"];
type QuoteStatus = Database["public"]["Enums"]["quote_status"];
const STATUSES: QuoteStatus[] = ["new", "sent", "accepted", "rejected"];

export const Route = createFileRoute("/admin/quotes")({
  head: () => ({ meta: [{ title: "ใบเสนอราคา — Admin" }] }),
  component: () => <RequireAdmin><QuotesPage /></RequireAdmin>,
});

function QuotesPage() {
  const [items, setItems] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Quote | null>(null);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase.from("quotes").select("*").order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    else setItems(data ?? []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function updateStatus(id: string, status: QuoteStatus) {
    const { error } = await supabase.from("quotes").update({ status }).eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("อัปเดตแล้ว"); load(); }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold text-primary">ใบเสนอราคา</h1>
        <Badge variant="secondary">{items.length} รายการ</Badge>
      </div>
      <div className="bg-background rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ชื่อ</TableHead>
              <TableHead>ติดต่อ</TableHead>
              <TableHead>ธุรกิจ</TableHead>
              <TableHead>แพ็กเกจ</TableHead>
              <TableHead>งบ</TableHead>
              <TableHead>สถานะ</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">กำลังโหลด...</TableCell></TableRow>
            ) : items.length === 0 ? (
              <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">ยังไม่มีคำขอใบเสนอราคา</TableCell></TableRow>
            ) : items.map((q) => (
              <TableRow key={q.id}>
                <TableCell className="font-medium">{q.name}</TableCell>
                <TableCell className="text-xs">{q.phone}<br/>{q.email}</TableCell>
                <TableCell>{q.business_type ?? "-"}</TableCell>
                <TableCell>{q.package_name ?? "-"}</TableCell>
                <TableCell>{q.budget ?? "-"}</TableCell>
                <TableCell>
                  <Select value={q.status} onValueChange={(v) => updateStatus(q.id, v as QuoteStatus)}>
                    <SelectTrigger className="w-32 h-8 text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell><Button size="sm" variant="outline" onClick={() => setSelected(q)}>ดู</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-xl">
          <DialogHeader><DialogTitle>คำขอใบเสนอราคา</DialogTitle></DialogHeader>
          {selected && (
            <div className="space-y-2 text-sm">
              <p><b>ชื่อ:</b> {selected.name}</p>
              <p><b>โทร:</b> {selected.phone}</p>
              <p><b>อีเมล:</b> {selected.email ?? "-"}</p>
              <p><b>LINE:</b> {selected.line_id ?? "-"}</p>
              <p><b>ธุรกิจ:</b> {selected.business_type ?? "-"}</p>
              <p><b>แพ็กเกจ:</b> {selected.package_name ?? "-"}</p>
              <p><b>งบ:</b> {selected.budget ?? "-"}</p>
              <p><b>รายละเอียด:</b><br/>{selected.details ?? "-"}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
