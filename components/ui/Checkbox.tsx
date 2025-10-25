import React, { forwardRef, InputHTMLAttributes } from 'react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string | React.ReactNode;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        <label className="flex items-start cursor-pointer">
          <input
            type="checkbox"
            ref={ref}
            className={`mt-1 w-5 h-5 border-2 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
              error
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 text-purple-600'
            } ${className}`}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${props.id}-error` : undefined}
            {...props}
          />
          <span className="ml-3 text-sm text-gray-700">{label}</span>
        </label>
        {error && (
          <p id={`${props.id}-error`} className="mt-1 ml-8 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
