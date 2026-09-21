import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button, FadeIn, Field, Header, SaveLater, Screen, Textarea } from "@/components/kit";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/book/notes")({
  head: () => ({ meta: [{ title: "Session Details — Wellness & Healing SF" }] }),
  component: NotesScreen,
});

function NotesScreen() {
  const { draft, setDraft, sessions, pushToast } = useApp();
  const navigate = useNavigate();
  const hasPast = sessions.some((s) => s.status === "past" || s.status === "upcoming");
  const first = draft.firstSession ?? !hasPast;

  return (
    <Screen className="pt-0">
      <Header title="Tell Us a Bit More" subtitle="This helps Jackie prepare for your session" fallbackTo="/book/time" />
      <FadeIn>
        <Field label="What would you like to focus on?" hint="Optional">
          <Textarea
            value={draft.notes ?? ""}
            onChange={(e) => setDraft({ notes: e.target.value })}
            placeholder="Share as much or as little as you like."
          />
        </Field>

        <button
          type="button"
          onClick={() => setDraft({ firstSession: !first })}
          className="flex min-h-12 w-full items-center justify-between border border-border bg-card px-4"
        >
          <span className="text-sm">This is my first session</span>
          <span className={`h-5 w-9 p-0.5 transition-colors ${first ? "bg-primary" : "bg-muted"}`}>
            <span className={`block h-4 w-4 bg-cream transition-transform ${first ? "translate-x-4" : ""}`} />
          </span>
        </button>

        {first && (
          <p className="mt-3 border border-border bg-card px-4 py-3 text-sm leading-relaxed text-muted-foreground">
            First sessions run 15 minutes longer at no extra cost.
          </p>
        )}

        <Button
          className="mt-8"
          full
          onClick={() => {
            setDraft({ firstSession: first });
            navigate({ to: "/book/review" });
          }}
        >
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
