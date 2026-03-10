import PageLayout from "@/components/PageLayout";

async function fetchAgents() {
  const res = await fetch("http://localhost:3000/api/openclaw/agents", {
    cache: "no-store",
  });
  return res.json();
}

export default async function OfficePage() {
  const data = await fetchAgents();
  const agents = data?.agents ?? [];

  return (
    <PageLayout title="Office">
      <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-12 text-center">
        <h2 className="text-lg font-semibold text-zinc-900">2D Office Visualization</h2>
        <p className="mt-2 text-sm text-zinc-500">
          Placeholder for the pixel-art office that visualizes active agents.
        </p>
        <div className="mt-6 rounded-xl bg-zinc-100 p-6">
          <p className="text-xs uppercase tracking-wide text-zinc-400">Active Agents</p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {agents.map((agent: any) => (
              <span
                key={agent.id}
                className="rounded-full bg-white px-3 py-1 text-xs font-medium text-zinc-700"
              >
                {agent.name ?? agent.id}
              </span>
            ))}
          </div>
        </div>
        {!data?.ok && (
          <div className="mt-4 text-xs text-red-600">
            {data?.error ?? "Unable to load agents."}
          </div>
        )}
      </div>
    </PageLayout>
  );
}
