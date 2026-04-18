import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { HeartHandshake, Code2 } from "lucide-react";

export function SiteFooter() {
  return (
    <footer id="contact" className="bg-deep-blue text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="inline-block logo-pad">
              <Logo className="h-14 w-auto" />
            </div>
            <p className="mt-5 max-w-md text-base text-white/90" style={{ lineHeight: 1.7 }}>
              เว็บไซต์ทำเว็บอันดับ 1 ของคนใต้ — สร้างสรรค์ทุกโปรเจ็กต์ด้วยใจรักและความเข้าใจในวัฒนธรรมท้องถิ่น
            </p>
            <div className="mt-5 flex items-center gap-2 text-sm text-white/80">
              <HeartHandshake className="h-4 w-4" />
              Medee with love from Southern Thailand
            </div>
          </div>
          <div>
            <h4 className="mb-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-white">
              <Code2 className="h-4 w-4" /> บริการ
            </h4>
            <ul className="space-y-2 text-base text-white/90">
              <li><Link to="/services" className="hover:text-orange">บริการทั้งหมด</Link></li>
              <li><Link to="/packages" className="hover:text-orange">แพ็กเกจราคา</Link></li>
              <li><Link to="/topup" className="hover:text-orange">บริการเสริม</Link></li>
              <li><Link to="/demo" className="hover:text-orange">ดูเว็บตัวอย่าง</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-white">บริษัท</h4>
            <ul className="space-y-2 text-base text-white/90 break-words">
              <li><Link to="/about" className="hover:text-orange">เกี่ยวกับเรา</Link></li>
              <li><Link to="/portfolio" className="hover:text-orange">ผลงาน</Link></li>
              <li><Link to="/reviews" className="hover:text-orange">รีวิว</Link></li>
              <li><Link to="/faq" className="hover:text-orange">คำถามที่พบบ่อย</Link></li>
              <li>📧 suthee@medeeweb.com</li>
              <li>📱 099-625-2499</li>
              <li>📍 กระบี่ ประเทศไทย</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/20 pt-8 text-center text-sm text-white/80 md:flex-row">
          <span>© {new Date().getFullYear()} MedeeWeb. All rights reserved.</span>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-orange">นโยบายความเป็นส่วนตัว</Link>
            <Link to="/terms" className="hover:text-orange">เงื่อนไขการใช้งาน</Link>
            <Link to="/sitemap" className="hover:text-orange">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
