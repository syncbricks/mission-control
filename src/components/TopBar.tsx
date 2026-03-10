export default function TopBar({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between border-b border-zinc-200 bg-white px-8 py-4">
      <div>
        <p className="text-xs uppercase tracking-wide text-zinc-400">Mission Control</p>
        <h1 className="text-2xl font-semibold text-zinc-900">{title}</h1>
      </div>
      <div className="w-72">
        <input
          type="search"
          placeholder="Search"
          className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-900/20"
        />
      </div>
    </div>
  );
}
