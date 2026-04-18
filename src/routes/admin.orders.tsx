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

type Order = Database["public"]["Tables"]["orders"]["Row"];
type OrderStatus = Database["public"]["Enums"]["order_status"];

const STATUSES: OrderStatus[] = ["pending_slip", "confirmed", "in_progress", "delivered", "completed", "cancelled"];

export const Route = createFileRoute("/admin/orders")({
  head: () => ({ meta: [{ title: "คำสั่งซื้อ — Admin" }] }),
  component: () => <RequireAdmin><OrdersPage /></RequireAdmin>,
});

function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Order | null>(null);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    else setOrders(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function updateStatus(id: string, status: OrderStatus) {
    const { error } = await supabase.from("orders").update({ status }).eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("อัปเดตสถานะแล้ว"); load(); }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold text-primary">คำสั่งซื้อทั้งหมด</h1>
        <Badge variant="secondary">{orders.length} รายการ</Badge>
      </div>
      <div className="bg-background rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>รหัส</TableHead>
              <TableHead>ลูกค้า</TableHead>
              <TableHead>แพ็กเกจ</TableHead>
              <TableHead>ยอดรวม</TableHead>
              <TableHead>สถานะ</TableHead>
              <TableHead>วันที่</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground py-8">กำลังโหลด...</TableCell></TableRow>
            ) : orders.length === 0 ? (
              <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground py-8">ยังไม่มีคำสั่งซื้อ</TableCell></TableRow>
            ) : orders.map((o) => (
              <TableRow key={o.id}>
                <TableCell className="font-mono text-xs">{o.order_code}</TableCell>
                <TableCell>{o.customer_name}<br/><span className="text-xs text-muted-foreground">{o.customer_phone}</span></TableCell>
                <TableCell>{o.package_name}</TableCell>
                <TableCell>฿{Number(o.total).toLocaleString()}</TableCell>
                <TableCell>
                  <Select value={o.status} onValueChange={(v) => updateStatus(o.id, v as OrderStatus)}>
                    <SelectTrigger className="w-36 h-8 text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">{new Date(o.created_at).toLocaleDateString("th-TH")}</TableCell>
                <TableCell><Button size="sm" variant="outline" onClick={() => setSelected(o)}>ดู</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>คำสั่งซื้อ {selected?.order_code}</DialogTitle></DialogHeader>
          {selected && (
            <div className="space-y-2 text-sm">
              <p><b>ลูกค้า:</b> {selected.customer_name}</p>
              <p><b>โทร:</b> {selected.customer_phone}</p>
              {selected.customer_email && <p><b>อีเมล:</b> {selected.customer_email}</p>}
              {selected.customer_line && <p><b>LINE:</b> {selected.customer_line}</p>}
              <p><b>แพ็กเกจ:</b> {selected.package_name} (฿{Number(selected.package_price).toLocaleString()})</p>
              <p><b>Add-ons:</b> <pre className="bg-muted p-2 rounded text-xs">{JSON.stringify(selected.addons, null, 2)}</pre></p>
              <p><b>ยอดรวม:</b> ฿{Number(selected.total).toLocaleString()}</p>
              <p><b>ชำระโดย:</b> {selected.payment_method ?? "-"}</p>
              {selected.notes && <p><b>หมายเหตุ:</b> {selected.notes}</p>}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
