import logoImg from "@/assets/medeeweb-logo.webp";

export function Logo({
  className = "",
  textClassName = "",
  variant = "header",
}: {
  className?: string;
  showText?: boolean;
  textClassName?: string;
  variant?: "header" | "footer";
}) {
  const src = logoImg;
  void variant;
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
        className={`${className} object-contain`}
      />
    </div>
  );
}
