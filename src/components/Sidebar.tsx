import Link from "next/link";
import { navItems } from "@/lib/mock";

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col border-r border-zinc-200 bg-white px-4 py-6 text-sm text-zinc-700">
      <div className="mb-8 flex items-center gap-2 text-lg font-semibold text-zinc-900">
        <div className="h-9 w-9 rounded-xl bg-zinc-900 text-white flex items-center justify-center">
          MC
        </div>
        Mission Control
      </div>
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center rounded-lg px-3 py-2 hover:bg-zinc-100 text-zinc-700"
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="mt-auto rounded-lg border border-zinc-200 p-3 text-xs text-zinc-500">
        Mission Control v1 · Local
      </div>
    </aside>
  );
}
