import { useState } from "react";
import { Button, Field, Input } from "@/components/kit";
import { type PaymentMethod } from "@/lib/mock-data";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

export function PaymentMethodList({
  selectedId,
  onSelect,
  allowRemove,
}: {
  selectedId?: string;
  onSelect: (id: string) => void;
  allowRemove?: boolean;
}) {
  const { paymentMethods, addPaymentMethod, removePaymentMethod } = useApp();
  const [adding, setAdding] = useState(false);
  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [zip, setZip] = useState("");

  return (
    <div>
      <div className="space-y-2">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={cn(
              "flex min-h-12 w-full items-center gap-2 border px-4 py-3",
              selectedId === method.id ? "border-primary bg-primary/10" : "border-border bg-card",
            )}
          >
            <button type="button" onClick={() => onSelect(method.id)} className="min-w-0 flex-1 text-left">
              <span className="block text-sm">
                {method.brand} ···· {method.last4}
              </span>
              <span className="text-xs text-muted-foreground">{method.expiry}</span>
            </button>
            {allowRemove && (
              <button
                type="button"
                onClick={() => removePaymentMethod(method.id)}
                className="min-h-12 shrink-0 px-2 text-[11px] uppercase tracking-[0.12em] text-muted-foreground"
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>

      {!adding ? (
        <button
          type="button"
          onClick={() => setAdding(true)}
          className="mt-3 w-full py-3 text-center text-[12px] uppercase tracking-[0.14em] text-primary"
        >
          Add New Card
        </button>
      ) : (
        <div className="mt-4 border border-border bg-card p-4">
          <Field label="Card Number">
            <Input value={card} onChange={(e) => setCard(e.target.value)} placeholder="ACCT-000015" inputMode="numeric" />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Expiry">
              <Input value={expiry} onChange={(e) => setExpiry(e.target.value)} placeholder="MM/YY" />
            </Field>
            <Field label="CVV">
              <Input value={cvv} onChange={(e) => setCvv(e.target.value)} placeholder="123" inputMode="numeric" />
            </Field>
          </div>
          <Field label="Billing Zip">
            <Input value={zip} onChange={(e) => setZip(e.target.value)} placeholder="94107" inputMode="numeric" />
          </Field>
          <Button
            full
            type="button"
            onClick={() => {
              const last4 = card.replace(/\D/g, "").slice(-4) || "0000";
              const method: Omit<PaymentMethod, "id"> = {
                brand: "Card",
                last4,
                expiry: expiry || "12/29",
              };
              addPaymentMethod(method);
              setAdding(false);
              setCard("");
              setExpiry("");
              setCvv("");
              setZip("");
            }}
          >
            Save Card
          </Button>
        </div>
      )}
    </div>
  );
}

export function SecureNote() {
  return (
    <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
      <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden>
        <rect x="1" y="6" width="10" height="7" stroke="currentColor" />
        <path d="M3 6V4a3 3 0 0 1 6 0v2" stroke="currentColor" />
      </svg>
      Secured & encrypted payment
    </p>
  );
}
