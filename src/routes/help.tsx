import { createFileRoute } from "@tanstack/react-router";
import { Card, Header, Screen } from "@/components/kit";
import { BUSINESS } from "@/lib/mock-data";

export const Route = createFileRoute("/help")({
  head: () => ({ meta: [{ title: "Help — Wellness & Healing SF" }] }),
  component: HelpScreen,
});

const FAQS = [
  {
    q: "Are sessions in person?",
    a: "All sessions are held securely over Zoom. You can join from wherever you feel most settled.",
  },
  {
    q: "How do cancellations work?",
    a: "Sessions cancelled less than 24 hours in advance are non-refundable. You’re always welcome to reschedule when you can.",
  },
  {
    q: "Is this a crisis service?",
    a: "No. For urgent matters, please call the number below or local emergency services. This space is for coaching, not crisis care.",
  },
];

function HelpScreen() {
  return (
    <Screen tabPad className="pt-0">
      <Header title="Help & Support" fallbackTo="/profile" />
      <Card>
        <p className="font-display text-xl">{BUSINESS.name}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {BUSINESS.address}
          <br />
          All sessions via Zoom
        </p>
        <a href={BUSINESS.phoneHref} className="mt-4 block text-primary">
          {BUSINESS.phone}
        </a>
      </Card>
      <div className="mt-6 space-y-3">
        {FAQS.map((item) => (
          <Card key={item.q}>
            <p className="text-sm font-medium">{item.q}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
          </Card>
        ))}
      </div>
    </Screen>
  );
}
