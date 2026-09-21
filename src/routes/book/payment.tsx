import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { PaymentMethodList, SecureNote } from "@/components/PaymentFields";
import { Button, Card, FadeIn, Header, Screen } from "@/components/kit";
import { COACH, formatDate, formatTime, moneyExact, serviceById } from "@/lib/mock-data";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/book/payment")({
  head: () => ({ meta: [{ title: "Payment — Wellness & Healing SF" }] }),
  component: PaymentScreen,
});

function PaymentScreen() {
  const { draft, paymentMethods, bookSession } = useApp();
  const navigate = useNavigate();
  const [methodId, setMethodId] = useState(paymentMethods[0]?.id);
  const [open, setOpen] = useState(false);
  const [paying, setPaying] = useState(false);
  const service = draft.serviceId ? serviceById(draft.serviceId) : null;
  const duration = draft.firstSession ? (service?.durationMin ?? 50) + 15 : (service?.durationMin ?? 50);
  const promo = draft.promo?.toUpperCase() === "HEAL10";
  const price = service?.price ?? 0;
  const discount = promo ? price * 0.1 : 0;
  const tax = (price - discount) * 0.085;
  const total = price - discount + tax;

  function pay() {
    if (!service || !draft.date || !draft.time) return;
    const date = draft.date;
    const time = draft.time;
    setPaying(true);
    window.setTimeout(() => {
      bookSession({
        serviceId: service.id,
        focus: draft.focus,
        coachName: COACH.name,
        date,
        time,
        durationMin: duration,
        notes: draft.notes,
        firstSession: draft.firstSession,
        price: total,
        coveredByPlan: false,
      });
      navigate({ to: "/book/confirmation" });
    }, 700);
  }

  return (
    <Screen className="pt-0">
      <Header title="Payment Details" fallbackTo="/book/review" />
      <FadeIn>
        <PaymentMethodList selectedId={methodId} onSelect={setMethodId} />

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="mt-6 flex w-full items-center justify-between text-sm text-muted-foreground"
        >
          Order summary
          <ChevronDown size={16} className={open ? "rotate-180" : ""} />
        </button>
        {open && (
          <Card className="mt-3 text-sm">
            <div className="flex justify-between">
              <span>{service?.title}</span>
              <span>{moneyExact(price)}</span>
            </div>
            <p className="mt-2 text-muted-foreground">
              {draft.date ? formatDate(draft.date) : ""} {draft.time ? formatTime(draft.time) : ""}
            </p>
            <div className="mt-3 flex justify-between border-t border-border pt-2">
              <span>Total</span>
              <span>{moneyExact(total)}</span>
            </div>
          </Card>
        )}

        <Button className="mt-8" full disabled={!methodId || paying} onClick={pay}>
          {paying ? "Confirming…" : "Pay & Confirm Booking"}
        </Button>
        <SecureNote />
      </FadeIn>
    </Screen>
  );
}
