import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { DemoBar } from "@/components/DemoBar";
import {
  MiniSite,
  DemoHero,
  DemoSection,
  DemoCardGrid,
  DemoContactPage,
  DemoGallery,
  DemoTable,
  DemoNewsList,
  type MiniSiteConfig,
} from "@/components/demo/MiniSite";
import { getDemo, type DemoMeta } from "@/components/demo/demoData";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/demo/$slug")({
  loader: ({ params }) => {
    const demo = getDemo(params.slug);
    if (!demo) throw notFound();
    return { demo };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.demo.brand} — ตัวอย่างเว็บไซต์ MedeeWeb` },
          { name: "description", content: loaderData.demo.description },
          { property: "og:title", content: loaderData.demo.brand },
          { property: "og:description", content: loaderData.demo.description },
          { property: "og:image", content: loaderData.demo.cover },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center px-4 text-center">
      <div>
        <h1 className="text-4xl font-bold">ไม่พบ Demo</h1>
        <p className="mt-2 text-muted-foreground">Demo ที่คุณกำลังหาไม่มีอยู่</p>
        <Link to="/demo" className="mt-4 inline-block">
          <Button>กลับหน้า Demo</Button>
        </Link>
      </div>
    </div>
  ),
  component: DemoMiniSite,
});

function DemoMiniSite() {
  const { demo } = Route.useLoaderData();
  const config = buildConfig(demo);
  return (
    <DemoBar
      industryLabel={demo.industry}
      industryName={demo.brand}
      slug={demo.slug}
      priceFrom={demo.priceFrom}
    >
      <MiniSite config={config} />
    </DemoBar>
  );
}

/* ============= Industry-specific content ============= */

function buildConfig(demo: DemoMeta): MiniSiteConfig {
  const { theme } = demo;

  const contactPage = {
    id: "contact",
    label: "ติดต่อ",
    content: (
      <DemoContactPage
        theme={theme}
        config={{
          brand: demo.brand,
          tagline: demo.tagline,
          theme,
          phone: "075-xxx-xxx",
          address: "อ.เมือง จ.กระบี่",
          email: `info@${demo.slug}.demo`,
          pages: [],
        }}
      />
    ),
  };

  const baseConfig = {
    brand: demo.brand,
    tagline: demo.tagline,
    theme,
    phone: "075-xxx-xxx",
    address: "123 ถ.อุตรกิจ อ.เมือง จ.กระบี่ 81000",
    email: `info@${demo.slug}.demo`,
  };

  switch (demo.slug) {
    case "restaurant":
      return {
        ...baseConfig,
        pages: [
          {
            id: "home",
            label: "หน้าแรก",
            content: (
              <>
                <DemoHero
                  theme={theme}
                  eyebrow="เปิดทุกวัน 10:00–22:00"
                  title="อาหารใต้รสจัดจ้าน สูตรต้นตำรับ"
                  subtitle="ครัวเรือนใต้ ปรุงสดทุกจาน ด้วยวัตถุดิบคุณภาพจากท้องถิ่น"
                  cta="จองโต๊ะ"
                  image={demo.cover}
                />
                <DemoSection theme={theme} title="เมนูแนะนำ">
                  <DemoCardGrid
                    theme={theme}
                    items={[
                      {
                        title: "แกงไตปลา",
                        desc: "รสจัดจ้านต้นตำรับเมืองใต้",
                        price: "฿120",
                        image:
                          "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600&q=80",
                      },
                      {
                        title: "คั่วกลิ้งหมู",
                        desc: "เผ็ดร้อน หอมเครื่องเทศ",
                        price: "฿140",
                        image:
                          "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80",
                      },
                      {
                        title: "ข้าวยำปักษ์ใต้",
                        desc: "สดใหม่ น้ำบูดูแท้",
                        price: "฿80",
                        image:
                          "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=80",
                      },
                    ]}
                  />
                </DemoSection>
              </>
            ),
          },
          {
            id: "menu",
            label: "เมนู",
            content: (
              <DemoSection theme={theme} title="เมนูทั้งหมด">
                <DemoCardGrid
                  theme={theme}
                  items={[
                    { title: "แกงไตปลา", desc: "เมนูเด็ดประจำร้าน", price: "฿120" },
                    { title: "คั่วกลิ้งหมู", desc: "หอมเครื่องเทศใต้", price: "฿140" },
                    { title: "ข้าวยำปักษ์ใต้", desc: "ทานคู่น้ำบูดู", price: "฿80" },
                    { title: "ผัดสะตอกุ้ง", desc: "กุ้งสดทุกวัน", price: "฿180" },
                    { title: "ปลาทอดขมิ้น", desc: "กรอบนอกนุ่มใน", price: "฿220" },
                    { title: "หมูฮ้องสูตรใต้", desc: "เคี่ยวนาน เนื้อนุ่ม", price: "฿160" },
                  ]}
                />
              </DemoSection>
            ),
          },
          {
            id: "about",
            label: "เกี่ยวกับ",
            content: (
              <DemoSection theme={theme} title="เกี่ยวกับร้าน">
                <p className="mx-auto max-w-3xl text-center text-base leading-relaxed text-gray-700">
                  ครัวเรือนใต้ เปิดมานานกว่า 20 ปี ส่งต่อสูตรอาหารใต้แท้จากรุ่นสู่รุ่น
                  เราคัดสรรวัตถุดิบจากชาวประมงและเกษตรกรท้องถิ่น เพื่อให้ทุกจาน
                  อร่อยและสดใหม่ทุกวัน
                </p>
              </DemoSection>
            ),
          },
          {
            id: "gallery",
            label: "แกลเลอรี",
            content: (
              <DemoSection theme={theme} title="บรรยากาศร้านและอาหาร" alt>
                <DemoGallery
                  images={[
                    "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600&q=80",
                    "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80",
                    "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=80",
                    "https://images.unsplash.com/photo-1567337710282-00832b415979?w=600&q=80",
                    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
                    "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&q=80",
                    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80",
                    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
                  ]}
                />
              </DemoSection>
            ),
          },
          contactPage,
        ],
      };
      return {
        ...baseConfig,
        pages: [
          {
            id: "home",
            label: "หน้าแรก",
            content: (
              <>
                <DemoHero
                  theme={theme}
                  eyebrow="ริมหาดอ่าวนาง"
                  title="พักผ่อนริมทะเลกระบี่"
                  subtitle="อันดามันรีสอร์ท วิวทะเลทุกห้อง พร้อมสระว่ายน้ำส่วนตัว"
                  cta="จองห้องพัก"
                  image={demo.cover}
                />
                <DemoSection theme={theme} title="ห้องพักของเรา">
                  <DemoCardGrid
                    theme={theme}
                    items={[
                      {
                        title: "Deluxe Sea View",
                        desc: "วิวทะเลพาโนรามา 32 ตร.ม.",
                        price: "฿2,800/คืน",
                        image:
                          "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&q=80",
                      },
                      {
                        title: "Pool Villa",
                        desc: "สระส่วนตัว 60 ตร.ม.",
                        price: "฿6,500/คืน",
                        image:
                          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80",
                      },
                      {
                        title: "Family Suite",
                        desc: "เหมาะสำหรับครอบครัว",
                        price: "฿4,200/คืน",
                        image:
                          "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
                      },
                    ]}
                  />
                </DemoSection>
              </>
            ),
          },
          {
            id: "rooms",
            label: "ห้องพัก",
            content: (
              <DemoSection theme={theme} title="ประเภทห้องพัก">
                <DemoCardGrid
                  theme={theme}
                  items={[
                    { title: "Standard Room", desc: "พื้นฐาน 24 ตร.ม.", price: "฿1,800" },
                    { title: "Deluxe Sea View", desc: "วิวทะเล 32 ตร.ม.", price: "฿2,800" },
                    { title: "Pool Villa", desc: "สระส่วนตัว 60 ตร.ม.", price: "฿6,500" },
                    { title: "Family Suite", desc: "พัก 4 ท่าน", price: "฿4,200" },
                  ]}
                />
              </DemoSection>
            ),
          },
          {
            id: "facility",
            label: "สิ่งอำนวยความสะดวก",
            content: (
              <DemoSection theme={theme} title="สิ่งอำนวยความสะดวก" alt>
                <DemoCardGrid
                  theme={theme}
                  items={[
                    { title: "สระว่ายน้ำ", desc: "เปิดบริการ 06:00–22:00" },
                    { title: "ฟิตเนส 24 ชม.", desc: "อุปกรณ์ครบครัน" },
                    { title: "สปา & นวด", desc: "สูตรไทยแท้" },
                    { title: "ร้านอาหาร", desc: "อาหารไทย-นานาชาติ" },
                    { title: "รับ-ส่งสนามบิน", desc: "บริการ 24 ชม." },
                    { title: "WiFi ฟรี", desc: "ทุกห้องและพื้นที่ส่วนกลาง" },
                  ]}
                />
              </DemoSection>
            ),
          },
          {
            id: "gallery",
            label: "แกลเลอรี",
            content: (
              <DemoSection theme={theme} title="ภาพบรรยากาศรีสอร์ท">
                <DemoGallery
                  images={[
                    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
                    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&q=80",
                    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80",
                    "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&q=80",
                    "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600&q=80",
                    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80",
                    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80",
                    "https://images.unsplash.com/photo-1535827841776-24afc1e255ac?w=600&q=80",
                  ]}
                />
              </DemoSection>
            ),
          },
          contactPage,
        ],
      };
      return {
        ...baseConfig,
        pages: [
          {
            id: "home",
            label: "หน้าแรก",
            content: (
              <>
                <DemoHero
                  theme={theme}
                  eyebrow="ที่ปรึกษามืออาชีพ"
                  title="ที่ปรึกษาธุรกิจครบวงจร"
                  subtitle="สยามเทค ช่วยให้ธุรกิจคุณเติบโตด้วยกลยุทธ์และเทคโนโลยี"
                  cta="ปรึกษาฟรี"
                  image={demo.cover}
                />
                <DemoSection theme={theme} title="บริการของเรา">
                  <DemoCardGrid
                    theme={theme}
                    items={[
                      { title: "Business Strategy", desc: "วางแผนธุรกิจระยะยาว" },
                      { title: "Digital Transformation", desc: "ปรับองค์กรสู่ยุคดิจิทัล" },
                      { title: "Marketing Consult", desc: "เพิ่มยอดขายและฐานลูกค้า" },
                    ]}
                  />
                </DemoSection>
              </>
            ),
          },
          {
            id: "services",
            label: "บริการ",
            content: (
              <DemoSection theme={theme} title="บริการทั้งหมด">
                <DemoCardGrid
                  theme={theme}
                  items={[
                    { title: "Strategy", desc: "วางกลยุทธ์ธุรกิจ" },
                    { title: "Operations", desc: "ปรับปรุงกระบวนการ" },
                    { title: "Marketing", desc: "การตลาดดิจิทัล" },
                    { title: "Tech", desc: "ระบบ IT องค์กร" },
                    { title: "Finance", desc: "วางแผนการเงิน" },
                    { title: "HR", desc: "พัฒนาบุคลากร" },
                  ]}
                />
              </DemoSection>
            ),
          },
          {
            id: "team",
            label: "ทีมงาน",
            content: (
              <DemoSection theme={theme} title="ทีมผู้เชี่ยวชาญ" alt>
                <DemoCardGrid
                  theme={theme}
                  items={[
                    {
                      title: "คุณสมชาย ใจดี",
                      desc: "CEO & Founder · 20 ปีในวงการ",
                      image:
                        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80",
                    },
                    {
                      title: "คุณวิภาดา ศรีสุข",
                      desc: "CMO · ผู้เชี่ยวชาญการตลาด",
                      image:
                        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80",
                    },
                    {
                      title: "คุณธนวัฒน์ ก้องไกล",
                      desc: "CTO · นักพัฒนาระบบ",
                      image:
                        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
                    },
                  ]}
                />
              </DemoSection>
            ),
          },
          {
            id: "portfolio",
            label: "ผลงาน",
            content: (
              <DemoSection theme={theme} title="โปรเจกต์ของเรา">
                <DemoCardGrid
                  theme={theme}
                  items={[
                    { title: "ระบบ ERP โรงแรมในกระบี่", desc: "ลดเวลาทำงาน 40%" },
                    { title: "เว็บไซต์ E-commerce", desc: "ยอดขายเพิ่ม 3 เท่า" },
                    { title: "วางระบบ Network สำนักงาน", desc: "150 จุด" },
                    { title: "Mobile App ส่งอาหาร", desc: "iOS + Android" },
                    { title: "ที่ปรึกษา Digital Marketing", desc: "Brand Awareness" },
                    { title: "ระบบ POS ร้านอาหาร", desc: "10 สาขา" },
                  ]}
                />
              </DemoSection>
            ),
          },
          contactPage,
        ],
      };

    case "contractor":
      return {
        ...baseConfig,
        pages: [
          {
            id: "home",
            label: "หน้าแรก",
            content: (
              <>
                <DemoHero
                  theme={theme}
                  eyebrow="ประสบการณ์กว่า 15 ปี"
                  title="รับเหมาก่อสร้างครบวงจร"
                  subtitle="ใต้บ้านการช่าง ทีมช่างคุณภาพ ราคายุติธรรม รับประกันงาน"
                  cta="ขอใบเสนอราคา"
                  image={demo.cover}
                />
                <DemoSection theme={theme} title="บริการของเรา">
                  <DemoCardGrid
                    theme={theme}
                    items={[
                      { title: "สร้างบ้านใหม่", desc: "ตามแบบและงบประมาณ" },
                      { title: "ต่อเติม-รีโนเวท", desc: "ปรับปรุงบ้านเก่า" },
                      { title: "งานหลังคา", desc: "เปลี่ยน-ซ่อมหลังคาทุกชนิด" },
                    ]}
                  />
                </DemoSection>
              </>
            ),
          },
          {
            id: "portfolio",
            label: "ผลงาน",
            content: (
              <DemoSection theme={theme} title="ผลงานที่ผ่านมา">
                <DemoCardGrid
                  theme={theme}
                  items={[
                    {
                      title: "บ้านพักอาศัย กระบี่",
                      desc: "บ้าน 2 ชั้น 250 ตร.ม.",
                      image:
                        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80",
                    },
                    {
                      title: "อาคารพาณิชย์ อ่าวนาง",
                      desc: "ตึกแถว 3 คูหา",
                      image:
                        "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
                    },
                    {
                      title: "รีโนเวทร้านกาแฟ",
                      desc: "ปรับโฉมใหม่ภายใน 30 วัน",
                      image:
                        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&q=80",
                    },
                  ]}
                />
              </DemoSection>
            ),
          },
          {
            id: "services",
            label: "บริการ",
            content: (
              <DemoSection theme={theme} title="บริการทั้งหมด" alt>
                <DemoCardGrid
                  theme={theme}
                  items={[
                    { title: "ออกแบบ", desc: "เขียนแบบโดยสถาปนิก" },
                    { title: "ก่อสร้าง", desc: "สร้างบ้าน-ตึก" },
                    { title: "ต่อเติม", desc: "ขยายพื้นที่ใช้สอย" },
                    { title: "ทาสี", desc: "ภายใน-ภายนอก" },
                    { title: "งานเหล็ก", desc: "ประตู รั้ว กันสาด" },
                    { title: "งานระบบ", desc: "ไฟฟ้า ประปา" },
                  ]}
                />
              </DemoSection>
            ),
          },
          {
            id: "gallery",
            label: "แกลเลอรี",
            content: (
              <DemoSection theme={theme} title="ผลงานก่อสร้าง" alt>
                <DemoGallery
                  images={[
                    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
                    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80",
                    "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
                    "https://images.unsplash.com/photo-1503174971373-b1f69850bded?w=600&q=80",
                    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80",
                    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80",
                  ]}
                />
              </DemoSection>
            ),
          },
          contactPage,
        ],
      };

    case "realestate":
      return {
        ...baseConfig,
        pages: [
          {
            id: "home",
            label: "หน้าแรก",
            content: (
              <>
                <DemoHero
                  theme={theme}
                  eyebrow="ทำเลทอง กระบี่ — ภูเก็ต"
                  title="บ้าน คอนโด ที่ดิน คัดสรร"
                  subtitle="Krabi Property รวมประกาศคุณภาพ ราคาดี ทำเลเด่น"
                  cta="ค้นหาทรัพย์"
                  image={demo.cover}
                />
                <DemoSection theme={theme} title="ทรัพย์แนะนำ">
                  <DemoCardGrid
                    theme={theme}
                    items={[
                      {
                        title: "บ้านเดี่ยว อ่าวนาง",
                        desc: "3 ห้องนอน 2 ห้องน้ำ",
                        price: "฿4.5 ล้าน",
                        image:
                          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
                      },
                      {
                        title: "คอนโดวิวทะเล",
                        desc: "1 ห้องนอน 35 ตร.ม.",
                        price: "฿2.8 ล้าน",
                        image:
                          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80",
                      },
                      {
                        title: "ที่ดินติดถนน",
                        desc: "200 ตร.วา ใกล้หาด",
                        price: "฿8.5 ล้าน",
                        image:
                          "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80",
                      },
                    ]}
                  />
                </DemoSection>
              </>
            ),
          },
          {
            id: "listings",
            label: "ทรัพย์ทั้งหมด",
            content: (
              <DemoSection theme={theme} title="ประกาศทั้งหมด">
                <DemoCardGrid
                  theme={theme}
                  items={[
                    { title: "บ้านเดี่ยว อ่าวนาง", desc: "3 นอน 2 น้ำ", price: "฿4.5M" },
                    { title: "ทาวน์โฮม เมืองกระบี่", desc: "2 นอน 2 น้ำ", price: "฿2.2M" },
                    { title: "คอนโดวิวทะเล", desc: "1 นอน 35 ตร.ม.", price: "฿2.8M" },
                    { title: "ที่ดิน 200 ตร.วา", desc: "ใกล้หาด", price: "฿8.5M" },
                    { title: "วิลล่าหรู", desc: "พร้อมสระว่ายน้ำ", price: "฿15M" },
                    { title: "ตึกแถว 3 คูหา", desc: "ติดถนนใหญ่", price: "฿9M" },
                  ]}
                />
              </DemoSection>
            ),
          },
          {
            id: "services",
            label: "บริการ",
            content: (
              <DemoSection theme={theme} title="บริการของเรา" alt>
                <DemoCardGrid
                  theme={theme}
                  items={[
                    { title: "ซื้อ-ขาย", desc: "หาผู้ซื้อตรงกลุ่ม" },
                    { title: "เช่า", desc: "บริหารทรัพย์ปล่อยเช่า" },
                    { title: "ประเมินราคา", desc: "ฟรี ไม่มีค่าใช้จ่าย" },
                  ]}
                />
              </DemoSection>
            ),
          },
          {
            id: "gallery",
            label: "แกลเลอรี",
            content: (
              <DemoSection theme={theme} title="ภาพถ่ายทรัพย์สิน">
                <DemoGallery
                  images={[
                    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80",
                    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
                    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80",
                    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
                    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80",
                    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80",
                  ]}
                />
              </DemoSection>
            ),
          },
          contactPage,
        ],
      };

    case "insurance":
      return {
        ...baseConfig,
        pages: [
          {
            id: "home",
            label: "หน้าแรก",
            content: (
              <>
                <DemoHero
                  theme={theme}
                  eyebrow="ตัวแทนอันดับ 1 ของภาคใต้"
                  title="คุ้มครองครบ ดูแลทุกความเสี่ยง"
                  subtitle="ใต้ประกันภัย เลือกแผนที่เหมาะกับคุณ พร้อมที่ปรึกษาตัวจริง"
                  cta="ขอคำแนะนำ"
                  image={demo.cover}
                />
                <DemoSection theme={theme} title="แผนประกัน">
                  <DemoCardGrid
                    theme={theme}
                    items={[
                      { title: "ประกันรถยนต์", desc: "ชั้น 1, 2+, 3+", price: "เริ่ม ฿7,500" },
                      { title: "ประกันบ้าน", desc: "คุ้มครองครบ", price: "เริ่ม ฿1,200" },
                      { title: "ประกันสุขภาพ", desc: "เหมาจ่ายค่ารักษา", price: "เริ่ม ฿15,000" },
                    ]}
                  />
                </DemoSection>
              </>
            ),
          },
          {
            id: "plans",
            label: "แผนประกัน",
            content: (
              <DemoSection theme={theme} title="แผนประกันทั้งหมด">
                <DemoCardGrid
                  theme={theme}
                  items={[
                    { title: "รถยนต์ ชั้น 1", desc: "คุ้มครองครบ", price: "฿15,000" },
                    { title: "รถยนต์ ชั้น 2+", desc: "คุ้มครองชน-โจรกรรม", price: "฿9,500" },
                    { title: "รถยนต์ ชั้น 3+", desc: "คุ้มครองชนรถ", price: "฿7,500" },
                    { title: "ประกันบ้าน", desc: "ไฟไหม้ น้ำท่วม", price: "฿1,200" },
                    { title: "สุขภาพ", desc: "เหมาจ่าย 1 ล้าน", price: "฿15,000" },
                    { title: "อุบัติเหตุ", desc: "PA ครอบคลุม 24 ชม.", price: "฿2,500" },
                  ]}
                />
              </DemoSection>
            ),
          },
          {
            id: "calc",
            label: "คำนวณเบี้ย",
            content: (
              <DemoSection theme={theme} title="คำนวณเบี้ยประกันเบื้องต้น" alt>
                <div className="mx-auto max-w-md space-y-3 rounded-xl bg-white p-6 shadow-md">
                  <select className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm">
                    <option>ประเภทประกัน</option>
                    <option>รถยนต์</option>
                    <option>บ้าน</option>
                    <option>สุขภาพ</option>
                  </select>
                  <input
                    placeholder="มูลค่าทรัพย์สิน (บาท)"
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
                  />
                  <input
                    placeholder="อายุผู้เอาประกัน"
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
                  />
                  <button
                    type="button"
                    className="w-full rounded-full py-2.5 text-sm font-semibold text-white"
                    style={{ background: theme.primary }}
                  >
                    คำนวณเบี้ย
                  </button>
                </div>
              </DemoSection>
            ),
          },
          {
            id: "compare",
            label: "เปรียบเทียบ",
            content: (
              <DemoSection theme={theme} title="เปรียบเทียบประกันรถยนต์">
                <DemoTable
                  theme={theme}
                  headers={["ความคุ้มครอง", "ชั้น 1", "ชั้น 2+", "ชั้น 3+"]}
                  rows={[
                    ["รถชน-คู่กรณีมี", "✓", "✓", "✓"],
                    ["รถชน-ไม่มีคู่กรณี", "✓", "✗", "✗"],
                    ["ไฟไหม้-โจรกรรม", "✓", "✓", "✗"],
                    ["น้ำท่วม", "✓", "✗", "✗"],
                    ["ค่ารักษาพยาบาล", "300,000", "200,000", "100,000"],
                    ["เบี้ยเริ่มต้น/ปี", "฿15,000", "฿9,500", "฿7,500"],
                  ]}
                />
              </DemoSection>
            ),
          },
          contactPage,
        ],
      };
      return {
        ...baseConfig,
        pages: [
          {
            id: "home",
            label: "หน้าแรก",
            content: (
              <>
                <DemoHero
                  theme={theme}
                  eyebrow="คลินิกความงาม โดยแพทย์"
                  title="ดูแลผิวพรรณ ครบวงจร"
                  subtitle="ใต้คลินิก เครื่องมือทันสมัย มาตรฐานสากล ผลลัพธ์เห็นจริง"
                  cta="นัดหมายปรึกษา"
                  image={demo.cover}
                />
                <DemoSection theme={theme} title="บริการแนะนำ">
                  <DemoCardGrid
                    theme={theme}
                    items={[
                      { title: "ฉีดฟิลเลอร์", desc: "เติมเต็มร่องลึก", price: "฿8,500" },
                      { title: "เลเซอร์หน้าใส", desc: "ลดสิว รอยด่างดำ", price: "฿2,500" },
                      { title: "Botox", desc: "ลดริ้วรอยทันที", price: "฿3,900" },
                    ]}
                  />
                </DemoSection>
              </>
            ),
          },
          {
            id: "services",
            label: "บริการ",
            content: (
              <DemoSection theme={theme} title="บริการทั้งหมด">
                <DemoCardGrid
                  theme={theme}
                  items={[
                    { title: "เลเซอร์หน้าใส", desc: "ลดสิว", price: "฿2,500" },
                    { title: "ฟิลเลอร์", desc: "เติมเต็ม", price: "฿8,500" },
                    { title: "Botox", desc: "ลดริ้วรอย", price: "฿3,900" },
                    { title: "ร้อยไหม", desc: "ยกกระชับ", price: "฿15,000" },
                    { title: "Meso Fat", desc: "สลายไขมัน", price: "฿4,500" },
                    { title: "IPL กำจัดขน", desc: "ถาวร", price: "฿2,000" },
                  ]}
                />
              </DemoSection>
            ),
          },
          {
            id: "doctors",
            label: "แพทย์",
            content: (
              <DemoSection theme={theme} title="ทีมแพทย์ของเรา" alt>
                <DemoCardGrid
                  theme={theme}
                  items={[
                    {
                      title: "พญ. นภาพร แสงทอง",
                      desc: "แพทย์ผู้เชี่ยวชาญผิวหนัง",
                      image:
                        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80",
                    },
                    {
                      title: "นพ. ธีรภัทร วงศ์ใต้",
                      desc: "แพทย์เวชศาสตร์ความงาม",
                      image:
                        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80",
                    },
                  ]}
                />
              </DemoSection>
            ),
          },
          {
            id: "schedule",
            label: "ตารางออกหน่วย",
            content: (
              <DemoSection theme={theme} title="ตารางออกหน่วย/ตรวจสุขภาพ">
                <DemoTable
                  theme={theme}
                  headers={["วัน", "เวลา", "บริการ", "สถานที่"]}
                  rows={[
                    ["จันทร์", "08:30–12:00", "ตรวจสุขภาพทั่วไป", "ตึก A"],
                    ["อังคาร", "13:00–16:00", "ฉีดวัคซีนเด็ก", "ตึก B"],
                    ["พุธ", "08:30–12:00", "ฝากครรภ์", "ตึก A"],
                    ["พฤหัสบดี", "13:00–16:00", "ออกหน่วยชุมชน", "ม.5 บ้านคลอง"],
                    ["ศุกร์", "08:30–12:00", "ทันตกรรม", "ตึก B"],
                    ["เสาร์", "09:00–12:00", "เจาะเลือด-แล็บ", "ตึก A"],
                  ]}
                />
              </DemoSection>
            ),
          },
          {
            id: "news",
            label: "ข่าวสาร",
            content: (
              <DemoSection theme={theme} title="ข่าวสารและประกาศ" alt>
                <DemoNewsList
                  theme={theme}
                  items={[
                    {
                      date: "15 เม.ย. 2026",
                      title: "เปิดให้บริการฉีดวัคซีนไข้หวัดใหญ่",
                      excerpt: "ฟรี! สำหรับผู้สูงอายุ 65 ปีขึ้นไป จองคิวล่วงหน้าได้",
                    },
                    {
                      date: "10 เม.ย. 2026",
                      title: "ออกหน่วยตรวจสุขภาพ ม.5 บ้านคลอง",
                      excerpt: "วันที่ 25 เม.ย. 09:00–12:00 น. ที่ศาลาประชาคม",
                    },
                    {
                      date: "1 เม.ย. 2026",
                      title: "ปรับเวลาทำการช่วงสงกรานต์",
                      excerpt: "หยุด 13–15 เม.ย. กลับมาเปิด 16 เม.ย. ตามปกติ",
                    },
                  ]}
                />
              </DemoSection>
            ),
          },
          contactPage,
        ],
      };

    case "sabaidi-home":
      return {
        ...baseConfig,
        pages: [
          {
            id: "home",
            label: "หน้าแรก",
            content: (
              <>
                <DemoHero
                  theme={theme}
                  eyebrow="โฮมสเตย์ใต้แท้"
                  title="อบอุ่นเหมือนบ้านญาติคนใต้"
                  subtitle="สบายดีโฮมสเตย์ พักท่ามกลางธรรมชาติ สัมผัสวิถีชีวิตท้องถิ่น"
                  cta="จองที่พัก"
                  image={demo.cover}
                />
                <DemoSection theme={theme} title="กิจกรรมในโฮมสเตย์">
                  <DemoCardGrid
                    theme={theme}
                    items={[
                      {
                        title: "ปั่นจักรยานชมสวน",
                        desc: "ท่องเที่ยวแบบสโลว์ไลฟ์",
                        image:
                          "https://images.unsplash.com/photo-1502780402662-acc01917cf48?w=600&q=80",
                      },
                      {
                        title: "ทำอาหารพื้นบ้าน",
                        desc: "เรียนรู้สูตรใต้แท้",
                        image:
                          "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
                      },
                      {
                        title: "ล่องเรือดูเหยี่ยว",
                        desc: "ชมธรรมชาติ ปากแม่น้ำ",
                        image:
                          "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=600&q=80",
                      },
                    ]}
                  />
                </DemoSection>
              </>
            ),
          },
          {
            id: "rooms",
            label: "ห้องพัก",
            content: (
              <DemoSection theme={theme} title="ห้องพักของเรา">
                <DemoCardGrid
                  theme={theme}
                  items={[
                    { title: "ห้องเดี่ยว", desc: "พัดลม พร้อมพัก 2 ท่าน", price: "฿700" },
                    { title: "ห้องคู่ปรับอากาศ", desc: "พัก 2 ท่าน", price: "฿1,200" },
                    { title: "บ้านครอบครัว", desc: "พัก 4-6 ท่าน", price: "฿2,400" },
                  ]}
                />
              </DemoSection>
            ),
          },
          {
            id: "nearby",
            label: "ที่เที่ยวใกล้เคียง",
            content: (
              <DemoSection theme={theme} title="ที่เที่ยวใกล้โฮมสเตย์" alt>
                <DemoCardGrid
                  theme={theme}
                  items={[
                    { title: "หาดอ่าวนาง", desc: "ห่างจากโฮมสเตย์ 15 กม." },
                    { title: "เกาะปอดะ", desc: "นั่งเรือ 30 นาที" },
                    { title: "น้ำตกร้อน", desc: "บ่อน้ำพุร้อนธรรมชาติ" },
                    { title: "วัดถ้ำเสือ", desc: "วิวพาโนรามา 360 องศา" },
                  ]}
                />
              </DemoSection>
            ),
          },
          },
          {
            id: "gallery",
            label: "แกลเลอรี",
            content: (
              <DemoSection theme={theme} title="บรรยากาศโฮมสเตย์" alt>
                <DemoGallery
                  images={[
                    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80",
                    "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=600&q=80",
                    "https://images.unsplash.com/photo-1502780402662-acc01917cf48?w=600&q=80",
                    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
                    "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=600&q=80",
                    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80",
                  ]}
                />
              </DemoSection>
            ),
          },
          contactPage,
        ],
      };
  }
  return { ...baseConfig, pages: [contactPage] };
}
