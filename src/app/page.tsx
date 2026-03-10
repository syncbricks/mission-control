import PageLayout from "@/components/PageLayout";
import { activityFeed, tasks } from "@/lib/mock";

const columns = ["Backlog", "In Progress", "Review", "Done"] as const;

const columnColors: Record<string, { bg: string; label: string }> = {
  Backlog: { bg: "bg-muted-light", label: "text-muted" },
  "In Progress": { bg: "bg-warning-light", label: "text-warning" },
  Review: { bg: "bg-info-light", label: "text-info" },
  Done: { bg: "bg-success-light", label: "text-success" },
};

const statusDot: Record<string, string> = {
  Backlog: "bg-muted",
  "In Progress": "bg-warning",
  Review: "bg-info",
  Done: "bg-success",
};

export default function TaskBoardPage() {
  return (
    <PageLayout title="Task Board">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[2fr_1fr]">
        <section className="rounded-2xl border border-card-border bg-card-bg p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground">
              Kanban Overview
            </h2>
            <button className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-accent-hover">
              New Task
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {columns.map((column) => {
              const colors = columnColors[column];
              return (
                <div key={column} className={`rounded-xl ${colors.bg} p-3`}>
                  <div className="mb-3 flex items-center gap-2">
                    <span
                      className={`inline-block h-2 w-2 rounded-full ${statusDot[column]}`}
                    />
                    <p
                      className={`text-xs font-semibold uppercase ${colors.label}`}
                    >
                      {column}
                    </p>
                    <span className="ml-auto rounded-full bg-white/60 px-1.5 py-0.5 text-xs text-muted">
                      {tasks.filter((t) => t.status === column).length}
                    </span>
                  </div>
                  <div className="space-y-3">
                    {tasks
                      .filter((task) => task.status === column)
                      .map((task) => (
                        <div
                          key={task.id}
                          className="rounded-lg border border-card-border bg-card-bg p-3 text-sm shadow-sm transition-shadow hover:shadow-md"
                        >
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-foreground">
                              {task.title}
                            </p>
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-light text-xs font-semibold text-accent">
                              {task.owner}
                            </span>
                          </div>
                          <p className="mt-2 text-xs text-muted">
                            {task.description}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        <section className="rounded-2xl border border-card-border bg-card-bg p-6 shadow-sm">
          <h2 className="text-lg font-bold text-foreground">Live Activity</h2>
          <p className="mt-1 text-sm text-muted">
            Track what your agents are doing in real time.
          </p>
          <div className="mt-4 space-y-3">
            {activityFeed.map((item) => (
              <div
                key={item.id}
                className="rounded-lg border border-card-border bg-muted-light p-3 text-sm transition-colors hover:border-accent/30"
              >
                <div className="flex items-center justify-between">
                  <p className="text-foreground">{item.message}</p>
                  <span className="text-xs text-muted">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
