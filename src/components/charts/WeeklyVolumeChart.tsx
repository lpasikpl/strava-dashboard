"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { WeeklySummary } from "@/lib/types";
import { formatHours } from "@/lib/utils";

interface WeeklyVolumeChartProps {
  data: WeeklySummary[];
}

export function WeeklyVolumeChart({ data }: WeeklyVolumeChartProps) {
  const chartData = data.map((w) => ({
    label: `T${w.iso_week}`,
    tss: w.total_tss,
    hours: w.hours,
  }));

  return (
    <div className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] p-6">
      <h2 className="text-sm font-medium text-[var(--text-secondary)] mb-4">
        TSS tygodniowy — ostatnie 12 tyg.
      </h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fill: "var(--text-muted)", fontSize: 11 }}
            axisLine={{ stroke: "var(--border)" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "var(--text-muted)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              color: "var(--text-primary)",
              fontSize: 12,
            }}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formatter={((value: any, name: any) => [
              name === "tss" ? `${value ?? 0} TSS` : formatHours(value ?? 0),
              name === "tss" ? "TSS" : "Godziny",
            ]) as any}
          />
          <Bar dataKey="tss" fill="#f97316" radius={[4, 4, 0, 0]} name="tss" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
