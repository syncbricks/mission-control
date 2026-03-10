"use client";

import type { CSSProperties } from "react";

export interface OfficeAgent {
  id: string;
  name: string;
  status: string;
}

interface OfficeCanvasProps {
  deskLayout: (string | null)[][];
  agentMap: Record<string, OfficeAgent>;
}

export default function OfficeCanvas({ deskLayout, agentMap }: OfficeCanvasProps) {
  const rows = deskLayout.length;
  const cols = deskLayout[0]?.length ?? 0;
  const gridStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
    gap: "12px",
  };

  return (
    <div className="h-full w-full p-6 text-xs text-slate-200">
      <div className="mb-3 text-slate-300">Office canvas (lite)</div>
      <div style={gridStyle}>
        {deskLayout.flat().map((agentId, index) => {
          if (!agentId) {
            return (
              <div
                key={`empty-${index}`}
                className="h-24 rounded-xl border border-dashed border-slate-600 bg-slate-900/40"
              />
            );
          }
          const agent = agentMap[agentId] ?? {
            id: agentId,
            name: agentId,
            status: "idle",
          };
          return (
            <div
              key={agentId}
              className={`flex h-24 flex-col items-center justify-center rounded-xl border border-slate-700 bg-slate-900/70 ${
                agent.status === "active" ? "ring-2 ring-emerald-400" : ""
              }`}
            >
              <div className="text-sm font-semibold text-slate-100">
                {agent.name}
              </div>
              <div className="text-[10px] text-slate-400">{agent.status}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
