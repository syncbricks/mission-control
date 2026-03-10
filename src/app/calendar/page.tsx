import PageLayout from "@/components/PageLayout";
import { events } from "@/lib/mock";

export default function CalendarPage() {
  return (
    <PageLayout title="Calendar">
      <div className="rounded-2xl border border-card-border bg-card-bg p-6 shadow-sm">
        <h2 className="text-lg font-bold text-foreground">Scheduled Jobs</h2>
        <p className="mt-1 text-sm text-muted">
          Confirm proactive tasks and cron schedules your OpenClaw has queued.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {events.map((event) => (
            <div
              key={event.id}
              className="rounded-xl border border-card-border p-4 transition-colors hover:border-accent/30"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">{event.title}</h3>
                <span className="rounded-full bg-accent-light px-2.5 py-0.5 text-xs font-medium text-accent">
                  {event.time}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted">{event.description}</p>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
