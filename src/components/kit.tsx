import { Link, useCanGoBack, useRouter } from "@tanstack/react-router";
import { ArrowLeft, ChevronDown, ChevronRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { canJoinZoom } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function Screen({
  children,
  className,
  padded = true,
  tabPad,
}: {
  children: ReactNode;
  className?: string;
  padded?: boolean;
  tabPad?: boolean;
}) {
  return (
    <div
      className={cn(
        "min-h-dvh bg-background text-foreground",
        padded && "px-5 py-5",
        tabPad && "pb-[calc(5.5rem+env(safe-area-inset-bottom))]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function FadeIn({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("animate-fade-up", className)}>{children}</div>;
}

export function Header({
  title,
  subtitle,
  back = true,
  right,
  fallbackTo = "/home",
}: {
  title: string;
  subtitle?: string;
  back?: boolean;
  right?: ReactNode;
  fallbackTo?: string;
}) {
  const router = useRouter();
  const canGoBack = useCanGoBack();
  return (
    <header className="sticky top-0 z-30 -mx-5 mb-5 bg-background/95 px-5 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3">
      <div className="flex items-center gap-3">
        {back && (
          <button
            type="button"
            aria-label="Go back"
            onClick={() => (canGoBack ? router.history.back() : router.navigate({ to: fallbackTo as "/" }))}
            className="flex h-12 w-12 items-center justify-center border border-border text-foreground transition-colors hover:bg-muted"
          >
            <ArrowLeft size={18} strokeWidth={1.75} />
          </button>
        )}
        <div className="min-w-0 flex-1">
          <h1 className="truncate font-display text-[1.65rem] font-medium tracking-tight">{title}</h1>
          {subtitle && <p className="mt-0.5 truncate text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        {right}
      </div>
    </header>
  );
}

export function Button({
  children,
  variant = "primary",
  full,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "ghost" | "danger" | "soft";
  full?: boolean;
}) {
  const styles = {
    primary: "bg-primary text-primary-foreground hover:bg-primary-dark",
    outline: "border border-primary bg-transparent text-primary hover:bg-primary/10",
    ghost: "bg-transparent text-cream hover:bg-muted",
    danger: "bg-transparent text-danger hover:bg-danger/10",
    soft: "border border-border bg-card text-foreground hover:bg-muted",
  }[variant];
  return (
    <button
      {...props}
      aria-disabled={props.disabled || undefined}
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-none px-4 py-3 text-[12px] font-medium uppercase tracking-[0.16em] transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-40",
        styles,
        full && "w-full",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  to,
  params,
  search,
  children,
  variant = "primary",
  full,
  className,
}: {
  to: string;
  params?: Record<string, string>;
  search?: Record<string, string | undefined>;
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost" | "soft";
  full?: boolean;
  className?: string;
}) {
  const styles = {
    primary: "bg-primary text-primary-foreground hover:bg-primary-dark",
    outline: "border border-primary bg-transparent text-primary hover:bg-primary/10",
    ghost: "bg-transparent text-cream hover:bg-muted",
    soft: "border border-border bg-card text-foreground hover:bg-muted",
  }[variant];
  return (
    <Link
      to={to as "/"}
      params={params}
      search={search}
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-none px-4 py-3 text-center text-[12px] font-medium uppercase tracking-[0.16em] transition-colors duration-200",
        styles,
        full && "w-full",
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function Card({
  children,
  className,
  onClick,
  selected,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  selected?: boolean;
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-[4px] border bg-card p-4",
        selected ? "border-primary" : "border-border",
        onClick && "cursor-pointer transition-colors duration-200 hover:border-primary/50",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SectionTitle({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="mb-3 mt-8 flex items-end justify-between first:mt-0">
      <h2 className="font-display text-xl font-medium tracking-tight text-foreground">{children}</h2>
      {action}
    </div>
  );
}

export function Field({
  label,
  error,
  children,
  hint,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="mb-4 block">
      <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </span>
      {children}
      {hint && !error && <span className="mt-1.5 block text-xs text-muted-foreground">{hint}</span>}
      {error && <span className="mt-1.5 block text-xs text-warning">{error}</span>}
    </label>
  );
}

export const inputClass =
  "w-full min-h-12 rounded-none border border-border bg-card px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(inputClass, props.className)} />;
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn(inputClass, "min-h-32", props.className)} />;
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={cn(inputClass, props.className)} />;
}

export function MenuSelect({
  value,
  options,
  onChange,
  placeholder = "Select one",
}: {
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div ref={rootRef} className="relative z-20 w-full">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(inputClass, "flex items-center justify-between text-left")}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className={value ? "text-foreground" : "text-muted-foreground"}>{value || placeholder}</span>
        <ChevronDown size={16} className={cn("shrink-0 text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute left-0 right-0 top-full z-30 mt-1 max-h-56 overflow-y-auto border border-border bg-card no-scrollbar"
        >
          {options.map((opt) => (
            <li key={opt}>
              <button
                type="button"
                role="option"
                aria-selected={value === opt}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={cn(
                  "flex min-h-12 w-full items-center px-4 text-left text-sm",
                  value === opt ? "bg-primary/15 text-foreground" : "text-cream hover:bg-muted",
                )}
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function Row({
  icon,
  label,
  value,
  to,
  params,
  onClick,
}: {
  icon?: ReactNode;
  label: string;
  value?: ReactNode;
  to?: string;
  params?: Record<string, string>;
  onClick?: () => void;
}) {
  const inner = (
    <>
      {icon && <span className="text-primary">{icon}</span>}
      <span className="flex-1 text-sm font-medium text-foreground">{label}</span>
      {value && <span className="text-xs text-muted-foreground">{value}</span>}
      <ChevronRight size={16} className="text-muted-foreground" />
    </>
  );
  const cls =
    "flex w-full min-h-12 items-center gap-3 border-b border-border bg-transparent px-1 py-4 text-left transition-colors hover:bg-muted/40";
  return to ? (
    <Link to={to as "/"} params={params} className={cls}>
      {inner}
    </Link>
  ) : (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

export function BottomSheet({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/70" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[480px] border-t border-border bg-card p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-2xl text-foreground">{title}</h3>
          <button
            ref={closeRef}
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="flex h-12 w-12 items-center justify-center text-muted-foreground"
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function PageDots({
  count,
  index,
  onChange,
  label,
}: {
  count: number;
  index: number;
  onChange: (i: number) => void;
  label: string;
}) {
  return (
    <div className="flex justify-center gap-0.5">
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`${label} ${i + 1}`}
          aria-current={i === index}
          onClick={() => onChange(i)}
          className="flex h-11 w-11 items-center justify-center"
        >
          <span className={cn("block h-1.5 transition-all duration-300", i === index ? "w-5 bg-primary" : "w-1.5 bg-cream/40")} />
        </button>
      ))}
    </div>
  );
}

export function JoinZoomButton({
  date,
  time,
  durationMin,
  href,
  className,
}: {
  date: string;
  time: string;
  durationMin: number;
  href: string;
  className?: string;
}) {
  const open = canJoinZoom(date, time, durationMin);
  const cls = cn(
    "inline-flex min-h-12 items-center justify-center text-[12px] font-medium uppercase tracking-[0.16em]",
    open ? "bg-primary text-primary-foreground" : "cursor-not-allowed bg-muted text-muted-foreground",
    className,
  );
  if (open) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls}>
        Join Zoom
      </a>
    );
  }
  return (
    <button type="button" disabled aria-disabled="true" className={cls}>
      Join Zoom
    </button>
  );
}

export function Empty({ title, body, action }: { title: string; body?: string; action?: ReactNode }) {
  return (
    <div className="rounded-[4px] border border-dashed border-border bg-card px-6 py-10 text-center">
      <h3 className="font-display text-xl text-foreground">{title}</h3>
      {body && <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">{body}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs text-cream">
      <span className="inline-flex">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            style={{ width: size, height: size }}
            className={cn("mr-0.5 inline-block", i < Math.round(rating) ? "bg-primary" : "bg-muted")}
          />
        ))}
      </span>
    </span>
  );
}

export function ProgressBar({ value, max = 100 }: { value: number; max?: number }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className="h-1.5 w-full bg-muted">
      <div className="h-full bg-primary transition-[width] duration-300" style={{ width: `${pct}%` }} />
    </div>
  );
}

export function SuccessState({
  heading,
  subtext,
  children,
}: {
  heading: string;
  subtext?: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex min-h-[70dvh] flex-col items-center justify-center px-2 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 12.5 9.5 17 19 7" stroke="#F5F3EF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h1 className="mt-6 font-display text-3xl text-foreground">{heading}</h1>
      {subtext && <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">{subtext}</p>}
      {children && <div className="mt-8 w-full">{children}</div>}
    </div>
  );
}

export function SaveLater({ onSave }: { onSave: () => void }) {
  return (
    <button
      type="button"
      onClick={onSave}
      className="mt-3 w-full py-3 text-center text-[12px] uppercase tracking-[0.14em] text-muted-foreground"
    >
      Save for later
    </button>
  );
}
