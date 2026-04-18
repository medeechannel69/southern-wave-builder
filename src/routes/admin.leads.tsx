import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { RequireAdmin } from "@/components/admin/RequireAdmin";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import type { Database } from "@/integrations/supabase/types";

type Lead = Database["public"]["Tables"]["leads"]["Row"];
type LeadStatus = Database["public"]["Enums"]["lead_status"];
const STATUSES: LeadStatus[] = ["new", "pending_call", "contacted", "negotiating", "closed", "not_interested"];

export const Route = createFileRoute("/admin/leads")({
  head: () => ({ meta: [{ title: "Lead — Admin" }] }),
  component: () => <RequireAdmin><LeadsPage /></RequireAdmin>,
});

function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    else setLeads(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function updateStatus(id: string, status: LeadStatus) {
    const { error } = await supabase.from("leads").update({ status }).eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("อัปเดตแล้ว"); load(); }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold text-primary">Lead ทั้งหมด</h1>
        <Badge variant="secondary">{leads.length} รายการ</Badge>
      </div>
      <div className="bg-background rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ชื่อ</TableHead>
              <TableHead>โทร / LINE</TableHead>
              <TableHead>ประเภทธุรกิจ</TableHead>
              <TableHead>งบ</TableHead>
              <TableHead>เวลาสะดวก</TableHead>
              <TableHead>ที่มา</TableHead>
              <TableHead>สถานะ</TableHead>
              <TableHead>วันที่</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={8} className="text-center py-8 text-muted-foreground">กำลังโหลด...</TableCell></TableRow>
            ) : leads.length === 0 ? (
              <TableRow><TableCell colSpan={8} className="text-center py-8 text-muted-foreground">ยังไม่มี lead</TableCell></TableRow>
            ) : leads.map((l) => (
              <TableRow key={l.id}>
                <TableCell className="font-medium">{l.name}</TableCell>
                <TableCell className="text-xs">{l.phone}<br/>{l.line_id}</TableCell>
                <TableCell>{l.business_type ?? "-"}</TableCell>
                <TableCell>{l.budget ?? "-"}</TableCell>
                <TableCell>{l.preferred_time ?? "-"}</TableCell>
                <TableCell><Badge variant="outline">{l.source}</Badge></TableCell>
                <TableCell>
                  <Select value={l.status} onValueChange={(v) => updateStatus(l.id, v as LeadStatus)}>
                    <SelectTrigger className="w-36 h-8 text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">{new Date(l.created_at).toLocaleDateString("th-TH")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
