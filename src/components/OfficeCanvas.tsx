"use client";

import Image from "next/image";

export interface OfficeAgent {
  id: string;
  name: string;
  status: string;
  currentTask?: string | null;
  completedCount?: number;
}

interface OfficeCanvasProps {
  agentMap: Record<string, OfficeAgent>;
}

const SEATS = [
  { id: "main", x: 120, y: 110 },
  { id: "tavily", x: 280, y: 110 },
  { id: "blog-publisher", x: 440, y: 110 },
  { id: "dexiq-finance", x: 120, y: 260 },
  { id: "n8n-developer", x: 280, y: 260 },
  { id: "skool", x: 440, y: 260 },
];

export default function OfficeCanvas({ agentMap }: OfficeCanvasProps) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-slate-700 bg-[#0f172a]">
      <Image
        src="/office/office-2d.png"
        alt="Office floor"
        fill
        className="object-cover"
        priority
      />

      {SEATS.map((seat) => {
        const agent = agentMap[seat.id];
        if (!agent) return null;
        const isActive = agent.status === "active";
        return (
          <div
            key={seat.id}
            className="absolute"
            style={{ left: seat.x, top: seat.y }}
          >
            <div
              className={`relative rounded-2xl border border-white/10 bg-slate-900/80 px-3 py-2 text-[10px] text-slate-200 shadow-lg backdrop-blur ${
                isActive ? "ring-2 ring-emerald-400" : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`h-3 w-3 rounded-full ${
                    isActive ? "bg-emerald-400" : "bg-slate-400"
                  }`}
                />
                <span className="font-semibold">{agent.name}</span>
              </div>
              <div className="mt-1 text-[9px] text-slate-400">
                {agent.currentTask ? `Task: ${agent.currentTask}` : "Idle"}
              </div>
              <div className="mt-1 text-[9px] text-slate-500">
                Completed: {agent.completedCount ?? 0}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
