import React, { forwardRef } from 'react';
import InputMask from 'react-input-mask';

interface TimeInputProps {
  label: string;
  error?: string;
  helperText?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  id?: string;
}

export const TimeInput = forwardRef<HTMLInputElement, TimeInputProps>(
  ({ label, error, helperText, value, onChange, onBlur, placeholder, required, id }, ref) => {
    return (
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <InputMask
          mask="99:99"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder || 'HH:MM'}
        >
          {(inputProps: any) => (
            <input
              {...inputProps}
              ref={ref}
              type="text"
              id={id}
              className={`w-full px-4 py-3 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                error
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-purple-500'
              }`}
              aria-label={label}
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
            />
          )}
        </InputMask>
        {helperText && !error && (
          <p id={`${id}-helper`} className="mt-1 text-sm text-gray-500">
            {helperText}
          </p>
        )}
        {error && (
          <p id={`${id}-error`} className="mt-1 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

TimeInput.displayName = 'TimeInput';
