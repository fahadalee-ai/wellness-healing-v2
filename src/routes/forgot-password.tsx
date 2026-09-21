import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { useState } from "react";
import { AuthInput, AuthShell } from "@/components/AuthShell";
import { Button, Field, LinkButton } from "@/components/kit";
import { PHOTOS } from "@/lib/images";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Reset Password — Wellness & Healing SF" }] }),
  component: ForgotPasswordScreen,
});

function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  if (sent) {
    return (
      <AuthShell
        title="Check your inbox"
        subtitle="A reset link is on its way if this email is on file."
        showLogo={false}
        background={PHOTOS.duskLandscape}
      >
        <div className="flex flex-col items-center py-6 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-primary">
            <Mail size={26} strokeWidth={1.5} />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Sent to <span className="text-foreground">{email}</span>. It may take a minute to arrive.
          </p>
        </div>
        <LinkButton to="/login" full>
          Back to Log In
        </LinkButton>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Reset Your Password"
      subtitle="Enter your email and we’ll send you a reset link"
      showLogo={false}
      background={PHOTOS.duskLandscape}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!email.includes("@")) {
            setError("Enter a valid email.");
            return;
          }
          setSent(true);
        }}
      >
        <Field label="Email" error={error}>
          <AuthInput
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            placeholder="you@email.com"
          />
        </Field>
        <Button type="submit" full>
          Send Reset Link
        </Button>
      </form>
    </AuthShell>
  );
}
