import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session } from "@supabase/supabase-js";

export type AdminRole = "admin" | "staff" | null;

export function useAdminAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<AdminRole>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess);
      if (sess) {
        setTimeout(() => fetchRole(sess.user.id), 0);
      } else {
        setRole(null);
        setLoading(false);
      }
    });

    supabase.auth.getSession().then(({ data: { session: sess } }) => {
      setSession(sess);
      if (sess) {
        fetchRole(sess.user.id);
      } else {
        setLoading(false);
      }
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  async function fetchRole(userId: string) {
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId);
    if (data && data.length) {
      const roles = data.map((r) => r.role);
      setRole(roles.includes("admin") ? "admin" : roles.includes("staff") ? "staff" : null);
    } else {
      setRole(null);
    }
    setLoading(false);
  }

  return { session, role, loading, isAuthorized: role === "admin" || role === "staff" };
}
