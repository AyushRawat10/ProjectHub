import type { ReactNode } from "react";

type BadgeVariant =
  | "default"
  | "success"
  | "warning"
  | "danger"
  | "muted";

type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
};

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-secondary text-tertiary",
  success: "bg-secondary text-tertiary",
  warning: "bg-secondary text-tertiary",
  danger: "bg-red-50 text-red-600",
  muted: "bg-paper text-muted",
};

export default function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}