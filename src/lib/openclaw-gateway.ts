import { loadOpenClawConfig } from "@/lib/openclaw";

type InvokePayload = {
  tool: string;
  action?: string;
  args?: Record<string, unknown>;
  sessionKey?: string;
};

function getGatewayHttpBase() {
  const config = loadOpenClawConfig();
  const gateway = (config as any)?.gateway ?? {};
  const port = gateway.port ?? 18789;
  return `http://127.0.0.1:${port}`;
}

function getGatewayToken() {
  const config = loadOpenClawConfig();
  return (config as any)?.gateway?.auth?.token ?? null;
}

export async function invokeGatewayTool(payload: InvokePayload) {
  const token = getGatewayToken();
  if (!token) {
    throw new Error("Gateway token not found in config");
  }
  const base = getGatewayHttpBase();
  const res = await fetch(`${base}/tools/invoke`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok || data?.ok === false) {
    throw new Error(data?.error?.message || "Gateway tool invoke failed");
  }
  return data.result;
}
