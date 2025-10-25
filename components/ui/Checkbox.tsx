"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ id, label, error, className, ...props }, ref) => {
    const checkboxId = id ?? props.name ?? `checkbox-${label.replace(/\s+/g, "-")}`;

    return (
      <div className="w-full">
        <label
          htmlFor={checkboxId}
          className="flex items-start gap-3 text-sm text-foreground/80"
        >
          <input
            id={checkboxId}
            ref={ref}
            type="checkbox"
            className={cn(
              "mt-1 h-5 w-5 rounded border-foreground/25 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
              className,
            )}
            {...props}
          />
          <span>{label}</span>
        </label>
        {error && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";
