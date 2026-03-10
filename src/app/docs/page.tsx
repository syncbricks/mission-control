import PageLayout from "@/components/PageLayout";
import { docs } from "@/lib/mock";

const typeColors: Record<string, string> = {
  Article: "bg-info-light text-info",
  Plan: "bg-warning-light text-warning",
  Checklist: "bg-success-light text-success",
};

export default function DocsPage() {
  return (
    <PageLayout title="Docs">
      <div className="rounded-2xl border border-card-border bg-card-bg p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">
            Document Library
          </h2>
          <input
            className="rounded-lg border border-card-border bg-muted-light px-4 py-2 text-sm text-foreground placeholder:text-muted transition-shadow focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
            placeholder="Search docs..."
          />
        </div>
        <div className="mt-4 space-y-3">
          {docs.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between rounded-lg border border-card-border p-4 transition-colors hover:border-accent/30"
            >
              <div className="flex items-center gap-3">
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {doc.title}
                  </p>
                  <span
                    className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${typeColors[doc.type] ?? "bg-muted-light text-muted"}`}
                  >
                    {doc.type}
                  </span>
                </div>
              </div>
              <span className="text-xs text-muted">{doc.updated}</span>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
