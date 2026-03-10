import PageLayout from "@/components/PageLayout";

export default function SettingsPage() {
  return (
    <PageLayout title="Settings">
      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <h2 className="text-lg font-semibold">Configuration</h2>
        <p className="mt-1 text-sm text-zinc-500">
          Manage connection settings, tokens, and preferences.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-zinc-200 p-4">
            <p className="text-sm font-semibold text-zinc-900">Gateway Status</p>
            <p className="mt-2 text-xs text-zinc-500">Connected · Local mode</p>
          </div>
          <div className="rounded-lg border border-zinc-200 p-4">
            <p className="text-sm font-semibold text-zinc-900">Channels</p>
            <p className="mt-2 text-xs text-zinc-500">Slack · Telegram · WhatsApp</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
