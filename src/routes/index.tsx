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
  const { hydrated, user, logout } = useApp();
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
    if (user) logout();
    navigate({ to: "/onboarding" });
    return undefined;
  }, [ready, hydrated, user, logout, navigate]);

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
      <div className="absolute inset-0 bg-gradient-to-b from-background/15 via-background/30 to-background/75" />
      <div className="relative z-10 flex flex-col items-center">
        <div className="animate-splash-logo relative flex h-80 w-80 items-center justify-center overflow-hidden rounded-full bg-card shadow-soft">
          <Logo
            variant="sage"
            knockOut={false}
            className="h-[88%] w-[88%] object-contain"
          />
        </div>
        <Wordmark className="animate-splash-wordmark mt-5 text-[15px] font-semibold tracking-[0.16em] text-foreground" />
        {ready && !hydrated && (
          <p className="mt-6 text-[12px] uppercase tracking-[0.16em] text-muted-foreground">Opening your space…</p>
        )}
      </div>
    </button>
  );
}
