import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { RequireAdmin } from "@/components/admin/RequireAdmin";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { KeyRound } from "lucide-react";

export const Route = createFileRoute("/admin/password")({
  head: () => ({ meta: [{ title: "เปลี่ยนรหัสผ่าน — MedeeWeb Admin" }] }),
  component: () => (
    <RequireAdmin>
      <PasswordPage />
    </RequireAdmin>
  ),
});

function PasswordPage() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (next.length < 8) {
      toast.error("รหัสผ่านใหม่ต้องมีอย่างน้อย 8 ตัวอักษร");
      return;
    }
    if (next !== confirm) {
      toast.error("รหัสผ่านยืนยันไม่ตรงกัน");
      return;
    }
    setLoading(true);
    try {
      const { data: sess } = await supabase.auth.getUser();
      const email = sess.user?.email;
      if (!email) throw new Error("ไม่พบบัญชีผู้ใช้");

      // Verify current password
      const { error: signInErr } = await supabase.auth.signInWithPassword({
        email,
        password: current,
      });
      if (signInErr) {
        toast.error("รหัสผ่านปัจจุบันไม่ถูกต้อง");
        return;
      }

      const { error } = await supabase.auth.updateUser({ password: next });
      if (error) throw error;

      toast.success("เปลี่ยนรหัสผ่านสำเร็จ");
      setCurrent("");
      setNext("");
      setConfirm("");
    } catch (err: any) {
      toast.error(err?.message ?? "เปลี่ยนรหัสผ่านไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl">
      <div className="mb-6 flex items-center gap-2">
        <KeyRound className="h-5 w-5 text-primary" />
        <h1 className="text-2xl font-bold text-primary">เปลี่ยนรหัสผ่าน</h1>
      </div>
      <Card className="p-6">
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current">รหัสผ่านปัจจุบัน</Label>
            <Input
              id="current"
              type="password"
              autoComplete="current-password"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="next">รหัสผ่านใหม่</Label>
            <Input
              id="next"
              type="password"
              autoComplete="new-password"
              value={next}
              onChange={(e) => setNext(e.target.value)}
              required
              minLength={8}
            />
            <p className="text-xs text-muted-foreground">อย่างน้อย 8 ตัวอักษร</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm">ยืนยันรหัสผ่านใหม่</Label>
            <Input
              id="confirm"
              type="password"
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              minLength={8}
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "กำลังบันทึก..." : "บันทึกรหัสผ่านใหม่"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
