import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const KEY = "medeeweb-cookie-consent";

export function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem(KEY)) setShow(true);
  }, []);
  if (!show) return null;
  const accept = () => {
    localStorage.setItem(KEY, "accepted");
    setShow(false);
  };
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-white/95 backdrop-blur shadow-[0_-4px_24px_rgba(0,0,0,0.08)]">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between md:px-8">
        <p className="text-sm text-foreground/80">
          เว็บไซต์นี้ใช้คุกกี้เพื่อให้คุณได้รับประสบการณ์ที่ดีที่สุด — โดยการใช้งานต่อ คุณยอมรับ
          <a href="/privacy" className="ml-1 text-accent underline">นโยบายความเป็นส่วนตัว</a>
        </p>
        <Button onClick={accept} className="bg-primary text-white hover:bg-primary/90 rounded-full font-semibold">
          ยอมรับ
        </Button>
      </div>
    </div>
  );
}
