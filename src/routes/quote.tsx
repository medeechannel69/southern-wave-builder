import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, type FormEvent } from "react";
import { CalendarDays, CheckCircle2, Download, FileText, ShieldCheck } from "lucide-react";
import { PageShell, PageHero } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { notify, ADMIN_EMAILS } from "@/lib/email/notify";
import { sanitizeText } from "@/lib/sanitize";
import {
  calculateQuote,
  createQuoteNumber,
  formatCurrency,
  formatThaiDate,
  QUOTE_ADDONS,
  QUOTE_PACKAGES,
} from "@/lib/quote";
import { generateQuotePDF } from "@/lib/pdf/generateQuote";

export const Route = createFileRoute("/quote")({
  head: () => ({
    meta: [
      { title: "ขอใบเสนอราคาอัตโนมัติ — MedeeWeb" },
      {
        name: "description",
        content:
          "กรอกความต้องการ รับใบเสนอราคาเบื้องต้นทันที เริ่มต้น 5,000 บาท พร้อมกำหนดส่งชัดเจน",
      },
      { property: "og:title", content: "ขอใบเสนอราคาอัตโนมัติ — MedeeWeb" },
      {
        property: "og:description",
        content:
          "กรอกความต้องการ รับใบเสนอราคาเบื้องต้นทันที เริ่มต้น 5,000 บาท พร้อมกำหนดส่งชัดเจน",
      },
    ],
    links: [{ rel: "canonical", href: "https://medeeweb.com/quote" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "หน้าแรก", item: "https://medeeweb.com" },
            {
              "@type": "ListItem",
              position: 2,
              name: "ขอใบเสนอราคา",
              item: "https://medeeweb.com/quote",
            },
          ],
        }),
      },
    ],
  }),
  component: QuotePage,
});

const businessTypes = [
  "ร้านอาหาร",
  "โรงแรม/รีสอร์ท",
  "บริษัท",
  "อสังหาฯ",
  "ผู้รับเหมา",
  "ตัวแทนประกัน",
  "หน่วยงานราชการ",
  "อื่นๆ",
];
const budgets = ["น้อยกว่า 5,000", "5,000 - 10,000", "10,000 - 20,000", "มากกว่า 20,000"];

function QuotePage() {
  const [loading, setLoading] = useState(false);
  const [addons, setAddons] = useState<string[]>([]);
  const [submittedQuote, setSubmittedQuote] = useState<{
    number: string;
    quote: ReturnType<typeof calculateQuote>;
    customer: { name: string; phone: string; email: string; lineId: string };
  } | null>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    line_id: "",
    business_type: businessTypes[0],
    package_name: QUOTE_PACKAGES[0].label,
    budget: budgets[0],
    details: "",
  });

  const quote = useMemo(
    () => calculateQuote(form.package_name, addons),
    [form.package_name, addons],
  );

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error("กรุณากรอกชื่อและเบอร์โทร");
      return;
    }

    setLoading(true);
    const quoteNumber = createQuoteNumber();
    const submittedAt = new Date();
    const calculated = calculateQuote(form.package_name, addons, submittedAt);
    const quoteDetails = [
      form.details.trim(),
      `สรุปใบเสนอราคาอัตโนมัติ: ${quoteNumber} | ยอดรวม ${formatCurrency(calculated.total)} | ส่งภายใน ${calculated.deliveryDays} วันทำการ (${formatThaiDate(calculated.estimatedDeliveryDate)})`,
    ]
      .filter(Boolean)
      .join("\n\n");

    const fullQuotePayload = {
      name: sanitizeText(form.name, 200),
      phone: sanitizeText(form.phone, 50),
      email: sanitizeText(form.email, 255),
      line_id: sanitizeText(form.line_id, 100),
      business_type: sanitizeText(form.business_type, 100),
      package_name: sanitizeText(form.package_name, 100),
      budget: sanitizeText(form.budget, 100),
      details: sanitizeText(quoteDetails, 2000),
      addons: calculated.addons,
      quote_number: quoteNumber,
      total_amount: calculated.total,
      delivery_days: calculated.deliveryDays,
      estimated_delivery_date: calculated.estimatedDeliveryDate,
      breakdown: {
        package: calculated.package,
        addons: calculated.addons,
        subtotal: calculated.subtotal,
        total: calculated.total,
        deliveryDays: calculated.deliveryDays,
        estimatedDeliveryDate: calculated.estimatedDeliveryDate,
      },
    };
    let { error } = await supabase.from("quotes").insert(fullQuotePayload);
    if (error && /quote_number|column .* does not exist|schema cache/i.test(error.message)) {
      // Keep the public form usable while an existing Supabase project is waiting for the migration.
      const legacyResult = await supabase.from("quotes").insert({
        name: fullQuotePayload.name,
        phone: fullQuotePayload.phone,
        email: fullQuotePayload.email,
        line_id: fullQuotePayload.line_id,
        business_type: fullQuotePayload.business_type,
        package_name: fullQuotePayload.package_name,
        budget: fullQuotePayload.budget,
        details: fullQuotePayload.details,
        addons: fullQuotePayload.addons,
      });
      error = legacyResult.error;
    }

    setLoading(false);
    if (error) {
      toast.error("เกิดข้อผิดพลาด: " + error.message);
      return;
    }

    const customer = {
      name: form.name,
      phone: form.phone,
      email: form.email,
      lineId: form.line_id,
    };
    setSubmittedQuote({ number: quoteNumber, quote: calculated, customer });

    if (form.email) {
      void notify({
        templateName: "quote-received",
        recipientEmail: form.email,
        idempotencyKey: `quote-${quoteNumber}-customer`,
        templateData: {
          customerName: form.name,
          packageName: form.package_name,
          budget: form.budget,
          quoteNumber,
          totalAmount: calculated.total,
          deliveryDays: calculated.deliveryDays,
          estimatedDeliveryDate: formatThaiDate(calculated.estimatedDeliveryDate),
          addons: calculated.addons,
        },
      });
    }
    void notify({
      templateName: "lead-notification",
      recipientEmail: ADMIN_EMAILS,
      idempotencyKey: `quote-${quoteNumber}-admin`,
      templateData: {
        leadName: form.name,
        phone: form.phone,
        lineId: form.line_id,
        businessType: form.business_type,
        budget: form.budget,
        message: `ขอใบเสนอราคา ${quoteNumber}: ${form.package_name} | ยอดรวม ${formatCurrency(calculated.total)} | ส่ง ${calculated.deliveryDays} วัน | ${form.details}`,
      },
    });
    toast.success("สร้างใบเสนอราคาอัตโนมัติสำเร็จ");
  };

  const resetForm = () => {
    setSubmittedQuote(null);
    setForm({
      name: "",
      phone: "",
      email: "",
      line_id: "",
      business_type: businessTypes[0],
      package_name: QUOTE_PACKAGES[0].label,
      budget: budgets[0],
      details: "",
    });
    setAddons([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <PageShell>
      <PageHero
        eyebrow="ขอใบเสนอราคาอัตโนมัติ"
        title="กรอกข้อมูล รับราคาเบื้องต้นทันที"
        subtitle="เริ่มต้น 5,000 บาท พร้อมสรุปรายการและกำหนดส่งให้ดูทันทีหลังกรอกข้อมูล"
      />
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-[minmax(0,1fr)_360px] md:px-8">
          <form
            onSubmit={submit}
            className="space-y-6 rounded-2xl border border-border/60 bg-white p-5 shadow-[var(--shadow-elegant)] md:p-8"
          >
            <div>
              <h2 className="text-xl font-bold text-primary md:text-2xl">ข้อมูลโปรเจกต์</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                ข้อมูลนี้ใช้สำหรับคำนวณราคาเบื้องต้นและให้ทีมงานติดต่อกลับ
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <Label>ชื่อ-นามสกุล *</Label>
                <Input
                  required
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="เช่น สมชาย ใจดี"
                />
              </div>
              <div>
                <Label>เบอร์โทร *</Label>
                <Input
                  required
                  inputMode="tel"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder="099-xxx-xxxx"
                />
              </div>
              <div>
                <Label>อีเมล</Label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="name@example.com"
                />
              </div>
              <div>
                <Label>LINE ID</Label>
                <Input
                  value={form.line_id}
                  onChange={(e) => updateField("line_id", e.target.value)}
                  placeholder="สำหรับติดต่อกลับเร็วขึ้น"
                />
              </div>
              <div>
                <Label>ประเภทธุรกิจ</Label>
                <select
                  className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  value={form.business_type}
                  onChange={(e) => updateField("business_type", e.target.value)}
                >
                  {businessTypes.map((business) => (
                    <option key={business}>{business}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>งบประมาณ</Label>
                <select
                  className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  value={form.budget}
                  onChange={(e) => updateField("budget", e.target.value)}
                >
                  {budgets.map((budget) => (
                    <option key={budget}>{budget}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <Label>แพ็กเกจที่สนใจ</Label>
              <div className="mt-2 grid gap-3 sm:grid-cols-3">
                {QUOTE_PACKAGES.slice(0, 3).map((item) => (
                  <label
                    key={item.label}
                    className={`cursor-pointer rounded-xl border p-4 transition ${form.package_name === item.label ? "border-primary bg-primary/5 ring-2 ring-primary/15" : "border-border hover:border-primary/40"}`}
                  >
                    <input
                      type="radio"
                      name="package"
                      value={item.label}
                      checked={form.package_name === item.label}
                      onChange={() => updateField("package_name", item.label)}
                      className="sr-only"
                    />
                    <span className="block text-sm font-bold text-primary">{item.label}</span>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      ส่ง {item.deliveryDays} วันทำการ
                    </span>
                  </label>
                ))}
              </div>
              <label className="mt-3 flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
                <input
                  type="radio"
                  name="package"
                  value="ยังไม่ตัดสินใจ"
                  checked={form.package_name === "ยังไม่ตัดสินใจ"}
                  onChange={() => updateField("package_name", "ยังไม่ตัดสินใจ")}
                />
                ยังไม่ตัดสินใจ ให้ทีมงานช่วยแนะนำ
              </label>
            </div>

            <div>
              <Label>บริการเสริม</Label>
              <div className="mt-2 grid grid-cols-2 gap-3 md:grid-cols-3">
                {QUOTE_ADDONS.map((addon) => (
                  <label
                    key={addon.name}
                    className={`flex cursor-pointer items-center gap-2 rounded-lg border p-3 text-sm transition ${addons.includes(addon.name) ? "border-primary bg-primary/5" : "border-border"}`}
                  >
                    <Checkbox
                      checked={addons.includes(addon.name)}
                      onCheckedChange={(checked) =>
                        setAddons((current) =>
                          checked
                            ? [...current, addon.name]
                            : current.filter((name) => name !== addon.name),
                        )
                      }
                    />
                    <span>
                      {addon.name}
                      <small className="block text-xs text-muted-foreground">
                        +{addon.price.toLocaleString("th-TH")} บาท
                      </small>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <Label>รายละเอียดเพิ่มเติม</Label>
              <Textarea
                rows={5}
                value={form.details}
                onChange={(e) => updateField("details", e.target.value)}
                placeholder="บอกเราเกี่ยวกับธุรกิจ จำนวนหน้า ระบบที่ต้องการ หรือเว็บไซต์อ้างอิง"
              />
            </div>

            <Button
              disabled={loading}
              type="submit"
              size="lg"
              className="w-full rounded-full bg-orange font-semibold text-orange-foreground hover:bg-orange/90"
            >
              {loading ? "กำลังสร้างใบเสนอราคา..." : "ส่งข้อมูลและรับใบเสนอราคา"}
            </Button>
            <p className="flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" />
              ข้อมูลของคุณจะถูกใช้เพื่อประเมินงานและติดต่อกลับเท่านั้น
            </p>
          </form>

          <aside className="h-fit rounded-2xl border border-primary/15 bg-soft-teal p-5 md:sticky md:top-24 md:p-6">
            <div className="flex items-center gap-2 text-primary">
              <FileText className="h-5 w-5" />
              <h2 className="font-bold">ใบเสนอราคาเบื้องต้น</h2>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              ราคาอัปเดตตามแพ็กเกจและบริการเสริมที่เลือก
            </p>
            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <span>{quote.package.label}</span>
                <strong>{formatCurrency(quote.package.price)}</strong>
              </div>
              {quote.addons.map((addon) => (
                <div key={addon.name} className="flex justify-between gap-4 text-muted-foreground">
                  <span>{addon.name}</span>
                  <span>{formatCurrency(addon.price)}</span>
                </div>
              ))}
              {quote.addons.length === 0 && (
                <p className="text-xs text-muted-foreground">ยังไม่ได้เลือกบริการเสริม</p>
              )}
              <div className="border-t border-primary/15 pt-3">
                <div className="flex justify-between gap-4 text-base font-bold text-primary">
                  <span>ยอดรวม</span>
                  <span>{formatCurrency(quote.total)}</span>
                </div>
              </div>
            </div>
            <div className="mt-5 rounded-xl bg-white p-4 text-sm">
              <div className="flex items-center gap-2 font-semibold text-primary">
                <CalendarDays className="h-4 w-4" />
                กำหนดส่งโดยประมาณ
              </div>
              <p className="mt-2 font-bold text-orange">ภายใน {quote.deliveryDays} วันทำการ</p>
              <p className="mt-1 text-xs text-muted-foreground">
                ประมาณวันที่ {formatThaiDate(quote.estimatedDeliveryDate)}
              </p>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              ราคาเป็นประมาณการจากข้อมูลเบื้องต้น
              ทีมงานจะยืนยันขอบเขตงานและราคาอีกครั้งก่อนเริ่มพัฒนา
            </p>
          </aside>
        </div>
      </section>

      {submittedQuote && (
        <section className="bg-deep-blue px-4 py-12 text-white md:py-16">
          <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 text-foreground shadow-2xl md:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle2 className="h-6 w-6" />
                  <span className="font-semibold">สร้างใบเสนอราคาสำเร็จ</span>
                </div>
                <h2 className="mt-2 text-2xl font-bold text-primary">
                  ขอบคุณคุณ{submittedQuote.customer.name}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  เลขที่ใบเสนอราคา: {submittedQuote.number}
                </p>
              </div>
              <Button
                variant="outline"
                className="gap-2"
                onClick={() =>
                  void generateQuotePDF(
                    submittedQuote.number,
                    submittedQuote.customer,
                    submittedQuote.quote,
                  )
                }
              >
                <Download className="h-4 w-4" />
                ดาวน์โหลด PDF
              </Button>
            </div>
            <div className="mt-6 grid gap-4 rounded-xl bg-soft-teal p-5 sm:grid-cols-3">
              <div>
                <p className="text-xs text-muted-foreground">ยอดรวม</p>
                <p className="mt-1 text-xl font-bold text-orange">
                  {formatCurrency(submittedQuote.quote.total)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">แพ็กเกจ</p>
                <p className="mt-1 font-semibold text-primary">
                  {submittedQuote.quote.package.label}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">กำหนดส่ง</p>
                <p className="mt-1 font-semibold text-primary">
                  {formatThaiDate(submittedQuote.quote.estimatedDeliveryDate)}
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button
                className="flex-1 rounded-full bg-primary"
                onClick={() =>
                  void generateQuotePDF(
                    submittedQuote.number,
                    submittedQuote.customer,
                    submittedQuote.quote,
                  )
                }
              >
                <Download className="mr-2 h-4 w-4" />
                ดาวน์โหลดใบเสนอราคา
              </Button>
              <Button variant="outline" className="flex-1 rounded-full" onClick={resetForm}>
                สร้างใบเสนอราคาใหม่
              </Button>
            </div>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              หากกรอกอีเมลไว้ ระบบได้ส่งสรุปใบเสนอราคาไปให้แล้ว
              และทีมงานจะติดต่อกลับเพื่อยืนยันรายละเอียด
            </p>
          </div>
        </section>
      )}
    </PageShell>
  );
}
