import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  Navigate,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { AppProvider } from "../lib/store";
import { AppShell } from "../components/AppShell";
import { PhonePreview } from "../components/PhonePreview";
import { asset } from "../lib/utils";

function NotFoundComponent() {
  const pathname = useRouterState({ select: (s) => s.location.pathname }).toLowerCase();
  if (pathname.includes("preview")) {
    return <PhonePreview />;
  }
  if (pathname.includes("wellness-healing")) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-5">
      <div className="max-w-sm text-center">
        <h1 className="font-display text-5xl text-foreground">404</h1>
        <h2 className="mt-4 font-display text-xl text-foreground">This page isn’t here</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          The path you followed doesn’t exist. You’re welcome to return home.
        </p>
        <div className="mt-6">
          <Link
            to="/home"
            className="inline-flex min-h-12 w-full items-center justify-center bg-primary px-4 text-[12px] uppercase tracking-[0.16em] text-primary-foreground"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-5">
      <div className="max-w-sm text-center">
        <h1 className="font-display text-xl text-foreground">This page didn’t load</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Something went quietly wrong. You can try again or return home.
        </p>
        <div className="mt-6 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex min-h-12 items-center justify-center bg-primary px-4 text-[12px] uppercase tracking-[0.16em] text-primary-foreground"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex min-h-12 items-center justify-center border border-border px-4 text-[12px] uppercase tracking-[0.16em] text-foreground"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, viewport-fit=cover",
      },
      { title: "Wellness & Healing SF" },
      {
        name: "description",
        content:
          "Private wellness coaching for trauma survivors and film industry professionals — all sessions over Zoom.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#141312" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: asset("/favicon.svg"), type: "image/svg+xml" },
      { rel: "icon", href: asset("/favicon.ico"), sizes: "48x48" },
      { rel: "apple-touch-icon", href: asset("/apple-touch-icon.png") },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap",
      },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <AppShell>
          <Outlet />
        </AppShell>
      </AppProvider>
    </QueryClientProvider>
  );
}
