import logo from "@/assets/medeeweb-logo-v2.png";

export function Logo({ className = "h-10", textClassName = "" }: { className?: string; showText?: boolean; textClassName?: string }) {
  return (
    <div className={`flex items-center ${textClassName}`}>
      <img
        src={logo}
        alt="MedeeWeb — Web & App Solutions"
        width={200}
        height={60}
        loading="eager"
        fetchPriority="high"
        decoding="sync"
        style={{ height: "auto" }}
        className={`${className} w-auto object-contain`}
      />
    </div>
  );
}
