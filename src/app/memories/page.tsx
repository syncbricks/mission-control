import PageLayout from "@/components/PageLayout";
import { longTermMemories, memories } from "@/lib/mock";

export default function MemoriesPage() {
  return (
    <PageLayout title="Memories">
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <section className="rounded-2xl border border-card-border bg-card-bg p-6 shadow-sm">
          <h2 className="text-lg font-bold text-foreground">Daily Memories</h2>
          <p className="mt-1 text-sm text-muted">
            Browse memory snapshots organized by day.
          </p>
          <div className="mt-4 space-y-4">
            {memories.map((memory) => (
              <div
                key={memory.id}
                className="rounded-lg border border-card-border p-4 transition-colors hover:border-accent/30"
              >
                <p className="text-xs font-medium text-accent">
                  {memory.date}
                </p>
                <p className="mt-2 text-sm text-foreground/80">
                  {memory.summary}
                </p>
              </div>
            ))}
          </div>
        </section>
        <section className="rounded-2xl border border-card-border bg-card-bg p-6 shadow-sm">
          <h2 className="text-lg font-bold text-foreground">
            Long-Term Memory
          </h2>
          <p className="mt-1 text-sm text-muted">
            Key facts your agent should always remember.
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            {longTermMemories.map((item) => (
              <li
                key={item}
                className="rounded-lg border border-card-border bg-accent-light p-3 text-foreground/80"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </PageLayout>
  );
}
