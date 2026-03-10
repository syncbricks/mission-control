import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { TaskStatus } from "@prisma/client";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const task = await prisma.task.update({
      where: { id: params.id },
      data: {
        title: body.title,
        description: body.description,
        status: body.status as TaskStatus,
        assigneeId: body.assigneeId,
        assignee: body.assignee,
      },
    });
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
  { params }: { params: { id: string } }
) {
  try {
    await prisma.task.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
