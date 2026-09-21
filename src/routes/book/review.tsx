import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button, Card, FadeIn, Header, Input, Screen } from "@/components/kit";
import { remainingPlanSessions, sessionCoveredByPlan } from "@/lib/booking";
import { COACH, formatDateLong, formatTime, moneyExact, serviceById } from "@/lib/mock-data";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/book/review")({
  head: () => ({ meta: [{ title: "Review Session — Wellness & Healing SF" }] }),
  component: ReviewScreen,
});

function ReviewScreen() {
  const { draft, subscription, setDraft, bookSession } = useApp();
  const navigate = useNavigate();
  const service = draft.serviceId ? serviceById(draft.serviceId) : null;
  const covered = sessionCoveredByPlan(subscription, draft.serviceId);
  const duration = draft.firstSession ? (service?.durationMin ?? 50) + 15 : (service?.durationMin ?? 50);
  const [promoOpen, setPromoOpen] = useState(!!draft.promo);
  const promo = draft.promo?.toUpperCase() === "HEAL10";
  const price = service?.price ?? 0;
  const discount = promo && !covered ? price * 0.1 : 0;
  const tax = covered ? 0 : (price - discount) * 0.085;
  const total = covered ? 0 : price - discount + tax;

  function confirm() {
    if (!service || !draft.date || !draft.time) return;
    if (covered) {
      bookSession({
        serviceId: service.id,
        focus: draft.focus,
        coachName: COACH.name,
        date: draft.date,
        time: draft.time,
        durationMin: duration,
        notes: draft.notes,
        firstSession: draft.firstSession,
        price: 0,
        coveredByPlan: true,
      });
      navigate({ to: "/book/confirmation" });
      return;
    }
    navigate({ to: "/book/payment" });
  }

  return (
    <Screen className="pt-0">
      <Header title="Review Your Session" fallbackTo="/book/notes" />
      <FadeIn>
        <Card>
          <Row label="Session" value={service?.title ?? "—"} />
          <Row label="Coach" value={COACH.name} />
          <Row label="Date" value={draft.date ? formatDateLong(draft.date) : "—"} />
          <Row label="Time" value={draft.time ? formatTime(draft.time) : "—"} />
          <Row label="Duration" value={`${duration} min`} />
          {draft.firstSession && <Row label="First session" value="15 extra minutes, no extra cost" />}
          {draft.notes && <Row label="Notes" value={draft.notes} />}
          <Row label="Format" value="Zoom — link sent after confirmation" last />
        </Card>

        <Card className="mt-4">
          {covered && subscription ? (
            <p className="text-sm leading-relaxed text-cream">
              {draft.serviceId === "one-on-one"
                ? `Covered by ${subscription.planName} — ${subscription.sessionsUsed + 1} of ${subscription.sessionsIncluded} private sessions this month`
                : `Covered by ${subscription.planName} — group sessions are included. ${remainingPlanSessions(subscription)} private sessions remain.`}
            </p>
          ) : (
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Session</span>
                <span>{moneyExact(price)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-primary">
                  <span>Promo HEAL10</span>
                  <span>-{moneyExact(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Taxes / fees</span>
                <span>{moneyExact(tax)}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2 font-medium">
                <span>Total</span>
                <span>{moneyExact(total)}</span>
              </div>
            </div>
          )}
        </Card>

        <button
          type="button"
          onClick={() => setPromoOpen((o) => !o)}
          className="mt-4 text-[12px] uppercase tracking-[0.14em] text-primary"
        >
          {promoOpen ? "Hide promo code" : "Add promo code"}
        </button>
        {promoOpen && (
          <Input
            className="mt-3"
            placeholder="Promo code"
            value={draft.promo ?? ""}
            onChange={(e) => setDraft({ promo: e.target.value })}
          />
        )}
        {promoOpen && !!draft.promo && !promo && (
          <p className="mt-2 text-xs text-muted-foreground">That code isn’t active.</p>
        )}

        <Button className="mt-8" full onClick={confirm} disabled={!draft.date || !draft.time}>
          {covered ? "Confirm Session" : "Confirm & Pay"}
        </Button>
      </FadeIn>
    </Screen>
  );
}

function Row({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <div className={`flex justify-between gap-4 py-2 text-sm ${last ? "" : "border-b border-border"}`}>
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right text-foreground">{value}</span>
    </div>
  );
}
