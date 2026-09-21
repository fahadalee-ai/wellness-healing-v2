import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Logo, Wordmark } from "@/components/Logo";
import { PHOTOS } from "@/lib/images";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [{ title: "Wellness & Healing SF" }],
  }),
  component: SplashScreen,
});

function SplashScreen() {
  const navigate = useNavigate();
  const { hydrated, user, onboarded } = useApp();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 2000);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!ready) return undefined;
    if (!hydrated) {
      const fallback = window.setTimeout(() => navigate({ to: "/onboarding" }), 600);
      return () => window.clearTimeout(fallback);
    }
    if (user) {
      navigate({ to: user.intakeComplete ? "/home" : "/intake" });
      return undefined;
    }
    if (onboarded) {
      navigate({ to: "/login" });
      return undefined;
    }
    navigate({ to: "/onboarding" });
    return undefined;
  }, [ready, hydrated, user, onboarded, navigate]);

  function advance() {
    setReady(true);
  }

  return (
    <button
      type="button"
      onClick={advance}
      className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden bg-background px-6"
    >
      <img
        src={PHOTOS.splash}
        alt="Sunroom window with plants and warm daylight"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[#141312]/72" />
      <div className="relative z-10 animate-splash flex flex-col items-center">
        <Logo className="h-64 w-64" />
        <Wordmark className="mt-3" />
        {ready && !hydrated && (
          <p className="mt-6 text-[12px] uppercase tracking-[0.16em] text-cream/80">Opening your space…</p>
        )}
      </div>
    </button>
  );
}
