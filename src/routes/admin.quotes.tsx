import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { RequireAdmin } from "@/components/admin/RequireAdmin";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import type { Database } from "@/integrations/supabase/types";
import { formatCurrency, formatThaiDate } from "@/lib/quote";

type Quote = Database["public"]["Tables"]["quotes"]["Row"];
type QuoteStatus = Database["public"]["Enums"]["quote_status"];
const STATUSES: QuoteStatus[] = ["new", "sent", "accepted", "rejected"];

type QuoteAddon = { name: string; price: number };

export const Route = createFileRoute("/admin/quotes")({
  head: () => ({ meta: [{ title: "ใบเสนอราคา — Admin" }] }),
  component: () => (
    <RequireAdmin>
      <QuotesPage />
    </RequireAdmin>
  ),
});

function getAddons(value: unknown): QuoteAddon[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is QuoteAddon =>
    Boolean(item && typeof item === "object" && "name" in item && "price" in item),
  );
}

function QuotesPage() {
  const [items, setItems] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Quote | null>(null);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("quotes")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    else setItems(data ?? []);
    setLoading(false);
  }
  useEffect(() => {
    load();
  }, []);

  async function updateStatus(id: string, status: QuoteStatus) {
    const { error } = await supabase.from("quotes").update({ status }).eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("อัปเดตแล้ว");
      load();
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-primary">ใบเสนอราคา</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            คำขอทั้งหมดพร้อมยอดประเมินจากระบบอัตโนมัติ
          </p>
        </div>
        <Badge variant="secondary">{items.length} รายการ</Badge>
      </div>
      <div className="overflow-x-auto rounded-lg border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ลูกค้า</TableHead>
              <TableHead>เลขที่</TableHead>
              <TableHead>ธุรกิจ</TableHead>
              <TableHead>แพ็กเกจ</TableHead>
              <TableHead>ยอดรวม</TableHead>
              <TableHead>กำหนดส่ง</TableHead>
              <TableHead>สถานะ</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className="py-8 text-center text-muted-foreground">
                  กำลังโหลด...
                </TableCell>
              </TableRow>
            ) : items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="py-8 text-center text-muted-foreground">
                  ยังไม่มีคำขอใบเสนอราคา
                </TableCell>
              </TableRow>
            ) : (
              items.map((q) => (
                <TableRow key={q.id}>
                  <TableCell className="min-w-40">
                    <div className="font-medium">{q.name}</div>
                    <div className="text-xs text-muted-foreground">{q.phone}</div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-xs font-medium text-primary">
                    {q.quote_number ?? "—"}
                  </TableCell>
                  <TableCell>{q.business_type ?? "-"}</TableCell>
                  <TableCell>{q.package_name ?? "-"}</TableCell>
                  <TableCell className="whitespace-nowrap font-semibold text-orange">
                    {q.total_amount !== null ? formatCurrency(q.total_amount) : "—"}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-xs">
                    {q.estimated_delivery_date ? formatThaiDate(q.estimated_delivery_date) : "—"}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={q.status}
                      onValueChange={(value) => updateStatus(q.id, value as QuoteStatus)}
                    >
                      <SelectTrigger className="h-8 w-28 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {STATUSES.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline" onClick={() => setSelected(q)}>
                      ดู
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-h-[90vh] max-w-xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              รายละเอียดใบเสนอราคา {selected?.quote_number ? `· ${selected.quote_number}` : ""}
            </DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-3 text-sm">
              <div className="grid gap-2 rounded-xl bg-soft-teal p-4 sm:grid-cols-2">
                <p>
                  <b>ชื่อ:</b> {selected.name}
                </p>
                <p>
                  <b>โทร:</b> {selected.phone}
                </p>
                <p>
                  <b>อีเมล:</b> {selected.email ?? "-"}
                </p>
                <p>
                  <b>LINE:</b> {selected.line_id ?? "-"}
                </p>
              </div>
              <p>
                <b>ธุรกิจ:</b> {selected.business_type ?? "-"}
              </p>
              <p>
                <b>แพ็กเกจ:</b> {selected.package_name ?? "-"}
              </p>
              <p>
                <b>งบ:</b> {selected.budget ?? "-"}
              </p>
              <div className="rounded-xl border border-orange/20 bg-orange/5 p-4">
                <p className="font-semibold text-primary">สรุปราคาอัตโนมัติ</p>
                <p className="mt-1 text-lg font-bold text-orange">
                  {selected.total_amount !== null
                    ? formatCurrency(selected.total_amount)
                    : "ยังไม่มีข้อมูลยอดรวม"}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {selected.delivery_days
                    ? `ส่งภายใน ${selected.delivery_days} วันทำการ`
                    : "ยังไม่มีข้อมูลกำหนดส่ง"}
                  {selected.estimated_delivery_date
                    ? ` · ${formatThaiDate(selected.estimated_delivery_date)}`
                    : ""}
                </p>
              </div>
              {getAddons(selected.addons).length > 0 && (
                <div>
                  <b>บริการเสริม:</b>
                  <ul className="mt-1 list-disc pl-5">
                    {getAddons(selected.addons).map((addon) => (
                      <li key={addon.name}>
                        {addon.name} — {formatCurrency(addon.price)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div>
                <b>รายละเอียด:</b>
                <p className="mt-1 whitespace-pre-wrap rounded-lg bg-muted p-3">
                  {selected.details ?? "-"}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
