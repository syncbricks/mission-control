import PageLayout from "@/components/PageLayout";
import OfficeCanvas from "@/components/OfficeCanvas";

async function fetchOffice() {
  const res = await fetch("http://localhost:3000/api/openclaw/office", {
    cache: "no-store",
  });
  return res.json();
}

const deskLayout = [
  ["main", "tavily", null],
  ["blog-publisher", "dexiq-finance", "n8n-developer"],
  ["skool", null, null],
];

export default async function OfficePage() {
  const data = await fetchOffice();
  const agents = data?.agents ?? [];
  const agentMap: Record<string, { id: string; name: string; status: string }> =
    {};
  for (const agent of agents) {
    agentMap[agent.id] = agent;
  }

  const activeCount = agents.filter(
    (a: { status: string }) => a.status === "active"
  ).length;
  const idleCount = agents.length - activeCount;

  return (
    <PageLayout title="Office">
      <div className="rounded-2xl border border-card-border bg-card-bg p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-foreground">
              Office Floor Plan
            </h2>
            <p className="text-sm text-muted">
              Live layout &mdash; Main orchestrates all agents.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-success" />
              {activeCount} Active
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-muted" />
              {idleCount} Idle
            </span>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-[2fr_1fr]">
          <div className="h-[540px] overflow-hidden rounded-2xl border border-slate-700 bg-[#0f172a]">
            <OfficeCanvas deskLayout={deskLayout} agentMap={agentMap} />
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-card-border bg-card-bg p-4 shadow-sm">
              <h3 className="text-sm font-bold text-foreground">
                Agent Hierarchy
              </h3>
              <p className="mt-1 text-xs text-muted">
                Main is the boss. All agents report to Main.
              </p>
              <div className="mt-3 space-y-2">
                {agents.map(
                  (agent: { id: string; name: string; status: string }) => {
                    const isBoss = agent.id === "main";
                    return (
                      <div
                        key={agent.id}
                        className={`flex items-center justify-between rounded-lg border px-3 py-2 transition-colors ${
                          isBoss
                            ? "border-amber-500/30 bg-amber-500/5"
                            : "border-card-border hover:border-accent/30"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {isBoss && (
                            <span className="text-xs text-amber-400">&#9812;</span>
                          )}
                          <div>
                            <p className="text-xs font-semibold text-foreground">
                              {agent.name ?? agent.id}
                            </p>
                            <p className="text-[10px] text-muted">{agent.id}</p>
                          </div>
                        </div>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                            agent.status === "active"
                              ? "bg-success-light text-success"
                              : "bg-muted-light text-muted"
                          }`}
                        >
                          {agent.status}
                        </span>
                      </div>
                    );
                  }
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-card-border bg-card-bg p-4 shadow-sm">
              <h3 className="text-sm font-bold text-foreground">Legend</h3>
              <ul className="mt-3 space-y-2 text-xs text-muted">
                <li className="flex items-center gap-2">
                  <span className="text-amber-400">&#9812;</span>
                  Boss (orchestrator)
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-success" />
                  Working at desk
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-muted" />
                  Idle / sleeping
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-block h-0.5 w-5 border-t border-slate-500" />
                  Hierarchy / reporting line
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                  Task dispatch
                </li>
              </ul>
            </div>
          </div>
        </div>

        {!data?.ok && (
          <div className="mt-4 rounded-lg border border-danger bg-danger-light p-3 text-xs text-danger">
            {data?.error ?? "Unable to load office data."}
          </div>
        )}
      </div>
    </PageLayout>
  );
}
