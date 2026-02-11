"use client";

import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { DeltaBadge } from "@/components/ui/DeltaBadge";

interface StatCardProps {
  label: string;
  value: number;
  prevValue?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}

export function StatCard({ label, value, prevValue, decimals = 0, suffix = "", prefix = "" }: StatCardProps) {
  return (
    <div className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] p-4 hover:bg-[var(--bg-card-hover)] transition-colors">
      <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">{label}</div>
      <div className="flex items-end gap-2">
        <AnimatedNumber
          value={value}
          decimals={decimals}
          prefix={prefix}
          suffix={suffix}
          className="text-xl font-bold"
        />
        {prevValue !== undefined && (
          <DeltaBadge current={value} previous={prevValue} />
        )}
      </div>
    </div>
  );
}
