import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageShell, PageHero } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Check, X, Loader2 } from "lucide-react";

export const Route = createFileRoute("/unsubscribe")({
  head: () => ({ meta: [{ title: "ยกเลิกการรับอีเมล — MedeeWeb" }] }),
  component: UnsubscribePage,
  validateSearch: (s: Record<string, unknown>) => ({ token: typeof s.token === "string" ? s.token : "" }),
});

function UnsubscribePage() {
  const { token } = Route.useSearch();
  const [state, setState] = useState<"loading" | "valid" | "invalid" | "already" | "done" | "error">("loading");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!token) { setState("invalid"); return; }
    fetch(`/email/unsubscribe?token=${encodeURIComponent(token)}`)
      .then(async (r) => {
        const d = await r.json().catch(() => ({}));
        if (!r.ok) setState("invalid");
        else if (d.valid) setState("valid");
        else if (d.reason === "already_unsubscribed") setState("already");
        else setState("invalid");
      })
      .catch(() => setState("error"));
  }, [token]);

  const confirm = async () => {
    setSubmitting(true);
    try {
      const r = await fetch("/email/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const d = await r.json().catch(() => ({}));
      if (r.ok && d.success) setState("done");
      else if (d.reason === "already_unsubscribed") setState("already");
      else setState("error");
    } catch { setState("error"); }
    setSubmitting(false);
  };

  return (
    <PageShell>
      <PageHero eyebrow="อีเมล" title="ยกเลิกการรับอีเมล" subtitle="จัดการการสมัครรับอีเมลจาก MedeeWeb" />
      <section className="bg-white py-16">
        <div className="mx-auto max-w-md px-4 text-center">
          {state === "loading" && (<div className="space-y-3"><Loader2 className="mx-auto h-10 w-10 animate-spin text-muted-foreground" /><p>กำลังตรวจสอบ...</p></div>)}
          {state === "valid" && (
            <div className="space-y-5 rounded-2xl border border-border p-8">
              <p className="text-muted-foreground">กดยืนยันเพื่อหยุดรับอีเมลจาก MedeeWeb</p>
              <Button disabled={submitting} onClick={confirm} size="lg" className="w-full rounded-full bg-orange text-orange-foreground hover:bg-orange/90 font-semibold">
                {submitting ? "กำลังดำเนินการ..." : "ยืนยันยกเลิกการรับอีเมล"}
              </Button>
            </div>
          )}
          {state === "done" && (<div className="rounded-2xl border border-accent bg-accent/10 p-8"><Check className="mx-auto h-14 w-14 text-accent" /><h2 className="mt-3 text-xl font-bold text-primary">ยกเลิกเรียบร้อย</h2><p className="mt-2 text-muted-foreground">คุณจะไม่ได้รับอีเมลจากเราอีก</p></div>)}
          {state === "already" && (<div className="rounded-2xl border border-border p-8"><Check className="mx-auto h-14 w-14 text-muted-foreground" /><p className="mt-3">ที่อยู่นี้ถูกยกเลิกการรับอีเมลแล้ว</p></div>)}
          {(state === "invalid" || state === "error") && (<div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-8"><X className="mx-auto h-14 w-14 text-destructive" /><p className="mt-3">ลิงก์ไม่ถูกต้องหรือหมดอายุ</p></div>)}
        </div>
      </section>
    </PageShell>
  );
}
