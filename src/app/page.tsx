import PageLayout from "@/components/PageLayout";
import TaskBoardClient from "@/components/TaskBoardClient";

export default function TaskBoardPage() {
  return (
    <PageLayout title="Task Board">
      <TaskBoardClient />
    </PageLayout>
  );
}
