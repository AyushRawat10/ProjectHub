import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  children: ReactNode;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-secondary hover:bg-tertiary",
  secondary:
    "bg-secondary/40 text-neutral hover:bg-secondary",
  outline:
    "border border-line bg-paper text-neutral hover:bg-secondary/40",
  ghost:
    "text-muted hover:bg-secondary/40 hover:text-neutral",
  danger:
    "border border-red-200 bg-red-50 text-red-700 hover:bg-red-100",
};

export default function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}