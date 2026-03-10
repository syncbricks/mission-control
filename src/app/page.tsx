import PageLayout from "@/components/PageLayout";
import { activityFeed, tasks } from "@/lib/mock";

const columns = ["Backlog", "In Progress", "Review", "Done"] as const;

export default function TaskBoardPage() {
  return (
    <PageLayout title="Task Board">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[2fr_1fr]">
        <section className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Kanban Overview</h2>
            <button className="rounded-lg bg-zinc-900 px-3 py-2 text-sm text-white">
              New Task
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {columns.map((column) => (
              <div key={column} className="rounded-xl bg-zinc-50 p-3">
                <p className="mb-3 text-xs font-semibold uppercase text-zinc-500">
                  {column}
                </p>
                <div className="space-y-3">
                  {tasks
                    .filter((task) => task.status === column)
                    .map((task) => (
                      <div
                        key={task.id}
                        className="rounded-lg border border-zinc-200 bg-white p-3 text-sm"
                      >
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-zinc-900">
                            {task.title}
                          </p>
                          <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-500">
                            {task.owner}
                          </span>
                        </div>
                        <p className="mt-2 text-xs text-zinc-500">
                          {task.description}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="rounded-2xl border border-zinc-200 bg-white p-6">
          <h2 className="text-lg font-semibold">Live Activity</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Track what your agents are doing in real time.
          </p>
          <div className="mt-4 space-y-3">
            {activityFeed.map((item) => (
              <div
                key={item.id}
                className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-sm"
              >
                <div className="flex items-center justify-between">
                  <p className="text-zinc-900">{item.message}</p>
                  <span className="text-xs text-zinc-400">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
