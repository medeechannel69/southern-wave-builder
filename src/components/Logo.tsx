import logoHeader from "@/assets/medeeweb-logo-header.png";
import logoFooter from "@/assets/medeeweb-logo-footer.png";

export function Logo({
  className = "h-10",
  textClassName = "",
  variant = "header",
}: {
  className?: string;
  showText?: boolean;
  textClassName?: string;
  variant?: "header" | "footer";
}) {
  const src = variant === "footer" ? logoFooter : logoHeader;
  return (
    <div className={`flex items-center ${textClassName}`}>
      <img
        src={src}
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
