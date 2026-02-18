"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from "recharts";
import type { WeeklySummary } from "@/lib/types";

interface WeeklyVolumeChartProps {
  data: WeeklySummary[];
}

function weekDateRange(weekStart: string): string {
  const start = new Date(weekStart);
  const end = new Date(start);
  end.setDate(end.getDate() + 6);

  const fmtDay = (d: Date) => d.getDate();
  const fmtMonth = (d: Date) => String(d.getMonth() + 1).padStart(2, "0");

  if (start.getMonth() === end.getMonth()) {
    return `${fmtDay(start)}–${fmtDay(end)}.${fmtMonth(end)}`;
  }
  return `${fmtDay(start)}.${fmtMonth(start)}–${fmtDay(end)}.${fmtMonth(end)}`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={{
      backgroundColor: "var(--bg-card)",
      border: "1px solid var(--border)",
      borderRadius: 8,
      padding: "8px 12px",
      fontSize: 12,
      color: "var(--text-primary)",
    }}>
      <div style={{ color: "var(--text-muted)", marginBottom: 4 }}>{d.dateRange}</div>
      <div><span style={{ color: "#f97316", fontWeight: 600 }}>{d.tss}</span> TSS</div>
    </div>
  );
}

export function WeeklyVolumeChart({ data }: WeeklyVolumeChartProps) {
  const now = new Date();
  const currentWeekStart = new Date(now);
  currentWeekStart.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  const currentWeekKey = currentWeekStart.toISOString().slice(0, 10);

  const chartData = data.map((w) => {
    const start = new Date(w.week_start);
    // Show month label only for first week of each month
    const isFirstWeekOfMonth = start.getDate() <= 7;
    const monthLabel = isFirstWeekOfMonth
      ? start.toLocaleDateString("pl-PL", { month: "short" }).replace(".", "") +
        (start.getFullYear() !== now.getFullYear() ? ` ${String(start.getFullYear()).slice(2)}` : "")
      : "";

    return {
      weekStart: w.week_start,
      label: monthLabel,
      tss: w.total_tss,
      dateRange: weekDateRange(w.week_start),
      isCurrent: w.week_start.slice(0, 10) === currentWeekKey,
    };
  });

  // Min 40px per bar so chart scrolls when many weeks
  const minWidth = Math.max(chartData.length * 40, 300);

  return (
    <div className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] p-6">
      <h2 className="text-sm font-medium text-[var(--text-secondary)] mb-4">
        TSS tygodniowy — od stycznia 2025
      </h2>
      <div className="overflow-x-auto">
        <div style={{ minWidth }}>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={chartData} margin={{ top: 18, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fill: "var(--text-muted)", fontSize: 11 }}
                axisLine={{ stroke: "var(--border)" }}
                tickLine={false}
                interval={0}
              />
              <YAxis
                tick={{ fill: "var(--text-muted)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={32}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--border)", opacity: 0.4 }} />
              <Bar dataKey="tss" radius={[3, 3, 0, 0]} name="tss" maxBarSize={32} fill="#f97316" opacity={0.85}>
                <LabelList
                  dataKey="tss"
                  position="top"
                  style={{ fill: "var(--text-muted)", fontSize: 9 }}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  formatter={(v: any) => (v > 0 ? v : "") as any}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
