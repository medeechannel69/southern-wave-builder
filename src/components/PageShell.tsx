import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { FloatingActions } from "./FloatingActions";
import { CookieBanner } from "./CookieBanner";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <FloatingActions />
      <CookieBanner />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="bg-soft-teal py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-4 text-center md:px-8">
        {eyebrow && (
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/80 px-4 py-1.5 text-xs md:text-sm font-semibold text-primary">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-4 font-display font-bold text-primary">{title}</h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-foreground/80" style={{ lineHeight: 1.7 }}>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
