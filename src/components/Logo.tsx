import { cn } from "@/lib/utils";
import logoSage from "@/img/logo.png";
import logoWhite from "@/img/logo-w.png";

export function Logo({
  variant = "white",
  className,
  knockOut = true,
}: {
  variant?: "white" | "sage";
  className?: string;
  knockOut?: boolean;
}) {
  return (
    <img
      src={variant === "white" ? logoWhite : logoSage}
      alt="Wellness & Healing SF"
      className={cn("object-contain", knockOut && "mix-blend-screen", className)}
    />
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <p className={cn("text-[10px] font-medium uppercase tracking-[0.28em] text-cream", className)}>
      Wellness & Healing SF
    </p>
  );
}
