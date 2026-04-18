import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { RequireAdmin } from "@/components/admin/RequireAdmin";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Users, FileText, Megaphone } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Dashboard — MedeeWeb Admin" }] }),
  component: AdminDashboard,
});

function AdminDashboard() {
  return (
    <RequireAdmin>
      <Stats />
    </RequireAdmin>
  );
}

function Stats() {
  const [counts, setCounts] = useState({ orders: 0, leads: 0, quotes: 0, promos: 0 });

  useEffect(() => {
    (async () => {
      const [o, l, q, p] = await Promise.all([
        supabase.from("orders").select("id", { count: "exact", head: true }),
        supabase.from("leads").select("id", { count: "exact", head: true }),
        supabase.from("quotes").select("id", { count: "exact", head: true }),
        supabase.from("promotions").select("id", { count: "exact", head: true }),
      ]);
      setCounts({
        orders: o.count ?? 0,
        leads: l.count ?? 0,
        quotes: q.count ?? 0,
        promos: p.count ?? 0,
      });
    })();
  }, []);

  const items = [
    { label: "คำสั่งซื้อ", value: counts.orders, icon: ShoppingCart },
    { label: "Lead", value: counts.leads, icon: Users },
    { label: "ใบเสนอราคา", value: counts.quotes, icon: FileText },
    { label: "โปรโมชั่น", value: counts.promos, icon: Megaphone },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-primary">ภาพรวม</h1>
        <p className="text-sm text-muted-foreground">สรุปข้อมูลของระบบ MedeeWeb</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((it) => {
          const Icon = it.icon;
          return (
            <Card key={it.label}>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between text-sm font-medium text-muted-foreground">
                  {it.label}
                  <Icon className="h-4 w-4 text-primary" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{it.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
