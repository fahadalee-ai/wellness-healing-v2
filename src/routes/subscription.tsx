import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BottomSheet, Button, Card, Header, LinkButton, ProgressBar, Screen } from "@/components/kit";
import { formatDate, money } from "@/lib/mock-data";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/subscription")({
  head: () => ({ meta: [{ title: "My Subscription — Wellness & Healing SF" }] }),
  component: SubscriptionScreen,
});

function SubscriptionScreen() {
  const { subscription, invoices, pauseSubscription, resumeSubscription, cancelSubscription } = useApp();
  const [pauseOpen, setPauseOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);

  if (!subscription || subscription.status === "cancelled") {
    return (
      <Screen tabPad className="pt-0">
        <Header title="My Subscription" fallbackTo="/profile" />
        <p className="text-sm leading-relaxed text-muted-foreground">
          You don’t have an active plan. Ongoing support is available whenever it feels right.
        </p>
        <LinkButton to="/plans" className="mt-6" full>
          View Plans
        </LinkButton>
      </Screen>
    );
  }

  return (
    <Screen tabPad className="pt-0">
      <Header title="My Subscription" fallbackTo="/profile" />
      <Card>
        <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          {subscription.status === "paused" ? "Paused" : "Current plan"}
        </p>
        <p className="mt-1 font-display text-2xl">{subscription.planName}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          {money(subscription.price)} / {subscription.cycle} · renews {formatDate(subscription.renewalDate)}
        </p>
        <p className="mt-4 text-sm">
          {subscription.sessionsUsed} of {subscription.sessionsIncluded} sessions used
        </p>
        <div className="mt-2">
          <ProgressBar value={subscription.sessionsUsed} max={subscription.sessionsIncluded} />
        </div>
      </Card>

      <div className="mt-4 space-y-2">
        <LinkButton to="/plans" variant="outline" full>
          Upgrade Plan
        </LinkButton>
        <LinkButton to="/payment-methods" variant="soft" full>
          Change Payment Method
        </LinkButton>
        {subscription.status === "paused" ? (
          <Button full variant="outline" onClick={resumeSubscription}>
            Resume Subscription
          </Button>
        ) : (
          <Button full variant="soft" onClick={() => setPauseOpen(true)}>
            Pause Subscription
          </Button>
        )}
        <Button full variant="danger" onClick={() => setCancelOpen(true)}>
          Cancel Subscription
        </Button>
      </div>

      <h2 className="mb-3 mt-8 font-display text-xl">Billing history</h2>
      <div className="divide-y divide-border border border-border">
        {invoices.map((inv) => (
          <div key={inv.id} className="flex items-center justify-between px-4 py-4">
            <div>
              <p className="text-sm">{inv.label}</p>
              <p className="text-xs text-muted-foreground">{formatDate(inv.date)}</p>
            </div>
            <span className="text-sm">{money(inv.amount)}</span>
          </div>
        ))}
      </div>

      <BottomSheet open={pauseOpen} onClose={() => setPauseOpen(false)} title="Pause for a while?">
        <p className="text-sm leading-relaxed text-muted-foreground">
          You can pause now and return when the timing feels better. Your plan will wait.
        </p>
        <Button
          className="mt-5"
          full
          onClick={() => {
            pauseSubscription();
            setPauseOpen(false);
          }}
        >
          Pause Subscription
        </Button>
      </BottomSheet>

      <BottomSheet open={cancelOpen} onClose={() => setCancelOpen(false)} title="Before you go">
        <p className="text-sm leading-relaxed text-muted-foreground">
          We’d hate to see you go — would pausing work better? You can always cancel after that if you still need to.
        </p>
        <div className="mt-5 space-y-2">
          <Button
            full
            variant="outline"
            onClick={() => {
              pauseSubscription();
              setCancelOpen(false);
            }}
          >
            Pause Instead
          </Button>
          <Button
            full
            variant="danger"
            onClick={() => {
              cancelSubscription();
              setCancelOpen(false);
            }}
          >
            Cancel Subscription
          </Button>
        </div>
      </BottomSheet>
    </Screen>
  );
}
