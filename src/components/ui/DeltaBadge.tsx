"use client";

import { cn } from "@/lib/utils";

interface DeltaBadgeProps {
  current: number;
  previous: number;
  suffix?: string;
  invert?: boolean;
}

export function DeltaBadge({ current, previous, suffix = "%", invert = false }: DeltaBadgeProps) {
  if (previous === 0) return <span className="text-xs text-[var(--text-muted)]">—</span>;

  const pct = ((current - previous) / previous) * 100;
  const isPositive = invert ? pct <= 0 : pct >= 0;
  const isNeutral = Math.abs(pct) < 1;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 text-xs font-medium rounded-full px-2 py-0.5",
        isNeutral && "bg-[var(--border)] text-[var(--text-secondary)]",
        !isNeutral && isPositive && "bg-emerald-500/15 text-emerald-400",
        !isNeutral && !isPositive && "bg-red-500/15 text-red-400"
      )}
    >
      {pct >= 0 ? "+" : ""}
      {pct.toFixed(0)}
      {suffix}
    </span>
  );
}
