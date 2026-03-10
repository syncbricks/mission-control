import PageLayout from "@/components/PageLayout";
import { docs } from "@/lib/mock";

export default function DocsPage() {
  return (
    <PageLayout title="Docs">
      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Document Library</h2>
          <input
            className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm"
            placeholder="Search docs"
          />
        </div>
        <div className="mt-4 space-y-3">
          {docs.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between rounded-lg border border-zinc-200 p-4">
              <div>
                <p className="text-sm font-semibold text-zinc-900">{doc.title}</p>
                <p className="text-xs text-zinc-500">{doc.type}</p>
              </div>
              <span className="text-xs text-zinc-400">{doc.updated}</span>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
