import { useMemo, useState } from "react";
import { Search, Calculator, CheckCircle2 } from "lucide-react";
import { DemoCardGrid, DemoSection, type DemoTheme } from "@/components/demo/MiniSite";

type PropertySearchPanelProps = { theme: DemoTheme };

const properties = [
  { title: "บ้านเดี่ยว อ่าวนาง", desc: "3 นอน 2 น้ำ · ใกล้ทะเล", price: 4500000 },
  { title: "ทาวน์โฮม เมืองกระบี่", desc: "2 นอน 2 น้ำ · ทำเลชุมชน", price: 2200000 },
  { title: "คอนโดวิวทะเล", desc: "1 นอน 35 ตร.ม. · พร้อมอยู่", price: 2800000 },
  { title: "ที่ดิน 200 ตร.วา", desc: "ติดถนน · ใกล้หาด", price: 8500000 },
  { title: "วิลล่าหรู", desc: "พร้อมสระว่ายน้ำ · วิวภูเขา", price: 15000000 },
  { title: "ตึกแถว 3 คูหา", desc: "ติดถนนใหญ่ · เหมาะทำธุรกิจ", price: 9000000 },
];

export function PropertySearchPanel({ theme }: PropertySearchPanelProps) {
  const [type, setType] = useState("ทั้งหมด");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("ทั้งหมด");
  const [searched, setSearched] = useState(false);

  const results = useMemo(() => {
    const max =
      budget === "ไม่เกิน 3 ล้าน"
        ? 3000000
        : budget === "ไม่เกิน 5 ล้าน"
          ? 5000000
          : budget === "ไม่เกิน 10 ล้าน"
            ? 10000000
            : Number.POSITIVE_INFINITY;
    return properties.filter((property) => {
      const matchesLocation =
        !location ||
        `${property.title} ${property.desc}`.toLowerCase().includes(location.toLowerCase());
      const matchesType =
        type === "ทั้งหมด" || property.title.toLowerCase().includes(type.toLowerCase());
      return matchesLocation && matchesType && property.price <= max;
    });
  }, [budget, location, type]);

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSearched(true);
        }}
        className="mb-6 grid gap-3 rounded-xl bg-white p-4 shadow-md md:grid-cols-[1fr_1fr_1fr_auto]"
      >
        <label className="text-xs font-semibold text-gray-600">
          ประเภท
          <select
            value={type}
            onChange={(event) => setType(event.target.value)}
            className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm font-normal"
          >
            <option>ทั้งหมด</option>
            <option>บ้าน</option>
            <option>คอนโด</option>
            <option>ที่ดิน</option>
            <option>วิลล่า</option>
            <option>ตึกแถว</option>
          </select>
        </label>
        <label className="text-xs font-semibold text-gray-600">
          ทำเล
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="เช่น อ่าวนาง"
            className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm font-normal"
          />
        </label>
        <label className="text-xs font-semibold text-gray-600">
          งบประมาณ
          <select
            value={budget}
            onChange={(event) => setBudget(event.target.value)}
            className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm font-normal"
          >
            <option>ทั้งหมด</option>
            <option>ไม่เกิน 3 ล้าน</option>
            <option>ไม่เกิน 5 ล้าน</option>
            <option>ไม่เกิน 10 ล้าน</option>
          </select>
        </label>
        <button
          type="submit"
          className="mt-auto inline-flex h-10 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold text-white"
          style={{ background: theme.primary }}
        >
          <Search className="h-4 w-4" />
          ค้นหา
        </button>
      </form>
      {searched && (
        <p className="mb-4 text-sm text-gray-600">พบ {results.length} รายการที่ตรงกับเงื่อนไข</p>
      )}
      <DemoCardGrid
        theme={theme}
        items={results.map((property) => ({
          title: property.title,
          desc: property.desc,
          price: `฿${(property.price / 1000000).toFixed(1)}M`,
        }))}
      />
    </div>
  );
}

type InsuranceCalculatorProps = { theme: DemoTheme };

export function InsuranceCalculator({ theme }: InsuranceCalculatorProps) {
  const [kind, setKind] = useState("รถยนต์");
  const [value, setValue] = useState(1000000);
  const [age, setAge] = useState(35);
  const [premium, setPremium] = useState<number | null>(null);

  const calculate = () => {
    const base =
      { รถยนต์: 7500, บ้าน: 1200, สุขภาพ: 15000 }[kind as "รถยนต์" | "บ้าน" | "สุขภาพ"] ?? 7500;
    const valueFactor =
      kind === "รถยนต์"
        ? Math.min(value * 0.006, 12000)
        : kind === "บ้าน"
          ? Math.min(value * 0.001, 10000)
          : 0;
    const ageFactor = kind === "สุขภาพ" && age > 45 ? (age - 45) * 350 : 0;
    setPremium(Math.round(base + valueFactor + ageFactor));
  };

  return (
    <div className="mx-auto max-w-md rounded-xl bg-white p-6 shadow-md">
      <div className="mb-4 flex items-center gap-2 font-semibold" style={{ color: theme.primary }}>
        <Calculator className="h-5 w-5" />
        กรอกข้อมูลเพื่อประเมินเบี้ย
      </div>
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          ประเภทประกัน
          <select
            value={kind}
            onChange={(event) => {
              setKind(event.target.value);
              setPremium(null);
            }}
            className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
          >
            <option>รถยนต์</option>
            <option>บ้าน</option>
            <option>สุขภาพ</option>
          </select>
        </label>
        <label className="block text-sm font-medium text-gray-700">
          มูลค่าทรัพย์สิน/ทุนประกัน
          <input
            type="number"
            min={0}
            value={value}
            onChange={(event) => setValue(Number(event.target.value))}
            className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
          />
        </label>
        <label className="block text-sm font-medium text-gray-700">
          อายุผู้เอาประกัน
          <input
            type="number"
            min={1}
            max={100}
            value={age}
            onChange={(event) => setAge(Number(event.target.value))}
            className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
          />
        </label>
        <button
          type="button"
          onClick={calculate}
          className="w-full rounded-full py-2.5 text-sm font-semibold text-white"
          style={{ background: theme.primary }}
        >
          คำนวณเบี้ย
        </button>
      </div>
      {premium !== null && (
        <div className="mt-5 rounded-lg border border-green-200 bg-green-50 p-4 text-center text-green-800">
          <CheckCircle2 className="mx-auto h-6 w-6" />
          <p className="mt-1 text-sm">เบี้ยประกันโดยประมาณ</p>
          <p className="text-2xl font-bold">฿{premium.toLocaleString("th-TH")}/ปี</p>
          <p className="mt-1 text-xs">เจ้าหน้าที่จะยืนยันเบี้ยจริงตามข้อมูลกรมธรรม์</p>
        </div>
      )}
    </div>
  );
}

export function PropertySearchSection({ theme }: PropertySearchPanelProps) {
  return (
    <DemoSection theme={theme} title="ค้นหาทรัพย์ที่ตรงใจ">
      <PropertySearchPanel theme={theme} />
    </DemoSection>
  );
}
