import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/services", label: "บริการ" },
  { to: "/packages", label: "แพ็กเกจ" },
  { to: "/portfolio", label: "ผลงาน" },
  { to: "/demo", label: "ตัวอย่างเว็บ" },
  { to: "/about", label: "เกี่ยวกับ" },
  { to: "/blog", label: "บทความ" },
  { to: "/contact", label: "ติดต่อ" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:h-20 md:px-8">
        <Link to="/" className="shrink-0">
          <Logo variant="header" className="h-7 w-auto md:h-9" />
        </Link>
        <nav className="hidden items-center gap-5 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-base font-medium text-primary transition-colors hover:text-accent"
              activeProps={{ className: "text-accent font-semibold" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/quote" className="hidden md:inline-flex">
            <Button className="bg-orange text-orange-foreground hover:bg-orange/90 shadow-[var(--shadow-warm)] rounded-full px-6 text-sm md:text-base font-semibold">
              ขอใบเสนอราคา
            </Button>
          </Link>
          <button
            aria-label="เมนู"
            onClick={() => setOpen((v) => !v)}
            className="rounded-md p-2 text-primary lg:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border/60 bg-white lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-base font-medium text-primary hover:bg-secondary"
              >
                {n.label}
              </Link>
            ))}
            <Link to="/quote" onClick={() => setOpen(false)} className="mt-2">
              <Button className="w-full bg-orange text-orange-foreground hover:bg-orange/90 rounded-full font-semibold">
                ขอใบเสนอราคา
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
