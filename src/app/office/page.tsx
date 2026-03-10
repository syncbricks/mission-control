import PageLayout from "@/components/PageLayout";

export default function OfficePage() {
  return (
    <PageLayout title="Office">
      <div className="rounded-2xl border-2 border-dashed border-accent/30 bg-card-bg p-12 text-center shadow-sm">
        <h2 className="text-lg font-bold text-foreground">
          2D Office Visualization
        </h2>
        <p className="mt-2 text-sm text-muted">
          Placeholder for the pixel-art office that visualizes active agents.
        </p>
        <div className="mt-6 flex h-64 items-center justify-center rounded-xl bg-accent-light text-accent">
          Office canvas will render here.
        </div>
      </div>
    </PageLayout>
  );
}
