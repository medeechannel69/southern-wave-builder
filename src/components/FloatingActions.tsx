import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";

export function FloatingActions() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <a
        href="https://line.me/R/ti/p/@medeeweb"
        target="_blank"
        rel="noreferrer"
        aria-label="คุยผ่าน LINE"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-[0_8px_24px_rgba(6,199,85,0.45)] transition-transform hover:scale-110"
        style={{ background: "#06C755" }}
      >
        <MessageCircle className="h-7 w-7" />
      </a>
      {show && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="กลับขึ้นด้านบน"
          className="fixed bottom-24 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-transform hover:scale-110"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </>
  );
}
