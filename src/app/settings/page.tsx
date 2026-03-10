import PageLayout from "@/components/PageLayout";

async function fetchConfig() {
  const res = await fetch("http://localhost:3000/api/openclaw/config", {
    cache: "no-store",
  });
  return res.json();
}

export default async function SettingsPage() {
  const data = await fetchConfig();
  const gateway = data?.gateway ?? {};

  return (
    <PageLayout title="Settings">
      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <h2 className="text-lg font-semibold">Configuration</h2>
        <p className="mt-1 text-sm text-zinc-500">
          Read-only view sourced from ~/.openclaw/openclaw.json (secrets redacted).
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-zinc-200 p-4">
            <p className="text-sm font-semibold text-zinc-900">Gateway Status</p>
            <p className="mt-2 text-xs text-zinc-500">
              Mode: {gateway.mode ?? "unknown"} · Bind: {gateway.bind ?? "?"} · Port: {gateway.port ?? "?"}
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 p-4">
            <p className="text-sm font-semibold text-zinc-900">Remote URL</p>
            <p className="mt-2 text-xs text-zinc-500">
              {gateway.remoteUrl ?? "Not configured"}
            </p>
          </div>
        </div>
        {!data?.ok && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {data?.error ?? "Unable to load OpenClaw config."}
          </div>
        )}
      </div>
    </PageLayout>
  );
}
