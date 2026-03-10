import PageLayout from "@/components/PageLayout";
import { events } from "@/lib/mock";

export default function CalendarPage() {
  return (
    <PageLayout title="Calendar">
      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <h2 className="text-lg font-semibold">Scheduled Jobs</h2>
        <p className="mt-1 text-sm text-zinc-500">
          Confirm proactive tasks and cron schedules your OpenClaw has queued.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {events.map((event) => (
            <div key={event.id} className="rounded-xl border border-zinc-200 p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-zinc-900">{event.title}</h3>
                <span className="text-xs text-zinc-500">{event.time}</span>
              </div>
              <p className="mt-2 text-sm text-zinc-500">{event.description}</p>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
