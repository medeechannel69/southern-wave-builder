import { type ReactNode, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { AdminShell } from "./AdminShell";

export function RequireAdmin({ children }: { children: ReactNode }) {
  const { session, role, loading, isAuthorized } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !session) {
      navigate({ to: "/admin/login" });
    }
  }, [loading, session, navigate]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">กำลังโหลด...</div>;
  }
  if (!session) return null;
  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 p-6 text-center">
        <h1 className="text-xl font-bold text-destructive">ไม่มีสิทธิ์เข้าถึง</h1>
        <p className="text-sm text-muted-foreground">บัญชีนี้ ({session.user.email}) ยังไม่ได้รับสิทธิ์ admin/staff<br/>กรุณาแจ้งผู้ดูแลระบบเพื่อเพิ่มบทบาทในตาราง user_roles</p>
      </div>
    );
  }
  void role;
  return <AdminShell>{children}</AdminShell>;
}
