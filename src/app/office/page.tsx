import PageLayout from "@/components/PageLayout";

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
  const agentMap = new Map(agents.map((agent: any) => [agent.id, agent]));

  return (
    <PageLayout title="Office">
      <div className="rounded-2xl border border-card-border bg-card-bg p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-foreground">Office Floor</h2>
            <p className="text-sm text-muted">
              Live layout with desks mapped to your core agents.
            </p>
          </div>
          <div className="text-xs text-muted">
            Active agents highlighted
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-[2fr_1fr]">
          <div className="rounded-2xl bg-zinc-100 p-6">
            <div className="grid grid-cols-3 gap-4">
              {deskLayout.flat().map((agentId, index) => {
                if (!agentId) {
                  return (
                    <div
                      key={`empty-${index}`}
                      className="h-28 rounded-xl border border-dashed border-zinc-300 bg-white/60"
                    />
                  );
                }
                const agent = agentMap.get(agentId);
                const isActive = agent?.status === "active";
                return (
                  <div
                    key={agentId}
                    className={`flex h-28 flex-col items-center justify-center rounded-xl border border-zinc-200 bg-white text-center shadow-sm ${
                      isActive ? "ring-2 ring-emerald-400" : ""
                    }`}
                  >
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-xs font-semibold text-white">
                      {(agent?.name ?? agentId).charAt(0)}
                    </div>
                    <p className="text-xs font-semibold text-foreground">
                      {agent?.name ?? agentId}
                    </p>
                    <p className="text-[10px] text-muted">
                      {agent?.status ?? "idle"}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="rounded-2xl border border-card-border bg-white p-4">
            <h3 className="text-sm font-semibold text-foreground">
              Agent Activity
            </h3>
            <p className="mt-1 text-xs text-muted">
              Uses recent session timestamps (last 15 minutes).
            </p>
            <div className="mt-4 space-y-3">
              {agents.map((agent: any) => (
                <div
                  key={agent.id}
                  className="flex items-center justify-between rounded-lg border border-card-border px-3 py-2"
                >
                  <div>
                    <p className="text-xs font-semibold text-foreground">
                      {agent.name}
                    </p>
                    <p className="text-[10px] text-muted">{agent.id}</p>
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      agent.status === "active"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-zinc-100 text-zinc-500"
                    }`}
                  >
                    {agent.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {!data?.ok && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-600">
            {data?.error ?? "Unable to load office data."}
          </div>
        )}
      </div>
    </PageLayout>
  );
}
