import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

type Msg = { role: "bot" | "user"; text: string };

const FAQ: { patterns: string[]; answer: string }[] = [
  {
    patterns: ["ราคา", "เท่าไหร่", "ค่าใช้จ่าย", "แพง", "ถูก"],
    answer:
      "ราคาเริ่มต้น 5,000 บาท ครับ\n• Starter 5,000 บาท (1 หน้า)\n• Business 9,000 บาท (5 หน้า)\n• Pro 15,000 บาท (10 หน้า)\nทุกแพ็กเกจรวม Domain + Hosting 1 ปีครับ",
  },
  {
    patterns: ["demo", "ตัวอย่าง", "ดูเว็บ", "ผลงาน"],
    answer:
      "ดูตัวอย่างเว็บได้เลยครับ 👉 medeeweb.com/demo\nมีให้ดูทั้งร้านอาหาร โรงแรม บริษัท อสังหาฯ และอีกหลายแบบครับ",
  },
  {
    patterns: ["กี่วัน", "นานแค่ไหน", "เวลา", "ส่งงาน"],
    answer:
      "ระยะเวลาส่งงานครับ\n• Starter: 7 วันทำการ\n• Business: 14 วันทำการ\n• Pro: 21 วันทำการ",
  },
  {
    patterns: ["ติดต่อ", "โทร", "line", "ไลน์", "คุย"],
    answer:
      "ติดต่อเราได้เลยครับ 📞\n• โทร: 099-625-2499\n• LINE: Duck-gle\n• Email: suthee@medeeweb.com\nหรือกด 'ขอใบเสนอราคา' ที่เมนูบนเลยครับ",
  },
  {
    patterns: ["มือถือ", "responsive", "mobile", "tablet"],
    answer:
      "รองรับมือถือทุกขนาดครับ ✅\nเว็บที่เราทำ Responsive ทุกหน้าจอ ทั้งมือถือ แท็บเล็ต และคอมพิวเตอร์",
  },
  {
    patterns: ["seo", "google", "ค้นหา", "ติดอันดับ"],
    answer:
      "มี SEO ให้ครับ 🔍\n• Starter: SEO พื้นฐาน\n• Business: SEO มาตรฐาน\n• Pro: SEO ครบ + Analytics\nช่วยให้ลูกค้าค้นหาเจอบน Google ครับ",
  },
  {
    patterns: ["แก้ไข", "แก้", "เปลี่ยน", "อัปเดต"],
    answer:
      "แก้ไขได้ครับ 🔧\nทุกแพ็กเกจแก้ฟรี 3 ครั้ง หลังส่งงาน\nถ้าเกินครั้งที่ 3 คิดเพิ่มครั้งละ 500 บาทครับ",
  },
  {
    patterns: ["domain", "โดเมน", "hosting", "โฮสติ้ง"],
    answer:
      "รวม Domain + Hosting ทุกแพ็กเกจครับ ✅\nใช้ฟรี 1 ปี หลังจากนั้นต่ออายุปีละ ~800-1,200 บาทครับ",
  },
  {
    patterns: ["ร้านอาหาร", "โรงแรม", "บริษัท", "ประกัน", "อสังหา", "รพ", "สต", "ผู้รับเหมา"],
    answer:
      "รับทำได้ทุกประเภทครับ 🏢\nร้านอาหาร โรงแรม บริษัท ผู้รับเหมา อสังหาฯ ตัวแทนประกัน รพ.สต. และอื่นๆ\nดูตัวอย่างได้ที่ medeeweb.com/demo ครับ",
  },
  {
    patterns: ["ภาคใต้", "กระบี่", "ภูเก็ต", "สงขลา", "นครศรี", "สุราษฎร์"],
    answer:
      "ให้บริการครอบคลุมภาคใต้ 14 จังหวัดครับ 🌊\nกระบี่ ภูเก็ต พังงา ตรัง สุราษฎร์ธานี นครศรีธรรมราช สงขลา และอีก 7 จังหวัดครับ",
  },
  {
    patterns: ["สั่ง", "จ้าง", "ทำเว็บ", "เริ่ม", "อยากได้"],
    answer:
      "สั่งทำได้เลยครับ! 🚀\nกด 'ขอใบเสนอราคา' ที่เมนูบน\nหรือไปที่ medeeweb.com/order\nหรือโทร 099-625-2499 ได้เลยครับ",
  },
];

const FALLBACK =
  "ขอบคุณครับ 🙏 สำหรับคำถามนี้\nแนะนำให้ติดต่อโดยตรงครับ\n📞 099-625-2499\n💬 LINE: Duck-gle\nหรือกด 'ขอใบเสนอราคา' ได้เลยครับ";

function getReply(input: string): string {
  const lower = input.toLowerCase();
  for (const faq of FAQ) {
    if (faq.patterns.some((p) => lower.includes(p.toLowerCase()))) {
      return faq.answer;
    }
  }
  return FALLBACK;
}

const QUICK_REPLIES = [
  { label: "💰 ราคาเท่าไหร่?", query: "ราคา" },
  { label: "🌐 ดูตัวอย่างเว็บ", query: "ตัวอย่าง" },
  { label: "📞 ติดต่อเรา", query: "ติดต่อ" },
  { label: "⏱️ ส่งงานกี่วัน?", query: "กี่วัน" },
];

export function FAQChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "bot",
      text: "สวัสดีครับ! 👋 ผมช่วยตอบคำถามเกี่ยวกับบริการทำเว็บได้นะครับ\nลองเลือกคำถามด้านล่าง หรือพิมพ์คำถามได้เลยครับ",
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  function handleSend(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const reply = getReply(trimmed);
    setMessages((m) => [...m, { role: "user", text: trimmed }, { role: "bot", text: reply }]);
    setInput("");
  }

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="เปิดแชทถามตอบ"
          className="fixed bottom-24 right-6 z-40 flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-elegant transition-transform hover:scale-105"
        >
          <MessageCircle className="h-5 w-5" />
          ถามได้เลย
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div
          role="dialog"
          aria-label="หน้าต่างแชทถามตอบ"
          className="fixed bottom-24 right-4 z-40 flex w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-elegant sm:right-6"
          style={{ height: "min(560px, calc(100vh - 8rem))" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-primary px-4 py-3 text-primary-foreground">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <div>
                <div className="text-sm font-semibold">ถามได้เลย</div>
                <div className="text-[11px] opacity-80">ตอบกลับทันที 24 ชม.</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="ปิดแชท"
              className="rounded-full p-1 hover:bg-white/15"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-muted/40 p-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] whitespace-pre-line rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-background text-foreground border border-border"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick replies */}
          <div className="flex flex-wrap gap-1.5 border-t border-border bg-card px-3 py-2">
            {QUICK_REPLIES.map((q) => (
              <button
                key={q.label}
                type="button"
                onClick={() => handleSend(q.query)}
                className="rounded-full border border-border bg-muted/50 px-2.5 py-1 text-xs text-foreground hover:bg-muted"
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="flex items-center gap-2 border-t border-border bg-card p-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="พิมพ์คำถามของคุณ..."
              className="flex-1 rounded-full border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            />
            <button
              type="submit"
              aria-label="ส่งข้อความ"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground hover:opacity-90"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
