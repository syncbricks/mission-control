import PageLayout from "@/components/PageLayout";
import { longTermMemories, memories } from "@/lib/mock";

export default function MemoriesPage() {
  return (
    <PageLayout title="Memories">
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <section className="rounded-2xl border border-zinc-200 bg-white p-6">
          <h2 className="text-lg font-semibold">Daily Memories</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Browse memory snapshots organized by day.
          </p>
          <div className="mt-4 space-y-4">
            {memories.map((memory) => (
              <div key={memory.id} className="rounded-lg border border-zinc-200 p-4">
                <p className="text-xs text-zinc-400">{memory.date}</p>
                <p className="mt-2 text-sm text-zinc-700">{memory.summary}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="rounded-2xl border border-zinc-200 bg-white p-6">
          <h2 className="text-lg font-semibold">Long-Term Memory</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Key facts your agent should always remember.
          </p>
          <ul className="mt-4 space-y-3 text-sm text-zinc-700">
            {longTermMemories.map((item) => (
              <li key={item} className="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </PageLayout>
  );
}
