import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { TimeSlotPicker } from "@/components/booking";
import { Button, FadeIn, Header, SaveLater, Screen } from "@/components/kit";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/book/time")({
  head: () => ({ meta: [{ title: "Choose a Time — Wellness & Healing SF" }] }),
  component: TimeScreen,
});

function TimeScreen() {
  const { draft, setDraft, pushToast } = useApp();
  const navigate = useNavigate();
  const duration = draft.firstSession ? (draft.durationMin ?? 50) + 15 : (draft.durationMin ?? 50);

  return (
    <Screen className="pt-0">
      <Header title="Choose a Time" fallbackTo="/book/date" />
      <FadeIn>
        {draft.date ? (
          <TimeSlotPicker
            date={draft.date}
            value={draft.time}
            durationMin={duration}
            onChange={(time) => setDraft({ time })}
          />
        ) : (
          <p className="text-sm text-muted-foreground">Choose a date first.</p>
        )}
        <Button className="mt-8" full disabled={!draft.time} onClick={() => navigate({ to: "/book/notes" })}>
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
