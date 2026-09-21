import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button, PageDots } from "@/components/kit";
import { ONBOARDING } from "@/lib/mock-data";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/onboarding")({
  head: () => ({ meta: [{ title: "Welcome — Wellness & Healing SF" }] }),
  component: OnboardingScreen,
});

function OnboardingScreen() {
  const [step, setStep] = useState(0);
  const [touchX, setTouchX] = useState<number | null>(null);
  const navigate = useNavigate();
  const { markOnboarded } = useApp();
  const slide = ONBOARDING[step];
  const last = step === ONBOARDING.length - 1;

  function finish() {
    markOnboarded();
    navigate({ to: "/login" });
  }

  return (
    <div
      className="relative min-h-dvh overflow-hidden bg-background no-scrollbar"
      onTouchStart={(e) => setTouchX(e.changedTouches[0]?.clientX ?? null)}
      onTouchEnd={(e) => {
        if (touchX == null) return;
        const dx = e.changedTouches[0].clientX - touchX;
        if (dx < -40 && step < ONBOARDING.length - 1) setStep((s) => s + 1);
        if (dx > 40 && step > 0) setStep((s) => s - 1);
        setTouchX(null);
      }}
    >
      <img src={slide.image} alt={slide.alt} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/35 to-background" />

      <div className="absolute right-5 top-[max(1.25rem,env(safe-area-inset-top))] z-10 flex items-center gap-2">
        <ThemeToggle />
        <button
          type="button"
          onClick={finish}
          className="inline-flex min-h-12 items-center rounded-full border border-border bg-card/80 px-4 text-[12px] uppercase tracking-[0.16em] text-foreground backdrop-blur-md"
        >
          Skip
        </button>
      </div>

      <div className="relative z-10 flex min-h-dvh flex-col justify-end px-5 pb-[max(1.75rem,env(safe-area-inset-bottom))]">
        <div key={step} className="animate-fade-up">
          <h1 className="font-display text-[2rem] leading-tight text-foreground">{slide.heading}</h1>
          <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-muted-foreground">{slide.subtext}</p>
        </div>

        <PageDots count={ONBOARDING.length} index={step} onChange={setStep} label="Go to slide" />

        <Button className="mt-6" full onClick={() => (last ? finish() : setStep((s) => s + 1))}>
          {last ? "Get Started" : "Next"}
        </Button>
      </div>
    </div>
  );
}
