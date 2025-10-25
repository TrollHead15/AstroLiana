"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, error, helperText, className, required, ...props }, ref) => {
    const inputId = id ?? props.name ?? `input-${label.replace(/\s+/g, "-")}`;

    return (
      <div className="w-full">
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-foreground/80"
        >
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
        <input
          id={inputId}
          ref={ref}
          required={required}
          className={cn(
            "mt-2 w-full rounded-lg border bg-white px-4 py-3 font-body text-base transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
            error
              ? "border-red-500 focus-visible:ring-red-500"
              : "border-foreground/15 focus-visible:border-primary/40",
            props.disabled && "cursor-not-allowed opacity-60",
            className,
          )}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? `${inputId}-error` : helperText ? `${inputId}-description` : undefined
          }
          {...props}
        />
        {helperText && !error && (
          <p id={`${inputId}-description`} className="mt-1 text-sm text-foreground/60">
            {helperText}
          </p>
        )}
        {error && (
          <p id={`${inputId}-error`} className="mt-1 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
