import { type ReactNode } from "react";
import { Link, useNavigate, useLocation } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LogOut, ShoppingCart, Users, FileText, ListChecks, Megaphone, LayoutDashboard, UserCog } from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";

const nav = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/orders", label: "คำสั่งซื้อ", icon: ShoppingCart },
  { to: "/admin/leads", label: "Lead", icon: Users },
  { to: "/admin/quotes", label: "ใบเสนอราคา", icon: FileText },
  { to: "/admin/projects", label: "โปรเจกต์", icon: ListChecks },
  { to: "/admin/promotions", label: "โปรโมชั่น", icon: Megaphone },
];

const adminOnlyNav = [
  { to: "/admin/users", label: "ผู้ใช้ระบบ", icon: UserCog },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { session, role } = useAdminAuth();

  async function logout() {
    await supabase.auth.signOut();
    navigate({ to: "/admin/login" });
  }

  return (
    <div className="min-h-screen flex w-full bg-muted/30">
      <aside className="w-60 shrink-0 border-r bg-background hidden md:flex flex-col">
        <div className="px-5 py-4 border-b">
          <Link to="/admin" className="font-display font-bold text-primary text-lg">MedeeWeb Admin</Link>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {[...nav, ...(role === "admin" ? adminOnlyNav : [])].map((item) => {
            const active = item.exact ? location.pathname === item.to : location.pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                  active ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t text-xs text-muted-foreground">
          <div className="truncate">{session?.user.email}</div>
          <div className="mb-2 capitalize">บทบาท: {role}</div>
          <Button onClick={logout} variant="outline" size="sm" className="w-full">
            <LogOut className="h-4 w-4" /> ออกจากระบบ
          </Button>
        </div>
      </aside>
      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden border-b bg-background px-4 py-3 flex items-center justify-between">
          <Link to="/admin" className="font-display font-bold text-primary">Admin</Link>
          <Button onClick={logout} size="sm" variant="outline"><LogOut className="h-4 w-4" /></Button>
        </header>
        <nav className="md:hidden border-b bg-background px-2 py-2 flex gap-1 overflow-x-auto">
          {[...nav, ...(role === "admin" ? adminOnlyNav : [])].map((item) => {
            const active = item.exact ? location.pathname === item.to : location.pathname.startsWith(item.to);
            return (
              <Link key={item.to} to={item.to} className={`whitespace-nowrap rounded-md px-3 py-1.5 text-xs ${active ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <main className="flex-1 p-4 md:p-8 overflow-x-auto">{children}</main>
      </div>
    </div>
  );
}
