import fs from "fs";
import path from "path";
import os from "os";
import { prisma } from "@/lib/db";
import { loadOpenClawConfig } from "@/lib/openclaw";
import { TaskStatus } from "@prisma/client";

export type OfficeAgent = {
  id: string;
  name: string;
  status: "active" | "idle";
  currentTask?: string | null;
  completedCount: number;
};

const ACTIVE_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function readLatestSessionTimestamp(agentId: string): number | null {
  const sessionsPath = path.join(
    os.homedir(),
    ".openclaw",
    "agents",
    agentId,
    "sessions",
    "sessions.json"
  );
  if (!fs.existsSync(sessionsPath)) return null;
  try {
    const raw = fs.readFileSync(sessionsPath, "utf-8");
    const parsed = JSON.parse(raw);
    const sessions = parsed?.sessions ?? [];
    if (!Array.isArray(sessions) || sessions.length === 0) return null;
    const latest = sessions.reduce((max: number, s: any) => {
      const ts = Number(s?.updatedAt ?? 0);
      return ts > max ? ts : max;
    }, 0);
    return latest || null;
  } catch {
    return null;
  }
}

export async function buildOfficeAgents(): Promise<OfficeAgent[]> {
  const config = loadOpenClawConfig();
  const agents = (config as any)?.agents?.list ?? [];

  const tasks = await prisma.task.findMany({
    orderBy: { updatedAt: "desc" },
  });

  return agents.map((agent: any) => {
    const updatedAt = readLatestSessionTimestamp(agent.id);
    const isActive = updatedAt
      ? Date.now() - updatedAt < ACTIVE_WINDOW_MS
      : false;

    const assigned = tasks.filter((t) => t.assigneeId === agent.id);
    const current = assigned.find(
      (t) => t.executionStatus === "RUNNING" || t.executionStatus === "QUEUED"
    );
    const completedCount = assigned.filter(
      (t) => t.status === TaskStatus.DONE
    ).length;

    return {
      id: agent.id,
      name: agent.name ?? agent.id,
      status: isActive ? "active" : "idle",
      currentTask: current?.title ?? null,
      completedCount,
    } as OfficeAgent;
  });
}
