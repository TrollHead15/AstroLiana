interface RateLimitBucket {
  tokens: number;
  lastRefillTime: number;
}

const buckets: Map<string, RateLimitBucket> = new Map();

const RATE_LIMIT_TOKENS = 5; // 5 requests
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute in milliseconds

export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  let bucket = buckets.get(ip);

  if (!bucket) {
    // First request from this IP
    bucket = {
      tokens: RATE_LIMIT_TOKENS - 1,
      lastRefillTime: now
    };
    buckets.set(ip, bucket);
    return true;
  }

  // Refill tokens based on time elapsed
  const timePassed = now - bucket.lastRefillTime;
  const tokensToAdd = (timePassed / RATE_LIMIT_WINDOW) * RATE_LIMIT_TOKENS;

  bucket.tokens = Math.min(RATE_LIMIT_TOKENS, bucket.tokens + tokensToAdd);
  bucket.lastRefillTime = now;

  if (bucket.tokens >= 1) {
    bucket.tokens -= 1;
    return true;
  }

  return false;
}

export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp;
  }

  // Fallback - this will be localhost for development
  return "127.0.0.1";
}

// Cleanup old buckets periodically (optional)
setInterval(
  () => {
    const now = Date.now();
    for (const [ip, bucket] of buckets.entries()) {
      // Remove buckets that haven't been used in 30 minutes
      if (now - bucket.lastRefillTime > 30 * 60 * 1000) {
        buckets.delete(ip);
      }
    }
  },
  10 * 60 * 1000
); // Cleanup every 10 minutes
