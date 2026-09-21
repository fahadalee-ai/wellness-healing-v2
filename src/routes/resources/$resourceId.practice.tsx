import { createFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button, Header, LinkButton, ProgressBar, Screen, SuccessState } from "@/components/kit";
import { resourceById } from "@/lib/resources";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/resources/$resourceId/practice")({
  head: ({ params }) => ({
    meta: [{ title: `${resourceById(params.resourceId)?.title ?? "Practice"} — Wellness & Healing SF` }],
  }),
  component: PracticeScreen,
});

function PracticeScreen() {
  const { resourceId } = Route.useParams();
  const navigate = useNavigate();
  const { completePractice } = useApp();
  const resource = resourceById(resourceId);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  if (!resource?.steps?.length) {
    return <Navigate to="/resources/$resourceId" params={{ resourceId }} />;
  }

  const steps = resource.steps;
  const current = steps[step];
  const last = step === steps.length - 1;

  if (done) {
    return (
      <Screen className="pt-0">
        <Header title={resource.title} fallbackTo="/resources" />
        <SuccessState
          heading="That’s enough for now"
          subtext="You can leave this here. The practice will keep if you want it again later."
        >
          <LinkButton to="/resources/$resourceId" params={{ resourceId: resource.id }} full>
            Back to the note
          </LinkButton>
          <LinkButton
            to="/messages/$threadId"
            params={{ threadId: "jackie" }}
            search={{ prompt: `I just finished “${resource.title}.”` }}
            variant="soft"
            full
            className="mt-2"
          >
            Tell Jackie
          </LinkButton>
        </SuccessState>
      </Screen>
    );
  }

  return (
    <Screen className="pt-0">
      <Header title={resource.title} subtitle={`${step + 1} of ${steps.length}`} fallbackTo="/resources" />
      <ProgressBar value={step + 1} max={steps.length} />
      <p className="mt-8 text-[11px] uppercase tracking-[0.16em] text-primary">
        Step {String(step + 1).padStart(2, "0")}
      </p>
      <h2 className="mt-2 font-display text-3xl">{current.title}</h2>
      <p className="mt-4 text-sm leading-relaxed text-cream/90">{current.body}</p>
      <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
        You can stop at any step. Nothing here has to be finished.
      </p>
      <div className="mt-10 space-y-2">
        <Button
          full
          onClick={() => {
            if (last) {
              completePractice(resource.id);
              setDone(true);
              return;
            }
            setStep((n) => n + 1);
          }}
        >
          {last ? "Close the practice" : "Next"}
        </Button>
        {step > 0 && (
          <Button variant="soft" full onClick={() => setStep((n) => n - 1)}>
            Back
          </Button>
        )}
        <Button variant="ghost" full onClick={() => navigate({ to: "/resources/$resourceId", params: { resourceId } })}>
          Leave for now
        </Button>
      </div>
    </Screen>
  );
}
