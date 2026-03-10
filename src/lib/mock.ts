export type TaskStatus = "Backlog" | "In Progress" | "Review" | "Done";

export const navItems = [
  { label: "Task Board", href: "/" },
  { label: "Calendar", href: "/calendar" },
  { label: "Projects", href: "/projects" },
  { label: "Memories", href: "/memories" },
  { label: "Docs", href: "/docs" },
  { label: "Team", href: "/team" },
  { label: "Office", href: "/office" },
  { label: "Settings", href: "/settings" },
];

export const tasks = [
  {
    id: "task-1",
    title: "Publish n8n Ambassador article",
    owner: "A",
    status: "Done" as TaskStatus,
    description: "Finalize copy, add featured image, and publish.",
  },
  {
    id: "task-2",
    title: "Slack channel routing audit",
    owner: "H",
    status: "Review" as TaskStatus,
    description: "Verify allowlists and mention gating for Slack DMs.",
  },
  {
    id: "task-3",
    title: "Build Mission Control UI",
    owner: "H",
    status: "In Progress" as TaskStatus,
    description: "Next.js dashboard with sidebar + core tools.",
  },
  {
    id: "task-4",
    title: "Create community event plan",
    owner: "A",
    status: "Backlog" as TaskStatus,
    description: "Draft agenda + venue shortlist for Melbourne meetup.",
  },
];

export const activityFeed = [
  {
    id: "activity-1",
    time: "2m ago",
    message: "Blog-publisher uploaded featured image to WordPress.",
  },
  {
    id: "activity-2",
    time: "18m ago",
    message: "Slack DM session responded successfully.",
  },
  {
    id: "activity-3",
    time: "1h ago",
    message: "Agent heartbeat completed with no alerts.",
  },
];

export const events = [
  {
    id: "event-1",
    title: "Daily heartbeat",
    time: "Every hour",
    description: "Check unprocessed invoices and retry sync jobs.",
  },
  {
    id: "event-2",
    title: "Weekly content review",
    time: "Fri 10:00 AM",
    description: "Review blog drafts + social posts.",
  },
];

export const projects = [
  {
    id: "project-1",
    name: "Mission Control",
    progress: 72,
    summary: "Custom dashboard for agent visibility + tooling.",
  },
  {
    id: "project-2",
    name: "Automation Community",
    progress: 45,
    summary: "Melbourne meetup + ambassador program.",
  },
  {
    id: "project-3",
    name: "AI Workflow Library",
    progress: 30,
    summary: "Curated n8n templates with AI integrations.",
  },
];

export const memories = [
  {
    id: "mem-1",
    date: "2026-03-10",
    summary: "Published n8n Ambassador article + updated links.",
  },
  {
    id: "mem-2",
    date: "2026-03-09",
    summary: "Slack channel configured and token refreshed.",
  },
];

export const longTermMemories = [
  "Primary integration: Xero",
  "Default GST rate: 10%",
  "Main agent routes Slack + Telegram",
];

export const docs = [
  {
    id: "doc-1",
    title: "n8n Ambassador announcement draft",
    type: "Article",
    updated: "Today",
  },
  {
    id: "doc-2",
    title: "Automation meetup agenda",
    type: "Plan",
    updated: "Yesterday",
  },
  {
    id: "doc-3",
    title: "Slack setup checklist",
    type: "Checklist",
    updated: "2 days ago",
  },
];

export const teamMembers = [
  {
    id: "agent-main",
    name: "Main",
    role: "Orchestrator",
    status: "Active",
  },
  {
    id: "agent-blog",
    name: "Blog Publisher",
    role: "Content Ops",
    status: "Idle",
  },
  {
    id: "agent-n8n",
    name: "n8n Developer",
    role: "Workflow Builder",
    status: "Active",
  },
  {
    id: "agent-finance",
    name: "DexIQ Finance",
    role: "AP Automation",
    status: "Idle",
  },
];

export const missionStatement =
  "Build an autonomous organization of AI agents that operate 24/7 and deliver measurable value.";
