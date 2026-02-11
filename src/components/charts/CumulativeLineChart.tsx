"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ComposedChart } from "recharts";
import type { CumulativeDay, CumulativeByYear } from "@/lib/types";
import { CURRENT_YEAR } from "@/lib/constants";

interface CumulativeLineChartProps {
  currentYear: CumulativeDay[];
  prevYear: CumulativeByYear[];
}

export function CumulativeLineChart({ currentYear, prevYear }: CumulativeLineChartProps) {
  const prevMap = new Map(prevYear.map((d) => [d.doy, d.cumulative_km]));

  const data = currentYear.map((d) => ({
    doy: d.doy,
    actual: d.actual_cumulative_km,
    plan: d.plan_cumulative_km,
    prevYear: prevMap.get(d.doy) ?? null,
  }));

  return (
    <div className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] p-6">
      <h2 className="text-sm font-medium text-[var(--text-secondary)] mb-4">
        Kumulatywne kilometry — {CURRENT_YEAR}
      </h2>
      <ResponsiveContainer width="100%" height={280}>
        <ComposedChart data={data}>
          <defs>
            <linearGradient id="gradActual" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f97316" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#f97316" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="doy"
            tick={{ fill: "var(--text-muted)", fontSize: 11 }}
            axisLine={{ stroke: "var(--border)" }}
            tickLine={false}
            tickFormatter={(v) => {
              const d = new Date(CURRENT_YEAR, 0, v);
              return d.toLocaleDateString("pl-PL", { month: "short" });
            }}
            ticks={[1, 32, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335]}
          />
          <YAxis
            tick={{ fill: "var(--text-muted)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
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
              `${(value ?? 0).toLocaleString("pl-PL")} km`,
              name === "actual" ? CURRENT_YEAR : name === "prevYear" ? CURRENT_YEAR - 1 : "Plan",
            ]) as any}
            labelFormatter={(doy) => {
              const d = new Date(CURRENT_YEAR, 0, Number(doy));
              return d.toLocaleDateString("pl-PL", { day: "numeric", month: "long" });
            }}
          />
          <Area
            type="monotone"
            dataKey="actual"
            stroke="#f97316"
            strokeWidth={2.5}
            fill="url(#gradActual)"
          />
          <Line
            type="monotone"
            dataKey="plan"
            stroke="var(--text-muted)"
            strokeWidth={1.5}
            strokeDasharray="6 4"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="prevYear"
            stroke="#3b82f6"
            strokeWidth={1.5}
            strokeOpacity={0.6}
            dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
      <div className="flex items-center gap-6 mt-3 text-xs text-[var(--text-muted)]">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 bg-[#f97316] rounded" /> {CURRENT_YEAR}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 bg-[#3b82f6] rounded opacity-60" /> {CURRENT_YEAR - 1}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 border-t border-dashed border-[var(--text-muted)]" /> Plan
        </span>
      </div>
    </div>
  );
}
