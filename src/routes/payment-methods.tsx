import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PaymentMethodList } from "@/components/PaymentFields";
import { Header, Screen } from "@/components/kit";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/payment-methods")({
  head: () => ({ meta: [{ title: "Payment Methods — Wellness & Healing SF" }] }),
  component: PaymentMethodsScreen,
});

function PaymentMethodsScreen() {
  const { paymentMethods } = useApp();
  const [selected, setSelected] = useState(paymentMethods[0]?.id);

  return (
    <Screen tabPad className="pt-0">
      <Header title="Payment Methods" fallbackTo="/profile" />
      <PaymentMethodList selectedId={selected} onSelect={setSelected} allowRemove />
    </Screen>
  );
}
