import { Link } from "@tanstack/react-router";
import { Heart, Mail, Phone, MapPin } from "lucide-react";
import footerLogo from "@/assets/medeeweb-logo-footer.webp";

export function SiteFooter() {
  return (
    <footer id="contact" className="bg-deep-blue text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
        <div className="grid grid-cols-1 items-start gap-10 sm:grid-cols-2 md:gap-12 md:[grid-template-columns:1.5fr_1fr_1fr_1.2fr]">
          {/* Brand column */}
          <div className="flex flex-col items-start" style={{ maxWidth: 280 }}>
            <img
              src={footerLogo}
              alt="MedeeWeb"
              width={180}
              height={54}
              className="h-auto w-[180px] object-contain"
              style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.3))" }}
            />
            <p
              className="mt-5"
              style={{
                fontSize: 14,
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.75)",
              }}
            >
              เว็บไซต์ทำเว็บอันดับ 1 ของคนใต้
              <br />
              สร้างสรรค์ทุกโปรเจกต์ด้วยใจรัก
            </p>
            <div
              className="mt-4 flex items-center gap-2 italic"
              style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}
            >
              <Heart className="h-3 w-3 text-orange" fill="currentColor" />
              Medee with love from Southern Thailand
            </div>
          </div>

          {/* Services column */}
          <div>
            <h4 className="footer-col-heading">บริการ</h4>
            <ul>
              <li><Link to="/services" className="footer-link">บริการทั้งหมด</Link></li>
              <li><Link to="/packages" className="footer-link">แพ็กเกจราคา</Link></li>
              <li><Link to="/topup" className="footer-link">บริการเสริม</Link></li>
              <li><Link to="/demo" className="footer-link">ดูเว็บตัวอย่าง</Link></li>
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h4 className="footer-col-heading">บริษัท</h4>
            <ul>
              <li><Link to="/about" className="footer-link">เกี่ยวกับเรา</Link></li>
              <li><Link to="/portfolio" className="footer-link">ผลงาน</Link></li>
              <li><Link to="/reviews" className="footer-link">รีวิว</Link></li>
              <li><Link to="/faq" className="footer-link">คำถามที่พบบ่อย</Link></li>
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h4 className="footer-col-heading">ติดต่อเรา</h4>
            <ul className="space-y-2.5">
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
                <div>
                  <div>355/70 ม.6 ต.กระบี่น้อย</div>
                  <div>อ.เมือง จ.กระบี่ 81000</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/15 pt-8 md:flex-row md:gap-0"
          style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}
        >
          <div className="text-center md:text-left">
            <div>© {new Date().getFullYear()} MedeeWeb.com All rights reserved.</div>
            <div>หจก.มีดี ทรัพย์เพิ่มพูน</div>
          </div>
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
