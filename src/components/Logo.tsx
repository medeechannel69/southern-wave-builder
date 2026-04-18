import logo from "@/assets/medeeweb-logo.png";

export function Logo({ className = "h-10", textClassName = "" }: { className?: string; showText?: boolean; textClassName?: string }) {
  return (
    <div className={`flex items-center ${textClassName}`}>
      <img src={logo} alt="MedeeWeb — Web & App Solutions" width={1366} height={768} className={`${className} w-auto object-contain`} />
    </div>
  );
}
