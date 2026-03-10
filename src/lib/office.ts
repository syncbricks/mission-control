import fs from "fs";
import path from "path";
import os from "os";
import { loadOpenClawConfig } from "@/lib/openclaw";

export type OfficeAgent = {
  id: string;
  name: string;
  status: "active" | "idle";
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

export function buildOfficeAgents(): OfficeAgent[] {
  const config = loadOpenClawConfig();
  const agents = (config as any)?.agents?.list ?? [];

  return agents.map((agent: any) => {
    const updatedAt = readLatestSessionTimestamp(agent.id);
    const isActive = updatedAt
      ? Date.now() - updatedAt < ACTIVE_WINDOW_MS
      : false;
    return {
      id: agent.id,
      name: agent.name ?? agent.id,
      status: isActive ? "active" : "idle",
    } as OfficeAgent;
  });
}
