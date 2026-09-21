import { createFileRoute } from "@tanstack/react-router";
import { Header, Screen } from "@/components/kit";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms of Service — Wellness & Healing SF" }] }),
  component: TermsScreen,
});

function TermsScreen() {
  return (
    <Screen tabPad className="pt-0">
      <Header title="Terms of Service" fallbackTo="/register" />
      <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          Wellness & Healing SF offers coaching — not therapy, medical care, or crisis services. Sessions are held over Zoom
          and are intended as supportive conversation and practical guidance.
        </p>
        <p>
          Subscriptions renew until you pause or cancel. You can change or end a plan at any time from My Subscription.
          Sessions cancelled with less than 24 hours’ notice are non-refundable.
        </p>
        <p>
          By creating an account you agree to keep your login private and to use this space respectfully.
        </p>
      </div>
    </Screen>
  );
}
