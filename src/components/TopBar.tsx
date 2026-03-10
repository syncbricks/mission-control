export default function TopBar({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between border-b border-card-border bg-card-bg px-8 py-4">
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-accent">
          Mission Control
        </p>
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
      </div>
      <div className="w-72">
        <input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg border border-card-border bg-muted-light px-4 py-2 text-sm text-foreground placeholder:text-muted transition-shadow focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
        />
      </div>
    </div>
  );
}
