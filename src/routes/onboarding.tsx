import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
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
      <div className="absolute inset-0 bg-[#141312]/70" />

      <button
        type="button"
        onClick={finish}
        className="absolute right-5 top-[max(1.25rem,env(safe-area-inset-top))] z-10 inline-flex min-h-12 items-center border border-white bg-[#141312]/75 px-4 text-[12px] uppercase tracking-[0.16em] text-white"
      >
        Skip
      </button>

      <div className="relative z-10 flex min-h-dvh flex-col justify-end px-5 pb-[max(1.75rem,env(safe-area-inset-bottom))]">
        <div key={step} className="animate-fade-up">
          <h1 className="font-display text-[2rem] leading-tight text-cream">{slide.heading}</h1>
          <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-cream/80">{slide.subtext}</p>
        </div>

        <PageDots count={ONBOARDING.length} index={step} onChange={setStep} label="Go to slide" />

        <Button className="mt-6" full onClick={() => (last ? finish() : setStep((s) => s + 1))}>
          {last ? "Get Started" : "Next"}
        </Button>
      </div>
    </div>
  );
}
