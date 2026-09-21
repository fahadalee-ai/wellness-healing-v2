import { Outlet, createFileRoute, Link, Navigate, useRouterState } from "@tanstack/react-router";
import { Bookmark, Clock } from "lucide-react";
import { Button, Card, Header, LinkButton, Screen } from "@/components/kit";
import { resourceById } from "@/lib/resources";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/resources/$resourceId")({
  head: ({ params }) => ({
    meta: [{ title: `${resourceById(params.resourceId)?.title ?? "Resource"} — Wellness & Healing SF` }],
  }),
  component: ResourceRoute,
});

function ResourceRoute() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname.endsWith("/practice")) return <Outlet />;
  return <ResourceDetailScreen />;
}

function ResourceDetailScreen() {
  const { resourceId } = Route.useParams();
  const { savedResources, toggleSavedResource, completedPractices } = useApp();
  const resource = resourceById(resourceId);

  if (!resource) {
    return <Navigate to="/resources" />;
  }

  const saved = savedResources.includes(resource.id);
  const done = completedPractices.includes(resource.id);
  const related = resource.related.map(resourceById).filter(Boolean);

  return (
    <Screen tabPad className="pt-0">
      <Header
        title={resource.title}
        fallbackTo="/resources"
        right={
          <button
            type="button"
            aria-label={saved ? "Remove from saved" : "Save resource"}
            onClick={() => toggleSavedResource(resource.id)}
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-card text-primary"
          >
            <Bookmark size={18} fill={saved ? "currentColor" : "none"} />
          </button>
        }
      />

      <img src={resource.image} alt={resource.alt} className="-mx-5 mb-5 h-52 w-[calc(100%+2.5rem)] rounded-none object-cover" />

      <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.14em] text-primary">
        <span>{resource.category}</span>
        <span className="inline-flex items-center gap-1 text-muted-foreground">
          <Clock size={12} /> {resource.minutes} min
        </span>
        {done && <span className="text-muted-foreground">Practiced</span>}
      </div>

      <div className="mt-5 space-y-4">
        {resource.body.map((paragraph) => (
          <p key={paragraph} className="text-sm leading-relaxed text-muted-foreground">
            {paragraph}
          </p>
        ))}
      </div>

      {resource.prompts && (
        <div className="mt-8">
          <h2 className="font-display text-xl">Prompts</h2>
          <div className="mt-3 space-y-2">
            {resource.prompts.map((prompt, index) => (
              <Card key={prompt}>
                <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-1 text-sm leading-relaxed">{prompt}</p>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 space-y-2">
        {resource.steps && (
          <LinkButton to="/resources/$resourceId/practice" params={{ resourceId: resource.id }} full>
            {done ? "Practice again" : "Begin practice"}
          </LinkButton>
        )}
        <LinkButton
          to="/messages/$threadId"
          params={{ threadId: "jackie" }}
          search={{ prompt: `I sat with “${resource.title}.” Can we talk about it?` }}
          variant="soft"
          full
        >
          Share with Jackie
        </LinkButton>
      </div>

      {related.length > 0 && (
        <div className="mt-10">
          <h2 className="font-display text-xl">Related</h2>
          <div className="mt-3 space-y-3">
            {related.map((item) =>
              item ? (
                <Link key={item.id} to="/resources/$resourceId" params={{ resourceId: item.id }} className="block">
                  <Card className="flex p-0">
                    <div className="h-20 w-20 shrink-0 overflow-hidden">
                      <img src={item.image} alt="" className="h-full w-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1 px-4 py-3">
                      <p className="text-[11px] uppercase tracking-[0.14em] text-primary">{item.category}</p>
                      <p className="mt-1 truncate font-medium">{item.title}</p>
                    </div>
                  </Card>
                </Link>
              ) : null,
            )}
          </div>
        </div>
      )}

      <Button
        variant="ghost"
        full
        className="mt-6"
        onClick={() => toggleSavedResource(resource.id)}
      >
        {saved ? "Remove from saved" : "Save for later"}
      </Button>
    </Screen>
  );
}
