import { createFileRoute } from "@tanstack/react-router";
import { LinkButton, SuccessState } from "@/components/kit";
import { planById } from "@/lib/mock-data";
import { useApp } from "@/lib/store";

type Search = { plan?: string; changed?: boolean };

export const Route = createFileRoute("/plans/confirmation")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    plan: typeof search.plan === "string" ? search.plan : "Growth",
    changed: search.changed === true || search.changed === "true" || search.changed === "1",
  }),
  head: () => ({ meta: [{ title: "Welcome — Wellness & Healing SF" }] }),
  component: PlanConfirmationScreen,
});

function PlanConfirmationScreen() {
  const { plan: planId, changed } = Route.useSearch();
  const { sessions } = useApp();
  const plan = planById(planId ?? "") ?? { name: "your plan" };
  const hasSessions = sessions.some((s) => s.status === "past" || s.status === "upcoming");

  return (
    <div className="min-h-dvh bg-background px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(2rem,env(safe-area-inset-top))]">
      <SuccessState
        heading={changed ? `You’re on ${plan.name}` : `Welcome to ${plan.name}`}
        subtext={
          changed
            ? "Your plan is updated. Included 1:1 sessions stay covered — usage from this month is kept."
            : "Your plan is active. Book a session whenever the time feels right — included 1:1 sessions are covered."
        }
      >
        <LinkButton to="/book" full>
          {changed || hasSessions ? "Book a Session" : "Book Your First Session"}
        </LinkButton>
        <LinkButton to="/home" variant="ghost" full className="mt-2">
          Back to Home
        </LinkButton>
      </SuccessState>
    </div>
  );
}
