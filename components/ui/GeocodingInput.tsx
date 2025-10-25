"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useGeocodingAutocomplete } from "@/lib/hooks/useGeocodingAutocomplete";
import { cn } from "@/lib/utils";

interface GeocodingInputProps {
  id?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onSelect?: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

export const GeocodingInput = ({
  id,
  label,
  value,
  onChange,
  onSelect,
  placeholder,
  error,
  required,
  disabled,
}: GeocodingInputProps) => {
  const [inputValue, setInputValue] = useState(value ?? "");
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { suggestions, isLoading, error: geocodingError, clear } =
    useGeocodingAutocomplete(inputValue);

  useEffect(() => {
    setInputValue(value ?? "");
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const showSuggestions = useMemo(() => {
    return (
      isFocused &&
      !!inputValue &&
      suggestions.length > 0 &&
      !disabled
    );
  }, [isFocused, inputValue, suggestions.length, disabled]);

  const handleSelect = (selected: string) => {
    setInputValue(selected);
    onChange(selected);
    onSelect?.(selected);
    clear();
    setIsFocused(false);
  };

  return (
    <div className="w-full" ref={containerRef}>
      <label htmlFor={id} className="block text-sm font-medium text-foreground/80">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      <div className="relative mt-2">
        <input
          id={id}
          value={inputValue}
          onChange={(event) => {
            const nextValue = event.target.value;
            setInputValue(nextValue);
            onChange(nextValue);
            setIsFocused(true);
          }}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "w-full rounded-lg border bg-white px-4 py-3 font-body text-base transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
            error
              ? "border-red-500 focus-visible:ring-red-500"
              : "border-foreground/15 focus-visible:border-primary/40",
            disabled && "cursor-not-allowed opacity-60",
          )}
          autoComplete="off"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        {isLoading && !disabled && (
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-foreground/60">
            Загрузка…
          </div>
        )}
        {showSuggestions && (
          <ul className="absolute z-20 mt-2 max-h-60 w-full overflow-auto rounded-lg border border-foreground/10 bg-white shadow-lg">
            {suggestions.map((suggestion) => (
              <li key={suggestion.id}>
                <button
                  type="button"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => handleSelect(suggestion.placeName)}
                  className="w-full px-4 py-2 text-left text-sm text-foreground/90 transition hover:bg-primary/5"
                >
                  <span className="block font-medium text-foreground">{suggestion.name}</span>
                  <span className="block text-xs text-foreground/60">
                    {suggestion.placeName}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {(error || geocodingError) && (
        <p
          id={`${id}-error`}
          className="mt-1 text-sm text-red-600"
          role="alert"
        >
          {error ?? geocodingError}
        </p>
      )}
    </div>
  );
};
