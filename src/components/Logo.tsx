import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import logoSage from "@/img/logo.png";
import logoWhite from "@/img/logo-w.png";

export function Logo({
  variant,
  className,
  knockOut,
}: {
  variant?: "white" | "sage";
  className?: string;
  knockOut?: boolean;
}) {
  const { theme } = useTheme();
  const resolved = variant ?? (theme === "dark" ? "white" : "sage");
  const shouldKnock = knockOut ?? resolved === "white";

  return (
    <img
      src={resolved === "white" ? logoWhite : logoSage}
      alt="Wellness & Healing SF"
      className={cn("object-contain", shouldKnock && "mix-blend-screen", className)}
    />
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <p className={cn("text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground", className)}>
      Wellness & Healing SF
    </p>
  );
}
