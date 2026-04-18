-- ============ site_settings (singleton) ============
CREATE TABLE public.site_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  company_name TEXT DEFAULT 'MedeeWeb',
  company_tagline TEXT DEFAULT 'Medee with love from Southern Thailand',
  company_address TEXT,
  company_email TEXT DEFAULT 'medeechannel69@gmail.com',
  company_phone TEXT,
  company_line_id TEXT,
  about_text TEXT,
  promptpay_qr_url TEXT,
  promptpay_id TEXT,
  bank_account_info TEXT,
  smtp_host TEXT,
  smtp_port INTEGER,
  smtp_user TEXT,
  smtp_from_name TEXT,
  smtp_from_email TEXT,
  social_facebook TEXT,
  social_instagram TEXT,
  social_tiktok TEXT,
  social_youtube TEXT,
  social_line_oa TEXT,
  ga4_id TEXT,
  line_webhook_url TEXT,
  stats_clients INTEGER DEFAULT 100,
  stats_projects INTEGER DEFAULT 120,
  stats_satisfaction INTEGER DEFAULT 98,
  stats_years INTEGER DEFAULT 5,
  promo_text TEXT,
  promo_countdown_end TIMESTAMPTZ,
  province_coverage JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT site_settings_singleton CHECK (id = 1)
);
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read site settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admin/staff can update site settings" ON public.site_settings FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role));
CREATE POLICY "Admin/staff can insert site settings" ON public.site_settings FOR INSERT TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role));
CREATE TRIGGER trg_site_settings_updated_at BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
INSERT INTO public.site_settings (id) VALUES (1);

-- ============ domains ============
CREATE TABLE public.domains (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  customer_phone TEXT,
  customer_email TEXT,
  domain TEXT NOT NULL,
  hosting_provider TEXT,
  domain_expiry DATE,
  hosting_expiry DATE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.domains ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin/staff read domains" ON public.domains FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role));
CREATE POLICY "Admin/staff manage domains" ON public.domains FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role));
CREATE TRIGGER trg_domains_updated_at BEFORE UPDATE ON public.domains
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ portfolio_items ============
CREATE TABLE public.portfolio_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  description TEXT,
  demo_url TEXT,
  is_real BOOLEAN NOT NULL DEFAULT false,
  visible BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone read visible portfolio" ON public.portfolio_items FOR SELECT USING (visible = true);
CREATE POLICY "Admin/staff read all portfolio" ON public.portfolio_items FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role));
CREATE POLICY "Admin/staff manage portfolio" ON public.portfolio_items FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role));
CREATE TRIGGER trg_portfolio_updated_at BEFORE UPDATE ON public.portfolio_items
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.portfolio_items (name, category, demo_url, is_real, sort_order) VALUES
  ('สบายดีโฮม', 'อสังหาฯ', '/demo/sabaidi-home', true, 1),
  ('Thai Bistro', 'ร้านอาหาร', '/demo/restaurant', false, 2),
  ('Krabi Resort', 'โรงแรม', '/demo/hotel', false, 3),
  ('South Tech', 'บริษัท', '/demo/company', false, 4),
  ('Ocean View Hotel', 'โรงแรม', '/demo/hotel', false, 5),
  ('Andaman Homes', 'อสังหาฯ', '/demo/realestate', false, 6);

-- ============ packages ============
CREATE TABLE public.packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  price NUMERIC NOT NULL DEFAULT 0,
  badge TEXT,
  recommended BOOLEAN NOT NULL DEFAULT false,
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  delivery_days INTEGER,
  visible BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone read visible packages" ON public.packages FOR SELECT USING (visible = true);
CREATE POLICY "Admin/staff read all packages" ON public.packages FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role));
CREATE POLICY "Admin/staff manage packages" ON public.packages FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role));
CREATE TRIGGER trg_packages_updated_at BEFORE UPDATE ON public.packages
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.packages (name, price, badge, recommended, features, delivery_days, sort_order) VALUES
  ('STARTER', 5000, NULL, false,
    '["เว็บไซต์ 1 หน้า (One-page)","Mobile Responsive","ปุ่มติดต่อ + Google Map","ฟอร์มติดต่อ","โดเมน + โฮสติ้ง 1 ปี ฟรี","ส่งมอบภายใน 7 วัน"]'::jsonb, 7, 1),
  ('BUSINESS', 9000, 'ยอดนิยม', true,
    '["เว็บไซต์ 5 หน้า","หน้าบริการ + แกลเลอรี่","หน้าเกี่ยวกับเรา + ติดต่อ","SEO พื้นฐาน","โดเมน + โฮสติ้ง 1 ปี ฟรี","ส่งมอบภายใน 14 วัน"]'::jsonb, 14, 2),
  ('PRO', 15000, 'แนะนำ', false,
    '["เว็บไซต์ 10 หน้า","ระบบบล็อก + บทความ","SEO ครบเครื่อง + Analytics","ฟอร์มขั้นสูง","โดเมน + โฮสติ้ง 1 ปี ฟรี","ส่งมอบภายใน 21 วัน"]'::jsonb, 21, 3);

-- ============ topup_items ============
CREATE TABLE public.topup_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  price TEXT NOT NULL,
  unit TEXT,
  description TEXT,
  icon TEXT,
  visible BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.topup_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone read visible topup" ON public.topup_items FOR SELECT USING (visible = true);
CREATE POLICY "Admin/staff read all topup" ON public.topup_items FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role));
CREATE POLICY "Admin/staff manage topup" ON public.topup_items FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role));
CREATE TRIGGER trg_topup_updated_at BEFORE UPDATE ON public.topup_items
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.topup_items (name, price, unit, icon, sort_order) VALUES
  ('เพิ่มหน้าเว็บ', '500', 'บาท/หน้า', 'Plus', 1),
  ('ติดตั้ง SEO', '2000', 'บาท', 'Search', 2),
  ('ระบบบล็อก', '3000', 'บาท', 'FileText', 3),
  ('ระบบจองออนไลน์', '8000', 'บาท', 'Calendar', 4),
  ('ระบบอสังหาฯ', '7000', 'บาท', 'Home', 5),
  ('ค่าดูแลรายปี', '2000', 'บาท/ปี', 'Wrench', 6),
  ('ระบบตัวแทนประกัน', '5000', 'บาท', 'ShieldCheck', 7),
  ('ทำคลิป AI', '3000', 'บาท/คลิป', 'Video', 8),
  ('AI Marketing', '2500', 'บาท/เดือน', 'Sparkles', 9);

-- ============ reviews ============
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  business_type TEXT,
  platform TEXT,
  rating INTEGER NOT NULL DEFAULT 5,
  text TEXT NOT NULL,
  verified BOOLEAN NOT NULL DEFAULT false,
  visible BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone read visible reviews" ON public.reviews FOR SELECT USING (visible = true);
CREATE POLICY "Admin/staff read all reviews" ON public.reviews FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role));
CREATE POLICY "Admin/staff manage reviews" ON public.reviews FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role));
CREATE TRIGGER trg_reviews_updated_at BEFORE UPDATE ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.reviews (customer_name, business_type, platform, rating, text, verified, sort_order) VALUES
  ('คุณสมศักดิ์ ก.', 'ร้านอาหาร', 'Facebook', 5, 'ทีมงานเป็นมืออาชีพมาก เว็บไซต์สวยและใช้งานง่าย ลูกค้าชมเยอะมาก', true, 1),
  ('คุณวิภา ข.', 'โรงแรม', 'Google', 5, 'ราคาคุ้มค่ามาก ส่งมอบเร็วกว่าที่ตกลง บริการหลังการขายดีเยี่ยม', true, 2),
  ('คุณธนพล ค.', 'บริษัท', 'LINE', 5, 'ประทับใจมาก ตอบไวทุกครั้ง แก้ไขให้รวดเร็ว แนะนำเลย', true, 3),
  ('คุณนภาพร ง.', 'อสังหาฯ', 'Direct', 5, 'เว็บไซต์เปลี่ยนภาพลักษณ์ธุรกิจของเราไปเลย ขอบคุณทีม MedeeWeb', true, 4),
  ('คุณกิตติ จ.', 'ตัวแทนประกัน', 'Facebook', 4, 'เข้าใจในสิ่งที่เราต้องการ ทำงานละเอียด ส่งงานตรงเวลา', true, 5);

-- ============ blog_posts ============
CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  category TEXT,
  cover_image_url TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone read published posts" ON public.blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Admin/staff read all posts" ON public.blog_posts FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role));
CREATE POLICY "Admin/staff manage posts" ON public.blog_posts FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role));
CREATE TRIGGER trg_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.blog_posts (slug, title, excerpt, content, category, published, published_at) VALUES
  ('why-business-needs-website', 'ทำไมธุรกิจในปี 2025 ถึงต้องมีเว็บไซต์?', 'เว็บไซต์ไม่ใช่ทางเลือกอีกต่อไป แต่เป็นเครื่องมือสำคัญที่ทุกธุรกิจต้องมี...', 'เนื้อหาบทความ...', 'ธุรกิจ', true, '2025-01-15'),
  ('seo-basics-2025', 'SEO เบื้องต้นที่ทุกเจ้าของเว็บต้องรู้', 'ทำเว็บแล้วต้องทำให้คนเจอ มาเรียนรู้ SEO พื้นฐานกัน...', 'เนื้อหาบทความ...', 'SEO', true, '2025-01-10'),
  ('choose-domain-name', 'วิธีเลือกชื่อโดเมนให้เหมาะกับธุรกิจ', 'ชื่อโดเมนคือใบหน้าของแบรนด์ออนไลน์ เลือกอย่างไรให้จำง่าย...', 'เนื้อหาบทความ...', 'โดเมน', true, '2025-01-05'),
  ('mobile-first-design', 'Mobile-First Design สำคัญแค่ไหน?', '70% ของผู้ใช้งานเข้าเว็บผ่านมือถือ การออกแบบให้รองรับมือถือคือ...', 'เนื้อหาบทความ...', 'ดีไซน์', true, '2024-12-28'),
  ('convert-visitors-to-customers', '5 เทคนิคเปลี่ยนผู้เยี่ยมชมเป็นลูกค้า', 'เว็บที่ดีไม่ใช่แค่สวย แต่ต้องเปลี่ยนคนดูให้กลายเป็นลูกค้าได้...', 'เนื้อหาบทความ...', 'การตลาด', true, '2024-12-20');

-- ============ faq_items ============
CREATE TABLE public.faq_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  visible BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.faq_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone read visible faq" ON public.faq_items FOR SELECT USING (visible = true);
CREATE POLICY "Admin/staff read all faq" ON public.faq_items FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role));
CREATE POLICY "Admin/staff manage faq" ON public.faq_items FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role));
CREATE TRIGGER trg_faq_updated_at BEFORE UPDATE ON public.faq_items
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.faq_items (category, question, answer, sort_order) VALUES
  ('ราคาและแพ็กเกจ', 'ราคาทำเว็บเริ่มต้นเท่าไหร่?', 'เริ่มต้น 5,000 บาท สำหรับแพ็กเกจ Starter ครอบคลุมเว็บ 1 หน้า + โดเมน + โฮสติ้ง 1 ปี', 1),
  ('ราคาและแพ็กเกจ', 'มีค่าใช้จ่ายซ่อนเร้นหรือไม่?', 'ไม่มีค่าซ่อนเร้น ราคาที่แจ้งคือราคาที่ต้องชำระจริง', 2),
  ('ราคาและแพ็กเกจ', 'สามารถผ่อนชำระได้หรือไม่?', 'ได้ ผ่อน 2 งวด 50/50 (มัดจำ 50% เริ่มงาน อีก 50% ก่อนส่งมอบ)', 3),
  ('ระยะเวลาและการส่งมอบ', 'ใช้เวลาทำเว็บนานเท่าไหร่?', 'Starter 7 วัน, Business 14 วัน, Pro 21 วัน — นับจากวันที่ลูกค้าส่งข้อมูลครบ', 4),
  ('ระยะเวลาและการส่งมอบ', 'แก้ไขฟรีได้กี่ครั้ง?', 'ฟรี 3 รอบ (batch แก้รวมต่อรอบ) หลังจากนั้นคิดค่าแก้ไขตามขอบเขตงาน', 5),
  ('ฟีเจอร์เว็บไซต์', 'เว็บไซต์รองรับมือถือหรือไม่?', 'รองรับทุกอุปกรณ์ — มือถือ แท็บเล็ต คอมพิวเตอร์ ดีไซน์ Responsive 100%', 6);

-- ============ page_seo ============
CREATE TABLE public.page_seo (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  route TEXT NOT NULL UNIQUE,
  title TEXT,
  description TEXT,
  og_image_url TEXT,
  enabled BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.page_seo ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone read enabled seo" ON public.page_seo FOR SELECT USING (enabled = true);
CREATE POLICY "Admin/staff manage seo" ON public.page_seo FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role));
CREATE TRIGGER trg_page_seo_updated_at BEFORE UPDATE ON public.page_seo
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.page_seo (route, title, description) VALUES
  ('/', 'MedeeWeb — รับทำเว็บไซต์คุณภาพ ภาคใต้ เริ่ม 5,000 บาท', 'รับทำเว็บไซต์ธุรกิจ ร้านอาหาร โรงแรม อสังหา ราคาเริ่ม 5,000 บาท ส่งมอบใน 7 วัน'),
  ('/services', 'บริการของเรา — MedeeWeb', 'บริการทำเว็บไซต์ครบวงจร สำหรับทุกประเภทธุรกิจ'),
  ('/packages', 'แพ็กเกจราคาทำเว็บไซต์ — MedeeWeb', 'Starter 5,000 / Business 9,000 / Pro 15,000 บาท'),
  ('/portfolio', 'ผลงานของเรา — MedeeWeb', 'ผลงานเว็บไซต์จริง 100+ โปรเจกต์'),
  ('/reviews', 'รีวิวจากลูกค้า — MedeeWeb', 'รีวิวจริงจากลูกค้า คะแนนเฉลี่ย 4.9/5'),
  ('/blog', 'บทความและบล็อก — MedeeWeb', 'ความรู้สำหรับธุรกิจในยุคดิจิทัล'),
  ('/faq', 'คำถามที่พบบ่อย — MedeeWeb', 'ตอบทุกคำถามที่คุณสงสัย'),
  ('/about', 'เกี่ยวกับเรา — MedeeWeb', 'ทีมงาน MedeeWeb จากภาคใต้'),
  ('/contact', 'ติดต่อเรา — MedeeWeb', 'พร้อมให้คำปรึกษาฟรี'),
  ('/topup', 'บริการเสริม Top-Up — MedeeWeb', 'เพิ่มความสามารถให้เว็บไซต์ของคุณ'),
  ('/quote', 'ขอใบเสนอราคา — MedeeWeb', 'รับใบเสนอราคาฟรี'),
  ('/order', 'สั่งซื้อแพ็กเกจ — MedeeWeb', 'สั่งซื้อออนไลน์ ชำระง่าย');

-- ============ Storage bucket: site-assets ============
INSERT INTO storage.buckets (id, name, public) VALUES ('site-assets', 'site-assets', true)
  ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read site-assets" ON storage.objects FOR SELECT
  USING (bucket_id = 'site-assets');
CREATE POLICY "Admin/staff upload site-assets" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'site-assets' AND (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role)));
CREATE POLICY "Admin/staff update site-assets" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'site-assets' AND (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role)));
CREATE POLICY "Admin/staff delete site-assets" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'site-assets' AND (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role)));