import PageLayout from "@/components/PageLayout";
import { missionStatement, teamMembers } from "@/lib/mock";

export default function TeamPage() {
  return (
    <PageLayout title="Team">
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <section className="rounded-2xl border border-zinc-200 bg-white p-6">
          <h2 className="text-lg font-semibold">Org Structure</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Visibility into agents, roles, and current status.
          </p>
          <div className="mt-4 space-y-3">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between rounded-lg border border-zinc-200 p-4">
                <div>
                  <p className="text-sm font-semibold text-zinc-900">{member.name}</p>
                  <p className="text-xs text-zinc-500">{member.role}</p>
                </div>
                <span className="rounded-full bg-zinc-100 px-2 py-1 text-xs text-zinc-600">
                  {member.status}
                </span>
              </div>
            ))}
          </div>
        </section>
        <section className="rounded-2xl border border-zinc-200 bg-white p-6">
          <h2 className="text-lg font-semibold">Mission Statement</h2>
          <p className="mt-2 text-sm text-zinc-600">{missionStatement}</p>
          <button className="mt-4 w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm">
            Reverse Prompt for Next Task
          </button>
        </section>
      </div>
    </PageLayout>
  );
}
