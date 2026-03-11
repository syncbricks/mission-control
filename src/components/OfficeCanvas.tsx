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

const DESK_STYLES = [
  "bg-[#1f2937] border-[#334155]",
  "bg-[#111827] border-[#1f2937]",
  "bg-[#1e293b] border-[#334155]",
];

export default function OfficeCanvas({ deskLayout, agentMap }: OfficeCanvasProps) {
  const rows = deskLayout.length;
  const cols = deskLayout[0]?.length ?? 0;
  const gridStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
    gap: "18px",
  };

  return (
    <div className="h-full w-full p-6 text-xs text-slate-200">
      <div className="mb-4 text-slate-300">Office floor (live)</div>
      <div style={gridStyle}>
        {deskLayout.flat().map((agentId, index) => {
          if (!agentId) {
            return (
              <div
                key={`empty-${index}`}
                className="h-28 rounded-2xl border border-dashed border-slate-600 bg-slate-900/40"
              />
            );
          }
          const agent = agentMap[agentId] ?? {
            id: agentId,
            name: agentId,
            status: "idle",
          };
          const deskStyle = DESK_STYLES[index % DESK_STYLES.length];
          return (
            <div
              key={agentId}
              className={`relative h-28 rounded-2xl border ${deskStyle} flex items-center justify-center`}
            >
              <div
                className={`absolute -top-4 left-1/2 -translate-x-1/2 h-7 w-7 rounded-full border-2 border-slate-800 ${
                  agent.status === "active" ? "bg-emerald-400" : "bg-slate-400"
                }`}
              />
              <div className="text-center">
                <div className="text-sm font-semibold text-slate-100">
                  {agent.name}
                </div>
                <div className="text-[10px] text-slate-400">{agent.status}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
