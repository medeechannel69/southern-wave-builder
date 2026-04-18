import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { PageShell, PageHero } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Check } from "lucide-react";

export const Route = createFileRoute("/order")({
  head: () => ({
    meta: [
      { title: "สั่งทำเว็บไซต์ — MedeeWeb" },
      { name: "description", content: "สั่งทำเว็บไซต์ออนไลน์ — เลือกแพ็กเกจ ชำระเงิน เริ่มงานทันที" },
    ],
  }),
  component: OrderPage,
});

const PACKAGES = [
  { name: "STARTER", price: 5000, features: ["1 หน้า", "Mobile Responsive", "โดเมน+โฮสติ้ง 1 ปี"] },
  { name: "BUSINESS", price: 9000, features: ["5 หน้า", "SEO พื้นฐาน", "โดเมน+โฮสติ้ง 1 ปี"], badge: "ยอดนิยม" },
  { name: "PRO", price: 15000, features: ["10 หน้า", "Blog + SEO ครบ", "Analytics"] },
];
const ADDONS = [
  { name: "เพิ่มหน้าเว็บ", price: 500 },
  { name: "ติดตั้ง SEO", price: 2000 },
  { name: "ระบบบล็อก", price: 3000 },
  { name: "ระบบจองออนไลน์", price: 8000 },
  { name: "ระบบอสังหาฯ", price: 7000 },
  { name: "ค่าดูแลรายปี", price: 2000 },
];

function OrderPage() {
  const nav = useNavigate();
  const [step, setStep] = useState(1);
  const [pkg, setPkg] = useState(PACKAGES[1]);
  const [addons, setAddons] = useState<typeof ADDONS>([]);
  const [customer, setCustomer] = useState({ name: "", phone: "", email: "", line_id: "", business_type: "", notes: "" });
  const [payment, setPayment] = useState("promptpay");
  const [loading, setLoading] = useState(false);

  const total = useMemo(() => pkg.price + addons.reduce((s, a) => s + a.price, 0), [pkg, addons]);

  const toggleAddon = (a: typeof ADDONS[number]) => {
    setAddons((cur) => cur.find((x) => x.name === a.name) ? cur.filter((x) => x.name !== a.name) : [...cur, a]);
  };

  const submit = async () => {
    if (!customer.name || !customer.phone) { toast.error("กรุณากรอกชื่อและเบอร์โทร"); setStep(2); return; }
    setLoading(true);
    const { data, error } = await supabase.from("orders").insert({
      customer_name: customer.name, customer_phone: customer.phone,
      customer_email: customer.email, customer_line: customer.line_id,
      business_type: customer.business_type,
      package_name: pkg.name, package_price: pkg.price,
      addons: addons.map((a) => ({ name: a.name, price: a.price })),
      total, payment_method: payment, notes: customer.notes,
    }).select("order_code").single();
    setLoading(false);
    if (error || !data) { toast.error("เกิดข้อผิดพลาด: " + (error?.message ?? "")); return; }
    nav({ to: "/order/success", search: { code: data.order_code } });
  };

  return (
    <PageShell>
      <PageHero eyebrow="สั่งทำเว็บไซต์" title="3 ขั้นตอนง่ายๆ" subtitle={`ขั้นตอนที่ ${step} จาก 3`} />
      <section className="bg-white py-12">
        <div className="mx-auto max-w-5xl px-4">
          {/* Stepper */}
          <div className="mb-10 flex justify-center gap-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className={`flex h-10 w-10 items-center justify-center rounded-full font-bold ${step >= n ? "bg-orange text-white" : "bg-muted text-muted-foreground"}`}>{n}</div>
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-primary">เลือกแพ็กเกจ</h2>
              <div className="grid gap-5 md:grid-cols-3">
                {PACKAGES.map((p) => (
                  <button type="button" key={p.name} onClick={() => setPkg(p)} className={`rounded-2xl border-2 p-6 text-left transition ${pkg.name === p.name ? "border-orange bg-orange/5 shadow-lg" : "border-border bg-white hover:border-orange/40"}`}>
                    {p.badge && <span className="rounded-full bg-orange px-3 py-1 text-xs font-bold text-white">{p.badge}</span>}
                    <h3 className="mt-2 text-xl font-bold text-primary">{p.name}</h3>
                    <p className="text-3xl font-bold text-primary">{p.price.toLocaleString()} <span className="text-sm font-normal">บาท</span></p>
                    <ul className="mt-4 space-y-1 text-sm">
                      {p.features.map((f) => <li key={f} className="flex gap-2"><Check className="h-4 w-4 text-accent" />{f}</li>)}
                    </ul>
                  </button>
                ))}
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary">บริการเสริม (ไม่บังคับ)</h3>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {ADDONS.map((a) => (
                    <label key={a.name} className="flex items-center justify-between rounded-lg border border-border p-4 text-sm">
                      <span className="flex items-center gap-3"><Checkbox checked={!!addons.find((x) => x.name === a.name)} onCheckedChange={() => toggleAddon(a)} />{a.name}</span>
                      <span className="font-semibold">+{a.price.toLocaleString()} ฿</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="rounded-xl bg-soft-teal p-5 text-right">
                <p className="text-sm text-muted-foreground">ยอดรวม</p>
                <p className="text-3xl font-bold text-primary">{total.toLocaleString()} บาท</p>
              </div>
              <Button onClick={() => setStep(2)} size="lg" className="w-full rounded-full bg-orange text-orange-foreground hover:bg-orange/90 font-semibold">ถัดไป — กรอกข้อมูล</Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <h2 className="text-2xl font-bold text-primary">ข้อมูลลูกค้า</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div><Label>ชื่อ-นามสกุล *</Label><Input required value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} /></div>
                <div><Label>เบอร์โทร *</Label><Input required value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} /></div>
                <div><Label>อีเมล</Label><Input type="email" value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} /></div>
                <div><Label>LINE ID</Label><Input value={customer.line_id} onChange={(e) => setCustomer({ ...customer, line_id: e.target.value })} /></div>
                <div className="md:col-span-2"><Label>ประเภทธุรกิจ</Label><Input value={customer.business_type} onChange={(e) => setCustomer({ ...customer, business_type: e.target.value })} /></div>
                <div className="md:col-span-2"><Label>หมายเหตุ</Label><Textarea rows={3} value={customer.notes} onChange={(e) => setCustomer({ ...customer, notes: e.target.value })} /></div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)} className="rounded-full">ย้อนกลับ</Button>
                <Button onClick={() => setStep(3)} className="flex-1 rounded-full bg-orange text-orange-foreground hover:bg-orange/90 font-semibold">ถัดไป — ชำระเงิน</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-primary">ชำระเงิน</h2>
              <Tabs value={payment} onValueChange={setPayment}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="promptpay">PromptPay</TabsTrigger>
                  <TabsTrigger value="card">บัตรเครดิต</TabsTrigger>
                  <TabsTrigger value="installment">ผ่อน 50/50</TabsTrigger>
                </TabsList>
                <TabsContent value="promptpay" className="rounded-xl border border-border p-6 text-center">
                  <div className="mx-auto h-48 w-48 rounded-xl bg-soft-teal flex items-center justify-center text-muted-foreground text-sm">[QR PromptPay]</div>
                  <p className="mt-3 text-sm">โอนแล้วอัปโหลดสลิปในขั้นตอนถัดไป</p>
                </TabsContent>
                <TabsContent value="card" className="rounded-xl border border-border p-6 text-sm text-muted-foreground">ชำระผ่านบัตรเครดิต/เดบิต (Stripe — เร็วๆ นี้)</TabsContent>
                <TabsContent value="installment" className="rounded-xl border border-border p-6 text-sm">
                  <p>มัดจำ 50% : <b>{(total / 2).toLocaleString()} บาท</b> วันนี้</p>
                  <p>ส่วนที่เหลือ 50% : <b>{(total / 2).toLocaleString()} บาท</b> เมื่อส่งมอบงาน</p>
                </TabsContent>
              </Tabs>
              <div className="rounded-xl bg-soft-teal p-5">
                <div className="flex justify-between text-sm"><span>{pkg.name}</span><span>{pkg.price.toLocaleString()} ฿</span></div>
                {addons.map((a) => <div key={a.name} className="flex justify-between text-sm"><span>{a.name}</span><span>{a.price.toLocaleString()} ฿</span></div>)}
                <div className="mt-2 flex justify-between border-t border-border pt-2 text-lg font-bold text-primary"><span>รวม</span><span>{total.toLocaleString()} ฿</span></div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(2)} className="rounded-full">ย้อนกลับ</Button>
                <Button disabled={loading} onClick={submit} className="flex-1 rounded-full bg-orange text-orange-foreground hover:bg-orange/90 font-semibold">
                  {loading ? "กำลังบันทึก..." : "ยืนยันคำสั่งซื้อ"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
