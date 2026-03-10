"use client";

import { useEffect, useMemo, useState } from "react";

const columns = ["BACKLOG", "IN_PROGRESS", "REVIEW", "DONE"] as const;

type Agent = { id: string; name?: string };

type Task = {
  id: string;
  title: string;
  description?: string | null;
  status: (typeof columns)[number];
  assigneeId?: string | null;
  assignee?: string | null;
};

export default function TaskBoardClient() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    assigneeId: "",
  });

  const loadTasks = async () => {
    const res = await fetch("/api/tasks");
    const data = await res.json();
    setTasks(data.tasks ?? []);
  };

  const loadAgents = async () => {
    const res = await fetch("/api/openclaw/agents");
    const data = await res.json();
    setAgents(data.agents ?? []);
  };

  useEffect(() => {
    loadTasks();
    loadAgents();
  }, []);

  const createTask = async () => {
    if (!form.title.trim()) return;
    const agent = agents.find((a) => a.id === form.assigneeId);
    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.title,
        description: form.description,
        status: "BACKLOG",
        assigneeId: agent?.id ?? null,
        assignee: agent?.name ?? agent?.id ?? null,
      }),
    });
    setForm({ title: "", description: "", assigneeId: "" });
    loadTasks();
  };

  const updateStatus = async (task: Task, status: Task["status"]) => {
    await fetch(`/api/tasks/${task.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    loadTasks();
  };

  const grouped = useMemo(() => {
    return columns.reduce((acc, column) => {
      acc[column] = tasks.filter((task) => task.status === column);
      return acc;
    }, {} as Record<(typeof columns)[number], Task[]>);
  }, [tasks]);

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[2fr_1fr]">
      <section className="rounded-2xl border border-card-border bg-card-bg p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Kanban Overview</h2>
          <button
            onClick={createTask}
            className="rounded-lg bg-zinc-900 px-3 py-2 text-sm text-white"
          >
            New Task
          </button>
        </div>

        <div className="mb-6 grid gap-3 rounded-xl border border-dashed border-zinc-200 bg-white/70 p-4">
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Task title"
            className="rounded-lg border border-zinc-200 px-3 py-2 text-sm"
          />
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Description"
            className="rounded-lg border border-zinc-200 px-3 py-2 text-sm"
          />
          <select
            value={form.assigneeId}
            onChange={(e) => setForm({ ...form, assigneeId: e.target.value })}
            className="rounded-lg border border-zinc-200 px-3 py-2 text-sm"
          >
            <option value="">Assign to agent...</option>
            {agents.map((agent) => (
              <option key={agent.id} value={agent.id}>
                {agent.name ?? agent.id}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {columns.map((column) => (
            <div key={column} className="rounded-xl bg-zinc-50 p-3">
              <p className="mb-3 text-xs font-semibold uppercase text-zinc-500">
                {column.replace("_", " ")}
              </p>
              <div className="space-y-3">
                {grouped[column].map((task) => (
                  <div
                    key={task.id}
                    className="rounded-lg border border-zinc-200 bg-white p-3 text-sm"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-zinc-900">{task.title}</p>
                      <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-500">
                        {task.assignee ?? "Unassigned"}
                      </span>
                    </div>
                    {task.description && (
                      <p className="mt-2 text-xs text-zinc-500">
                        {task.description}
                      </p>
                    )}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {columns
                        .filter((status) => status !== task.status)
                        .map((status) => (
                          <button
                            key={status}
                            onClick={() => updateStatus(task, status)}
                            className="rounded-md border border-zinc-200 px-2 py-1 text-[10px] uppercase text-zinc-500 hover:bg-zinc-50"
                          >
                            Move to {status.replace("_", " ")}
                          </button>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="rounded-2xl border border-card-border bg-card-bg p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">How it works</h2>
        <p className="mt-2 text-sm text-muted">
          Tasks are stored in PostgreSQL and assigned to agents by ID. You can
          move tasks through the workflow as agents complete them. Agent status
          and execution automation will be layered in next.
        </p>
      </section>
    </div>
  );
}
