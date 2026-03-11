import PageLayout from "@/components/PageLayout";

async function fetchCronJobs() {
  const res = await fetch("http://localhost:3000/api/openclaw/cron", {
    cache: "no-store",
  });
  return res.json();
}

function formatSchedule(job: any) {
  const schedule = job?.schedule ?? {};
  if (schedule.kind === "cron") return `cron: ${schedule.expr}`;
  if (schedule.kind === "every") return `every ${schedule.everyMs}ms`;
  if (schedule.kind === "at") return `at ${schedule.at}`;
  return "schedule unknown";
}

export default async function CalendarPage() {
  const data = await fetchCronJobs();
  const jobs = data?.jobs ?? [];

  return (
    <PageLayout title="Calendar">
      <div className="rounded-2xl border border-card-border bg-card-bg p-6 shadow-sm">
        <h2 className="text-lg font-bold text-foreground">Scheduled Jobs</h2>
        <p className="mt-1 text-sm text-muted">
          Live view of OpenClaw cron schedules.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {jobs.length === 0 && (
            <div className="rounded-xl border border-card-border p-4 text-sm text-muted">
              No scheduled jobs found.
            </div>
          )}
          {jobs.map((job: any) => (
            <div
              key={job.id || job.jobId}
              className="rounded-xl border border-card-border p-4 transition-colors hover:border-accent/30"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">
                  {job.name || "Untitled Job"}
                </h3>
                <span className="rounded-full bg-accent-light px-2.5 py-0.5 text-xs font-medium text-accent">
                  {job.enabled === false ? "Disabled" : "Enabled"}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted">
                {formatSchedule(job)}
              </p>
              {job?.payload?.kind && (
                <p className="mt-2 text-xs text-muted">
                  Payload: {job.payload.kind}
                </p>
              )}
            </div>
          ))}
        </div>
        {!data?.ok && (
          <div className="mt-4 rounded-lg border border-danger bg-danger-light p-3 text-xs text-danger">
            {data?.error ?? "Unable to load cron jobs."}
          </div>
        )}
      </div>
    </PageLayout>
  );
}
