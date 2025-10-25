"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface GeocodingFeature {
  id: string;
  name: string;
  placeName: string;
  coordinates: [number, number];
}

interface UseGeocodingAutocompleteOptions {
  debounceMs?: number;
  language?: string;
  limit?: number;
}

interface UseGeocodingAutocompleteReturn {
  suggestions: GeocodingFeature[];
  isLoading: boolean;
  error: string | null;
  clear: () => void;
}

function mapFeature(feature: any): GeocodingFeature | null {
  if (!feature || typeof feature !== "object") {
    return null;
  }

  const name = feature?.text;
  const placeName = feature?.place_name;
  const center = feature?.center;

  if (typeof name !== "string" || typeof placeName !== "string") {
    return null;
  }

  const coordinates: [number, number] | null =
    Array.isArray(center) && center.length === 2
      ? [Number(center[0]), Number(center[1])] as [number, number]
      : null;

  if (!coordinates || Number.isNaN(coordinates[0]) || Number.isNaN(coordinates[1])) {
    return null;
  }

  return {
    id: typeof feature.id === "string" ? feature.id : `${name}-${placeName}`,
    name,
    placeName,
    coordinates,
  };
}

export function useGeocodingAutocomplete(
  query: string,
  {
    debounceMs = 300,
    language = "ru",
    limit = 5,
  }: UseGeocodingAutocompleteOptions = {},
): UseGeocodingAutocompleteReturn {
  const [suggestions, setSuggestions] = useState<GeocodingFeature[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const queryRef = useRef<string>("");

  useEffect(() => {
    queryRef.current = query?.trim() ?? "";
  }, [query]);

  useEffect(() => {
    const value = queryRef.current;

    if (!value) {
      setSuggestions([]);
      setError(null);
      if (abortRef.current) {
        abortRef.current.abort();
      }
      setIsLoading(false);
      return;
    }

    const apiKey = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

    if (!apiKey) {
      console.warn("NEXT_PUBLIC_MAPBOX_API_KEY is not configured; autocomplete disabled");
      setSuggestions([]);
      setIsLoading(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    const controller = new AbortController();
    abortRef.current = controller;

    const handler = setTimeout(async () => {
      try {
        const endpoint =
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(value)}.json` +
          `?access_token=${apiKey}` +
          `&autocomplete=true` +
          `&language=${language}` +
          `&types=place%2Clocality%2Cregion` +
          `&limit=${limit}`;

        const response = await fetch(endpoint, { signal: controller.signal });

        if (!response.ok) {
          const errorText = await response.text().catch(() => "");
          throw new Error(`Geocoding failed: ${response.status} ${errorText}`.trim());
        }

        const data = await response.json();
        const features = Array.isArray(data?.features)
          ? data.features
              .map(mapFeature)
              .filter((feature): feature is GeocodingFeature => Boolean(feature))
          : [];

        setSuggestions(features);
      } catch (fetchError) {
        if ((fetchError as Error).name === "AbortError") {
          return;
        }

        console.error("[geocoding]", fetchError);
        setError("Не удалось получить подсказки. Попробуйте позже");
        setSuggestions([]);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }, debounceMs);

    return () => {
      clearTimeout(handler);
      controller.abort();
    };
  }, [debounceMs, language, limit, query]);

  const clear = useCallback(() => {
    setSuggestions([]);
    setError(null);
    if (abortRef.current) {
      abortRef.current.abort();
    }
  }, []);

  return useMemo(
    () => ({
      suggestions,
      isLoading,
      error,
      clear,
    }),
    [suggestions, isLoading, error, clear],
  );
}
