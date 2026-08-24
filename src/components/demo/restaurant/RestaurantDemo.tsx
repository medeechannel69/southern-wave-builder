import { useState, useEffect } from "react";
import {
  Menu as MenuIcon,
  X,
  Phone,
  Mail,
  MapPin,
  Clock,
  Star,
  Flame,
  Leaf,
  ChefHat,
  Quote,
  Facebook,
  Instagram,
  Utensils,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  Award,
} from "lucide-react";

/**
 * ครัวไทยต้นตำรับ — Thai Kitchen Demo (desktop-first)
 * Aesthetic: ครัวไทยโบราณร่วมสมัย — ไม้สัก ทองเหลือง ใบตอง
 * Palette: charcoal #1C1A17 + chili #A8241C + gold #C8952F + rice #FBF7EF
 */

const BRAND = {
  name: "ครัวไทยต้นตำรับ",
  nameEN: "KRUA THAI TONTAMRAP",
  tagline: "อาหารไทยตำรับชาววัง ปรุงสดทุกจาน ด้วยเครื่องแกงตำมือ",
  phone: "075-812-345",
  mobile: "081-234-5678",
  email: "hello@kruathai-tontamrap.com",
  address: "88/9 ถ.มหาราช ต.ปากน้ำ อ.เมือง จ.กระบี่ 81000",
  line: "@kruathai",
  hours: [
    { d: "จันทร์ – พฤหัสบดี", t: "11:00 – 22:00 น." },
    { d: "ศุกร์ – อาทิตย์", t: "10:30 – 23:00 น." },
    { d: "ครัวปิดรับออร์เดอร์สุดท้าย", t: "ก่อนเวลาปิด 45 นาที" },
  ],
};

const C = {
  ink: "#1C1A17",
  chili: "#A8241C",
  gold: "#C8952F",
  rice: "#FBF7EF",
  paper: "#FFFFFF",
  soft: "#6B635A",
  line: "#E7DFD2",
};

const NAV = [
  { id: "home", label: "หน้าแรก" },
  { id: "menu", label: "เมนูอาหาร" },
  { id: "promotion", label: "โปรโมชั่น" },
  { id: "about", label: "เรื่องราวของเรา" },
  { id: "gallery", label: "แกลเลอรี" },
  { id: "reviews", label: "รีวิวลูกค้า" },
  { id: "reserve", label: "จองโต๊ะ" },
];

const IMG = {
  hero: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=1800&q=80&auto=format&fit=crop",
  tomyum:
    "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=900&q=80&auto=format&fit=crop",
  greenCurry:
    "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=900&q=80&auto=format&fit=crop",
  padthai:
    "https://images.unsplash.com/photo-1559314809-0f31657def5e?w=900&q=80&auto=format&fit=crop",
  somtam:
    "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=900&q=80&auto=format&fit=crop",
  massaman:
    "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=900&q=80&auto=format&fit=crop",
  mangoRice:
    "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=900&q=80&auto=format&fit=crop",
  chef: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=1200&q=80&auto=format&fit=crop",
  interior:
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1400&q=80&auto=format&fit=crop",
  spices:
    "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1200&q=80&auto=format&fit=crop",
  grill:
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80&auto=format&fit=crop",
  table:
    "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&q=80&auto=format&fit=crop",
  seafood:
    "https://images.unsplash.com/photo-1535140728325-a4d3707eee61?w=1200&q=80&auto=format&fit=crop",
  dessert:
    "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=1200&q=80&auto=format&fit=crop",
  drink:
    "https://images.unsplash.com/photo-1497534446932-c925b458314e?w=1200&q=80&auto=format&fit=crop",
};

type Dish = {
  th: string;
  en: string;
  desc: string;
  price: number;
  spicy?: 0 | 1 | 2 | 3;
  veg?: boolean;
  signature?: boolean;
};

const MENU: { id: string; title: string; note: string; items: Dish[] }[] = [
  {
    id: "appetizer",
    title: "ของว่าง / เรียกน้ำย่อย",
    note: "เสิร์ฟพร้อมน้ำจิ้มสูตรร้าน ปรุงสดทุกวัน",
    items: [
      { th: "ปอเปี๊ยะทอดไส้ปูอัดกุ้งสับ", en: "Crispy Crab & Prawn Rolls", desc: "แป้งบางกรอบ ไส้เนื้อปูผสมกุ้งสับ เสิร์ฟน้ำจิ้มบ๊วย", price: 145 },
      { th: "ทอดมันปลากรายกระบี่", en: "Fish Cake with Krabi Curry Paste", desc: "ปลากรายสดขูดมือ ผสมพริกแกงตำเอง กรอบนอกเด้งใน", price: 165, spicy: 1, signature: true },
      { th: "หมูสะเต๊ะเตาถ่าน (6 ไม้)", en: "Charcoal Pork Satay", desc: "หมักขมิ้นกะทิ ย่างเตาถ่าน เสิร์ฟน้ำจิ้มถั่วและอาจาด", price: 155 },
      { th: "เมี่ยงคำใบชะพลู", en: "Miang Kham Betel Leaf Wraps", desc: "มะพร้าวคั่ว ถั่วลิสง กุ้งแห้ง ราดน้ำเมี่ยงเคี่ยวเอง", price: 125, veg: true },
      { th: "กุ้งแช่น้ำปลาอันดามัน", en: "Raw Prawns in Fish Sauce", desc: "กุ้งขาวสดจากอ่าวนาง น้ำจิ้มซีฟู้ดกระเทียมพริกขี้หนู", price: 285, spicy: 3 },
    ],
  },
  {
    id: "soup",
    title: "ต้ม / ยำ",
    note: "รสจัดจ้านแบบต้นตำรับ ปรับความเผ็ดได้ตามต้องการ",
    items: [
      { th: "ต้มยำกุ้งแม่น้ำน้ำข้น", en: "Tom Yum Goong (Creamy)", desc: "กุ้งแม่น้ำตัวโต น้ำข้นมันกุ้ง เห็ดฟาง ใบมะกรูด", price: 320, spicy: 3, signature: true },
      { th: "ต้มข่าไก่บ้าน", en: "Tom Kha Gai", desc: "ไก่บ้านเนื้อแน่น กะทิสด ข่าอ่อน ตะไคร้ ใบมะกรูด", price: 185, spicy: 1 },
      { th: "แกงส้มกุ้งยอดมะพร้าว", en: "Sour Curry with Prawns", desc: "น้ำแกงส้มใต้เข้มข้น ยอดมะพร้าวอ่อนกรอบหวาน", price: 245, spicy: 3 },
      { th: "ยำวุ้นเส้นทะเล", en: "Spicy Glass Noodle Salad", desc: "วุ้นเส้นเหนียวนุ่ม กุ้ง หมึก น้ำยำมะนาวสด", price: 195, spicy: 2 },
      { th: "ส้มตำไทยกุ้งสด", en: "Som Tam Thai with Prawns", desc: "มะละกอเส้นสับมือ ถั่วลิสงคั่ว กุ้งสดลวก", price: 165, spicy: 2 },
    ],
  },
  {
    id: "curry",
    title: "แกงกะทิ / เครื่องแกงตำมือ",
    note: "ทุกแกงใช้พริกแกงตำครกหิน กะทิคั้นสดวันต่อวัน",
    items: [
      { th: "แกงเขียวหวานเนื้อน่องลาย", en: "Green Curry with Beef Shank", desc: "เคี่ยวเนื้อ 4 ชั่วโมง มะเขือเปราะ ใบโหระพา", price: 285, spicy: 2, signature: true },
      { th: "มัสมั่นไก่ตำรับชาววัง", en: "Massaman Chicken", desc: "เครื่องเทศคั่วมือ มันฝรั่ง หอมใหญ่ ถั่วลิสง", price: 265, spicy: 1 },
      { th: "พะแนงหมูสันคอ", en: "Panang Pork Neck", desc: "ข้นมัน หวานเค็มกลมกล่อม โรยพริกชี้ฟ้าใบมะกรูด", price: 235, spicy: 2 },
      { th: "แกงคั่วกลิ้งหมูสับใต้", en: "Southern Dry Curry", desc: "รสใต้แท้ พริกไทยอ่อน ใบมะกรูดซอย เผ็ดร้อนถึงเครื่อง", price: 215, spicy: 3 },
      { th: "แกงเหลืองปลากะพงหน่อไม้ดอง", en: "Yellow Curry with Sea Bass", desc: "ปลากะพงสดเนื้อแน่น น้ำแกงเหลืองเปรี้ยวจัด", price: 295, spicy: 3 },
    ],
  },
  {
    id: "main",
    title: "จานหลัก / ผัด – ย่าง",
    note: "เสิร์ฟพร้อมข้าวหอมมะลิใหม่ หุงเตาฟืน",
    items: [
      { th: "ผัดไทยกุ้งสดห่อไข่", en: "Pad Thai Goong Sod", desc: "เส้นจันท์ผัดกระทะเหล็ก น้ำมะขามเปียกเคี่ยวเอง", price: 195, signature: true },
      { th: "ปูผัดผงกะหรี่", en: "Crab in Yellow Curry Powder", desc: "ปูม้าอันดามันตัวโต ผัดไข่นุ่มกับผงกะหรี่หอม", price: 590 },
      { th: "ปลากะพงทอดน้ำปลา", en: "Crispy Sea Bass with Fish Sauce", desc: "ทอดกรอบทั้งตัว ราดน้ำปลาแท้ เสิร์ฟพร้อมมะม่วงซอย", price: 480 },
      { th: "คอหมูย่างเตาถ่านน้ำจิ้มแจ่ว", en: "Grilled Pork Neck", desc: "หมักซอสสูตรร้าน 12 ชั่วโมง ย่างถ่านไม้โกงกาง", price: 215, spicy: 2 },
      { th: "ผัดกะเพราเนื้อสับไข่ดาว", en: "Holy Basil Stir-fry", desc: "สับมือ ผัดไฟแรง กะเพราแท้จากสวนกระบี่", price: 165, spicy: 3 },
      { th: "ผัดผักเหมียงไข่", en: "Stir-fried Melinjo Leaves", desc: "ผักพื้นบ้านภาคใต้ ผัดไข่กระเทียมหอม", price: 135, veg: true },
    ],
  },
  {
    id: "dessert",
    title: "ของหวาน",
    note: "ทำสดวันต่อวัน หมดแล้วหมดเลย",
    items: [
      { th: "ข้าวเหนียวมะม่วงน้ำดอกไม้", en: "Mango Sticky Rice", desc: "มะม่วงสุกหวานหอม ข้าวเหนียวมูนกะทิสด โรยถั่วทอง", price: 145, signature: true },
      { th: "บัวลอยไข่หวานเผือก", en: "Taro Dumplings in Coconut Milk", desc: "บัวลอยเผือกนุ่ม กะทิสดหอมมัน ไข่หวานยางมะตูม", price: 95 },
      { th: "ลอดช่องน้ำกะทิใบเตย", en: "Lod Chong Pandan", desc: "เส้นลอดช่องใบเตยสด น้ำกะทิน้ำตาลมะพร้าวชุมพร", price: 85, veg: true },
      { th: "ไอศกรีมกะทิสดเครื่องเคียง", en: "Coconut Ice Cream", desc: "กะทิสดปั่นเอง เสิร์ฟกับข้าวเหนียวดำ ถั่วลิสง ลูกชิด", price: 110, veg: true },
    ],
  },
  {
    id: "drink",
    title: "เครื่องดื่ม",
    note: "ไม่ผสมผงสำเร็จรูป ใช้วัตถุดิบสดทั้งหมด",
    items: [
      { th: "ชาไทยเย็นสูตรโบราณ", en: "Thai Iced Tea", desc: "ชาแดงชงเข้ม นมข้นหวาน หอมกลิ่นชาแท้", price: 75, veg: true },
      { th: "น้ำมะพร้าวอ่อนเกาะกลาง", en: "Fresh Young Coconut", desc: "มะพร้าวอ่อนสดจากสวนเกาะกลาง กระบี่", price: 85, veg: true },
      { th: "น้ำอัญชันมะนาว", en: "Butterfly Pea Lemonade", desc: "อัญชันสดต้ม บีบมะนาวเปลี่ยนสีต่อหน้า", price: 75, veg: true },
      { th: "น้ำสมุนไพรกระเจี๊ยบ / ตะไคร้", en: "Herbal Iced Tea", desc: "ต้มสดทุกเช้า หวานน้อย ไม่ใส่สี", price: 65, veg: true },
    ],
  },
];

const PROMOS = [
  {
    tag: "ทุกวันจันทร์–พฤหัสบดี",
    title: "ชุดอาหารกลางวัน 159.-",
    desc: "เลือกจานหลัก 1 อย่าง + ซุปประจำวัน + ของหวาน + น้ำสมุนไพร เสิร์ฟ 11:00–14:30 น.",
    price: "159฿ / ท่าน",
    img: IMG.padthai,
  },
  {
    tag: "สำหรับ 4–6 ท่าน",
    title: "เซ็ตครอบครัวต้นตำรับ",
    desc: "ต้มยำกุ้งแม่น้ำ + แกงเขียวหวานเนื้อ + ปลากะพงทอดน้ำปลา + ผัดผักเหมียง + ข้าวไม่อั้น + ของหวาน 4 ที่",
    price: "1,290฿ (ปกติ 1,650฿)",
    img: IMG.table,
  },
  {
    tag: "ทุกวันศุกร์–อาทิตย์",
    title: "ซีฟู้ดอันดามันสดจากท่าเรือ",
    desc: "กุ้งแม่น้ำ ปูม้า หอยชักตีน คัดจากท่าเรือปากน้ำทุกเช้า ลด 15% เมื่อสั่งตั้งแต่ 2 จานขึ้นไป",
    price: "ลด 15%",
    img: IMG.seafood,
  },
  {
    tag: "จองล่วงหน้า 3 วัน",
    title: "โต๊ะจีนงานเลี้ยง / เลี้ยงบริษัท",
    desc: "รับจัดเลี้ยง 20–150 ท่าน ออกแบบเมนูร่วมกับเชฟ พร้อมพื้นที่จอดรถและระบบเสียง",
    price: "เริ่ม 3,500฿ / โต๊ะ 10 ท่าน",
    img: IMG.interior,
  },
];

const GALLERY = [
  { src: IMG.interior, cap: "โซนในร้าน — โครงไม้สักและโคมทองเหลือง" },
  { src: IMG.grill, cap: "ครัวเตาถ่าน — ย่างด้วยไม้โกงกาง" },
  { src: IMG.spices, cap: "เครื่องแกงตำครกหินทุกเช้า" },
  { src: IMG.tomyum, cap: "ต้มยำกุ้งแม่น้ำน้ำข้น" },
  { src: IMG.greenCurry, cap: "แกงเขียวหวานเนื้อน่องลาย" },
  { src: IMG.somtam, cap: "ส้มตำไทยกุ้งสด" },
  { src: IMG.mangoRice, cap: "ข้าวเหนียวมะม่วงน้ำดอกไม้" },
  { src: IMG.table, cap: "โต๊ะครอบครัวริมสวน" },
  { src: IMG.seafood, cap: "ซีฟู้ดสดจากท่าเรือปากน้ำ" },
  { src: IMG.dessert, cap: "ของหวานไทยทำสดวันต่อวัน" },
  { src: IMG.drink, cap: "เครื่องดื่มสมุนไพรไม่ผสมผงสำเร็จรูป" },
  { src: IMG.chef, cap: "เชฟประจำครัวและทีมงาน" },
];

const REVIEWS = [
  { name: "คุณอรพรรณ ส.", role: "นักท่องเที่ยวจากกรุงเทพฯ", text: "ต้มยำกุ้งน้ำข้นอร่อยที่สุดที่เคยกินในกระบี่ กุ้งแม่น้ำตัวใหญ่มาก น้ำซุปเข้มข้นไม่พึ่งผงปรุงรส บริการดีมากค่ะ", stars: 5 },
  { name: "คุณธีรพงษ์ จ.", role: "ลูกค้าประจำ 4 ปี", text: "พาลูกค้าบริษัทมาเลี้ยงทุกเดือน เซ็ตครอบครัวคุ้มมาก จัดจานสวย พนักงานแนะนำเมนูได้ละเอียดว่าจานไหนเผ็ดแค่ไหน", stars: 5 },
  { name: "Anna K.", role: "Traveller from Sweden", text: "Authentic Thai flavours, not toned down for tourists. The massaman was incredible and the staff explained every dish in English.", stars: 5 },
  { name: "คุณสุนิสา ป.", role: "ครอบครัวชาวกระบี่", text: "แกงคั่วกลิ้งกับแกงเหลืองรสใต้แท้ ถูกปากคนใต้จริง ๆ ราคาสมเหตุสมผล ที่จอดรถสะดวก พาผู้ใหญ่มาได้สบาย", stars: 5 },
];

function Spice({ level }: { level?: 0 | 1 | 2 | 3 }) {
  if (!level) return null;
  return (
    <span className="inline-flex items-center gap-0.5 align-middle">
      {Array.from({ length: level }).map((_, i) => (
        <Flame key={i} size={13} style={{ color: C.chili }} fill={C.chili} />
      ))}
    </span>
  );
}

export function RestaurantDemo() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cat, setCat] = useState(MENU[0].id);
  const [light, setLight] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (light === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLight(null);
      if (e.key === "ArrowRight") setLight((i) => ((i ?? 0) + 1) % GALLERY.length);
      if (e.key === "ArrowLeft") setLight((i) => ((i ?? 0) - 1 + GALLERY.length) % GALLERY.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [light]);

  const goTo = (id: string) => {
    setActive(id);
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <div
      style={{
        background: C.rice,
        color: C.ink,
        fontFamily: "'Sarabun', system-ui, sans-serif",
      }}
    >
      <style>{`
        .kt-h { font-family: 'Prompt', 'Sarabun', sans-serif; font-weight: 700; letter-spacing: -0.01em; }
        .kt-eyebrow { letter-spacing: 0.28em; text-transform: uppercase; font-size: 11px; font-weight: 600; }
        .kt-link { position: relative; }
        .kt-link::after { content:''; position:absolute; left:0; bottom:-6px; height:2px; width:0; background:${C.gold}; transition:width .28s ease; }
        .kt-link:hover::after, .kt-link[data-on="true"]::after { width:100%; }
        .kt-card { transition: transform .35s ease, box-shadow .35s ease; }
        .kt-card:hover { transform: translateY(-6px); box-shadow: 0 22px 44px -24px rgba(28,26,23,.45); }
        .kt-zoom img { transition: transform .6s cubic-bezier(.2,.7,.2,1); }
        .kt-zoom:hover img { transform: scale(1.07); }
        .kt-fade { animation: ktFade .5s ease both; }
        @keyframes ktFade { from { opacity:0; transform: translateY(14px);} to {opacity:1; transform:none;} }
      `}</style>

      {/* ===== Header ===== */}
      <header
        className="sticky top-0 z-40 border-b transition-all"
        style={{
          background: scrolled ? "rgba(28,26,23,0.97)" : "rgba(28,26,23,0.88)",
          borderColor: "rgba(200,149,47,0.28)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-6 px-5 py-3 lg:px-8">
          <button onClick={() => goTo("home")} className="flex items-center gap-3 text-left">
            <span
              className="flex h-11 w-11 items-center justify-center rounded-full border"
              style={{ borderColor: C.gold, color: C.gold }}
            >
              <ChefHat size={20} />
            </span>
            <span>
              <span className="kt-h block text-[17px] leading-tight" style={{ color: C.rice }}>
                {BRAND.name}
              </span>
              <span className="kt-eyebrow block" style={{ color: C.gold }}>
                {BRAND.nameEN}
              </span>
            </span>
          </button>

          <nav className="hidden items-center gap-7 lg:flex">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => goTo(n.id)}
                data-on={active === n.id}
                className="kt-link text-[14.5px] font-medium transition-colors"
                style={{ color: active === n.id ? C.gold : "rgba(251,247,239,0.85)" }}
              >
                {n.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${BRAND.phone}`}
              className="hidden items-center gap-2 text-[14px] font-semibold md:flex"
              style={{ color: C.rice }}
            >
              <Phone size={15} style={{ color: C.gold }} />
              {BRAND.phone}
            </a>
            <button
              onClick={() => goTo("reserve")}
              className="hidden rounded-full px-5 py-2 text-[14px] font-semibold md:block"
              style={{ background: C.chili, color: C.rice }}
            >
              จองโต๊ะ
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="เมนู"
              className="rounded-md p-2 lg:hidden"
              style={{ color: C.rice }}
            >
              {open ? <X size={22} /> : <MenuIcon size={22} />}
            </button>
          </div>
        </div>

        {open && (
          <div className="border-t lg:hidden" style={{ borderColor: "rgba(200,149,47,.25)", background: C.ink }}>
            <div className="mx-auto flex max-w-[1240px] flex-col px-5 py-3">
              {NAV.map((n) => (
                <button
                  key={n.id}
                  onClick={() => goTo(n.id)}
                  className="py-2.5 text-left text-[15px]"
                  style={{ color: active === n.id ? C.gold : "rgba(251,247,239,.85)" }}
                >
                  {n.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="kt-fade" key={active}>
        {active === "home" && <Home goTo={goTo} />}
        {active === "menu" && <MenuPage cat={cat} setCat={setCat} goTo={goTo} />}
        {active === "promotion" && <PromoPage goTo={goTo} />}
        {active === "about" && <AboutPage />}
        {active === "gallery" && <GalleryPage onOpen={setLight} />}
        {active === "reviews" && <ReviewsPage goTo={goTo} />}
        {active === "reserve" && <ReservePage />}
      </main>

      {/* ===== Lightbox ===== */}
      {light !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          style={{ background: "rgba(18,16,14,.94)" }}
          onClick={() => setLight(null)}
        >
          <button
            className="absolute right-5 top-5 rounded-full p-2"
            style={{ color: C.rice, background: "rgba(255,255,255,.1)" }}
            onClick={() => setLight(null)}
            aria-label="ปิด"
          >
            <X size={22} />
          </button>
          <button
            className="absolute left-4 rounded-full p-3"
            style={{ color: C.rice, background: "rgba(255,255,255,.1)" }}
            onClick={(e) => {
              e.stopPropagation();
              setLight((i) => ((i ?? 0) - 1 + GALLERY.length) % GALLERY.length);
            }}
            aria-label="ก่อนหน้า"
          >
            <ChevronLeft size={22} />
          </button>
          <figure onClick={(e) => e.stopPropagation()} className="max-w-4xl text-center">
            <img
              src={GALLERY[light].src}
              alt={GALLERY[light].cap}
              className="max-h-[74vh] w-full rounded-lg object-contain"
            />
            <figcaption className="mt-4 text-[14px]" style={{ color: "rgba(251,247,239,.8)" }}>
              {GALLERY[light].cap} · {light + 1}/{GALLERY.length}
            </figcaption>
          </figure>
          <button
            className="absolute right-4 rounded-full p-3"
            style={{ color: C.rice, background: "rgba(255,255,255,.1)" }}
            onClick={(e) => {
              e.stopPropagation();
              setLight((i) => ((i ?? 0) + 1) % GALLERY.length);
            }}
            aria-label="ถัดไป"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      )}

      <Footer goTo={goTo} />
    </div>
  );
}

/* ================= Shared bits ================= */

function SectionHead({
  eyebrow,
  title,
  sub,
  center = true,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <span className="kt-eyebrow" style={{ color: C.gold }}>
        {eyebrow}
      </span>
      <h2 className="kt-h mt-3" style={{ fontSize: "clamp(26px,3.2vw,40px)", lineHeight: 1.2 }}>
        {title}
      </h2>
      {sub && (
        <p className="mt-3 text-[15.5px]" style={{ color: C.soft, lineHeight: 1.85 }}>
          {sub}
        </p>
      )}
    </div>
  );
}

function DishCard({ d }: { d: Dish }) {
  return (
    <div
      className="flex items-start justify-between gap-6 border-b py-5"
      style={{ borderColor: C.line }}
    >
      <div className="min-w-0">
        <h4 className="kt-h flex flex-wrap items-center gap-2 text-[17px]">
          {d.th}
          <Spice level={d.spicy} />
          {d.veg && <Leaf size={14} style={{ color: "#4B7A3F" }} />}
          {d.signature && (
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
              style={{ background: "rgba(200,149,47,.16)", color: C.gold }}
            >
              เมนูแนะนำ
            </span>
          )}
        </h4>
        <p className="mt-0.5 text-[12.5px] italic" style={{ color: C.gold }}>
          {d.en}
        </p>
        <p className="mt-1.5 text-[14px]" style={{ color: C.soft, lineHeight: 1.75 }}>
          {d.desc}
        </p>
      </div>
      <div className="kt-h shrink-0 text-[17px]" style={{ color: C.chili }}>
        {d.price}฿
      </div>
    </div>
  );
}

/* ================= Pages ================= */

function Home({ goTo }: { goTo: (id: string) => void }) {
  const signatures = MENU.flatMap((m) => m.items).filter((i) => i.signature).slice(0, 4);
  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[74vh] items-center overflow-hidden">
        <img
          src={IMG.hero}
          alt="บรรยากาศครัวไทยต้นตำรับ"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0 -z-10"
          style={{ background: "linear-gradient(90deg, rgba(20,18,15,.92) 0%, rgba(20,18,15,.72) 45%, rgba(20,18,15,.35) 100%)" }}
        />
        <div className="mx-auto w-full max-w-[1240px] px-5 py-20 lg:px-8">
          <div className="max-w-2xl">
            <span className="kt-eyebrow" style={{ color: C.gold }}>
              เปิดครัวตั้งแต่ พ.ศ. 2536 · กระบี่
            </span>
            <h1
              className="kt-h mt-4"
              style={{ color: C.rice, fontSize: "clamp(34px,5vw,62px)", lineHeight: 1.12 }}
            >
              อาหารไทยตำรับชาววัง
              <br />
              ปรุงสดทุกจานด้วยเครื่องแกงตำมือ
            </h1>
            <p
              className="mt-5 text-[16.5px]"
              style={{ color: "rgba(251,247,239,.86)", lineHeight: 1.9, maxWidth: 620 }}
            >
              สามสิบสองปีที่เราตำพริกแกงด้วยครกหินทุกเช้า คั้นกะทิสดวันต่อวัน และคัดวัตถุดิบจากท่าเรือปากน้ำและสวนในกระบี่
              เพื่อรักษารสมือแบบที่คุณยายเคยทำไว้ทุกจาน
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={() => goTo("reserve")}
                className="rounded-full px-7 py-3 text-[15px] font-semibold"
                style={{ background: C.chili, color: C.rice }}
              >
                จองโต๊ะออนไลน์
              </button>
              <button
                onClick={() => goTo("menu")}
                className="rounded-full border px-7 py-3 text-[15px] font-semibold"
                style={{ borderColor: C.gold, color: C.gold }}
              >
                ดูเมนูทั้งหมด
              </button>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
              {[
                { n: "32 ปี", l: "เปิดครัวต่อเนื่อง" },
                { n: "4.9/5", l: "จาก 1,240 รีวิว" },
                { n: "68 เมนู", l: "ปรุงสดตามสั่ง" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="kt-h text-[24px]" style={{ color: C.gold }}>
                    {s.n}
                  </div>
                  <div className="text-[13px]" style={{ color: "rgba(251,247,239,.7)" }}>
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Info bar */}
      <section style={{ background: C.ink }}>
        <div className="mx-auto grid max-w-[1240px] gap-6 px-5 py-6 md:grid-cols-3 lg:px-8">
          {[
            { icon: <Clock size={18} />, t: "เวลาเปิดร้าน", d: "จ.–พฤ. 11:00–22:00 · ศ.–อา. 10:30–23:00" },
            { icon: <MapPin size={18} />, t: "ที่ตั้ง", d: BRAND.address },
            { icon: <Phone size={18} />, t: "สำรองโต๊ะ", d: `${BRAND.phone} · LINE ${BRAND.line}` },
          ].map((i) => (
            <div key={i.t} className="flex items-start gap-3">
              <span style={{ color: C.gold }}>{i.icon}</span>
              <div>
                <div className="kt-h text-[14px]" style={{ color: C.rice }}>
                  {i.t}
                </div>
                <div className="text-[13.5px]" style={{ color: "rgba(251,247,239,.68)" }}>
                  {i.d}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Signature dishes */}
      <section className="px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-[1240px]">
          <SectionHead
            eyebrow="Signature Dishes"
            title="จานที่ลูกค้าสั่งซ้ำมากที่สุด"
            sub="ทุกจานปรุงสดตามสั่ง ไม่ใช้ผงชูรสและซอสสำเร็จรูป ปรับระดับความเผ็ดได้ตามต้องการ"
          />
          <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {[IMG.tomyum, IMG.greenCurry, IMG.padthai, IMG.mangoRice].map((img, i) => {
              const d = signatures[i];
              if (!d) return null;
              return (
                <article
                  key={d.th}
                  className="kt-card kt-zoom overflow-hidden rounded-2xl border"
                  style={{ background: C.paper, borderColor: C.line }}
                >
                  <div className="h-52 overflow-hidden">
                    <img src={img} alt={d.th} className="h-full w-full object-cover" loading="lazy" />
                  </div>
                  <div className="p-5">
                    <h3 className="kt-h flex items-center gap-2 text-[16.5px]">
                      {d.th} <Spice level={d.spicy} />
                    </h3>
                    <p className="mt-1 text-[12px] italic" style={{ color: C.gold }}>
                      {d.en}
                    </p>
                    <p className="mt-2 text-[13.5px]" style={{ color: C.soft, lineHeight: 1.7 }}>
                      {d.desc}
                    </p>
                    <div className="kt-h mt-3 text-[16px]" style={{ color: C.chili }}>
                      {d.price}฿
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="mt-10 text-center">
            <button
              onClick={() => goTo("menu")}
              className="rounded-full border px-7 py-3 text-[15px] font-semibold"
              style={{ borderColor: C.ink, color: C.ink }}
            >
              ดูเมนูทั้งหมด 68 รายการ
            </button>
          </div>
        </div>
      </section>

      {/* Story split */}
      <section style={{ background: C.paper }} className="px-5 py-20 lg:px-8">
        <div className="mx-auto grid max-w-[1240px] items-center gap-12 lg:grid-cols-2">
          <div className="kt-zoom overflow-hidden rounded-2xl">
            <img src={IMG.spices} alt="เครื่องแกงตำมือ" className="h-[420px] w-full object-cover" loading="lazy" />
          </div>
          <div>
            <SectionHead
              center={false}
              eyebrow="Our Kitchen"
              title="พริกแกงตำครกหิน ตี 5 ของทุกวัน"
              sub="เราไม่ซื้อพริกแกงสำเร็จรูป ทีมครัวจะคั่วเครื่องเทศและตำพริกแกงเองทุกเช้าก่อนเปิดร้าน กะทิคั้นสดจากมะพร้าวขูดใหม่ ปลาและกุ้งรับตรงจากท่าเรือปากน้ำวันต่อวัน"
            />
            <ul className="mt-7 space-y-4">
              {[
                { t: "วัตถุดิบท้องถิ่น 80%", d: "ผัก สมุนไพร และมะพร้าวจากสวนในอำเภอเมืองและเกาะกลาง" },
                { t: "ไม่ใช้ผงชูรส", d: "ปรุงรสด้วยน้ำปลาแท้ น้ำตาลมะพร้าว และน้ำซุปกระดูกเคี่ยว 8 ชั่วโมง" },
                { t: "ปรับความเผ็ดได้ทุกจาน", d: "แจ้งพนักงานได้เลย ตั้งแต่ไม่เผ็ดจนถึงเผ็ดแบบคนใต้" },
              ].map((f) => (
                <li key={f.t} className="flex gap-3">
                  <Award size={18} className="mt-1 shrink-0" style={{ color: C.gold }} />
                  <div>
                    <div className="kt-h text-[15.5px]">{f.t}</div>
                    <div className="text-[14px]" style={{ color: C.soft, lineHeight: 1.75 }}>
                      {f.d}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Review strip */}
      <section className="px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-[1240px]">
          <SectionHead eyebrow="Guest Reviews" title="เสียงจากลูกค้าของเรา" />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {REVIEWS.slice(0, 2).map((r) => (
              <blockquote
                key={r.name}
                className="rounded-2xl border p-7"
                style={{ background: C.paper, borderColor: C.line }}
              >
                <Quote size={22} style={{ color: C.gold }} />
                <p className="mt-3 text-[15px]" style={{ color: C.soft, lineHeight: 1.9 }}>
                  {r.text}
                </p>
                <footer className="kt-h mt-4 text-[14.5px]">
                  {r.name} <span className="font-normal" style={{ color: C.soft }}>· {r.role}</span>
                </footer>
              </blockquote>
            ))}
          </div>
          <div className="mt-8 text-center">
            <button
              onClick={() => goTo("reviews")}
              className="kt-link text-[15px] font-semibold"
              style={{ color: C.chili }}
            >
              อ่านรีวิวทั้งหมด
            </button>
          </div>
        </div>
      </section>

      <CTABand goTo={goTo} />
    </>
  );
}

function MenuPage({
  cat,
  setCat,
  goTo,
}: {
  cat: string;
  setCat: (v: string) => void;
  goTo: (id: string) => void;
}) {
  const current = MENU.find((m) => m.id === cat) ?? MENU[0];
  return (
    <>
      <PageBanner
        img={IMG.grill}
        eyebrow="Full Menu"
        title="เมนูอาหารไทยต้นตำรับ"
        sub="ราคารวมภาษีแล้ว ปรุงสดตามสั่งใช้เวลา 15–25 นาทีต่อจาน"
      />
      <section className="px-5 py-14 lg:px-8">
        <div className="mx-auto max-w-[1240px]">
          <div className="flex flex-wrap justify-center gap-2.5">
            {MENU.map((m) => (
              <button
                key={m.id}
                onClick={() => setCat(m.id)}
                className="rounded-full border px-5 py-2 text-[14px] font-semibold transition-colors"
                style={{
                  borderColor: cat === m.id ? C.chili : C.line,
                  background: cat === m.id ? C.chili : C.paper,
                  color: cat === m.id ? C.rice : C.ink,
                }}
              >
                {m.title}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1.35fr_1fr]">
            <div>
              <h3 className="kt-h text-[24px]">{current.title}</h3>
              <p className="mt-1 text-[14px]" style={{ color: C.soft }}>
                {current.note}
              </p>
              <div className="mt-4">
                {current.items.map((d) => (
                  <DishCard key={d.th} d={d} />
                ))}
              </div>
              <div
                className="mt-6 flex flex-wrap items-center gap-5 rounded-xl border px-5 py-4 text-[13px]"
                style={{ borderColor: C.line, background: C.paper, color: C.soft }}
              >
                <span className="inline-flex items-center gap-1.5">
                  <Flame size={13} style={{ color: C.chili }} fill={C.chili} /> ระดับความเผ็ด 1–3
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Leaf size={13} style={{ color: "#4B7A3F" }} /> เมนูมังสวิรัติ / ทำเจได้
                </span>
                <span>แจ้งอาการแพ้อาหารกับพนักงานได้ทุกจาน</span>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="kt-zoom overflow-hidden rounded-2xl">
                <img src={IMG.massaman} alt="มัสมั่นไก่" className="h-64 w-full object-cover" loading="lazy" />
              </div>
              <div className="rounded-2xl border p-6" style={{ background: C.paper, borderColor: C.line }}>
                <h4 className="kt-h text-[17px]">เซ็ตแนะนำสำหรับ 2 ท่าน</h4>
                <ul className="mt-3 space-y-2 text-[14px]" style={{ color: C.soft }}>
                  <li>• ทอดมันปลากรายกระบี่</li>
                  <li>• ต้มข่าไก่บ้าน</li>
                  <li>• ผัดไทยกุ้งสดห่อไข่</li>
                  <li>• ข้าวเหนียวมะม่วง + ชาไทยเย็น 2 แก้ว</li>
                </ul>
                <div className="kt-h mt-4 text-[20px]" style={{ color: C.chili }}>
                  590฿ <span className="text-[13px] font-normal line-through" style={{ color: C.soft }}>715฿</span>
                </div>
                <button
                  onClick={() => goTo("reserve")}
                  className="mt-4 w-full rounded-full py-2.5 text-[14.5px] font-semibold"
                  style={{ background: C.chili, color: C.rice }}
                >
                  จองโต๊ะพร้อมสั่งล่วงหน้า
                </button>
              </div>
              <div className="rounded-2xl border p-6" style={{ background: C.paper, borderColor: C.line }}>
                <h4 className="kt-h flex items-center gap-2 text-[17px]">
                  <Utensils size={17} style={{ color: C.gold }} /> สั่งกลับบ้าน / เดลิเวอรี
                </h4>
                <p className="mt-2 text-[14px]" style={{ color: C.soft, lineHeight: 1.8 }}>
                  โทรสั่งล่วงหน้า 30 นาทีแล้วมารับที่ร้าน หรือสั่งผ่านแอปเดลิเวอรีในรัศมี 8 กม.
                  ค่ากล่องบรรจุจานละ 10฿
                </p>
                <a
                  href={`tel:${BRAND.mobile}`}
                  className="kt-h mt-3 inline-block text-[16px]"
                  style={{ color: C.chili }}
                >
                  {BRAND.mobile}
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>
      <CTABand goTo={goTo} />
    </>
  );
}

function PromoPage({ goTo }: { goTo: (id: string) => void }) {
  return (
    <>
      <PageBanner
        img={IMG.table}
        eyebrow="Promotions"
        title="โปรโมชั่นประจำเดือน"
        sub="เงื่อนไขเป็นไปตามที่ร้านกำหนด กรุณาแจ้งสิทธิ์ก่อนสั่งอาหาร"
      />
      <section className="px-5 py-16 lg:px-8">
        <div className="mx-auto grid max-w-[1240px] gap-8 md:grid-cols-2">
          {PROMOS.map((p) => (
            <article
              key={p.title}
              className="kt-card kt-zoom overflow-hidden rounded-2xl border"
              style={{ background: C.paper, borderColor: C.line }}
            >
              <div className="h-56 overflow-hidden">
                <img src={p.img} alt={p.title} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="p-6">
                <span
                  className="rounded-full px-3 py-1 text-[11.5px] font-semibold"
                  style={{ background: "rgba(168,36,28,.1)", color: C.chili }}
                >
                  {p.tag}
                </span>
                <h3 className="kt-h mt-3 text-[20px]">{p.title}</h3>
                <p className="mt-2 text-[14.5px]" style={{ color: C.soft, lineHeight: 1.85 }}>
                  {p.desc}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="kt-h text-[18px]" style={{ color: C.chili }}>
                    {p.price}
                  </span>
                  <button
                    onClick={() => goTo("reserve")}
                    className="rounded-full border px-5 py-2 text-[13.5px] font-semibold"
                    style={{ borderColor: C.ink }}
                  >
                    จองรับสิทธิ์
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CTABand goTo={goTo} />
    </>
  );
}

function AboutPage() {
  return (
    <>
      <PageBanner
        img={IMG.chef}
        eyebrow="Our Story"
        title="เรื่องราวของครัวไทยต้นตำรับ"
        sub="จากร้านข้าวแกงห้องแถวสองคูหา สู่ครัวไทยที่คนกระบี่พาแขกบ้านแขกเมืองมากินมา 32 ปี"
      />
      <section className="px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-[1240px]">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div className="kt-zoom overflow-hidden rounded-2xl">
              <img src={IMG.interior} alt="บรรยากาศภายในร้าน" className="h-[440px] w-full object-cover" loading="lazy" />
            </div>
            <div className="space-y-5 text-[15.5px]" style={{ color: C.soft, lineHeight: 1.95 }}>
              <p>
                ปี 2536 คุณยายละมัย เปิดร้านข้าวแกงเล็ก ๆ หน้าตลาดปากน้ำ ด้วยหม้อแกงสามใบและเตาถ่านหนึ่งเตา
                สูตรพริกแกงที่ใช้คือสูตรที่ท่านได้รับต่อมาจากแม่ครัวในบ้านเจ้าเมืองกระบี่สมัยก่อน
              </p>
              <p>
                วันนี้รุ่นลูกและรุ่นหลานยังยึดวิธีเดิมทุกอย่าง — ตำพริกแกงด้วยครกหิน คั่วเครื่องเทศในกระทะเหล็ก
                เคี่ยวน้ำซุปกระดูกหมูวันละ 8 ชั่วโมง และซื้อกุ้งหอยปูปลาจากเรือประมงเจ้าประจำที่ท่าเรือปากน้ำทุกเช้า
              </p>
              <p>
                เราขยายจากสองคูหาเป็นเรือนไม้สองชั้นที่นั่งได้ 120 ที่ มีโซนสวนสำหรับครอบครัว และห้องส่วนตัวสำหรับงานเลี้ยง
                แต่สิ่งที่ไม่เคยเปลี่ยนคือรสมือ และการปรุงทุกจานตามสั่งเมื่อออร์เดอร์เข้าครัวเท่านั้น
              </p>
            </div>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-4">
            {[
              { n: "2536", l: "เปิดร้านข้าวแกงหน้าตลาดปากน้ำ" },
              { n: "2548", l: "ย้ายมาเรือนไม้ ถ.มหาราช 120 ที่นั่ง" },
              { n: "2559", l: "รางวัลร้านอาหารไทยยอดเยี่ยม จ.กระบี่" },
              { n: "2567", l: "เปิดครัวจัดเลี้ยงนอกสถานที่เต็มรูปแบบ" },
            ].map((t) => (
              <div key={t.n} className="rounded-2xl border p-6" style={{ background: C.paper, borderColor: C.line }}>
                <div className="kt-h text-[26px]" style={{ color: C.gold }}>
                  {t.n}
                </div>
                <p className="mt-2 text-[14px]" style={{ color: C.soft, lineHeight: 1.75 }}>
                  {t.l}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              { name: "เชฟสมนึก แซ่ตั้ง", role: "หัวหน้าครัว (รุ่นที่ 2)", d: "ดูแลเครื่องแกงและแกงกะทิทุกหม้อ ประสบการณ์ 28 ปี" },
              { name: "คุณพิมพ์ใจ นาคะเวช", role: "ผู้จัดการร้าน", d: "ดูแลงานบริการ งานเลี้ยง และการจองโต๊ะล่วงหน้า" },
              { name: "เชฟกิตติ ชูเมือง", role: "เชฟครัวย่างและซีฟู้ด", d: "รับผิดชอบเตาถ่านและวัตถุดิบทะเลประจำวัน" },
            ].map((p) => (
              <div key={p.name} className="rounded-2xl border p-7 text-center" style={{ background: C.paper, borderColor: C.line }}>
                <span
                  className="mx-auto flex h-14 w-14 items-center justify-center rounded-full"
                  style={{ background: "rgba(200,149,47,.14)", color: C.gold }}
                >
                  <ChefHat size={24} />
                </span>
                <h4 className="kt-h mt-4 text-[17px]">{p.name}</h4>
                <p className="text-[13px]" style={{ color: C.gold }}>
                  {p.role}
                </p>
                <p className="mt-2 text-[14px]" style={{ color: C.soft, lineHeight: 1.75 }}>
                  {p.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function GalleryPage({ onOpen }: { onOpen: (i: number) => void }) {
  return (
    <>
      <PageBanner
        img={IMG.seafood}
        eyebrow="Gallery"
        title="ภาพบรรยากาศและอาหาร"
        sub="คลิกที่ภาพเพื่อดูขนาดเต็ม · ใช้ปุ่มลูกศรซ้าย-ขวาเลื่อนดูภาพถัดไป"
      />
      <section className="px-5 py-16 lg:px-8">
        <div className="mx-auto grid max-w-[1240px] gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY.map((g, i) => (
            <button
              key={g.src + i}
              onClick={() => onOpen(i)}
              className="kt-card kt-zoom group overflow-hidden rounded-2xl border text-left"
              style={{ background: C.paper, borderColor: C.line }}
            >
              <div className="h-60 overflow-hidden">
                <img src={g.src} alt={g.cap} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <p className="px-4 py-3 text-[13.5px]" style={{ color: C.soft }}>
                {g.cap}
              </p>
            </button>
          ))}
        </div>
      </section>
    </>
  );
}

function ReviewsPage({ goTo }: { goTo: (id: string) => void }) {
  return (
    <>
      <PageBanner
        img={IMG.dessert}
        eyebrow="Reviews"
        title="รีวิวจากลูกค้า"
        sub="คะแนนเฉลี่ย 4.9 จาก 1,240 รีวิวบน Google และ TripAdvisor"
      />
      <section className="px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-[1240px]">
          <div className="grid gap-6 md:grid-cols-2">
            {REVIEWS.map((r) => (
              <blockquote key={r.name} className="rounded-2xl border p-7" style={{ background: C.paper, borderColor: C.line }}>
                <div className="flex gap-1">
                  {Array.from({ length: r.stars }).map((_, i) => (
                    <Star key={i} size={16} style={{ color: C.gold }} fill={C.gold} />
                  ))}
                </div>
                <p className="mt-3 text-[15px]" style={{ color: C.soft, lineHeight: 1.9 }}>
                  “{r.text}”
                </p>
                <footer className="kt-h mt-4 text-[14.5px]">
                  {r.name}{" "}
                  <span className="font-normal" style={{ color: C.soft }}>
                    · {r.role}
                  </span>
                </footer>
              </blockquote>
            ))}
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-4">
            {[
              { n: "4.9", l: "คะแนนเฉลี่ย Google" },
              { n: "1,240", l: "รีวิวทั้งหมด" },
              { n: "96%", l: "แนะนำให้เพื่อนมา" },
              { n: "#2", l: "อันดับร้านอาหารไทยในกระบี่" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl border p-6 text-center" style={{ background: C.paper, borderColor: C.line }}>
                <div className="kt-h text-[28px]" style={{ color: C.chili }}>
                  {s.n}
                </div>
                <p className="mt-1 text-[13.5px]" style={{ color: C.soft }}>
                  {s.l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTABand goTo={goTo} />
    </>
  );
}

function ReservePage() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageBanner
        img={IMG.interior}
        eyebrow="Reservation"
        title="จองโต๊ะและติดต่อเรา"
        sub="รับจองล่วงหน้าไม่เกิน 30 วัน · โต๊ะจะถูกเก็บไว้ให้ 20 นาทีหลังเวลานัด"
      />
      <section className="px-5 py-16 lg:px-8">
        <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div className="rounded-2xl border p-8" style={{ background: C.paper, borderColor: C.line }}>
            <h3 className="kt-h flex items-center gap-2 text-[21px]">
              <CalendarCheck size={20} style={{ color: C.gold }} /> แบบฟอร์มจองโต๊ะ
            </h3>
            {sent ? (
              <div
                className="mt-6 rounded-xl px-5 py-6 text-[15px]"
                style={{ background: "rgba(75,122,63,.1)", color: "#3F6636", lineHeight: 1.85 }}
              >
                รับคำขอจองเรียบร้อยแล้ว ทีมงานจะโทรยืนยันภายใน 30 นาทีในเวลาทำการ
                <br />
                <span style={{ color: C.soft }}>(นี่คือเว็บตัวอย่าง — ข้อมูลไม่ถูกบันทึกจริง)</span>
              </div>
            ) : (
              <form
                className="mt-6 grid gap-4 sm:grid-cols-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <Field label="ชื่อผู้จอง" placeholder="เช่น คุณสมชาย" required />
                <Field label="เบอร์โทรศัพท์" placeholder="08x-xxx-xxxx" required type="tel" />
                <Field label="วันที่" type="date" required />
                <Field label="เวลา" type="time" required />
                <div>
                  <label className="mb-1.5 block text-[13.5px] font-semibold">จำนวนผู้ใหญ่</label>
                  <select className="w-full rounded-lg border px-3 py-2.5 text-[14.5px]" style={{ borderColor: C.line, background: C.rice }}>
                    {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((n) => (
                      <option key={n}>{n} ท่าน</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-[13.5px] font-semibold">โซนที่ต้องการ</label>
                  <select className="w-full rounded-lg border px-3 py-2.5 text-[14.5px]" style={{ borderColor: C.line, background: C.rice }}>
                    <option>โซนในร้านปรับอากาศ</option>
                    <option>โซนสวนกลางแจ้ง</option>
                    <option>ห้องส่วนตัว (10 ท่านขึ้นไป)</option>
                    <option>เคาน์เตอร์ครัวเปิด</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-[13.5px] font-semibold">ความต้องการเพิ่มเติม</label>
                  <textarea
                    rows={4}
                    placeholder="เช่น แพ้กุ้ง ไม่เผ็ด ขอเก้าอี้เด็ก 1 ตัว หรือสั่งอาหารล่วงหน้า"
                    className="w-full rounded-lg border px-3 py-2.5 text-[14.5px]"
                    style={{ borderColor: C.line, background: C.rice }}
                  />
                </div>
                <button
                  type="submit"
                  className="sm:col-span-2 rounded-full py-3 text-[15px] font-semibold"
                  style={{ background: C.chili, color: C.rice }}
                >
                  ยืนยันการจองโต๊ะ
                </button>
              </form>
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border p-7" style={{ background: C.paper, borderColor: C.line }}>
              <h4 className="kt-h text-[18px]">ข้อมูลติดต่อ</h4>
              <ul className="mt-4 space-y-3 text-[14.5px]" style={{ color: C.soft }}>
                <li className="flex gap-3">
                  <MapPin size={17} className="mt-0.5 shrink-0" style={{ color: C.gold }} />
                  {BRAND.address}
                </li>
                <li className="flex gap-3">
                  <Phone size={17} className="mt-0.5 shrink-0" style={{ color: C.gold }} />
                  <span>
                    {BRAND.phone} (ร้าน) · {BRAND.mobile} (สั่งกลับบ้าน)
                  </span>
                </li>
                <li className="flex gap-3">
                  <Mail size={17} className="mt-0.5 shrink-0" style={{ color: C.gold }} />
                  {BRAND.email}
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border p-7" style={{ background: C.paper, borderColor: C.line }}>
              <h4 className="kt-h text-[18px]">เวลาเปิด–ปิด</h4>
              <ul className="mt-4 space-y-2.5 text-[14.5px]">
                {BRAND.hours.map((h) => (
                  <li key={h.d} className="flex items-center justify-between gap-4 border-b pb-2" style={{ borderColor: C.line }}>
                    <span style={{ color: C.soft }}>{h.d}</span>
                    <span className="kt-h text-[14px]">{h.t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="overflow-hidden rounded-2xl border" style={{ borderColor: C.line }}>
              <div
                className="flex h-56 flex-col items-center justify-center text-center"
                style={{ background: "linear-gradient(135deg,#EFE7D8,#F8F1E4)" }}
              >
                <MapPin size={26} style={{ color: C.chili }} />
                <p className="kt-h mt-2 text-[15px]">แผนที่ร้าน</p>
                <p className="mt-1 max-w-xs text-[13px]" style={{ color: C.soft }}>
                  ห่างจากท่าเรือปากน้ำ 600 ม. · มีที่จอดรถในร้าน 30 คัน
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[13.5px] font-semibold">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-lg border px-3 py-2.5 text-[14.5px]"
        style={{ borderColor: C.line, background: C.rice }}
      />
    </div>
  );
}

function PageBanner({
  img,
  eyebrow,
  title,
  sub,
}: {
  img: string;
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden">
      <img src={img} alt={title} className="absolute inset-0 -z-10 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10" style={{ background: "rgba(20,18,15,.72)" }} />
      <div className="mx-auto max-w-[1240px] px-5 py-20 text-center lg:px-8">
        <span className="kt-eyebrow" style={{ color: C.gold }}>
          {eyebrow}
        </span>
        <h1 className="kt-h mt-3" style={{ color: C.rice, fontSize: "clamp(28px,4vw,48px)", lineHeight: 1.2 }}>
          {title}
        </h1>
        {sub && (
          <p className="mx-auto mt-4 max-w-2xl text-[15.5px]" style={{ color: "rgba(251,247,239,.82)", lineHeight: 1.85 }}>
            {sub}
          </p>
        )}
      </div>
    </section>
  );
}

function CTABand({ goTo }: { goTo: (id: string) => void }) {
  return (
    <section style={{ background: C.ink }} className="px-5 py-14 lg:px-8">
      <div className="mx-auto flex max-w-[1240px] flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
        <div>
          <h3 className="kt-h" style={{ color: C.rice, fontSize: "clamp(21px,2.4vw,30px)" }}>
            อยากได้โต๊ะริมสวนคืนนี้?
          </h3>
          <p className="mt-2 text-[15px]" style={{ color: "rgba(251,247,239,.72)" }}>
            ช่วงเย็นวันศุกร์–อาทิตย์โต๊ะเต็มเร็ว แนะนำให้จองล่วงหน้าอย่างน้อย 1 วัน
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => goTo("reserve")}
            className="rounded-full px-7 py-3 text-[15px] font-semibold"
            style={{ background: C.chili, color: C.rice }}
          >
            จองโต๊ะออนไลน์
          </button>
          <a
            href={`tel:${BRAND.phone}`}
            className="rounded-full border px-7 py-3 text-[15px] font-semibold"
            style={{ borderColor: C.gold, color: C.gold }}
          >
            โทร {BRAND.phone}
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer({ goTo }: { goTo: (id: string) => void }) {
  return (
    <footer style={{ background: "#141210", color: "rgba(251,247,239,.72)" }}>
      <div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-14 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="kt-h text-[18px]" style={{ color: C.rice }}>
            {BRAND.name}
          </div>
          <p className="kt-eyebrow mt-1" style={{ color: C.gold }}>
            {BRAND.nameEN}
          </p>
          <p className="mt-4 text-[14px]" style={{ lineHeight: 1.85 }}>
            {BRAND.tagline}
          </p>
          <div className="mt-4 flex gap-3">
            <span className="rounded-full border p-2" style={{ borderColor: "rgba(200,149,47,.4)", color: C.gold }}>
              <Facebook size={15} />
            </span>
            <span className="rounded-full border p-2" style={{ borderColor: "rgba(200,149,47,.4)", color: C.gold }}>
              <Instagram size={15} />
            </span>
          </div>
        </div>
        <div>
          <h4 className="kt-h text-[15px]" style={{ color: C.rice }}>
            เมนูเว็บไซต์
          </h4>
          <ul className="mt-3 space-y-2 text-[14px]">
            {NAV.map((n) => (
              <li key={n.id}>
                <button onClick={() => goTo(n.id)} className="hover:underline">
                  {n.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="kt-h text-[15px]" style={{ color: C.rice }}>
            เวลาเปิดร้าน
          </h4>
          <ul className="mt-3 space-y-2 text-[14px]">
            {BRAND.hours.map((h) => (
              <li key={h.d}>
                {h.d}
                <br />
                <span style={{ color: C.gold }}>{h.t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="kt-h text-[15px]" style={{ color: C.rice }}>
            ติดต่อ
          </h4>
          <ul className="mt-3 space-y-2 text-[14px]">
            <li>{BRAND.address}</li>
            <li>โทร {BRAND.phone}</li>
            <li>สั่งกลับบ้าน {BRAND.mobile}</li>
            <li>{BRAND.email}</li>
            <li>LINE {BRAND.line}</li>
          </ul>
        </div>
      </div>
      <div
        className="border-t px-5 py-5 text-center text-[12.5px] lg:px-8"
        style={{ borderColor: "rgba(255,255,255,.08)" }}
      >
        © {new Date().getFullYear()} {BRAND.name} — เว็บไซต์ตัวอย่างโดย MedeeWeb
      </div>
    </footer>
  );
}
