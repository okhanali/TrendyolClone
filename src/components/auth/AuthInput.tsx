'use client';

import { Eye, EyeOff } from 'lucide-react';
import { FC, useState } from 'react';

interface AuthInputProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  formik: any;
}

const AuthInput: FC<AuthInputProps> = ({ id, label, type = 'text', placeholder, formik }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  const hasError = formik.touched[id] && formik.errors[id];

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={id}
          type={inputType}
          placeholder={placeholder}
          className={`w-full border p-3 rounded-md outline-none transition-colors ${
            hasError
              ? 'border-red-500 bg-red-50 focus:border-red-500'
              : 'border-gray-300 focus:border-orange-500'
          } ${isPassword ? 'pr-10' : ''}`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[id]}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer transition-colors"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>

      {hasError && (
        <span className="text-xs text-red-500 font-medium animate-in slide-in-from-top-1">
          {formik.errors[id]}
        </span>
      )}
    </div>
  );
};

export default AuthInput;
