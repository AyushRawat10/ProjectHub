import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  helperText?: string;
};

export default function Input({
  label,
  error,
  helperText,
  className = "",
  id,
  ...props
}: InputProps) {
  const inputId = id ?? props.name;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-sm font-medium text-neutral"
        >
          {label}
        </label>
      )}

      <input
        id={inputId}
        className={`w-full rounded-lg border bg-panel px-3 py-2.5 text-sm text-neutral outline-none transition-colors placeholder:text-muted/70 ${
          error
            ? "border-red-300 focus:border-red-500"
            : "border-line focus:border-primary"
        } ${className}`}
        {...props}
      />

      {error ? (
        <p className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      ) : helperText ? (
        <p className="mt-1.5 text-xs text-muted">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}