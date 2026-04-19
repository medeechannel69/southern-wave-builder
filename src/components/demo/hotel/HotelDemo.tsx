import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Wifi,
  Waves,
  UtensilsCrossed,
  Sparkles,
  Dumbbell,
  ChevronRight,
  Calendar,
  Users,
  Award,
  Quote,
  Instagram,
  Facebook,
  Plane,
  Leaf,
  Flower2,
  HeartPulse,
  ChevronLeft,
} from "lucide-react";
import heroImage from "@/assets/demo-hotel-hero.jpg";

/**
 * Andaman Sands — Premium Luxury Hotel Demo
 * Aesthetic: Aman / Six Senses / Soneva
 * Palette: Deep teal #0A3D45 + champagne gold #C9A961 + ivory #F8F4ED
 * Typography: Cormorant Garamond (serif display) + Inter (body)
 */

const BRAND = {
  name: "ANDAMAN SANDS",
  nameTH: "อันดามัน แซนด์ส",
  tagline: "A private sanctuary on the Andaman coast",
  taglineTH: "พักผ่อนระดับเหนือกาลเวลา ริมทะเลกระบี่",
  phone: "+66 75 818 888",
  email: "reservations@andamansands.com",
  address: "199 Moo 2, Ao Nang, Krabi 81000, Thailand",
};

const PALETTE = {
  ink: "#0A3D45",
  gold: "#C9A961",
  cream: "#F8F4ED",
  warmGray: "#5A5247",
  paper: "#FFFFFF",
};

const NAV = [
  { id: "home", label: "Stay" },
  { id: "rooms", label: "Suites & Villas" },
  { id: "dining", label: "Dining" },
  { id: "experiences", label: "Experiences" },
  { id: "wellness", label: "Wellness" },
  { id: "gallery", label: "Gallery" },
  { id: "contact", label: "Reserve" },
];

export function HotelDemo() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setScrollY(y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (id: string) => {
    setActive(id);
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <div
      style={{
        background: PALETTE.cream,
        color: PALETTE.warmGray,
        fontFamily: "'Inter', 'Sarabun', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
        .serif { font-family: 'Cormorant Garamond', Georgia, serif; }
        .tracking-luxe { letter-spacing: 0.28em; }
        .fade-up { animation: fadeUp 0.9s cubic-bezier(.2,.8,.2,1) both; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
        .h-display { font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 300; line-height: 1.05; letter-spacing: -0.01em; }
        .body-lg { font-size: clamp(0.95rem, 0.85rem + 0.4vw, 1.125rem); line-height: 1.75; }
        .body-md { font-size: clamp(0.875rem, 0.8rem + 0.25vw, 1rem); line-height: 1.7; }
        @keyframes ken { 0% { transform: scale(1.05) translateY(0); } 100% { transform: scale(1.15) translateY(-2%); } }
        .ken-burns { animation: ken 18s ease-in-out infinite alternate; }
        .lightbox-fade { animation: lbFade 0.25s ease-out both; }
        @keyframes lbFade { from { opacity: 0; } to { opacity: 1; } }
      `}</style>

      {/* === Navigation === */}
      <header
        className="sticky top-0 z-40 transition-all duration-300"
        style={{
          background: scrolled ? PALETTE.paper : "rgba(255,255,255,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: scrolled ? `1px solid ${PALETTE.gold}33` : "1px solid transparent",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-8 md:py-4">
          <button onClick={() => goTo("home")} className="flex items-center gap-2.5 text-left">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold tracking-wider"
              style={{
                background: PALETTE.ink,
                color: PALETTE.gold,
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              AS
            </div>
            <div className="leading-tight">
              <div
                className="text-[11px] font-semibold tracking-luxe md:text-xs"
                style={{ color: PALETTE.ink }}
              >
                {BRAND.name}
              </div>
              <div className="text-[9px] uppercase tracking-widest opacity-60 md:text-[10px]">
                Krabi · Thailand
              </div>
            </div>
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => goTo(n.id)}
                className="relative px-3 py-2 text-[11px] font-medium uppercase tracking-luxe transition-colors"
                style={{ color: active === n.id ? PALETTE.ink : PALETTE.warmGray }}
              >
                {n.label}
                {active === n.id && (
                  <span
                    className="absolute -bottom-0.5 left-1/2 h-px w-6 -translate-x-1/2"
                    style={{ background: PALETTE.gold }}
                  />
                )}
              </button>
            ))}
          </nav>

          <button
            onClick={() => goTo("contact")}
            className="hidden rounded-none border px-5 py-2.5 text-[11px] font-semibold uppercase tracking-luxe transition-all hover:bg-[var(--ink)] hover:text-white md:inline-flex"
            style={
              {
                color: PALETTE.ink,
                borderColor: PALETTE.ink,
                "--ink": PALETTE.ink,
              } as React.CSSProperties
            }
          >
            Book Your Stay
          </button>

          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded-md p-1.5 md:hidden"
            style={{ color: PALETTE.ink }}
            aria-label="menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {open && (
          <div className="border-t md:hidden" style={{ borderColor: `${PALETTE.gold}33` }}>
            <div className="flex flex-col py-2">
              {NAV.map((n) => (
                <button
                  key={n.id}
                  onClick={() => goTo(n.id)}
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-luxe"
                  style={{
                    color: active === n.id ? PALETTE.ink : PALETTE.warmGray,
                    background: active === n.id ? `${PALETTE.gold}15` : "transparent",
                  }}
                >
                  {n.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* === Page === */}
      <main key={active} className="fade-up">
        {active === "home" && <HomePage scrollY={scrollY} onCta={() => goTo("contact")} onRooms={() => goTo("rooms")} />}
        {active === "rooms" && <RoomsPage onBook={() => goTo("contact")} />}
        {active === "dining" && <DiningPage />}
        {active === "experiences" && <ExperiencesPage />}
        {active === "wellness" && <WellnessPage onBook={() => goTo("contact")} />}
        {active === "gallery" && <GalleryPage />}
        {active === "contact" && <ContactPage />}
      </main>

      {/* === Footer === */}
      <footer style={{ background: PALETTE.ink, color: PALETTE.cream }}>
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4 md:px-8">
          <div>
            <div
              className="serif text-2xl font-light"
              style={{ color: PALETTE.gold }}
            >
              Andaman Sands
            </div>
            <p className="mt-3 text-xs leading-relaxed opacity-70">
              {BRAND.taglineTH}
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded-full border opacity-70 transition hover:opacity-100"
                style={{ borderColor: `${PALETTE.gold}66` }}
              >
                <Instagram className="h-3.5 w-3.5" />
              </a>
              <a
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded-full border opacity-70 transition hover:opacity-100"
                style={{ borderColor: `${PALETTE.gold}66` }}
              >
                <Facebook className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <div>
            <div
              className="mb-4 text-[10px] font-semibold uppercase tracking-luxe"
              style={{ color: PALETTE.gold }}
            >
              The Resort
            </div>
            <ul className="space-y-2 text-xs opacity-80">
              {NAV.map((n) => (
                <li key={n.id}>
                  <button onClick={() => goTo(n.id)} className="hover:opacity-100 hover:underline">
                    {n.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div
              className="mb-4 text-[10px] font-semibold uppercase tracking-luxe"
              style={{ color: PALETTE.gold }}
            >
              Contact
            </div>
            <ul className="space-y-2.5 text-xs opacity-80">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span>{BRAND.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 shrink-0" />
                <span>{BRAND.phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 shrink-0" />
                <span>{BRAND.email}</span>
              </li>
            </ul>
          </div>

          <div>
            <div
              className="mb-4 text-[10px] font-semibold uppercase tracking-luxe"
              style={{ color: PALETTE.gold }}
            >
              Recognition
            </div>
            <ul className="space-y-2 text-xs opacity-80">
              <li className="flex items-center gap-2">
                <Award className="h-3.5 w-3.5" style={{ color: PALETTE.gold }} />
                Travel + Leisure 2024
              </li>
              <li className="flex items-center gap-2">
                <Award className="h-3.5 w-3.5" style={{ color: PALETTE.gold }} />
                Condé Nast Traveler
              </li>
              <li className="flex items-center gap-2">
                <Award className="h-3.5 w-3.5" style={{ color: PALETTE.gold }} />
                Forbes Five-Star
              </li>
            </ul>
          </div>
        </div>
        <div
          className="border-t py-5 text-center text-[10px] uppercase tracking-luxe opacity-60"
          style={{ borderColor: `${PALETTE.gold}22` }}
        >
          © {new Date().getFullYear()} Andaman Sands · Crafted by MedeeWeb
        </div>
      </footer>
    </div>
  );
}

/* =================== Page sections =================== */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex items-center justify-center gap-3 text-[10px] font-semibold uppercase tracking-luxe"
      style={{ color: PALETTE.gold }}
    >
      <span className="h-px w-8" style={{ background: PALETTE.gold }} />
      {children}
      <span className="h-px w-8" style={{ background: PALETTE.gold }} />
    </div>
  );
}

function SectionTitle({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <h2
      className="h-display mt-4 text-center"
      style={{
        color: light ? PALETTE.cream : PALETTE.ink,
        fontSize: "clamp(2rem, 1.4rem + 2.6vw, 3.75rem)",
      }}
    >
      {children}
    </h2>
  );
}

/* ---------- HOME ---------- */
function HomePage({ scrollY, onCta, onRooms }: { scrollY: number; onCta: () => void; onRooms: () => void }) {
  const parallax = Math.min(scrollY * 0.4, 240);
  const heroOpacity = Math.max(1 - scrollY / 600, 0);
  return (
    <>
      {/* Hero with parallax */}
      <section className="relative h-[92vh] min-h-[620px] w-full overflow-hidden">
        <div
          className="absolute inset-0 will-change-transform"
          style={{ transform: `translate3d(0, ${parallax}px, 0) scale(1.08)` }}
        >
          <img
            src={heroImage}
            alt="Andaman Sands resort"
            className="ken-burns absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,61,69,0.30) 0%, rgba(10,61,69,0.05) 38%, rgba(10,61,69,0.78) 100%)",
          }}
        />
        <div
          className="relative z-10 flex h-full flex-col items-center justify-end px-4 pb-20 text-center text-white md:pb-28"
          style={{ opacity: heroOpacity, transform: `translate3d(0, ${-parallax * 0.3}px, 0)` }}
        >
          <div
            className="mb-5 text-xs font-semibold tracking-luxe md:text-sm"
            style={{ color: "#F8E9C5" }}
          >
            ★★★★★  ·  KRABI, THAILAND
          </div>
          <h1
            className="h-display max-w-5xl"
            style={{ fontSize: "clamp(2.75rem, 1.6rem + 5.5vw, 6.5rem)" }}
          >
            Where the Andaman <em className="font-light italic">whispers</em>
          </h1>
          <p
            className="mt-6 max-w-2xl font-light opacity-95"
            style={{ fontSize: "clamp(1rem, 0.9rem + 0.4vw, 1.25rem)", lineHeight: 1.6 }}
          >
            พักผ่อนระดับเหนือกาลเวลา ใต้เงาหน้าผาหินปูนและเสียงคลื่นทะเลใส
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onCta}
              className="rounded-none px-8 py-3.5 text-xs font-semibold uppercase tracking-luxe transition-all hover:scale-[1.02] md:text-[13px]"
              style={{ background: PALETTE.gold, color: PALETTE.ink }}
            >
              Reserve Your Stay
            </button>
            <button
              onClick={onRooms}
              className="rounded-none border border-white/70 px-8 py-3.5 text-xs font-semibold uppercase tracking-luxe text-white transition hover:bg-white hover:text-[var(--ink)] md:text-[13px]"
              style={{ "--ink": PALETTE.ink } as React.CSSProperties}
            >
              Explore Suites
            </button>
          </div>
        </div>

        {/* Booking widget */}
        <div className="absolute bottom-0 left-1/2 z-20 hidden w-[min(900px,92%)] -translate-x-1/2 translate-y-1/2 lg:block">
          <BookingWidget />
        </div>
      </section>

      <div className="lg:hidden">
        <div className="mx-auto -mt-10 w-[92%] max-w-md">
          <BookingWidget />
        </div>
      </div>

      {/* Awards strip */}
      <section className="border-y" style={{ borderColor: `${PALETTE.gold}33`, background: PALETTE.paper }}>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-around gap-6 px-4 py-7 text-center md:px-8">
          {[
            "Travel+Leisure World's Best 2024",
            "Condé Nast Gold List",
            "Forbes Five-Star",
            "Michelin Key 2024",
          ].map((a) => (
            <div
              key={a}
              className="text-[10px] font-medium uppercase tracking-luxe opacity-75"
              style={{ color: PALETTE.ink }}
            >
              {a}
            </div>
          ))}
        </div>
      </section>

      {/* Intro story */}
      <section className="px-4 py-20 md:px-8 md:py-28" style={{ background: PALETTE.cream }}>
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">
          <div className="relative aspect-[4/5] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1000&q=85&auto=format&fit=crop"
              alt="Resort villa"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div
              className="absolute -bottom-4 -right-4 hidden h-24 w-24 md:block"
              style={{ border: `2px solid ${PALETTE.gold}` }}
            />
          </div>
          <div>
            <Eyebrow>Our Story</Eyebrow>
            <SectionTitle>A sanctuary, not a hotel</SectionTitle>
            <p className="mt-6 text-sm leading-loose md:text-base">
              ซ่อนตัวอยู่บนชายหาดส่วนตัวความยาว 400 เมตร ระหว่างหน้าผาหินปูนสูงตระหง่าน
              อันดามัน แซนด์ส คือบ้านพักตากอากาศเพียง 28 หลัง ที่ออกแบบโดย Bill Bensley
              ผสานสถาปัตยกรรมไทยใต้เข้ากับความสะดวกสบายระดับโลก
            </p>
            <p className="mt-4 text-sm leading-loose md:text-base">
              ทุก villa มีสระว่ายน้ำส่วนตัว วิวทะเลพาโนรามา และพ่อบ้านส่วนตัวที่ดูแลคุณตลอด
              24 ชั่วโมง เพราะการพักผ่อนที่แท้จริง คือการไม่ต้องคิดอะไรเลย
            </p>
            <button
              onClick={onRooms}
              className="mt-8 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-luxe"
              style={{ color: PALETTE.ink }}
            >
              Discover the villas
              <ChevronRight className="h-3.5 w-3.5" style={{ color: PALETTE.gold }} />
            </button>
          </div>
        </div>
      </section>

      {/* Featured rooms */}
      <section className="px-4 py-20 md:px-8 md:py-28" style={{ background: PALETTE.paper }}>
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <Eyebrow>Suites & Villas</Eyebrow>
            <SectionTitle>Twenty-eight private worlds</SectionTitle>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed">
              ห้องพักแต่ละหลังออกแบบไม่ซ้ำกัน เพื่อให้ทุกการเข้าพักเป็นประสบการณ์เฉพาะ
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {ROOMS.slice(0, 3).map((r) => (
              <RoomCard key={r.name} room={r} onBook={onCta} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <button
              onClick={onRooms}
              className="inline-flex items-center gap-2 border-b pb-1 text-[11px] font-semibold uppercase tracking-luxe"
              style={{ color: PALETTE.ink, borderColor: PALETTE.gold }}
            >
              View all suites & villas
            </button>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section
        className="px-4 py-20 md:px-8 md:py-28"
        style={{ background: PALETTE.ink, color: PALETTE.cream }}
      >
        <div className="mx-auto max-w-3xl text-center">
          <Quote className="mx-auto h-10 w-10" style={{ color: PALETTE.gold }} />
          <p className="serif mt-6 text-2xl font-light italic leading-relaxed md:text-3xl">
            "The most beautiful resort I have ever stepped foot in. Every detail —
            from the welcome ceremony to the pillow menu — felt thoughtfully crafted."
          </p>
          <div
            className="mt-8 text-[10px] font-semibold uppercase tracking-luxe"
            style={{ color: PALETTE.gold }}
          >
            Sarah M. · Travel + Leisure
          </div>
        </div>
      </section>
    </>
  );
}

function BookingWidget() {
  return (
    <div
      className="grid grid-cols-1 gap-px overflow-hidden shadow-2xl sm:grid-cols-4"
      style={{ background: PALETTE.gold }}
    >
      <Field icon={<Calendar className="h-4 w-4" />} label="Arrival" value="Add date" />
      <Field icon={<Calendar className="h-4 w-4" />} label="Departure" value="Add date" />
      <Field icon={<Users className="h-4 w-4" />} label="Guests" value="2 Adults" />
      <button
        className="px-6 py-5 text-[11px] font-semibold uppercase tracking-luxe transition hover:opacity-90"
        style={{ background: PALETTE.ink, color: PALETTE.gold }}
      >
        Check Availability
      </button>
    </div>
  );
}
function Field({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      className="flex items-center gap-3 px-5 py-4 text-left"
      style={{ background: PALETTE.paper }}
    >
      <span style={{ color: PALETTE.gold }}>{icon}</span>
      <div>
        <div
          className="text-[9px] font-semibold uppercase tracking-luxe"
          style={{ color: PALETTE.warmGray }}
        >
          {label}
        </div>
        <div className="text-sm font-medium" style={{ color: PALETTE.ink }}>
          {value}
        </div>
      </div>
    </div>
  );
}

/* ---------- ROOMS ---------- */
const ROOMS = [
  {
    name: "Garden Pool Pavilion",
    nameTH: "พาวิเลียนสวนพร้อมสระ",
    size: "85 sqm",
    price: 18500,
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=85&auto=format&fit=crop",
    desc: "พาวิเลียนชั้นเดียวซ่อนตัวในสวนทรอปิคอล พร้อมสระว่ายน้ำส่วนตัวขนาด 8 เมตร",
    features: ["สระส่วนตัว 8m", "ห้องอาบน้ำกลางแจ้ง", "Butler 24 ชม.", "ขนาด 85 ตร.ม."],
  },
  {
    name: "Ocean View Suite",
    nameTH: "โอเชี่ยน วิว สวีท",
    size: "120 sqm",
    price: 24800,
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&q=85&auto=format&fit=crop",
    desc: "สวีทระเบียงพาโนรามา วิวทะเลอันดามันเต็มแนว พร้อม jacuzzi กลางแจ้ง",
    features: ["วิวทะเล 180°", "Jacuzzi กลางแจ้ง", "Walk-in closet", "ขนาด 120 ตร.ม."],
  },
  {
    name: "Beachfront Villa",
    nameTH: "เบียชฟร้อนท์ วิลล่า",
    size: "240 sqm",
    price: 48000,
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&q=85&auto=format&fit=crop",
    desc: "วิลล่าหน้าหาดส่วนตัว 2 ห้องนอน พร้อมศาลาริมทะเลและเชฟส่วนตัวเมื่อร้องขอ",
    features: ["หน้าหาดส่วนตัว", "2 ห้องนอน", "เชฟส่วนตัว", "ขนาด 240 ตร.ม."],
  },
  {
    name: "Cliffside Pool Villa",
    nameTH: "คลิฟฟ์ไซด์ พูล วิลล่า",
    size: "180 sqm",
    price: 36000,
    image:
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&q=85&auto=format&fit=crop",
    desc: "วิลล่าตั้งบนหน้าผาเหนือทะเล สระ infinity ยื่นออกไปสู่ขอบฟ้า",
    features: ["Infinity pool", "วิวพระอาทิตย์ตก", "Day bed", "ขนาด 180 ตร.ม."],
  },
  {
    name: "Two-Bedroom Residence",
    nameTH: "ทู-แบดรูม เรซิเดนซ์",
    size: "320 sqm",
    price: 65000,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=85&auto=format&fit=crop",
    desc: "เรซิเดนซ์ระดับสูงสุด พร้อมห้องอาหาร ห้องนั่งเล่น และเชฟประจำตัว",
    features: ["2 ห้องนอน", "ห้องอาหารส่วนตัว", "เชฟประจำ", "ขนาด 320 ตร.ม."],
  },
  {
    name: "Royal Andaman Villa",
    nameTH: "รอยัล อันดามัน วิลล่า",
    size: "480 sqm",
    price: 120000,
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=85&auto=format&fit=crop",
    desc: "วิลล่าระดับเอ็กซ์คลูซีฟที่สุด 3 ห้องนอน พร้อมสปา เรือใบส่วนตัว และพ่อบ้าน 3 คน",
    features: ["3 ห้องนอน", "สปาส่วนตัว", "เรือใบ", "ขนาด 480 ตร.ม."],
  },
];

function RoomCard({
  room,
  onBook,
}: {
  room: (typeof ROOMS)[number];
  onBook: () => void;
}) {
  return (
    <div className="group flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={room.image}
          alt={room.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div
          className="absolute left-4 top-4 px-3 py-1 text-[10px] font-semibold uppercase tracking-luxe"
          style={{ background: PALETTE.cream, color: PALETTE.ink }}
        >
          {room.size}
        </div>
      </div>
      <div className="pt-5">
        <h3
          className="serif text-2xl font-light"
          style={{ color: PALETTE.ink }}
        >
          {room.name}
        </h3>
        <div className="mt-1 text-xs opacity-70">{room.nameTH}</div>
        <p className="mt-3 text-sm leading-relaxed">{room.desc}</p>
        <div className="mt-5 flex items-end justify-between border-t pt-4" style={{ borderColor: `${PALETTE.gold}55` }}>
          <div>
            <div className="text-[10px] uppercase tracking-luxe opacity-60">From</div>
            <div className="serif text-xl" style={{ color: PALETTE.ink }}>
              ฿{room.price.toLocaleString()}
              <span className="text-xs opacity-60"> / night</span>
            </div>
          </div>
          <button
            onClick={onBook}
            className="text-[10px] font-semibold uppercase tracking-luxe"
            style={{ color: PALETTE.gold }}
          >
            Reserve →
          </button>
        </div>
      </div>
    </div>
  );
}

function RoomsPage({ onBook }: { onBook: () => void }) {
  return (
    <>
      <PageHeader
        eyebrow="Accommodations"
        title="Twenty-eight villas. No two alike."
        sub="ห้องพักทุกหลังถูกออกแบบเพื่อให้คุณรู้สึกเหมือนอยู่บ้านในเทพนิยาย"
      />
      <section className="px-4 py-16 md:px-8 md:py-24" style={{ background: PALETTE.cream }}>
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 lg:grid-cols-3">
          {ROOMS.map((r) => (
            <RoomCard key={r.name} room={r} onBook={onBook} />
          ))}
        </div>

        <div className="mx-auto mt-20 max-w-5xl">
          <Eyebrow>Included with every stay</Eyebrow>
          <SectionTitle>The little luxuries</SectionTitle>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {[
              { icon: Wifi, label: "Complimentary Wi-Fi" },
              { icon: Waves, label: "Private beach access" },
              { icon: UtensilsCrossed, label: "Daily breakfast" },
              { icon: Sparkles, label: "Welcome ceremony" },
              { icon: Plane, label: "Airport transfer" },
              { icon: Dumbbell, label: "24/7 wellness" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-4">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                  style={{ background: `${PALETTE.gold}22`, color: PALETTE.ink }}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-sm font-medium" style={{ color: PALETTE.ink }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------- DINING ---------- */
function DiningPage() {
  const restaurants = [
    {
      name: "Saltwater",
      kind: "Fine Dining · Coastal European",
      desc: "ร้านอาหารยุโรปริมทะเล เน้นอาหารทะเลสดและไวน์คัดสรร เปิดเย็นเท่านั้น",
      hours: "18:00 – 23:00",
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=85&auto=format&fit=crop",
    },
    {
      name: "Banyan Tree",
      kind: "Thai · Heritage Recipes",
      desc: "อาหารไทยใต้ต้นตำรับ ใต้ต้นไทรอายุ 200 ปี วัตถุดิบจากชาวประมงท้องถิ่น",
      hours: "12:00 – 22:00",
      image:
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=85&auto=format&fit=crop",
    },
    {
      name: "The Sandbar",
      kind: "Cocktails · Light Bites",
      desc: "บาร์ริมหาดสำหรับซันเซ็ทค็อกเทล มิกซ์โดย mixologist ระดับโลก",
      hours: "16:00 – 01:00",
      image:
        "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=1200&q=85&auto=format&fit=crop",
    },
  ];
  return (
    <>
      <PageHeader
        eyebrow="Culinary"
        title="Three restaurants, one philosophy"
        sub="ใช้วัตถุดิบจากเกษตรกรและชาวประมงในรัศมี 50 กม. เป็นหลัก"
      />
      <section className="px-4 py-16 md:px-8 md:py-24" style={{ background: PALETTE.cream }}>
        <div className="mx-auto max-w-6xl space-y-20">
          {restaurants.map((r, i) => (
            <div
              key={r.name}
              className={`grid gap-10 md:grid-cols-2 md:items-center ${
                i % 2 ? "md:[&>div:first-child]:order-2" : ""
              }`}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img src={r.image} alt={r.name} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div>
                <Eyebrow>{r.kind}</Eyebrow>
                <h3
                  className="serif mt-4 text-4xl font-light md:text-5xl"
                  style={{ color: PALETTE.ink }}
                >
                  {r.name}
                </h3>
                <p className="mt-5 text-sm leading-loose md:text-base">{r.desc}</p>
                <div
                  className="mt-6 inline-block border-y px-5 py-2 text-[11px] font-medium uppercase tracking-luxe"
                  style={{ borderColor: `${PALETTE.gold}66`, color: PALETTE.ink }}
                >
                  {r.hours}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

/* ---------- EXPERIENCES ---------- */
function ExperiencesPage() {
  const exps = [
    {
      title: "Long-tail boat to Phi Phi",
      icon: Waves,
      img: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=900&q=85&auto=format&fit=crop",
      time: "8 hours · From ฿8,500",
    },
    {
      title: "Sunrise yoga on the cliff",
      icon: Sparkles,
      img: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=900&q=85&auto=format&fit=crop",
      time: "Daily 06:30 · Complimentary",
    },
    {
      title: "Andaman spa ritual",
      icon: Sparkles,
      img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=900&q=85&auto=format&fit=crop",
      time: "120 min · From ฿4,800",
    },
    {
      title: "Private beach BBQ",
      icon: UtensilsCrossed,
      img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&q=85&auto=format&fit=crop",
      time: "Evening · From ฿12,000",
    },
    {
      title: "Rock climbing Railay",
      icon: Award,
      img: "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=900&q=85&auto=format&fit=crop",
      time: "Half day · From ฿3,500",
    },
    {
      title: "Sunset sailing",
      icon: Waves,
      img: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=900&q=85&auto=format&fit=crop",
      time: "3 hours · From ฿9,800",
    },
  ];
  return (
    <>
      <PageHeader
        eyebrow="Experiences"
        title="More than a stay"
        sub="ทุกประสบการณ์คัดสรรโดยทีม Concierge เพื่อให้คุณรู้จักกระบี่อย่างแท้จริง"
      />
      <section className="px-4 py-16 md:px-8 md:py-24" style={{ background: PALETTE.cream }}>
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {exps.map((e) => (
            <div key={e.title} className="group relative aspect-[4/5] overflow-hidden">
              <img
                src={e.img}
                alt={e.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(10,61,69,0.85) 100%)",
                }}
              />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <e.icon className="h-5 w-5" style={{ color: PALETTE.gold }} />
                <h3 className="serif mt-3 text-2xl font-light">{e.title}</h3>
                <div
                  className="mt-2 text-[10px] font-semibold uppercase tracking-luxe"
                  style={{ color: PALETTE.gold }}
                >
                  {e.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

/* ---------- GALLERY ---------- */
function GalleryPage() {
  const imgs = [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1000&q=85",
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1000&q=85",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1000&q=85",
    "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1000&q=85",
    "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1000&q=85",
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1000&q=85",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1000&q=85",
    "https://images.unsplash.com/photo-1535827841776-24afc1e255ac?w=1000&q=85",
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1000&q=85",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1000&q=85",
    "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1000&q=85",
    "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1000&q=85",
  ];
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Moments at Andaman Sands"
        sub="ภาพถ่ายจริงจากแขกของเราและช่างภาพประจำรีสอร์ท"
      />
      <section className="px-4 py-16 md:px-8 md:py-24" style={{ background: PALETTE.paper }}>
        <div className="mx-auto max-w-7xl">
          <div className="columns-2 gap-3 md:columns-3 lg:columns-4 [&>*]:mb-3">
            {imgs.map((src, i) => (
              <div key={i} className="break-inside-avoid overflow-hidden">
                <img
                  src={src}
                  alt={`gallery-${i}`}
                  className="w-full transition-transform duration-700 hover:scale-105"
                  style={{ aspectRatio: i % 3 === 0 ? "3/4" : i % 5 === 0 ? "1/1" : "4/5" }}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------- CONTACT ---------- */
function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Reservations"
        title="Begin your journey"
        sub="ทีม Reservations พร้อมดูแลทุกรายละเอียด ตั้งแต่การเดินทางจนถึงเช็คเอาท์"
      />
      <section className="px-4 py-16 md:px-8 md:py-24" style={{ background: PALETTE.cream }}>
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-5">
          {/* Info */}
          <div className="md:col-span-2 space-y-8">
            <div>
              <Eyebrow>Direct Line</Eyebrow>
              <div className="mt-3 space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4" style={{ color: PALETTE.gold }} />
                  <div>
                    <div className="font-medium" style={{ color: PALETTE.ink }}>
                      {BRAND.phone}
                    </div>
                    <div className="text-xs opacity-70">24 ชั่วโมง · ไทย / English</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4" style={{ color: PALETTE.gold }} />
                  <div>
                    <div className="font-medium" style={{ color: PALETTE.ink }}>
                      {BRAND.email}
                    </div>
                    <div className="text-xs opacity-70">ตอบกลับภายใน 2 ชั่วโมง</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4" style={{ color: PALETTE.gold }} />
                  <div>
                    <div className="font-medium" style={{ color: PALETTE.ink }}>
                      {BRAND.address}
                    </div>
                    <div className="text-xs opacity-70">25 นาทีจากสนามบินกระบี่ (KBV)</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1535827841776-24afc1e255ac?w=900&q=85"
                alt="Map"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Form */}
          <form
            className="md:col-span-3 space-y-5 p-8 md:p-10"
            style={{ background: PALETTE.paper, boxShadow: `0 30px 60px -30px ${PALETTE.ink}33` }}
          >
            <Eyebrow>Reservation Inquiry</Eyebrow>
            <h3 className="serif text-3xl font-light" style={{ color: PALETTE.ink }}>
              Tell us about your stay
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="First name" />
              <Input label="Last name" />
              <Input label="Email" type="email" />
              <Input label="Phone" />
              <Input label="Arrival" type="date" />
              <Input label="Departure" type="date" />
            </div>
            <div>
              <Label>Villa preference</Label>
              <select
                className="w-full border-0 border-b bg-transparent py-2 text-sm focus:outline-none"
                style={{ borderColor: `${PALETTE.ink}33`, color: PALETTE.ink }}
              >
                {ROOMS.map((r) => (
                  <option key={r.name}>{r.name}</option>
                ))}
              </select>
            </div>
            <div>
              <Label>Special requests</Label>
              <textarea
                rows={3}
                className="w-full border-0 border-b bg-transparent py-2 text-sm focus:outline-none"
                style={{ borderColor: `${PALETTE.ink}33`, color: PALETTE.ink }}
                placeholder="โอกาสพิเศษ, อาหาร, การเดินทาง..."
              />
            </div>
            <button
              type="button"
              className="mt-2 w-full py-3.5 text-[11px] font-semibold uppercase tracking-luxe transition hover:opacity-90"
              style={{ background: PALETTE.ink, color: PALETTE.gold }}
            >
              Submit Reservation Request
            </button>
            <p className="text-center text-[10px] opacity-60">
              ทีม reservations จะตอบกลับพร้อมเสนออัตราพิเศษภายใน 2 ชั่วโมง
            </p>
          </form>
        </div>
      </section>
    </>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mb-1 text-[10px] font-semibold uppercase tracking-luxe"
      style={{ color: PALETTE.warmGray }}
    >
      {children}
    </div>
  );
}
function Input({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        type={type}
        className="w-full border-0 border-b bg-transparent py-2 text-sm focus:outline-none"
        style={{ borderColor: `${PALETTE.ink}33`, color: PALETTE.ink }}
      />
    </div>
  );
}

/* ---------- Page header (used by inner pages) ---------- */
function PageHeader({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub: string;
}) {
  return (
    <section
      className="relative px-4 py-20 text-center md:px-8 md:py-28"
      style={{ background: PALETTE.ink, color: PALETTE.cream }}
    >
      <div className="mx-auto max-w-3xl">
        <div
          className="text-[10px] font-semibold uppercase tracking-luxe"
          style={{ color: PALETTE.gold }}
        >
          — {eyebrow} —
        </div>
        <h1 className="serif mt-4 text-4xl font-light leading-tight md:text-6xl">
          {title}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-sm opacity-80 md:text-base">{sub}</p>
      </div>
    </section>
  );
}
