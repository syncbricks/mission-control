import fs from "fs";
import path from "path";
import os from "os";

export type OpenClawConfig = Record<string, unknown>;

const REDACT_KEYS = ["token", "secret", "password", "apiKey", "appToken", "botToken"];

function redactValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(redactValue);
  }
  if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>).map(
      ([key, val]) => {
        const shouldRedact = REDACT_KEYS.some((k) =>
          key.toLowerCase().includes(k.toLowerCase())
        );
        return [key, shouldRedact ? "__REDACTED__" : redactValue(val)];
      }
    );
    return Object.fromEntries(entries);
  }
  return value;
}

export function loadOpenClawConfig(): OpenClawConfig {
  const configPath = path.join(os.homedir(), ".openclaw", "openclaw.json");
  if (!fs.existsSync(configPath)) {
    throw new Error("OpenClaw config not found at ~/.openclaw/openclaw.json");
  }
  const raw = fs.readFileSync(configPath, "utf-8");
  const parsed = JSON.parse(raw) as OpenClawConfig;
  return redactValue(parsed) as OpenClawConfig;
}

export function getGatewaySummary(config: OpenClawConfig) {
  const gateway = (config as any).gateway ?? {};
  return {
    mode: gateway.mode ?? "unknown",
    bind: gateway.bind ?? "unknown",
    port: gateway.port ?? 18789,
    remoteUrl: gateway.remote?.url ?? null,
  };
}
