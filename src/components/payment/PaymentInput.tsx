'use client';

import { FC, InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const PaymentInput: FC<Props> = ({ label, className, error, ...props }) => {
  const inputId = props.id || props.name;

  return (
    <div className={`flex flex-col gap-1 w-full ${className || ''}`}>
      <label
        htmlFor={inputId}
        className="text-[11px] sm:text-xs font-semibold text-gray-600 ml-1 uppercase cursor-pointer"
      >
        {label}
      </label>
      <input
        id={inputId}
        {...props}
        className={`border p-3 rounded-lg outline-none transition-all w-full placeholder:text-gray-300 text-sm sm:text-base ${
          error
            ? 'border-red-500 focus:ring-1 focus:ring-red-500'
            : 'border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500'
        }`}
      />
      {error && <span className="text-[10px] text-red-500 ml-1 animate-pulse">{error}</span>}
    </div>
  );
};

export default PaymentInput;
