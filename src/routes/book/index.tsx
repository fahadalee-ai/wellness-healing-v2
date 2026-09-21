import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button, Card, FadeIn, Header, SaveLater, Screen } from "@/components/kit";
import { coverageLabel } from "@/lib/booking";
import { SERVICES } from "@/lib/mock-data";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/book/")({
  head: () => ({ meta: [{ title: "Choose Support — Wellness & Healing SF" }] }),
  component: ServiceSelectScreen,
});

function ServiceSelectScreen() {
  const { draft, setDraft, subscription, pushToast } = useApp();
  const navigate = useNavigate();
  const selected = draft.serviceId;

  return (
    <Screen tabPad className="pt-0">
      <Header title="Choose the Support That Fits You" back={false} />
      <FadeIn>
        <div className="space-y-3">
          {SERVICES.map((service) => {
            return (
              <Card
                key={service.id}
                selected={selected === service.id}
                onClick={() => setDraft({ serviceId: service.id, durationMin: service.durationMin })}
              >
                <p className="font-display text-xl">{service.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{service.blurb}</p>
                <p className="mt-3 text-sm text-primary">{coverageLabel(subscription, service.id, service.price)}</p>
              </Card>
            );
          })}
        </div>
        <Button
          className="mt-8"
          full
          disabled={!selected}
          onClick={() => {
            if (selected === "one-on-one") navigate({ to: "/book/focus" });
            else navigate({ to: "/book/date" });
          }}
        >
          Continue
        </Button>
        <SaveLater
          onSave={() => {
            pushToast("Saved for later");
            navigate({ to: "/home" });
          }}
        />
      </FadeIn>
    </Screen>
  );
}
