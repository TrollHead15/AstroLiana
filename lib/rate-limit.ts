export const RATE_LIMIT_WINDOW_MS = 60_000;
export const RATE_LIMIT_MAX_REQUESTS = 5;

const requestBuckets = new Map<string, number[]>();

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  reset: number;
}

function pruneOldEntries(timestamps: number[], now: number): number[] {
  return timestamps.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);
}

export function checkRateLimit(identifier: string | null): RateLimitResult {
  const now = Date.now();

  if (!identifier) {
    return {
      success: true,
      remaining: RATE_LIMIT_MAX_REQUESTS,
      reset: now + RATE_LIMIT_WINDOW_MS,
    };
  }

  const timestamps = pruneOldEntries(requestBuckets.get(identifier) ?? [], now);

  if (timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestBuckets.set(identifier, timestamps);

    return {
      success: false,
      remaining: 0,
      reset: timestamps[0] + RATE_LIMIT_WINDOW_MS,
    };
  }

  timestamps.push(now);
  requestBuckets.set(identifier, timestamps);

  return {
    success: true,
    remaining: RATE_LIMIT_MAX_REQUESTS - timestamps.length,
    reset: timestamps[0] + RATE_LIMIT_WINDOW_MS,
  };
}

export function buildRateLimitHeaders(
  result: RateLimitResult,
): Record<string, string> {
  return {
    "X-RateLimit-Limit": RATE_LIMIT_MAX_REQUESTS.toString(),
    "X-RateLimit-Remaining": Math.max(result.remaining, 0).toString(),
    "X-RateLimit-Reset": Math.ceil(result.reset / 1000).toString(),
  };
}

export function getRequestIdentifier(request: Request): string | null {
  const headerCandidates = [
    "x-forwarded-for",
    "x-real-ip",
    "cf-connecting-ip",
    "true-client-ip",
  ];

  for (const header of headerCandidates) {
    const value = request.headers.get(header);
    if (value) {
      return value.split(",")[0]?.trim() ?? null;
    }
  }

  return (request as unknown as { ip?: string | null })?.ip ?? null;
}
