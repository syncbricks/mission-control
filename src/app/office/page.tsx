import PageLayout from "@/components/PageLayout";

export default function OfficePage() {
  return (
    <PageLayout title="Office">
      <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-12 text-center">
        <h2 className="text-lg font-semibold text-zinc-900">2D Office Visualization</h2>
        <p className="mt-2 text-sm text-zinc-500">
          Placeholder for the pixel-art office that visualizes active agents.
        </p>
        <div className="mt-6 h-64 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-400">
          Office canvas will render here.
        </div>
      </div>
    </PageLayout>
  );
}
