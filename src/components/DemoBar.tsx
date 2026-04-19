import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Monitor, Tablet, Smartphone, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

type Viewport = "desktop" | "tablet" | "mobile";

const widths: Record<Viewport, string> = {
  desktop: "100%",
  tablet: "820px",
  mobile: "390px",
};

export function DemoBar({
  industryLabel,
  industryName,
  slug,
  priceFrom,
  children,
}: {
  industryLabel: string;
  industryName: string;
  slug?: string;
  priceFrom?: number;
  children: ReactNode;
}) {
  const [viewport, setViewport] = useState<Viewport>("desktop");

  const btn = (v: Viewport, Icon: typeof Monitor, label: string) => (
    <button
      onClick={() => setViewport(v)}
      aria-label={label}
      className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
        viewport === v
          ? "bg-primary text-primary-foreground"
          : "bg-white/10 text-white hover:bg-white/20"
      }`}
    >
      <Icon className="h-3.5 w-3.5" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="sticky top-0 z-50 border-b border-white/10 bg-[#0D2B5E] text-white shadow-lg">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-3 py-2 md:px-6">
          <div className="flex items-center gap-2 md:gap-3">
            <Link
              to="/demo"
              className="inline-flex items-center gap-1 rounded-md bg-white/10 px-2.5 py-1.5 text-xs font-medium hover:bg-white/20"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">กลับ Demo</span>
            </Link>
            <div className="flex flex-col leading-tight">
              <span className="text-[10px] uppercase tracking-wider text-white/60">
                MedeeWeb Demo
              </span>
              <span className="text-xs font-semibold md:text-sm">
                ตัวอย่างเว็บ {industryName} · {industryLabel}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {btn("desktop", Monitor, "Desktop")}
            {btn("tablet", Tablet, "Tablet")}
            {btn("mobile", Smartphone, "Mobile")}
          </div>

          <Link
            to="/order"
            search={slug ? { type: slug } : undefined}
            className="inline-flex"
          >
            <Button
              size="sm"
              className="rounded-full bg-orange text-orange-foreground hover:bg-orange/90 font-semibold"
            >
              <ExternalLink className="mr-1 h-3.5 w-3.5" />
              <span className="hidden sm:inline">สั่งทำเว็บแบบนี้ </span>
              {priceFrom ? `เริ่ม ${priceFrom.toLocaleString()}฿` : "สั่งทำ"}
            </Button>
          </Link>
        </div>
      </div>

      <div className="mx-auto px-2 py-4 md:px-6 md:py-6" style={{ maxWidth: "100%" }}>
        <div
          className="mx-auto overflow-hidden rounded-lg bg-white shadow-2xl transition-all duration-300"
          style={{ width: widths[viewport], maxWidth: "100%" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
