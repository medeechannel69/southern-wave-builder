import logo from "@/assets/medeeweb-logo.png";

export function Logo({ className = "h-10 w-10", showText = true, textClassName = "" }: { className?: string; showText?: boolean; textClassName?: string }) {
  return (
    <div className="flex items-center gap-2">
      <img src={logo} alt="MedeeWeb" width={512} height={512} className={className} />
      {showText && (
        <span className={`font-display text-xl font-bold tracking-tight ${textClassName}`}>
          Medee<span className="text-orange">Web</span>
        </span>
      )}
    </div>
  );
}
