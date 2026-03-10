import PageLayout from "@/components/PageLayout";
import { missionStatement, teamMembers } from "@/lib/mock";

const statusColors: Record<string, string> = {
  Active: "bg-success-light text-success",
  Idle: "bg-muted-light text-muted",
};

export default function TeamPage() {
  return (
    <PageLayout title="Team">
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <section className="rounded-2xl border border-card-border bg-card-bg p-6 shadow-sm">
          <h2 className="text-lg font-bold text-foreground">Org Structure</h2>
          <p className="mt-1 text-sm text-muted">
            Visibility into agents, roles, and current status.
          </p>
          <div className="mt-4 space-y-3">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between rounded-lg border border-card-border p-4 transition-colors hover:border-accent/30"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-light text-sm font-semibold text-accent">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {member.name}
                    </p>
                    <p className="text-xs text-muted">{member.role}</p>
                  </div>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusColors[member.status] ?? "bg-muted-light text-muted"}`}
                >
                  {member.status}
                </span>
              </div>
            ))}
          </div>
        </section>
        <section className="rounded-2xl border border-card-border bg-card-bg p-6 shadow-sm">
          <h2 className="text-lg font-bold text-foreground">
            Mission Statement
          </h2>
          <p className="mt-2 text-sm text-foreground/70">{missionStatement}</p>
          <button className="mt-4 w-full rounded-lg border border-accent bg-accent-light px-3 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-white">
            Reverse Prompt for Next Task
          </button>
        </section>
      </div>
    </PageLayout>
  );
}
