import { createFileRoute } from "@tanstack/react-router";
import { Header, Screen } from "@/components/kit";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy Policy — Wellness & Healing SF" }] }),
  component: PrivacyScreen,
});

function PrivacyScreen() {
  return (
    <Screen tabPad className="pt-0">
      <Header title="Privacy Policy" fallbackTo="/profile" />
      <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          Your presence here is private. We collect only what we need to schedule sessions, send Zoom links, and keep your
          account in order — name, email, phone, and the notes you choose to share.
        </p>
        <p>
          Session notes and intake answers stay between you and Jackie. We do not sell personal information, and we do not
          use it for advertising.
        </p>
        <p>
          Payments are processed through encrypted providers. Card numbers are not stored in full on our systems.
        </p>
        <p>
          You may request a copy of your data or ask that it be deleted by writing to us or calling (505) 670-7419.
        </p>
      </div>
    </Screen>
  );
}
