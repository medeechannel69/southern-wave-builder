// Admin users management edge function
// Requires caller to have 'admin' role in user_roles table.
// Actions: list, invite, set_role, remove_role, delete_user

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
  const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") ?? Deno.env.get("SUPABASE_PUBLISHABLE_KEY")!;

  const authHeader = req.headers.get("Authorization") ?? "";
  const userClient = createClient(SUPABASE_URL, ANON_KEY, {
    global: { headers: { Authorization: authHeader } },
  });
  const { data: { user }, error: userErr } = await userClient.auth.getUser();
  if (userErr || !user) return json({ error: "Unauthorized" }, 401);

  const admin = createClient(SUPABASE_URL, SERVICE_KEY);
  const { data: isAdmin, error: roleErr } = await admin.rpc("has_role", {
    _user_id: user.id,
    _role: "admin",
  });
  if (roleErr || !isAdmin) return json({ error: "Forbidden — admin only" }, 403);

  let body: any;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }
  const action = String(body?.action ?? "");

  try {
    if (action === "list") {
      const { data: list, error } = await admin.auth.admin.listUsers({ page: 1, perPage: 100 });
      if (error) throw error;
      const ids = list.users.map((u) => u.id);
      const { data: roles } = await admin
        .from("user_roles")
        .select("user_id, role")
        .in("user_id", ids.length ? ids : ["00000000-0000-0000-0000-000000000000"]);
      const rolesByUser = new Map<string, string[]>();
      for (const r of roles ?? []) {
        const arr = rolesByUser.get(r.user_id) ?? [];
        arr.push(r.role);
        rolesByUser.set(r.user_id, arr);
      }
      const users = list.users.map((u) => ({
        id: u.id,
        email: u.email,
        created_at: u.created_at,
        last_sign_in_at: u.last_sign_in_at,
        roles: rolesByUser.get(u.id) ?? [],
      }));
      return json({ users });
    }

    if (action === "invite") {
      const email = String(body?.email ?? "").trim().toLowerCase();
      const role = String(body?.role ?? "staff");
      if (!email) return json({ error: "email required" }, 400);
      if (!["admin", "staff"].includes(role)) return json({ error: "invalid role" }, 400);

      const { data: created, error } = await admin.auth.admin.inviteUserByEmail(email);
      if (error) throw error;
      const newId = created.user?.id;
      if (newId) {
        await admin.from("user_roles").insert({ user_id: newId, role });
      }
      return json({ ok: true, user_id: newId });
    }

    if (action === "set_role") {
      const userId = String(body?.user_id ?? "");
      const role = String(body?.role ?? "");
      if (!userId || !["admin", "staff"].includes(role)) return json({ error: "invalid params" }, 400);
      // Insert if not exists
      const { data: existing } = await admin
        .from("user_roles")
        .select("id")
        .eq("user_id", userId)
        .eq("role", role)
        .maybeSingle();
      if (!existing) {
        const { error } = await admin.from("user_roles").insert({ user_id: userId, role });
        if (error) throw error;
      }
      return json({ ok: true });
    }

    if (action === "remove_role") {
      const userId = String(body?.user_id ?? "");
      const role = String(body?.role ?? "");
      if (!userId || !["admin", "staff"].includes(role)) return json({ error: "invalid params" }, 400);
      // Prevent removing the last admin
      if (role === "admin") {
        const { count } = await admin.from("user_roles").select("id", { count: "exact", head: true }).eq("role", "admin");
        if ((count ?? 0) <= 1) return json({ error: "ไม่สามารถลบ admin คนสุดท้ายได้" }, 400);
      }
      const { error } = await admin.from("user_roles").delete().eq("user_id", userId).eq("role", role);
      if (error) throw error;
      return json({ ok: true });
    }

    if (action === "delete_user") {
      const userId = String(body?.user_id ?? "");
      if (!userId) return json({ error: "user_id required" }, 400);
      if (userId === user.id) return json({ error: "ลบบัญชีตัวเองไม่ได้" }, 400);
      // Prevent deleting last admin
      const { data: roles } = await admin.from("user_roles").select("role").eq("user_id", userId);
      if (roles?.some((r) => r.role === "admin")) {
        const { count } = await admin.from("user_roles").select("id", { count: "exact", head: true }).eq("role", "admin");
        if ((count ?? 0) <= 1) return json({ error: "ไม่สามารถลบ admin คนสุดท้ายได้" }, 400);
      }
      const { error } = await admin.auth.admin.deleteUser(userId);
      if (error) throw error;
      return json({ ok: true });
    }

    return json({ error: "unknown action" }, 400);
  } catch (e: any) {
    return json({ error: e?.message ?? String(e) }, 500);
  }
});