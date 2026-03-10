import PageLayout from "@/components/PageLayout";
import { projects } from "@/lib/mock";

export default function ProjectsPage() {
  return (
    <PageLayout title="Projects">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="rounded-2xl border border-card-border bg-card-bg p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <h3 className="text-lg font-bold text-foreground">
              {project.name}
            </h3>
            <p className="mt-2 text-sm text-muted">{project.summary}</p>
            <div className="mt-4">
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="font-medium text-muted">Progress</span>
                <span className="font-semibold text-accent">
                  {project.progress}%
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted-light">
                <div
                  className="h-2 rounded-full bg-accent transition-all"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
