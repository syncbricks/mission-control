import { NextResponse } from "next/server";
import { getGatewaySummary, loadOpenClawConfig } from "@/lib/openclaw";

export async function GET() {
  try {
    const config = loadOpenClawConfig();
    const gateway = getGatewaySummary(config);
    return NextResponse.json({
      ok: true,
      gateway,
      config,
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
