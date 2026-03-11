import { NextResponse } from "next/server";
import { invokeGatewayTool } from "@/lib/openclaw-gateway";

export async function GET() {
  try {
    const result = await invokeGatewayTool({
      tool: "cron",
      args: { action: "list", includeDisabled: true },
    });
    return NextResponse.json({ ok: true, jobs: result?.jobs ?? result ?? [] });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
