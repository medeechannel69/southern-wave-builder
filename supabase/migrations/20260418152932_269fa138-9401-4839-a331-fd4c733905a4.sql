-- Rate limits table for /api/notify
CREATE TABLE public.rate_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_rate_limits_key ON public.rate_limits(key);
CREATE INDEX idx_rate_limits_created_at ON public.rate_limits(created_at);

ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- Anyone can insert/select for rate limiting (no sensitive data, just counter rows)
CREATE POLICY "Anyone insert rate_limits" ON public.rate_limits
  FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone read rate_limits" ON public.rate_limits
  FOR SELECT TO anon, authenticated USING (true);

-- Make payment-slips bucket PRIVATE
UPDATE storage.buckets SET public = false WHERE id = 'payment-slips';

-- Drop any existing public-read on payment-slips, allow only anon insert + admin/staff select
DO $$ BEGIN
  -- best-effort cleanup of common existing policy names
  EXECUTE 'DROP POLICY IF EXISTS "Public read payment slips" ON storage.objects';
  EXECUTE 'DROP POLICY IF EXISTS "Anyone read payment slips" ON storage.objects';
  EXECUTE 'DROP POLICY IF EXISTS "Public Access" ON storage.objects';
EXCEPTION WHEN OTHERS THEN NULL; END $$;

-- Allow anonymous uploads (customer attaches slip during order)
CREATE POLICY "Anyone upload payment slip"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'payment-slips');

-- Only admin/staff can read slips directly (signed URLs handle public preview)
CREATE POLICY "Admin/staff read payment slips"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'payment-slips' AND (has_role(auth.uid(),'admin'::app_role) OR has_role(auth.uid(),'staff'::app_role)));