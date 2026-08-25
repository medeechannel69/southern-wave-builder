export type QuotePackage = {
  id: "starter" | "business" | "pro";
  label: string;
  price: number;
  deliveryDays: number;
  features: string[];
};

export type QuoteAddon = {
  name: string;
  price: number;
  deliveryDays: number;
};

export type QuoteBreakdown = {
  package: QuotePackage;
  addons: QuoteAddon[];
  subtotal: number;
  total: number;
  deliveryDays: number;
  estimatedDeliveryDate: string;
};

export const QUOTE_PACKAGES: QuotePackage[] = [
  {
    id: "starter",
    label: "Starter 5,000",
    price: 5000,
    deliveryDays: 3,
    features: ["เว็บไซต์ 1 หน้า", "รองรับมือถือ", "โดเมน + โฮสติ้ง 1 ปี"],
  },
  {
    id: "business",
    label: "Business 9,000",
    price: 9000,
    deliveryDays: 7,
    features: ["เว็บไซต์ 5 หน้า", "SEO พื้นฐาน", "โดเมน + โฮสติ้ง 1 ปี"],
  },
  {
    id: "pro",
    label: "Pro 15,000",
    price: 15000,
    deliveryDays: 14,
    features: ["เว็บไซต์ 10 หน้า", "Blog + SEO ครบ", "Analytics"],
  },
  {
    id: "starter",
    label: "ยังไม่ตัดสินใจ",
    price: 5000,
    deliveryDays: 3,
    features: ["ทีมงานช่วยเลือกแพ็กเกจ", "เริ่มต้นจาก 5,000 บาท"],
  },
];

export const QUOTE_ADDONS: QuoteAddon[] = [
  { name: "SEO", price: 2000, deliveryDays: 1 },
  { name: "ระบบบล็อก", price: 3000, deliveryDays: 2 },
  { name: "ระบบจองออนไลน์", price: 8000, deliveryDays: 3 },
  { name: "ระบบอสังหาฯ", price: 7000, deliveryDays: 3 },
  { name: "AI Marketing", price: 5000, deliveryDays: 2 },
];

export function getQuotePackage(label: string): QuotePackage {
  return QUOTE_PACKAGES.find((item) => item.label === label) ?? QUOTE_PACKAGES[0];
}

export function getQuoteAddon(name: string): QuoteAddon | undefined {
  return QUOTE_ADDONS.find((item) => item.name === name);
}

export function addBusinessDays(start: Date, days: number): Date {
  const result = new Date(start);
  result.setHours(12, 0, 0, 0);
  let remaining = Math.max(0, days);
  while (remaining > 0) {
    result.setDate(result.getDate() + 1);
    const day = result.getDay();
    if (day !== 0 && day !== 6) remaining -= 1;
  }
  return result;
}

export function toDateInputValue(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatThaiDate(dateInput: string | Date): string {
  const date = typeof dateInput === "string" ? new Date(`${dateInput}T12:00:00`) : dateInput;
  return new Intl.DateTimeFormat("th-TH", {
    dateStyle: "long",
    timeZone: "Asia/Bangkok",
  }).format(date);
}

export function calculateQuote(
  packageName: string,
  addonNames: string[],
  now = new Date(),
): QuoteBreakdown {
  const selectedPackage = getQuotePackage(packageName);
  const addons = addonNames.map(getQuoteAddon).filter((item): item is QuoteAddon => Boolean(item));
  const addonTotal = addons.reduce((sum, addon) => sum + addon.price, 0);
  const deliveryDays =
    selectedPackage.deliveryDays +
    addons.reduce((max, addon) => Math.max(max, addon.deliveryDays), 0);
  const estimatedDeliveryDate = toDateInputValue(addBusinessDays(now, deliveryDays));
  const subtotal = selectedPackage.price + addonTotal;

  return {
    package: selectedPackage,
    addons,
    subtotal,
    total: subtotal,
    deliveryDays,
    estimatedDeliveryDate,
  };
}

export function createQuoteNumber(date = new Date()): string {
  const datePart = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
  const randomPart = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `MDW-${datePart}-${randomPart}`;
}

export function formatCurrency(amount: number): string {
  return `${amount.toLocaleString("th-TH")} บาท`;
}
