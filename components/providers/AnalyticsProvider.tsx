"use client";

import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";

interface AnalyticsContextValue {
  trackEvent: (event: string, properties?: Record<string, unknown>) => void;
}

const AnalyticsContext = createContext<AnalyticsContextValue>({
  trackEvent: () => undefined,
});

interface AnalyticsProviderProps {
  children: ReactNode;
}

const getClientConfig = () => {
  const key =
    process.env.NEXT_PUBLIC_POSTHOG_KEY ??
    process.env.NEXT_PUBLIC_POSTHOG_API_KEY ??
    process.env.POSTHOG_API_KEY;

  const host =
    process.env.NEXT_PUBLIC_POSTHOG_HOST ??
    process.env.POSTHOG_HOST ??
    "https://app.posthog.com";

  return { key, host };
};

export const AnalyticsProvider = ({ children }: AnalyticsProviderProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const { key, host } = getClientConfig();

    if (!key) {
      return;
    }

    const globalObject = window as typeof window & {
      __posthogInitialized?: boolean;
    };

    if (globalObject.__posthogInitialized) {
      setIsReady(true);
      return;
    }

    posthog.init(key, {
      api_host: host,
      capture_pageview: false,
      capture_pageleave: false,
      persistence: "memory",
      loaded: () => {
        globalObject.__posthogInitialized = true;
        setIsReady(true);
      },
    });
  }, []);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    posthog.capture("page_viewed", {
      path: pathname,
      search: searchParams?.toString() ?? "",
      source: "client",
    });
  }, [isReady, pathname, searchParams]);

  const trackEvent = useCallback(
    (event: string, properties: Record<string, unknown> = {}) => {
      if (!isReady) {
        return;
      }

      posthog.capture(event, {
        source: "client",
        ...properties,
      });
    },
    [isReady],
  );

  const contextValue = useMemo(() => ({ trackEvent }), [trackEvent]);

  return (
    <AnalyticsContext.Provider value={contextValue}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => useContext(AnalyticsContext);
