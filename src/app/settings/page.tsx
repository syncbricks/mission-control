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
      <div className="rounded-2xl border border-card-border bg-card-bg p-6 shadow-sm">
        <h2 className="text-lg font-bold text-foreground">Configuration</h2>
        <p className="mt-1 text-sm text-muted">
          Read-only view sourced from ~/.openclaw/openclaw.json (secrets
          redacted).
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-card-border p-4 transition-colors hover:border-accent/30">
            <p className="text-sm font-semibold text-foreground">
              Gateway Status
            </p>
            <p className="mt-2 text-xs text-muted">
              Mode: {gateway.mode ?? "unknown"} · Bind:{" "}
              {gateway.bind ?? "?"} · Port: {gateway.port ?? "?"}
            </p>
          </div>
          <div className="rounded-lg border border-card-border p-4 transition-colors hover:border-accent/30">
            <p className="text-sm font-semibold text-foreground">Remote URL</p>
            <p className="mt-2 text-xs text-muted">
              {gateway.remoteUrl ?? "Not configured"}
            </p>
          </div>
        </div>
        {!data?.ok && (
          <div className="mt-6 rounded-lg border border-danger bg-danger-light p-4 text-sm text-danger">
            {data?.error ?? "Unable to load OpenClaw config."}
          </div>
        )}
      </div>
    </PageLayout>
  );
}
