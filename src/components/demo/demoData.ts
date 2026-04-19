import type { DemoTheme } from "@/components/demo/MiniSite";

export type DemoMeta = {
  slug:
    | "restaurant"
    | "hotel"
    | "company"
    | "contractor"
    | "realestate"
    | "insurance"
    | "clinic"
    | "sabaidi-home";
  industry: string;
  brand: string;
  tagline: string;
  description: string;
  cover: string;
  priceFrom: number;
  theme: DemoTheme;
};

export const DEMOS: DemoMeta[] = [
  {
    slug: "restaurant",
    industry: "ร้านอาหาร / คาเฟ่",
    brand: "ครัวเรือนใต้",
    tagline: "อาหารใต้รสจัดจ้าน สูตรต้นตำรับ",
    description: "เว็บไซต์ร้านอาหารสไตล์ใต้ พร้อมเมนู จองโต๊ะ และโปรโมชั่น",
    cover:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&q=80&auto=format&fit=crop",
    theme: {
      primary: "#B91C1C",
      accent: "#F59E0B",
      bg: "#FFF8F0",
      text: "#1F2937",
      heroBg: "linear-gradient(135deg, #FEF3C7 0%, #FED7AA 100%)",
    },
  },
  {
    slug: "hotel",
    industry: "โรงแรม / รีสอร์ท",
    brand: "อันดามัน รีสอร์ท",
    tagline: "พักผ่อนริมทะเลกระบี่",
    description: "เว็บไซต์โรงแรมพร้อมระบบจองห้อง แกลเลอรี และข้อมูลสิ่งอำนวยความสะดวก",
    cover:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80&auto=format&fit=crop",
    theme: {
      primary: "#0E7490",
      accent: "#06B6D4",
      bg: "#F0FDFF",
      text: "#0F172A",
      heroBg: "linear-gradient(135deg, #CFFAFE 0%, #BAE6FD 100%)",
    },
  },
  {
    slug: "company",
    industry: "บริษัท / องค์กร",
    brand: "สยามเทค โซลูชั่นส์",
    tagline: "ที่ปรึกษาธุรกิจครบวงจร",
    description: "เว็บไซต์บริษัทแบบมืออาชีพ พร้อมหน้าบริการ ทีมงาน และเคสงาน",
    cover:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80&auto=format&fit=crop",
    theme: {
      primary: "#1E40AF",
      accent: "#3B82F6",
      bg: "#F8FAFC",
      text: "#0F172A",
      heroBg: "linear-gradient(135deg, #DBEAFE 0%, #E0E7FF 100%)",
    },
  },
  {
    slug: "contractor",
    industry: "ผู้รับเหมา / ก่อสร้าง",
    brand: "ใต้บ้านการช่าง",
    tagline: "รับเหมาก่อสร้างครบวงจร",
    description: "เว็บไซต์ผู้รับเหมา พร้อมผลงาน บริการ และฟอร์มขอใบเสนอราคา",
    cover:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80&auto=format&fit=crop",
    theme: {
      primary: "#92400E",
      accent: "#F59E0B",
      bg: "#FFFBEB",
      text: "#1F2937",
      heroBg: "linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)",
    },
  },
  {
    slug: "realestate",
    industry: "อสังหาริมทรัพย์",
    brand: "Krabi Property",
    tagline: "บ้าน คอนโด ที่ดิน ทำเลทอง",
    description: "เว็บไซต์ลงประกาศขาย-เช่าอสังหาฯ พร้อมแกลเลอรี และค้นหาตามทำเล",
    cover:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=80&auto=format&fit=crop",
    theme: {
      primary: "#065F46",
      accent: "#10B981",
      bg: "#F0FDF4",
      text: "#0F172A",
      heroBg: "linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)",
    },
  },
  {
    slug: "insurance",
    industry: "ประกันภัย / การเงิน",
    brand: "ใต้ประกันภัย",
    tagline: "คุ้มครองครบ ดูแลทุกความเสี่ยง",
    description: "เว็บไซต์ตัวแทนประกัน พร้อมแพ็กเกจ คำนวณเบี้ย และฟอร์มขอข้อมูล",
    cover:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80&auto=format&fit=crop",
    theme: {
      primary: "#1E3A8A",
      accent: "#F97316",
      bg: "#F8FAFC",
      text: "#0F172A",
      heroBg: "linear-gradient(135deg, #DBEAFE 0%, #FED7AA 100%)",
    },
  },
  {
    slug: "clinic",
    industry: "คลินิก / โรงพยาบาล",
    brand: "ใต้คลินิกความงาม",
    tagline: "ดูแลผิวพรรณ ครบวงจร โดยแพทย์",
    description: "เว็บไซต์คลินิกความงาม พร้อมบริการ แพทย์ และระบบนัดหมาย",
    cover:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80&auto=format&fit=crop",
    theme: {
      primary: "#BE185D",
      accent: "#EC4899",
      bg: "#FDF2F8",
      text: "#1F2937",
      heroBg: "linear-gradient(135deg, #FCE7F3 0%, #FBCFE8 100%)",
    },
  },
  {
    slug: "sabaidi-home",
    industry: "โฮมสเตย์ / ที่พักท้องถิ่น",
    brand: "สบายดีโฮมสเตย์",
    tagline: "อบอุ่นเหมือนบ้านญาติคนใต้",
    description: "เว็บไซต์โฮมสเตย์ บอกเล่าเรื่องราว ห้องพัก กิจกรรม และจุดท่องเที่ยวใกล้เคียง",
    cover:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80&auto=format&fit=crop",
    theme: {
      primary: "#7C2D12",
      accent: "#84CC16",
      bg: "#FEFCE8",
      text: "#1F2937",
      heroBg: "linear-gradient(135deg, #ECFCCB 0%, #FED7AA 100%)",
    },
  },
];

export function getDemo(slug: string): DemoMeta | undefined {
  return DEMOS.find((d) => d.slug === slug);
}
