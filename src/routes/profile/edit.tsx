import { createFileRoute } from "@tanstack/react-router";
import { LanguagePicker, type LanguageId } from "@/components/LanguagePicker";
import { Button, Field, Header, Input, Screen } from "@/components/kit";
import { PasswordField } from "@/components/AuthShell";
import { useApp } from "@/lib/store";
import { useState } from "react";

export const Route = createFileRoute("/profile/edit")({
  head: () => ({ meta: [{ title: "Edit Profile — Wellness & Healing SF" }] }),
  component: EditProfileScreen,
});

function EditProfileScreen() {
  const { user, updateUser, togglePref, pushToast } = useApp();
  const [name, setName] = useState(user?.fullName ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [password, setPassword] = useState("");

  const prefs = [
    { key: "sessionReminders" as const, label: "Session reminders" },
    { key: "bookingUpdates" as const, label: "Booking updates" },
    { key: "messages" as const, label: "Messages" },
    { key: "resources" as const, label: "Resource notes" },
  ];

  return (
    <Screen tabPad className="pt-0">
      <Header title="Edit Profile" fallbackTo="/profile" />
      <Field label="Language">
        <LanguagePicker
          value={user?.language ?? "en"}
          onChange={(id: LanguageId) => updateUser({ language: id })}
        />
      </Field>
      <Field label="Name">
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </Field>
      <Field label="Email">
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </Field>
      <Field label="Phone">
        <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </Field>
      <PasswordField
        label="New password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Leave blank to keep current"
      />

      <h2 className="mb-3 mt-2 font-display text-xl">Notification preferences</h2>
      <div className="divide-y divide-border border border-border">
        {prefs.map((p) => (
          <button
            key={p.key}
            type="button"
            role="switch"
            aria-checked={!!user?.prefs[p.key]}
            onClick={() => togglePref(p.key)}
            className="flex min-h-12 w-full items-center justify-between px-4 py-3 text-left"
          >
            <span className="text-sm">{p.label}</span>
            <span className={`h-5 w-9 p-0.5 ${user?.prefs[p.key] ? "bg-primary" : "bg-muted"}`}>
              <span className={`block h-4 w-4 bg-cream transition-transform ${user?.prefs[p.key] ? "translate-x-4" : ""}`} />
            </span>
          </button>
        ))}
      </div>

      <Button
        className="mt-8"
        full
        onClick={() => {
          updateUser({
            fullName: name,
            email,
            phone,
            ...(password ? { password } : {}),
          });
          pushToast("Profile updated");
        }}
      >
        Save Changes
      </Button>
    </Screen>
  );
}
