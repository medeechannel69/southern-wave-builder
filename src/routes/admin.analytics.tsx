import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { RequireAdmin } from "@/components/admin/RequireAdmin";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, BarChart3 } from "lucide-react";

export const Route = createFileRoute("/admin/analytics")({
  head: () => ({ meta: [{ title: "Analytics — Admin" }] }),
  component: () => <RequireAdmin><AnalyticsPage /></RequireAdmin>,
});

function AnalyticsPage() {
  const [ga4Id, setGa4Id] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("site_settings").select("ga4_id").eq("id", 1).maybeSingle().then(({ data }) => {
      setGa4Id(data?.ga4_id ?? null);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-display font-bold text-primary">Analytics</h1>
      {loading ? (
        <p className="text-muted-foreground">กำลังโหลด...</p>
      ) : ga4Id ? (
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><BarChart3 className="h-5 w-5" /> Google Analytics 4 ({ga4Id})</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">เนื่องจาก GA4 ไม่อนุญาตให้ embed ใน iframe โดยตรง คุณสามารถเปิด dashboard ได้จากปุ่มด้านล่าง</p>
            <Button asChild>
              <a href={`https://analytics.google.com/analytics/web/#/p${ga4Id.replace(/^G-/, "")}/reports/intelligenthome`} target="_blank" rel="noreferrer">
                <ExternalLink className="h-4 w-4" /> เปิด GA4 Dashboard
              </a>
            </Button>
            <div className="border rounded-lg overflow-hidden bg-muted/30">
              <iframe
                src={`https://lookerstudio.google.com/embed/reporting/create?c.reportId=&ds.ds0.connector=googleAnalytics&ds.ds0.propertyId=${ga4Id.replace(/^G-/, "")}`}
                className="w-full h-[600px]" title="GA4"
              />
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card><CardContent className="p-6 text-center space-y-3">
          <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground" />
          <p>ยังไม่ได้ตั้งค่า GA4 Measurement ID</p>
          <Button asChild><Link to="/admin/settings">ไปตั้งค่า</Link></Button>
        </CardContent></Card>
      )}
    </div>
  );
}
