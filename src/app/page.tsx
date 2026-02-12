import { fetchDashboardData } from "@/lib/queries";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { GoalProgressCard } from "@/components/cards/GoalProgressCard";
import { CumulativeLineChart } from "@/components/charts/CumulativeLineChart";
import { PeriodCompareRow } from "@/components/cards/PeriodCompareRow";
import { YearByTypeCard } from "@/components/cards/YearByTypeCard";
import { NpHrWeeklyChart } from "@/components/charts/NpHrWeeklyChart";
import { NpHrOverlayChart } from "@/components/charts/NpHrOverlayChart";
import { TrainingLoadChart } from "@/components/charts/TrainingLoadChart";
import { WeeklyVolumeChart } from "@/components/charts/WeeklyVolumeChart";
import { PowerZonesChart } from "@/components/charts/PowerZonesChart";
import { HrZonesChart } from "@/components/charts/HrZonesChart";
import { RecentRidesTable } from "@/components/tables/RecentRidesTable";

export const revalidate = 3600;

export default async function Home() {
  const data = await fetchDashboardData();

  return (
    <DashboardShell>
      {/* Sekcja A: Cel roczny */}
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-1">
            {data.ytdProgress && <GoalProgressCard data={data.ytdProgress} />}
          </div>
          <div className="lg:col-span-2">
            <CumulativeLineChart
              currentYear={data.cumulativeDaily}
              prevYear={data.cumulativePrevYear}
            />
          </div>
        </div>
      </section>

      {/* Sekcja B: YTD + Bieżący miesiąc */}
      <section className="space-y-6">
        <PeriodCompareRow data={data.ytdCompare} />
        <PeriodCompareRow data={data.monthPartialCompare} />
      </section>

      {/* Sekcja C: Sumy po typie */}
      <section>
        <YearByTypeCard data={data.yearlyByType} />
      </section>

      {/* Sekcja D: NP/HR */}
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <NpHrWeeklyChart data={data.weeklyNpHr} />
          <NpHrOverlayChart
            currentYear={data.npHrCurrentYear}
            prevYear={data.npHrPrevYear}
          />
        </div>
      </section>

      {/* Sekcja E: Obciążenie */}
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <TrainingLoadChart data={data.trainingLoad} />
          <WeeklyVolumeChart data={data.weeklySummaries} />
        </div>
      </section>

      {/* Sekcja F: Strefy */}
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <PowerZonesChart data={data.weeklySummaries} />
          <HrZonesChart data={data.weeklySummaries} />
        </div>
      </section>

      {/* Sekcja G: Tabela jazd */}
      <section>
        <RecentRidesTable data={data.recentActivities} />
      </section>
    </DashboardShell>
  );
}
