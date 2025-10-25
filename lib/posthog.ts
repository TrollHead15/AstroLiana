import { randomUUID } from "crypto";

type EventProperties = Record<string, unknown>;

function resolveHost(): string {
  const host = process.env.POSTHOG_HOST?.trim();
  if (!host) {
    return "https://app.posthog.com";
  }

  return host.endsWith("/") ? host.slice(0, -1) : host;
}

function resolveDistinctId(properties: EventProperties): string {
  const email = properties?.email;
  if (typeof email === "string" && email.length > 0) {
    return email;
  }

  const name = properties?.name;
  if (typeof name === "string" && name.length > 0) {
    return name;
  }

  return randomUUID();
}

export async function captureServerEvent(
  event: string,
  properties: EventProperties = {},
): Promise<void> {
  const apiKey = process.env.POSTHOG_API_KEY;

  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "POSTHOG_API_KEY is not configured; skipping server analytics event",
      );
    }
    return;
  }

  const endpoint = `${resolveHost()}/capture/`;
  const payload = {
    api_key: apiKey,
    event,
    distinct_id: resolveDistinctId(properties),
    properties: {
      source: "server",
      ...properties,
    },
  };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      console.error(
        `[posthog] Failed to log event ${event}: ${response.status} ${errorText}`.trim(),
      );
    }
  } catch (error) {
    console.error(`[posthog] Unexpected error while logging ${event}`, error);
  }
}
