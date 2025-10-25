import React, { forwardRef } from 'react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DatePickerInputProps {
  label: string;
  error?: string;
  selected: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  required?: boolean;
  id?: string;
}

export const DatePickerInput = forwardRef<DatePicker, DatePickerInputProps>(
  ({ label, error, selected, onChange, placeholder, required, id }, ref) => {
    return (
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <DatePicker
          ref={ref}
          selected={selected}
          onChange={onChange}
          dateFormat="dd.MM.yyyy"
          placeholderText={placeholder || 'Выберите дату'}
          className={`w-full px-4 py-3 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 ${
            error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-purple-500'
          }`}
          maxDate={new Date()}
          showYearDropdown
          showMonthDropdown
          dropdownMode="select"
          aria-label={label}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        {error && (
          <p id={`${id}-error`} className="mt-1 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

DatePickerInput.displayName = 'DatePickerInput';
