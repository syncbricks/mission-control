import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

export default function PageLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <TopBar title={title} />
        <div className="flex-1 overflow-y-auto px-8 py-6">{children}</div>
      </div>
    </div>
  );
}
