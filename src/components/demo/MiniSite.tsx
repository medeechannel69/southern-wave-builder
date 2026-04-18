import { useState, type ReactNode } from "react";
import { Menu, X, Phone, MapPin, Mail, Facebook, MessageCircle } from "lucide-react";

export type DemoTheme = {
  primary: string;
  accent: string;
  bg: string;
  text: string;
  heroBg: string;
};

export type DemoPage = {
  id: string;
  label: string;
  content: ReactNode;
};

export type MiniSiteConfig = {
  brand: string;
  tagline: string;
  theme: DemoTheme;
  phone: string;
  address: string;
  email: string;
  pages: DemoPage[];
};

export function MiniSite({ config }: { config: MiniSiteConfig }) {
  const [active, setActive] = useState(config.pages[0].id);
  const [open, setOpen] = useState(false);
  const { theme } = config;
  const current = config.pages.find((p) => p.id === active) ?? config.pages[0];

  return (
    <div style={{ background: theme.bg, color: theme.text, fontFamily: "Sarabun, sans-serif" }}>
      {/* Header */}
      <header
        className="sticky top-0 z-40 border-b shadow-sm"
        style={{ background: "#fff", borderColor: "rgba(0,0,0,0.06)" }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 md:py-4">
          <div className="flex items-center gap-2">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-lg font-bold text-white"
              style={{ background: theme.primary }}
            >
              {config.brand.charAt(0)}
            </div>
            <div className="leading-tight">
              <div className="text-sm font-bold md:text-base" style={{ color: theme.primary }}>
                {config.brand}
              </div>
              <div className="text-[10px] text-gray-500 md:text-xs">{config.tagline}</div>
            </div>
          </div>

          <nav className="hidden items-center gap-1 md:flex">
            {config.pages.map((p) => (
              <button
                key={p.id}
                onClick={() => setActive(p.id)}
                className="rounded-md px-3 py-1.5 text-sm font-medium transition-colors"
                style={{
                  color: active === p.id ? "#fff" : theme.text,
                  background: active === p.id ? theme.primary : "transparent",
                }}
              >
                {p.label}
              </button>
            ))}
          </nav>

          <a
            href={`tel:${config.phone}`}
            className="hidden items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-white md:inline-flex"
            style={{ background: theme.accent }}
          >
            <Phone className="h-3.5 w-3.5" />
            โทรเลย
          </a>

          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded-md p-1.5 md:hidden"
            style={{ color: theme.primary }}
            aria-label="menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {open && (
          <div className="border-t md:hidden" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
            <div className="flex flex-col gap-1 px-4 py-2">
              {config.pages.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setActive(p.id);
                    setOpen(false);
                  }}
                  className="rounded-md px-3 py-2 text-left text-sm font-medium"
                  style={{
                    color: active === p.id ? "#fff" : theme.text,
                    background: active === p.id ? theme.primary : "transparent",
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Page content */}
      <main>{current.content}</main>

      {/* Footer */}
      <footer
        className="mt-12 border-t px-4 py-8 text-sm md:px-8"
        style={{ background: theme.primary, color: "#fff", borderColor: "rgba(0,0,0,0.1)" }}
      >
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          <div>
            <div className="mb-2 text-base font-bold">{config.brand}</div>
            <p className="text-xs opacity-80">{config.tagline}</p>
          </div>
          <div className="space-y-1.5 text-xs">
            <div className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <span>{config.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 shrink-0" />
              <span>{config.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 shrink-0" />
              <span>{config.email}</span>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <a href="#" className="rounded-full bg-white/15 p-2 hover:bg-white/25">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="#" className="rounded-full bg-white/15 p-2 hover:bg-white/25">
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div className="mx-auto mt-6 max-w-6xl border-t border-white/10 pt-4 text-center text-[11px] opacity-70">
          © {new Date().getFullYear()} {config.brand} — Powered by MedeeWeb
        </div>
      </footer>
    </div>
  );
}

/* ---------- Reusable page builders ---------- */

export function DemoHero({
  theme,
  eyebrow,
  title,
  subtitle,
  cta,
  image,
}: {
  theme: DemoTheme;
  eyebrow?: string;
  title: string;
  subtitle: string;
  cta: string;
  image: string;
}) {
  return (
    <section
      className="relative overflow-hidden px-4 py-12 md:px-8 md:py-20"
      style={{ background: theme.heroBg }}
    >
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 md:items-center">
        <div>
          {eyebrow && (
            <span
              className="inline-block rounded-full px-3 py-1 text-xs font-semibold"
              style={{ background: theme.accent, color: "#fff" }}
            >
              {eyebrow}
            </span>
          )}
          <h1
            className="mt-3 text-3xl font-bold leading-tight md:text-5xl"
            style={{ color: theme.primary, fontFamily: "Prompt, Sarabun, sans-serif" }}
          >
            {title}
          </h1>
          <p className="mt-3 text-sm opacity-80 md:text-base">{subtitle}</p>
          <button
            className="mt-5 rounded-full px-6 py-2.5 text-sm font-semibold text-white shadow-lg"
            style={{ background: theme.primary }}
          >
            {cta}
          </button>
        </div>
        <div className="overflow-hidden rounded-2xl shadow-xl">
          <img src={image} alt={title} className="h-full w-full object-cover" />
        </div>
      </div>
    </section>
  );
}

export function DemoSection({
  theme,
  title,
  children,
  alt,
}: {
  theme: DemoTheme;
  title: string;
  children: ReactNode;
  alt?: boolean;
}) {
  return (
    <section
      className="px-4 py-10 md:px-8 md:py-14"
      style={{ background: alt ? "#F7F9FB" : "#fff" }}
    >
      <div className="mx-auto max-w-6xl">
        <h2
          className="mb-6 text-center text-2xl font-bold md:text-3xl"
          style={{ color: theme.primary, fontFamily: "Prompt, Sarabun, sans-serif" }}
        >
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}

export function DemoCardGrid({
  theme,
  items,
}: {
  theme: DemoTheme;
  items: { title: string; desc: string; image?: string; price?: string }[];
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((it, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-xl bg-white shadow-md transition hover:shadow-xl"
          style={{ border: "1px solid rgba(0,0,0,0.05)" }}
        >
          {it.image && (
            <img src={it.image} alt={it.title} className="h-40 w-full object-cover" />
          )}
          <div className="p-4">
            <h3 className="mb-1 text-base font-semibold" style={{ color: theme.primary }}>
              {it.title}
            </h3>
            <p className="text-xs text-gray-600 md:text-sm">{it.desc}</p>
            {it.price && (
              <div
                className="mt-3 text-lg font-bold"
                style={{ color: theme.accent, fontFamily: "Prompt, sans-serif" }}
              >
                {it.price}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export function DemoContactPage({ theme, config }: { theme: DemoTheme; config: MiniSiteConfig }) {
  return (
    <DemoSection theme={theme} title="ติดต่อเรา">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-xl bg-white p-6 shadow-md">
          <div className="flex items-start gap-3">
            <MapPin className="mt-1 h-5 w-5" style={{ color: theme.accent }} />
            <div>
              <div className="text-sm font-semibold">ที่อยู่</div>
              <div className="text-sm text-gray-600">{config.address}</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="mt-1 h-5 w-5" style={{ color: theme.accent }} />
            <div>
              <div className="text-sm font-semibold">โทรศัพท์</div>
              <div className="text-sm text-gray-600">{config.phone}</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="mt-1 h-5 w-5" style={{ color: theme.accent }} />
            <div>
              <div className="text-sm font-semibold">อีเมล</div>
              <div className="text-sm text-gray-600">{config.email}</div>
            </div>
          </div>
        </div>
        <form className="space-y-3 rounded-xl bg-white p-6 shadow-md">
          <input
            placeholder="ชื่อ-นามสกุล"
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
          />
          <input
            placeholder="เบอร์โทร"
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
          />
          <textarea
            placeholder="ข้อความ"
            rows={4}
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
          />
          <button
            type="button"
            className="w-full rounded-full py-2.5 text-sm font-semibold text-white"
            style={{ background: theme.primary }}
          >
            ส่งข้อความ
          </button>
        </form>
      </div>
    </DemoSection>
  );
}
