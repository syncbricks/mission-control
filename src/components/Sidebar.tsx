import Link from "next/link";
import { navItems } from "@/lib/mock";

const icons: Record<string, string> = {
  "Task Board": "📋",
  Calendar: "📅",
  Projects: "📁",
  Memories: "🧠",
  Docs: "📄",
  Team: "👥",
  Office: "🏢",
  Settings: "⚙️",
};

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col bg-sidebar-bg px-4 py-6 text-sm text-sidebar-text">
      <div className="mb-8 flex items-center gap-3 px-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-sm font-bold text-white">
          MC
        </div>
        <span className="text-lg font-semibold text-white">
          Mission Control
        </span>
      </div>
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sidebar-text transition-colors hover:bg-white/10 hover:text-sidebar-active"
          >
            <span className="text-base">{icons[item.label] ?? "·"}</span>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="mt-auto rounded-lg border border-white/10 p-3 text-xs text-sidebar-text/60">
        Mission Control v1 · Local
      </div>
    </aside>
  );
}
