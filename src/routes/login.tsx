import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AuthInput, AuthShell, PasswordField, SocialAuth } from "@/components/AuthShell";
import { Button, Field } from "@/components/kit";
import { PHOTOS } from "@/lib/images";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Log In — Wellness & Healing SF" }] }),
  component: LoginScreen,
});

function LoginScreen() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function enter(nextEmail = email, nextPassword = password) {
    const result = login(nextEmail, nextPassword);
    navigate({ to: result.intakeComplete ? "/home" : "/intake" });
  }

  return (
    <AuthShell
      title="Welcome Back"
      subtitle="Log in to continue your journey"
      background={PHOTOS.windowPortrait}
      logoClassName="h-36 w-36"
      fallbackTo="/onboarding"
    >
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          enter();
        }}
      >
        <Field label="Email">
          <AuthInput
            type="text"
            autoComplete="email"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>
        <PasswordField
          label="Password"
          autoComplete="current-password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="mb-6 flex justify-end">
          <Link to="/forgot-password" className="text-sm text-primary">
            Forgot Password?
          </Link>
        </div>
        <Button type="submit" full>
          Log In
        </Button>
        <p className="mt-3 text-center text-xs leading-relaxed text-cream/80">
          Demo — any details continue
        </p>
      </form>

      <SocialAuth
        onContinue={() => {
          enter("elena@wellnesshealingsf.com", "Healing1");
        }}
      />

      <p className="mt-8 text-center text-sm text-cream">Don’t have an account?</p>
      <Link
        to="/register"
        className="mt-2 inline-flex min-h-12 w-full items-center justify-center border border-white bg-[#141312]/70 px-4 text-[12px] font-medium uppercase tracking-[0.16em] text-white"
      >
        Sign Up
      </Link>
    </AuthShell>
  );
}
