import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ApprovalStatus, ExecutionStatus, TaskStatus } from "@prisma/client";
import { dispatchTask } from "@/lib/dispatcher";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const task = await prisma.task.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        status: body.status as TaskStatus,
        assigneeId: body.assigneeId,
        assignee: body.assignee,
        executionStatus: body.executionStatus as ExecutionStatus,
        approvalStatus: body.approvalStatus as ApprovalStatus,
      },
    });

    if (body.approvalStatus === ApprovalStatus.APPROVED) {
      await prisma.task.update({
        where: { id },
        data: { executionStatus: ExecutionStatus.QUEUED },
      });
      await dispatchTask(id);
    }

    return NextResponse.json({ ok: true, task });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.task.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
