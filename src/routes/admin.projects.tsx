import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { RequireAdmin } from "@/components/admin/RequireAdmin";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import type { Database } from "@/integrations/supabase/types";

type Order = Database["public"]["Tables"]["orders"]["Row"];
type Update = Database["public"]["Tables"]["project_updates"]["Row"];

const STEPS = [
  "รับคำสั่งซื้อ",
  "ออกแบบ",
  "พัฒนา",
  "ทดสอบ",
  "ส่งมอบ",
];

export const Route = createFileRoute("/admin/projects")({
  head: () => ({ meta: [{ title: "โปรเจกต์ — Admin" }] }),
  component: () => <RequireAdmin><ProjectsPage /></RequireAdmin>,
});

function ProjectsPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [updates, setUpdates] = useState<Update[]>([]);
  const [step, setStep] = useState(1);
  const [stepName, setStepName] = useState(STEPS[0]);
  const [message, setMessage] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    supabase.from("orders").select("*").order("created_at", { ascending: false })
      .then(({ data }) => setOrders(data ?? []));
  }, []);

  async function loadUpdates(orderId: string) {
    const { data } = await supabase.from("project_updates").select("*").eq("order_id", orderId).order("step");
    setUpdates(data ?? []);
  }

  function selectOrder(id: string) {
    setSelectedId(id);
    if (id) loadUpdates(id);
  }

  async function addUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedId) return;
    const { error } = await supabase.from("project_updates").insert({
      order_id: selectedId, step, step_name: stepName, message, is_complete: isComplete,
    });
    if (error) toast.error(error.message);
    else { toast.success("เพิ่มอัปเดตแล้ว"); setMessage(""); loadUpdates(selectedId); }
  }

  async function toggleComplete(u: Update) {
    await supabase.from("project_updates").update({ is_complete: !u.is_complete }).eq("id", u.id);
    loadUpdates(selectedId);
  }

  async function deleteUpdate(id: string) {
    await supabase.from("project_updates").delete().eq("id", id);
    loadUpdates(selectedId);
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-display font-bold text-primary">ติดตามโปรเจกต์</h1>
      <Card>
        <CardHeader><CardTitle>เลือกคำสั่งซื้อ</CardTitle></CardHeader>
        <CardContent>
          <Select value={selectedId} onValueChange={selectOrder}>
            <SelectTrigger><SelectValue placeholder="-- เลือก --" /></SelectTrigger>
            <SelectContent>
              {orders.map((o) => (
                <SelectItem key={o.id} value={o.id}>{o.order_code} - {o.customer_name} ({o.package_name})</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {selectedId && (
        <>
          <Card>
            <CardHeader><CardTitle>เพิ่มสถานะใหม่</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={addUpdate} className="grid md:grid-cols-2 gap-3">
                <div>
                  <Label>ขั้นตอนที่</Label>
                  <Input type="number" min={1} value={step} onChange={(e) => setStep(Number(e.target.value))} />
                </div>
                <div>
                  <Label>ชื่อขั้นตอน</Label>
                  <Select value={stepName} onValueChange={setStepName}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{STEPS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label>ข้อความ</Label>
                  <Textarea value={message} onChange={(e) => setMessage(e.target.value)} />
                </div>
                <label className="flex items-center gap-2">
                  <Checkbox checked={isComplete} onCheckedChange={(v) => setIsComplete(!!v)} /> เสร็จสิ้นแล้ว
                </label>
                <div className="md:col-span-2"><Button type="submit">เพิ่ม</Button></div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>ประวัติอัปเดต ({updates.length})</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {updates.length === 0 ? <p className="text-sm text-muted-foreground">ยังไม่มี</p> :
                updates.map((u) => (
                  <div key={u.id} className="flex items-start gap-3 border rounded-lg p-3">
                    <Checkbox checked={u.is_complete} onCheckedChange={() => toggleComplete(u)} />
                    <div className="flex-1">
                      <div className="font-medium">ขั้นตอน {u.step}: {u.step_name}</div>
                      {u.message && <p className="text-sm text-muted-foreground">{u.message}</p>}
                      <p className="text-xs text-muted-foreground mt-1">{new Date(u.created_at).toLocaleString("th-TH")}</p>
                    </div>
                    <Button size="sm" variant="ghost" onClick={() => deleteUpdate(u.id)}>ลบ</Button>
                  </div>
                ))}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
