import type { ReactNode } from "react";

type StatCardProps = {
  label: string;
  value: string;
  description: string;
  icon: ReactNode;
};

export default function StatCard({
  label,
  value,
  description,
  icon,
}: StatCardProps) {
  return (
    <div className="rounded-xl border border-line bg-panel p-5">
      <div className="mb-7 flex items-start justify-between">
        <p className="text-xs font-medium uppercase tracking-wide text-muted">
          {label}
        </p>

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/60 text-primary">
          {icon}
        </div>
      </div>

      <div className="flex items-baseline gap-2">
        <span className="font-display text-4xl font-semibold">
          {value}
        </span>
      </div>

      <p className="mt-2 text-sm text-muted">
        {description}
      </p>
    </div>
  );
}