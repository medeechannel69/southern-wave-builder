
INSERT INTO storage.buckets (id, name, public)
VALUES ('payment-slips', 'payment-slips', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Anyone can upload payment slips"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'payment-slips');

CREATE POLICY "Anyone can view payment slips"
ON storage.objects FOR SELECT
USING (bucket_id = 'payment-slips');

CREATE POLICY "Admin/staff can delete payment slips"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'payment-slips'
  AND (public.has_role(auth.uid(), 'admin'::app_role) OR public.has_role(auth.uid(), 'staff'::app_role))
);
