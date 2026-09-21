import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PaymentMethodList, SecureNote } from "@/components/PaymentFields";
import { Button, Card, FadeIn, Header, Screen } from "@/components/kit";
import { money, planById } from "@/lib/mock-data";
import { useApp } from "@/lib/store";

type Search = { plan?: string; cycle?: "monthly" | "quarterly" };

export const Route = createFileRoute("/plans/checkout")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    plan: typeof search.plan === "string" ? search.plan : "growth",
    cycle: search.cycle === "quarterly" ? "quarterly" : "monthly",
  }),
  head: () => ({ meta: [{ title: "Confirm Plan — Wellness & Healing SF" }] }),
  component: PlanCheckoutScreen,
});

function PlanCheckoutScreen() {
  const { plan: planId, cycle } = Route.useSearch();
  const plan = planById(planId ?? "growth") ?? planById("growth")!;
  const { paymentMethods, startSubscription, changePlan, subscription } = useApp();
  const navigate = useNavigate();
  const [methodId, setMethodId] = useState(paymentMethods[0]?.id);
  const [agreed, setAgreed] = useState(false);
  const price = cycle === "quarterly" ? plan.quarterlyPrice : plan.monthlyPrice;
  const existing = !!subscription && subscription.status !== "cancelled";

  return (
    <Screen className="pt-0">
      <Header title="Confirm Your Plan" fallbackTo="/plans" />
      <FadeIn>
        <Card>
          <p className="font-display text-2xl">{plan.name}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {money(price)} / {cycle === "quarterly" ? "quarter" : "month"} · {plan.sessionsPerMonth} sessions each month
          </p>
          <ul className="mt-4 space-y-1 text-sm text-cream/90">
            {plan.features.map((f) => (
              <li key={f}>· {f}</li>
            ))}
          </ul>
        </Card>

        <p className="mb-3 mt-6 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Payment method</p>
        <PaymentMethodList selectedId={methodId} onSelect={setMethodId} />

        <label className="mt-6 flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 h-4 w-4 accent-primary"
          />
          I understand this is a recurring subscription and can be cancelled anytime
        </label>

        <Button
          className="mt-8"
          full
          disabled={!agreed || !methodId}
          onClick={() => {
            if (existing) changePlan(plan.id, cycle ?? "monthly");
            else startSubscription(plan.id, cycle ?? "monthly");
            navigate({ to: "/plans/confirmation", search: { plan: plan.id, changed: existing } });
          }}
        >
          {existing ? "Confirm Plan Change" : "Start Subscription"}
        </Button>
        <SecureNote />
      </FadeIn>
    </Screen>
  );
}
