import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Bell,
  BookOpen,
  CalendarDays,
  CreditCard,
  HelpCircle,
  LogOut,
  MessageCircle,
  ScrollText,
  Shield,
  Wallet,
} from "lucide-react";
import { Header, LinkButton, Row, Screen } from "@/components/kit";
import { BUSINESS, initials } from "@/lib/mock-data";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — Wellness & Healing SF" }] }),
  component: ProfileScreen,
});

function ProfileScreen() {
  const { user, logout } = useApp();
  const navigate = useNavigate();

  return (
    <Screen tabPad className="pt-0">
      <Header title="Profile" back={false} />
      <div className="flex items-center gap-4 border border-border bg-card p-4">
        <div className="flex h-16 w-16 items-center justify-center overflow-hidden bg-muted text-sm">
          {user?.avatar ? (
            <img src={user.avatar} alt="" className="h-full w-full object-cover" />
          ) : (
            initials(user?.fullName ?? "WH")
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-display text-2xl">{user?.fullName ?? "Guest"}</p>
          <p className="truncate text-sm text-muted-foreground">{user?.email ?? "Not signed in"}</p>
        </div>
      </div>
      <LinkButton to="/profile/edit" variant="outline" className="mt-3" full>
        Edit Profile
      </LinkButton>

      <div className="mt-6">
        <Row icon={<CalendarDays size={18} />} label="My Sessions" to="/sessions" />
        <Row icon={<CreditCard size={18} />} label="My Subscription" to="/subscription" />
        <Row icon={<Wallet size={18} />} label="Payment Methods" to="/payment-methods" />
        <Row icon={<Bell size={18} />} label="Notifications" to="/notifications" />
        <Row icon={<MessageCircle size={18} />} label="Messages" to="/messages" />
        <Row icon={<BookOpen size={18} />} label="Resources" to="/resources" />
        <Row icon={<HelpCircle size={18} />} label="Help & Support" to="/help" />
        <Row icon={<ScrollText size={18} />} label="Terms of Service" to="/terms" />
        <Row icon={<Shield size={18} />} label="Privacy Policy" to="/privacy" />
        <Row
          icon={<LogOut size={18} />}
          label="Log Out"
          onClick={() => {
            logout();
            navigate({ to: "/login" });
          }}
        />
      </div>

      <p className="mt-8 text-center text-xs leading-relaxed text-muted-foreground">
        {BUSINESS.name}
        <br />
        {BUSINESS.address}
        <br />
        {BUSINESS.phone} · Sessions via Zoom
      </p>
    </Screen>
  );
}
