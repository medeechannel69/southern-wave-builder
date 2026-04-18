import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Flame, X } from "lucide-react";

type Promo = { id: string; text: string; end_at: string | null; button_url: string | null };

function timeLeft(end: string) {
  const ms = new Date(end).getTime() - Date.now();
  if (ms <= 0) return null;
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms % 86400000) / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return `${d}d ${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function HotSaleBanner() {
  const [promo, setPromo] = useState<Promo | null>(null);
  const [closed, setClosed] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    supabase.from("promotions").select("id,text,end_at,button_url").eq("enabled", true).order("created_at", { ascending: false }).limit(1).maybeSingle().then(({ data }) => {
      if (data) setPromo(data as Promo);
    });
  }, []);
  useEffect(() => {
    if (!promo?.end_at) return;
    const i = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(i);
  }, [promo?.end_at]);

  if (!promo || closed) return null;
  const left = promo.end_at ? timeLeft(promo.end_at) : null;
  if (promo.end_at && !left) return null;

  return (
    <div className="relative z-50 flex flex-wrap items-center justify-center gap-3 px-4 py-2 text-sm font-semibold text-white" style={{ background: "#F7941D" }}>
      <Flame className="h-4 w-4" />
      <span>{promo.text}</span>
      {left && <span className="rounded-full bg-white/20 px-3 py-0.5 font-mono">{left}</span>}
      <Link to={promo.button_url ?? "/quote" as any} className="rounded-full bg-white px-3 py-1 text-orange hover:bg-white/90">รับโปรโมชั่น →</Link>
      <button onClick={() => setClosed(true)} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:opacity-80" aria-label="ปิด"><X className="h-4 w-4" /></button>
    </div>
  );
  void tick;
}
