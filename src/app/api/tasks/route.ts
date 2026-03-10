import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { TaskStatus } from "@prisma/client";

export async function GET() {
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ ok: true, tasks });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const task = await prisma.task.create({
      data: {
        title: body.title,
        description: body.description || null,
        status: (body.status as TaskStatus) ?? TaskStatus.BACKLOG,
        assigneeId: body.assigneeId || null,
        assignee: body.assignee || null,
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
