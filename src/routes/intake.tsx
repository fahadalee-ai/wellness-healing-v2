import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Button, FadeIn, MenuSelect, ProgressBar } from "@/components/kit";
import { BUSINESS, INTAKE_BACKGROUNDS, INTAKE_REASONS, INTAKE_REFERRALS, INTAKE_SUPPORT } from "@/lib/mock-data";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/intake")({
  head: () => ({ meta: [{ title: "A few questions — Wellness & Healing SF" }] }),
  component: IntakeScreen,
});

function IntakeScreen() {
  const { user, completeIntake, saveIntakeDraft } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [reason, setReason] = useState(user?.intake?.reason ?? "");
  const [background, setBackground] = useState(user?.intake?.background ?? "");
  const [support, setSupport] = useState<string[]>(user?.intake?.support ?? []);
  const [referral, setReferral] = useState(user?.intake?.referral ?? "");

  const total = 4;
  const optional = step === 1 || step === 3;
  const canContinue =
    (step === 0 && !!reason) ||
    step === 1 ||
    (step === 2 && support.length > 0) ||
    step === 3;

  function finish() {
    completeIntake({ reason, background, support, referral });
    navigate({ to: "/home" });
  }

  function next() {
    if (step < total - 1) {
      setStep((s) => s + 1);
      return;
    }
    finish();
  }

  return (
    <div className="min-h-dvh overflow-visible bg-background px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1.5rem,env(safe-area-inset-top))]">
      <div className="flex items-center gap-3">
        {step > 0 && (
          <button
            type="button"
            aria-label="Go back"
            onClick={() => setStep((s) => s - 1)}
            className="flex h-12 w-12 items-center justify-center border border-white text-white"
          >
            <ArrowLeft size={18} strokeWidth={1.75} />
          </button>
        )}
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          {step + 1} of {total}
        </p>
      </div>
      <div className="mt-3">
        <ProgressBar value={step + 1} max={total} />
      </div>

      <FadeIn key={step} className="mt-8">
        {step === 0 && (
          <Question title="What brings you here today?">
            <ChoiceList options={INTAKE_REASONS} value={reason} onChange={setReason} />
            {reason === "Personal/Trauma Healing" && (
              <p className="mt-4 text-sm leading-relaxed text-cream">
                This is coaching, not a crisis line. If you are in danger, call {BUSINESS.phone} or local
                emergency services.
              </p>
            )}
          </Question>
        )}
        {step === 1 && (
          <Question title="How would you describe your background?" optional>
            <ChoiceList options={INTAKE_BACKGROUNDS} value={background} onChange={setBackground} />
          </Question>
        )}
        {step === 2 && (
          <Question title="What kind of support are you looking for?">
            <ChoiceList
              options={INTAKE_SUPPORT}
              value={support}
              multiple
              onChange={(v) =>
                setSupport((curr) => (curr.includes(v) ? curr.filter((x) => x !== v) : [...curr, v]))
              }
            />
          </Question>
        )}
        {step === 3 && (
          <Question title="How did you hear about Wellness & Healing SF?" optional>
            <MenuSelect value={referral} options={INTAKE_REFERRALS} onChange={setReferral} />
          </Question>
        )}
      </FadeIn>

      <div className="mt-10">
        <Button full disabled={!canContinue} onClick={next}>
          {step === total - 1 ? "Continue to Home" : "Continue"}
        </Button>
        {optional && (
          <button
            type="button"
            onClick={next}
            className="mt-3 w-full py-3 text-center text-[12px] uppercase tracking-[0.14em] text-cream"
          >
            Skip
          </button>
        )}
        <button
          type="button"
          onClick={() => {
            saveIntakeDraft({ reason, background, support, referral });
            navigate({ to: "/home" });
          }}
          className="mt-1 min-h-12 w-full py-3 text-center text-[12px] uppercase tracking-[0.14em] text-muted-foreground"
        >
          Leave for later
        </button>
      </div>
    </div>
  );
}

function Question({
  title,
  optional,
  children,
}: {
  title: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      <h1 className="font-display text-[1.85rem] leading-tight text-foreground">{title}</h1>
      {optional && <p className="mt-2 text-sm text-cream">Optional — skip if you’d rather not say.</p>}
      <div className="mt-6">{children}</div>
    </>
  );
}

function ChoiceList({
  options,
  value,
  onChange,
  multiple,
}: {
  options: readonly string[];
  value: string | string[];
  onChange: (v: string) => void;
  multiple?: boolean;
}) {
  return (
    <div className="space-y-2">
      {options.map((opt) => {
        const selected = Array.isArray(value) ? value.includes(opt) : value === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={cn(
              "flex min-h-12 w-full items-center justify-between border px-4 py-3 text-left text-sm transition-colors duration-200",
              selected ? "border-primary bg-primary/10 text-foreground" : "border-border bg-card text-cream",
            )}
          >
            {opt}
            <span
              className={cn(
                "h-4 w-4 border",
                multiple ? "" : "rounded-full",
                selected ? "border-primary bg-primary" : "border-stone",
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
