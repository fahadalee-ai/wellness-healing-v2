import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useState } from "react";
import { Button, Card, FadeIn, Header, Screen } from "@/components/kit";
import { money, PLANS } from "@/lib/mock-data";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/plans/")({
  head: () => ({ meta: [{ title: "Choose Your Plan — Wellness & Healing SF" }] }),
  component: PlansScreen,
});

function PlansScreen() {
  const [cycle, setCycle] = useState<"monthly" | "quarterly">("monthly");
  const navigate = useNavigate();
  const { setDraft } = useApp();

  return (
    <Screen tabPad className="pt-0">
      <Header title="Choose Your Plan" subtitle="Ongoing support, priced for consistency" fallbackTo="/home" />
      <FadeIn>
        <div className="mb-6 grid grid-cols-2 border border-border">
          {(["monthly", "quarterly"] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCycle(c)}
              className={cn(
                "min-h-12 text-[11px] uppercase tracking-[0.14em]",
                cycle === c ? "bg-primary text-primary-foreground" : "text-muted-foreground",
              )}
            >
              {c === "monthly" ? "Monthly" : "Quarterly"}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {PLANS.map((plan) => {
            const price = cycle === "quarterly" ? plan.quarterlyPrice : plan.monthlyPrice;
            return (
              <Card key={plan.id} className="relative">
                {"popular" in plan && plan.popular && (
                  <span className="absolute right-3 top-3 bg-primary px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-primary-foreground">
                    Most Popular
                  </span>
                )}
                <p className="font-display text-2xl">{plan.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {plan.sessionsPerMonth} sessions / month
                </p>
                <p className="mt-3 font-display text-3xl text-primary">
                  {money(price)}
                  <span className="ml-1 text-sm text-muted-foreground">
                    / {cycle === "quarterly" ? "quarter" : "month"}
                  </span>
                </p>
                <ul className="mt-4 space-y-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2 text-sm text-cream/90">
                      <Check size={16} className="mt-0.5 shrink-0 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  className="mt-5"
                  full
                  onClick={() => {
                    setDraft({ promo: `${plan.id}:${cycle}` });
                    navigate({ to: "/plans/checkout", search: { plan: plan.id, cycle } });
                  }}
                >
                  Select Plan
                </Button>
              </Card>
            );
          })}
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">Cancel or change your plan anytime</p>
      </FadeIn>
    </Screen>
  );
}
