import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { z } from "zod";

const search = z.object({ code: z.string().optional() });

export const Route = createFileRoute("/order/success")({
  validateSearch: (s) => search.parse(s),
  head: () => ({
    meta: [
      { title: "สั่งซื้อสำเร็จ — MedeeWeb" },
      { name: "description", content: "ขอบคุณที่สั่งทำเว็บไซต์กับ MedeeWeb" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Success,
});

function Success() {
  const { code } = Route.useSearch();
  return (
    <PageShell>
      <section className="bg-white py-24">
        <div className="mx-auto max-w-xl px-4 text-center">
          <CheckCircle2 className="mx-auto h-20 w-20 text-accent" />
          <h1 className="mt-6 text-3xl font-bold text-primary">สั่งซื้อสำเร็จ!</h1>
          {code && (
            <p className="mt-3 text-lg">รหัสคำสั่งซื้อ: <span className="font-mono font-bold text-orange">{code}</span></p>
          )}
          <p className="mt-3 text-muted-foreground">โปรดบันทึกรหัสนี้ไว้สำหรับติดตามสถานะโปรเจค ทีมงานจะติดต่อกลับเพื่อยืนยันและเริ่มงาน</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            {code && <Link to="/track/$orderCode" params={{ orderCode: code }}><Button className="rounded-full bg-orange text-orange-foreground hover:bg-orange/90 font-semibold">ติดตามสถานะ</Button></Link>}
            <Link to="/"><Button variant="outline" className="rounded-full">กลับหน้าแรก</Button></Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
