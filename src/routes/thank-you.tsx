import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [{ title: "ขอบคุณ — MedeeWeb" }, { name: "description", content: "ขอบคุณที่ติดต่อ MedeeWeb" }],
  }),
  component: ThankYou,
});

function ThankYou() {
  return (
    <PageShell>
      <section className="bg-white py-24">
        <div className="mx-auto max-w-xl px-4 text-center">
          <CheckCircle2 className="mx-auto h-20 w-20 text-accent" />
          <h1 className="mt-6 text-3xl font-bold text-primary">ขอบคุณที่ติดต่อ MedeeWeb!</h1>
          <p className="mt-3 text-muted-foreground">ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง — ระหว่างรอ ลองดูผลงานของเราได้เลย</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link to="/portfolio"><Button className="rounded-full bg-orange text-orange-foreground hover:bg-orange/90 font-semibold">ดูผลงาน</Button></Link>
            <Link to="/"><Button variant="outline" className="rounded-full">กลับหน้าแรก</Button></Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
