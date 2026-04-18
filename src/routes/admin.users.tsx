import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { RequireAdmin } from "@/components/admin/RequireAdmin";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Loader2, Trash2, UserPlus, ShieldCheck, ShieldOff } from "lucide-react";

type AdminUser = {
  id: string;
  email: string | null;
  created_at: string;
  last_sign_in_at: string | null;
  roles: string[];
};

export const Route = createFileRoute("/admin/users")({
  head: () => ({ meta: [{ title: "จัดการผู้ใช้ — Admin" }] }),
  component: () => (
    <RequireAdmin>
      <UsersPage />
    </RequireAdmin>
  ),
});

function UsersPage() {
  const { role } = useAdminAuth();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [email, setEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<"admin" | "staff">("staff");

  async function call(action: string, payload: Record<string, unknown> = {}) {
    const { data, error } = await supabase.functions.invoke("admin-users", {
      body: { action, ...payload },
    });
    if (error) throw new Error(error.message);
    if (data?.error) throw new Error(data.error);
    return data;
  }

  async function load() {
    setLoading(true);
    try {
      const data = await call("list");
      setUsers(data.users ?? []);
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    load();
  }, []);

  async function invite(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setBusy(true);
    try {
      await call("invite", { email, role: inviteRole });
      toast.success(`ส่งคำเชิญไปที่ ${email} แล้ว`);
      setEmail("");
      setInviteRole("staff");
      load();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setBusy(false);
    }
  }

  async function setRole(userId: string, newRole: "admin" | "staff", currentRoles: string[]) {
    setBusy(true);
    try {
      // Add new role
      await call("set_role", { user_id: userId, role: newRole });
      // Remove the other role if present
      const other = newRole === "admin" ? "staff" : "admin";
      if (currentRoles.includes(other)) {
        await call("remove_role", { user_id: userId, role: other });
      }
      toast.success(`อัปเดตบทบาทเป็น ${newRole}`);
      load();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setBusy(false);
    }
  }

  async function removeAllRoles(u: AdminUser) {
    if (!confirm(`เอาสิทธิ์ทั้งหมดออกจาก ${u.email}?`)) return;
    setBusy(true);
    try {
      for (const r of u.roles) {
        await call("remove_role", { user_id: u.id, role: r });
      }
      toast.success("ลบสิทธิ์เรียบร้อย");
      load();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setBusy(false);
    }
  }

  async function deleteUser(u: AdminUser) {
    if (!confirm(`ลบบัญชี ${u.email} ถาวร?`)) return;
    setBusy(true);
    try {
      await call("delete_user", { user_id: u.id });
      toast.success("ลบบัญชีแล้ว");
      load();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setBusy(false);
    }
  }

  if (role !== "admin") {
    return (
      <div className="rounded-md border p-6 text-center text-sm text-muted-foreground">
        เฉพาะ admin เท่านั้นที่สามารถจัดการผู้ใช้
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-display font-bold text-primary">จัดการผู้ใช้</h1>
        <p className="text-sm text-muted-foreground">เชิญทีมงาน และกำหนดบทบาท admin/staff</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><UserPlus className="h-4 w-4" /> เชิญผู้ใช้ใหม่</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={invite} className="grid md:grid-cols-[1fr,180px,auto] gap-3 items-end">
            <div>
              <Label>อีเมล</Label>
              <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="staff@yourdomain.com" />
            </div>
            <div>
              <Label>บทบาท</Label>
              <Select value={inviteRole} onValueChange={(v) => setInviteRole(v as "admin" | "staff")}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="staff">staff</SelectItem>
                  <SelectItem value="admin">admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" disabled={busy}>{busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "ส่งคำเชิญ"}</Button>
          </form>
          <p className="mt-2 text-xs text-muted-foreground">ระบบจะส่งอีเมลเชิญให้ตั้งรหัสผ่าน หากยังไม่ได้ตั้งค่าโดเมนอีเมล อีเมลจะใช้ template เริ่มต้นของระบบ</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>ผู้ใช้ทั้งหมด ({users.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> กำลังโหลด...</div>
          ) : users.length === 0 ? (
            <p className="text-sm text-muted-foreground">ยังไม่มีผู้ใช้</p>
          ) : (
            <div className="space-y-2">
              {users.map((u) => (
                <div key={u.id} className="flex flex-wrap items-center gap-3 border rounded-lg p-3">
                  <div className="flex-1 min-w-[200px]">
                    <div className="font-medium">{u.email ?? "(ไม่มีอีเมล)"}</div>
                    <div className="text-xs text-muted-foreground">
                      สมัคร: {new Date(u.created_at).toLocaleDateString("th-TH")}
                      {u.last_sign_in_at ? ` • เข้าล่าสุด: ${new Date(u.last_sign_in_at).toLocaleDateString("th-TH")}` : " • ยังไม่เคยเข้า"}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {u.roles.length === 0 ? (
                      <Badge variant="outline">ไม่มีสิทธิ์</Badge>
                    ) : (
                      u.roles.map((r) => (
                        <Badge key={r} variant={r === "admin" ? "default" : "secondary"}>{r}</Badge>
                      ))
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    <Button size="sm" variant="outline" disabled={busy || u.roles.includes("admin")} onClick={() => setRole(u.id, "admin", u.roles)}>
                      <ShieldCheck className="h-3 w-3" /> ตั้งเป็น admin
                    </Button>
                    <Button size="sm" variant="outline" disabled={busy || (u.roles.includes("staff") && !u.roles.includes("admin"))} onClick={() => setRole(u.id, "staff", u.roles)}>
                      ตั้งเป็น staff
                    </Button>
                    {u.roles.length > 0 && (
                      <Button size="sm" variant="ghost" disabled={busy} onClick={() => removeAllRoles(u)}>
                        <ShieldOff className="h-3 w-3" /> เอาสิทธิ์ออก
                      </Button>
                    )}
                    <Button size="sm" variant="ghost" disabled={busy} onClick={() => deleteUser(u)} className="text-destructive">
                      <Trash2 className="h-3 w-3" /> ลบ
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}