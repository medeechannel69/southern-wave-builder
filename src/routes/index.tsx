import { createFileRoute } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import heroCoast from "@/assets/hero-coast.jpg";
import { Code2, Smartphone, Search, Zap, Palette, HeartHandshake, Waves, ArrowRight, Check } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* NAV */}
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
          <Logo className="h-9 w-9" />
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#services" className="text-base font-medium text-foreground transition-colors hover:text-primary">บริการ</a>
            <a href="#portfolio" className="text-base font-medium text-foreground transition-colors hover:text-primary">ผลงาน</a>
            <a href="#pricing" className="text-base font-medium text-foreground transition-colors hover:text-primary">ราคา</a>
            <a href="#contact" className="text-base font-medium text-foreground transition-colors hover:text-primary">ติดต่อ</a>
          </nav>
          <Button className="bg-orange text-orange-foreground hover:bg-orange/90 shadow-[var(--shadow-warm)] text-base font-medium">
            เริ่มต้นเลย
          </Button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroCoast} alt="ชายฝั่งภาคใต้" width={1920} height={1080} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[var(--gradient-hero)] opacity-90" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-36">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white backdrop-blur-md">
              <Waves className="h-4 w-4 text-teal" />
              <span>Madee with love from Southern Thailand</span>
            </div>
            <h1 className="hero-text-shadow font-display font-bold leading-tight text-white">
              เว็บไซต์ทำเว็บ
              <br />
              <span className="bg-gradient-to-r from-teal to-orange bg-clip-text text-transparent">
                อันดับ 1 ของคนใต้
              </span>
            </h1>
            <p className="hero-text-shadow mt-6 max-w-2xl text-base text-white md:text-lg" style={{ lineHeight: 1.7 }}>
              ออกแบบและพัฒนาเว็บไซต์คุณภาพสูง โดยทีมงานคนใต้ที่เข้าใจธุรกิจของคุณ
              ใช้งานง่าย สวยงาม รองรับทุกอุปกรณ์
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="h-14 bg-orange text-orange-foreground hover:bg-orange/90 shadow-[var(--shadow-warm)] text-base font-medium">
                ปรึกษาฟรี <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="h-14 border-white/40 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:text-white text-base font-medium">
                ดูผลงาน
              </Button>
            </div>
            <div className="hero-text-shadow mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white">
              {["100+ โปรเจ็กต์", "รีวิว 5 ดาว", "บริการหลังการขาย", "ราคามิตรภาพ"].map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-teal" /> {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="bg-secondary py-20 md:py-[80px]" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">บริการของเรา</span>
            <h2 className="mt-3 text-foreground">
              ทุกสิ่งที่ธุรกิจคุณต้องการ
            </h2>
            <p className="mt-4 text-base text-foreground/80 md:text-lg">ครบวงจรตั้งแต่ออกแบบ พัฒนา จนถึงดูแลรักษา</p>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Palette, title: "ออกแบบเว็บไซต์", desc: "ดีไซน์ที่ตอบโจทย์แบรนด์ สวยงามและใช้งานง่าย", color: "text-primary", bg: "bg-primary/10" },
              { icon: Code2, title: "พัฒนาเว็บแอป", desc: "เขียนโค้ดด้วยเทคโนโลยีล่าสุด รวดเร็ว ปลอดภัย", color: "text-teal", bg: "bg-teal/10" },
              { icon: Smartphone, title: "Responsive Design", desc: "รองรับมือถือ แท็บเล็ต และเดสก์ท็อปทุกขนาด", color: "text-orange", bg: "bg-orange/10" },
              { icon: Search, title: "SEO Optimization", desc: "ติดอันดับ Google ด้วยเทคนิค SEO แบบมืออาชีพ", color: "text-primary", bg: "bg-primary/10" },
              { icon: Zap, title: "ความเร็วสูง", desc: "เว็บไซต์โหลดเร็ว ประสบการณ์ผู้ใช้ดีเยี่ยม", color: "text-teal", bg: "bg-teal/10" },
              { icon: HeartHandshake, title: "ดูแลหลังการขาย", desc: "ทีมซัพพอร์ตคนใต้ พร้อมช่วยเหลือตลอด 24 ชม.", color: "text-orange", bg: "bg-orange/10" },
            ].map((s) => (
              <Card key={s.title} className="group relative overflow-hidden border-border/50 p-8 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
                <div className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${s.bg}`}>
                  <s.icon className={`h-7 w-7 ${s.color}`} />
                </div>
                <h3 className="text-foreground">{s.title}</h3>
                <p className="mt-2 text-base text-foreground/75">{s.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="relative overflow-hidden bg-[var(--gradient-wave)]" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 px-4 text-center md:flex-row md:px-8 md:text-left">
          <div>
            <h3 className="hero-text-shadow font-display font-bold text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>พร้อมเริ่มโปรเจ็กต์ของคุณหรือยัง?</h3>
            <p className="hero-text-shadow mt-2 text-base text-white md:text-lg">ปรึกษาฟรี ไม่มีค่าใช้จ่าย ทีมงานคนใต้พร้อมดูแลคุณ</p>
          </div>
          <Button size="lg" className="h-14 shrink-0 bg-orange text-orange-foreground hover:bg-orange/90 shadow-[var(--shadow-warm)] text-base font-medium">
            ติดต่อเราเลย <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="bg-navy text-navy-foreground">
        <div className="mx-auto max-w-7xl px-4 md:px-8" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
          <div className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-2">
              <Logo className="h-10 w-10" textClassName="text-white" />
              <p className="mt-4 max-w-md text-base text-white/85">
                เว็บไซต์ทำเว็บอันดับ 1 ของคนใต้ — สร้างสรรค์ทุกโปรเจ็กต์ด้วยใจรักและความเข้าใจในวัฒนธรรมท้องถิ่น
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-teal">บริการ</h4>
              <ul className="space-y-2 text-base text-white/85">
                <li>ออกแบบเว็บไซต์</li>
                <li>พัฒนาเว็บแอป</li>
                <li>SEO</li>
                <li>ดูแลรักษา</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-teal">ติดต่อ</h4>
              <ul className="space-y-2 text-base text-white/85">
                <li>📧 hello@medeeweb.com</li>
                <li>📱 081-234-5678</li>
                <li>📍 ภาคใต้ ประเทศไทย</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-white/70">
            © {new Date().getFullYear()} MedeeWeb. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
