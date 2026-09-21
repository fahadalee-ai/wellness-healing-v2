import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export function ThemeToggle({
  variant = "icon",
  className,
}: {
  variant?: "icon" | "segment";
  className?: string;
}) {
  const { theme, setTheme, toggleTheme } = useTheme();

  if (variant === "segment") {
    return (
      <div className={cn("grid grid-cols-2 gap-2", className)}>
        <button
          type="button"
          onClick={() => setTheme("light")}
          className={cn(
            "flex min-h-12 items-center justify-center gap-2 rounded-2xl border px-3 text-sm transition-colors",
            theme === "light"
              ? "border-primary bg-primary/10 text-foreground"
              : "border-border bg-card text-muted-foreground",
          )}
        >
          <Sun size={16} strokeWidth={1.7} />
          Light
        </button>
        <button
          type="button"
          onClick={() => setTheme("dark")}
          className={cn(
            "flex min-h-12 items-center justify-center gap-2 rounded-2xl border px-3 text-sm transition-colors",
            theme === "dark"
              ? "border-primary bg-primary/10 text-foreground"
              : "border-border bg-card text-muted-foreground",
          )}
        >
          <Moon size={16} strokeWidth={1.7} />
          Evening
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to evening mode"}
      className={cn(
        "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-border bg-card text-foreground transition-colors hover:border-primary/40",
        className,
      )}
    >
      {theme === "dark" ? <Sun size={18} strokeWidth={1.7} /> : <Moon size={18} strokeWidth={1.7} />}
    </button>
  );
}
