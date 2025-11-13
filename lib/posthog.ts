import { PostHog } from "posthog-node";

let posthogInstance: PostHog | null = null;

function getPostHogClient(): PostHog | null {
  const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;

  if (!apiKey) {
    console.warn("PostHog API key not configured. Analytics will be disabled.");
    return null;
  }

  if (!posthogInstance) {
    try {
      posthogInstance = new PostHog(apiKey, {
        host: process.env.POSTHOG_HOST,
        flushInterval: 5000
      });
    } catch (error) {
      console.error("Failed to initialize PostHog:", error);
      return null;
    }
  }

  return posthogInstance;
}

interface EventProperties {
  [key: string]: unknown;
}

async function captureEvent(
  eventName: string,
  distinctId: string,
  properties?: EventProperties
): Promise<void> {
  const client = getPostHogClient();
  if (!client) {
    return;
  }

  try {
    client.capture({
      distinctId,
      event: eventName,
      properties: properties || {}
    });
  } catch (error) {
    console.error(`Failed to capture PostHog event ${eventName}:`, error);
  }
}

export async function captureNatalChartSubmitted(
  distinctId: string,
  properties?: EventProperties
): Promise<void> {
  await captureEvent("natal_chart_submitted", distinctId, properties);
}

export async function captureChecklistSubmitted(
  distinctId: string,
  properties?: EventProperties
): Promise<void> {
  await captureEvent("checklist_submitted", distinctId, properties);
}

export async function captureGuideSubmitted(
  distinctId: string,
  properties?: EventProperties
): Promise<void> {
  await captureEvent("guide_submitted", distinctId, properties);
}

export async function flushPostHog(): Promise<void> {
  const client = getPostHogClient();
  if (client) {
    try {
      await client.flush();
    } catch (error) {
      console.error("Failed to flush PostHog:", error);
    }
  }
}
