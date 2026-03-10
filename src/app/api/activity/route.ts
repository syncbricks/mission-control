import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const activity = await prisma.activity.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  return NextResponse.json({ ok: true, activity });
}
