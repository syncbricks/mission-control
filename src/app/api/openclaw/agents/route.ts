import { NextResponse } from "next/server";
import { loadOpenClawConfig } from "@/lib/openclaw";

export async function GET() {
  try {
    const config = loadOpenClawConfig();
    const agents = (config as any)?.agents?.list ?? [];
    return NextResponse.json({ ok: true, agents });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
