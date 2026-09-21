import { createFileRoute, Link } from "@tanstack/react-router";
import { Bookmark } from "lucide-react";
import { useState } from "react";
import { Card, Empty, Header, LinkButton, Screen } from "@/components/kit";
import { RESOURCE_CATEGORIES, resourcesByCategory } from "@/lib/resources";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/resources/")({
  head: () => ({ meta: [{ title: "Resources — Wellness & Healing SF" }] }),
  component: ResourcesScreen,
});

const FILTERS = ["All", ...RESOURCE_CATEGORIES, "Saved"] as const;

function ResourcesScreen() {
  const { savedResources } = useApp();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const items = resourcesByCategory(filter, savedResources);

  return (
    <Screen tabPad className="pt-0">
      <Header title="Resources" subtitle="Quiet tools for the days in between" fallbackTo="/home" />
      <div className="mb-5 flex gap-2 overflow-x-auto no-scrollbar">
        {FILTERS.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            className={cn(
              "shrink-0 border px-3 py-2 text-[11px] uppercase tracking-[0.14em]",
              filter === item
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground",
            )}
          >
            {item}
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <Empty
          title="Nothing saved yet"
          body="Open a practice or a note and keep it here for the days that need it."
          action={
            <button type="button" onClick={() => setFilter("All")} className="text-sm text-primary">
              Browse all resources
            </button>
          }
        />
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <Link key={item.id} to="/resources/$resourceId" params={{ resourceId: item.id }} className="block">
              <Card className="overflow-hidden p-0">
                <div className="relative">
                  <img src={item.image} alt={item.alt} className="h-40 w-full object-cover" />
                  {savedResources.includes(item.id) && (
                    <span className="absolute right-3 top-3 bg-[#141312]/70 p-1.5 text-cream">
                      <Bookmark size={14} fill="currentColor" />
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-primary">
                    {item.category} · {item.minutes} min
                  </p>
                  <p className="mt-1 font-display text-xl">{item.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.excerpt}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}

      <LinkButton to="/messages/$threadId" params={{ threadId: "jackie" }} variant="soft" full className="mt-6">
        Ask Jackie about a practice
      </LinkButton>
    </Screen>
  );
}
