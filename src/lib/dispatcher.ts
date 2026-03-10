import { prisma } from "@/lib/db";
import { invokeGatewayTool } from "@/lib/openclaw-gateway";
import { ApprovalStatus, ExecutionStatus } from "@prisma/client";

async function getAgentSessionKey(agentId: string) {
  const sessions = await invokeGatewayTool({
    tool: "sessions_list",
    args: { kinds: ["agent"], limit: 100 },
  });
  const list = sessions?.sessions ?? sessions ?? [];
  const match = list.find((s: any) =>
    String(s.key || s.sessionKey || "").startsWith(`agent:${agentId}:`)
  );
  return match?.key || match?.sessionKey || null;
}

async function ensureAgentSession(agentId: string) {
  const existing = await getAgentSessionKey(agentId);
  if (existing) return existing;
  const spawned = await invokeGatewayTool({
    tool: "sessions_spawn",
    args: {
      runtime: "subagent",
      mode: "session",
      agentId,
      task: "Ready",
      thread: false,
    },
  });
  return spawned?.sessionKey || null;
}

export async function dispatchTask(taskId: string) {
  const task = await prisma.task.findUnique({ where: { id: taskId } });
  if (!task) throw new Error("Task not found");
  if (task.approvalStatus === ApprovalStatus.PENDING) {
    throw new Error("Task pending approval");
  }
  if (!task.assigneeId) throw new Error("Task has no assignee");

  const sessionKey = await ensureAgentSession(task.assigneeId);
  if (!sessionKey) throw new Error("Unable to open agent session");

  await invokeGatewayTool({
    tool: "sessions_send",
    args: {
      sessionKey,
      message:
        `New task assigned: ${task.title}\n` +
        (task.description ? `${task.description}\n` : "") +
        `Reply with progress updates and mark done when finished.`,
    },
  });

  await prisma.task.update({
    where: { id: taskId },
    data: { executionStatus: ExecutionStatus.RUNNING },
  });

  await prisma.activity.create({
    data: {
      taskId: taskId,
      agentId: task.assigneeId,
      type: "dispatch",
      message: `Dispatched to ${task.assigneeId}`,
    },
  });
}
