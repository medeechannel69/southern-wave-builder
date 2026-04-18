import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const Route = createFileRoute("/api/line-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await request.text();
        const signature = request.headers.get("x-line-signature") ?? "";

        // Try to read n8n webhook URL from site_settings (admin-configurable)
        let n8nUrl: string | null = null;
        try {
          const { data } = await supabaseAdmin
            .from("site_settings")
            .select("line_webhook_url")
            .eq("id", 1)
            .maybeSingle();
          n8nUrl = data?.line_webhook_url ?? null;
        } catch {
          // ignore
        }

        // Fallback to env
        if (!n8nUrl && typeof process !== "undefined") {
          n8nUrl = process.env.N8N_WEBHOOK_URL ?? null;
        }

        if (n8nUrl) {
          try {
            await fetch(n8nUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-line-signature": signature,
              },
              body,
            });
          } catch (e) {
            console.error("Failed to forward LINE webhook to n8n:", e);
          }
        }

        return Response.json({ ok: true });
      },
      GET: async () => Response.json({ ok: true, service: "line-webhook" }),
    },
  },
});
