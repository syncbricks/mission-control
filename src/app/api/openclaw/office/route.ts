import { NextResponse } from "next/server";
import { buildOfficeAgents } from "@/lib/office";

export async function GET() {
  try {
    const agents = await buildOfficeAgents();
    return NextResponse.json({ ok: true, agents });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
