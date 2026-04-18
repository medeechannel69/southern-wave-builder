import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { Heart, Mail, Phone, MapPin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer id="contact" className="bg-deep-blue text-white">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-24">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand column */}
          <div className="md:col-span-5">
            <div className="py-2">
              <Logo className="h-auto w-[200px]" />
            </div>
            <p className="footer-desc mt-6">
              เว็บไซต์ทำเว็บอันดับ 1 ของคนใต้ — สร้างสรรค์ทุกโปรเจ็กต์ด้วยใจรักและความเข้าใจในวัฒนธรรมท้องถิ่น
            </p>
            <div className="footer-tagline mt-5 flex items-center gap-2">
              <Heart className="h-3.5 w-3.5 text-orange" fill="currentColor" />
              Medee with love from Southern Thailand
            </div>
          </div>

          {/* Services column */}
          <div className="md:col-span-2">
            <h4 className="footer-col-heading">บริการ</h4>
            <ul>
              <li><Link to="/services" className="footer-link">บริการทั้งหมด</Link></li>
              <li><Link to="/packages" className="footer-link">แพ็กเกจราคา</Link></li>
              <li><Link to="/topup" className="footer-link">บริการเสริม</Link></li>
              <li><Link to="/demo" className="footer-link">ดูเว็บตัวอย่าง</Link></li>
            </ul>
          </div>

          {/* Company column */}
          <div className="md:col-span-2">
            <h4 className="footer-col-heading">บริษัท</h4>
            <ul>
              <li><Link to="/about" className="footer-link">เกี่ยวกับเรา</Link></li>
              <li><Link to="/portfolio" className="footer-link">ผลงาน</Link></li>
              <li><Link to="/reviews" className="footer-link">รีวิว</Link></li>
              <li><Link to="/faq" className="footer-link">คำถามที่พบบ่อย</Link></li>
            </ul>
          </div>

          {/* Contact column */}
          <div className="md:col-span-3">
            <h4 className="footer-col-heading">ติดต่อเรา</h4>
            <ul className="space-y-2">
              <li className="footer-contact flex items-start gap-2.5">
                <Mail className="mt-1 h-4 w-4 shrink-0 text-orange" />
                <a href="mailto:suthee@medeeweb.com" className="hover:text-orange break-all">
                  suthee@medeeweb.com
                </a>
              </li>
              <li className="footer-contact flex items-start gap-2.5">
                <Phone className="mt-1 h-4 w-4 shrink-0 text-orange" />
                <a href="tel:0996252499" className="hover:text-orange">
                  099-625-2499
                </a>
              </li>
              <li className="footer-contact flex items-start gap-2.5">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-orange" />
                <span>กระบี่ ประเทศไทย</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-8 text-sm text-white/70 md:flex-row md:gap-0">
          <span>© {new Date().getFullYear()} MedeeWeb. All rights reserved.</span>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link to="/privacy" className="hover:text-orange">นโยบายความเป็นส่วนตัว</Link>
            <Link to="/terms" className="hover:text-orange">เงื่อนไขการใช้งาน</Link>
            <Link to="/sitemap" className="hover:text-orange">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
