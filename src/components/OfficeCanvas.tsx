"use client";

import type { CSSProperties } from "react";

export interface OfficeAgent {
  id: string;
  name: string;
  status: string;
  currentTask?: string | null;
  completedCount?: number;
}

interface OfficeCanvasProps {
  deskLayout: (string | null)[][];
  agentMap: Record<string, OfficeAgent>;
}

const DESK_COLORS = ["#1f2937", "#111827", "#0f172a"];
const DESK_BORDER = ["#334155", "#1f2937", "#293548"];

export default function OfficeCanvas({ deskLayout, agentMap }: OfficeCanvasProps) {
  const rows = deskLayout.length;
  const cols = deskLayout[0]?.length ?? 0;
  const gridStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
    gap: "22px",
  };

  return (
    <div className="h-full w-full p-6 text-xs text-slate-200">
      <div className="mb-4 text-slate-300">Live office floor</div>
      <div style={gridStyle}>
        {deskLayout.flat().map((agentId, index) => {
          if (!agentId) {
            return (
              <div
                key={`empty-${index}`}
                className="h-32 rounded-2xl border border-dashed border-slate-600 bg-slate-900/40"
              />
            );
          }
          const agent = agentMap[agentId] ?? {
            id: agentId,
            name: agentId,
            status: "idle",
          };
          const deskColor = DESK_COLORS[index % DESK_COLORS.length];
          const deskBorder = DESK_BORDER[index % DESK_BORDER.length];
          return (
            <div key={agentId} className="relative h-32 rounded-2xl">
              <div
                className="absolute inset-0 rounded-2xl"
                style={{ background: deskColor, border: `1px solid ${deskBorder}` }}
              />
              <div className="absolute left-3 top-3 h-5 w-10 rounded-md bg-slate-700" />
              <div className="absolute right-4 top-4 h-4 w-4 rounded-full bg-slate-500" />
              <div
                className={`absolute -top-4 left-1/2 -translate-x-1/2 h-8 w-8 rounded-full border-2 border-slate-800 ${
                  agent.status === "active" ? "bg-emerald-400" : "bg-slate-400"
                }`}
                title={agent.status}
              />
              <div className="absolute left-0 top-10 w-full px-3 text-center">
                <div className="text-sm font-semibold text-slate-100">
                  {agent.name}
                </div>
                <div className="text-[10px] text-slate-400">{agent.status}</div>
                <div className="mt-2 text-[10px] text-slate-300">
                  {agent.currentTask ? (
                    <span>Current: {agent.currentTask}</span>
                  ) : (
                    <span>No active task</span>
                  )}
                </div>
                <div className="mt-1 text-[10px] text-slate-400">
                  Completed: {agent.completedCount ?? 0}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
