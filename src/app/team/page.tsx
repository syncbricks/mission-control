import PageLayout from "@/components/PageLayout";
import { missionStatement } from "@/lib/mock";

const statusColors: Record<string, string> = {
  Active: "bg-success-light text-success",
  Idle: "bg-muted-light text-muted",
};

async function fetchAgents() {
  const res = await fetch("http://localhost:3000/api/openclaw/agents", {
    cache: "no-store",
  });
  return res.json();
}

export default async function TeamPage() {
  const data = await fetchAgents();
  const agents = data?.agents ?? [];

  return (
    <PageLayout title="Team">
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <section className="rounded-2xl border border-card-border bg-card-bg p-6 shadow-sm">
          <h2 className="text-lg font-bold text-foreground">Org Structure</h2>
          <p className="mt-1 text-sm text-muted">
            Live agents pulled from OpenClaw config.
          </p>
          <div className="mt-4 space-y-3">
            {agents.map((agent: any) => (
              <div
                key={agent.id}
                className="flex items-center justify-between rounded-lg border border-card-border p-4 transition-colors hover:border-accent/30"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-light text-sm font-semibold text-accent">
                    {(agent.name ?? agent.id)?.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {agent.name ?? agent.id}
                    </p>
                    <p className="text-xs text-muted">{agent.id}</p>
                  </div>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusColors.Active}`}
                >
                  Active
                </span>
              </div>
            ))}
          </div>
          {!data?.ok && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-600">
              {data?.error ?? "Unable to load agents."}
            </div>
          )}
        </section>
        <section className="rounded-2xl border border-card-border bg-card-bg p-6 shadow-sm">
          <h2 className="text-lg font-bold text-foreground">
            Mission Statement
          </h2>
          <p className="mt-2 text-sm text-foreground/70">{missionStatement}</p>
          <button className="mt-4 w-full rounded-lg border border-accent bg-accent-light px-3 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-white">
            Reverse Prompt for Next Task
          </button>
        </section>
      </div>
    </PageLayout>
  );
}
