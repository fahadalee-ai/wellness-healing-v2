import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button, Card, FadeIn, Header, SaveLater, Screen } from "@/components/kit";
import { COACH, FOCUS_OPTIONS } from "@/lib/mock-data";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/book/focus")({
  head: () => ({ meta: [{ title: "Session Focus — Wellness & Healing SF" }] }),
  component: FocusScreen,
});

function FocusScreen() {
  const { draft, setDraft, pushToast } = useApp();
  const navigate = useNavigate();

  return (
    <Screen className="pt-0">
      <Header title="Select Your Session Focus" fallbackTo="/book" />
      <FadeIn>
        <div className="space-y-3">
          {FOCUS_OPTIONS.map((opt) => (
            <Card
              key={opt.id}
              selected={draft.focus === opt.title}
              onClick={() => setDraft({ focus: opt.title })}
            >
              <p className="font-medium">{opt.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{opt.blurb}</p>
            </Card>
          ))}
        </div>

        <Card className="mt-6 flex gap-4">
          <img src={COACH.photo} alt={COACH.name} className="h-20 w-20 object-cover" />
          <div>
            <p className="font-display text-xl">{COACH.name}</p>
            <p className="mt-1 text-xs text-muted-foreground">{COACH.credentials}</p>
            <p className="mt-2 text-sm leading-relaxed text-cream/90">{COACH.bio}</p>
          </div>
        </Card>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          {COACH.stats.map((stat) => (
            <div key={stat.label} className="border border-border bg-card px-2 py-3">
              <p className="font-display text-lg text-primary">{stat.value}</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.1em] text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        <Button className="mt-8" full disabled={!draft.focus} onClick={() => navigate({ to: "/book/date" })}>
          Continue
        </Button>
        <SaveLater
          onSave={() => {
            pushToast("Saved for later");
            navigate({ to: "/home" });
          }}
        />
      </FadeIn>
    </Screen>
  );
}
