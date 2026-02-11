"use client";

import type { Activity } from "@/lib/types";
import { formatDuration, getRideType, getRideColor, formatKm } from "@/lib/utils";

interface RecentRidesTableProps {
  data: Activity[];
}

export function RecentRidesTable({ data }: RecentRidesTableProps) {
  return (
    <div className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] overflow-hidden">
      <div className="px-6 py-4 border-b border-[var(--border)]">
        <h2 className="text-sm font-medium text-[var(--text-secondary)]">
          Ostatnie jazdy
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-[var(--text-muted)] uppercase tracking-wider border-b border-[var(--border)]">
              <th className="text-left px-6 py-3">Data</th>
              <th className="text-left px-4 py-3">Nazwa</th>
              <th className="text-left px-4 py-3">Typ</th>
              <th className="text-right px-4 py-3">km</th>
              <th className="text-right px-4 py-3">Czas</th>
              <th className="text-right px-4 py-3">Elev.</th>
              <th className="text-right px-4 py-3">NP</th>
              <th className="text-right px-4 py-3">IF</th>
              <th className="text-right px-4 py-3">TSS</th>
              <th className="text-right px-6 py-3">HR</th>
            </tr>
          </thead>
          <tbody>
            {data.map((ride) => {
              const type = getRideType(ride.sport_type);
              const color = getRideColor(ride.sport_type);
              return (
                <tr
                  key={ride.id}
                  className="border-t border-[var(--border)] hover:bg-[var(--bg-card-hover)] transition-colors"
                >
                  <td className="px-6 py-3 text-[var(--text-secondary)] whitespace-nowrap">
                    {new Date(ride.start_date).toLocaleDateString("pl-PL", {
                      day: "numeric",
                      month: "short",
                    })}
                  </td>
                  <td className="px-4 py-3 font-medium max-w-[200px] truncate">
                    {ride.name}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: `${color}20`, color }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
                      {type}
                    </span>
                  </td>
                  <td className="text-right px-4 py-3">
                    {(ride.distance_meters / 1000).toFixed(1)}
                  </td>
                  <td className="text-right px-4 py-3 text-[var(--text-secondary)]">
                    {formatDuration(ride.moving_time_seconds)}
                  </td>
                  <td className="text-right px-4 py-3">
                    {formatKm(ride.total_elevation_gain)}m
                  </td>
                  <td className="text-right px-4 py-3 font-medium">
                    {ride.normalized_power ? `${ride.normalized_power}W` : "—"}
                  </td>
                  <td className="text-right px-4 py-3">
                    {ride.intensity_factor?.toFixed(2) ?? "—"}
                  </td>
                  <td className="text-right px-4 py-3">
                    {ride.effective_tss ?? "—"}
                  </td>
                  <td className="text-right px-6 py-3 text-[var(--text-secondary)]">
                    {ride.average_heartrate ? `${Math.round(ride.average_heartrate)}` : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
