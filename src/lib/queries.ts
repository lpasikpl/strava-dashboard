import { supabase } from "./supabase";
import type {
  YtdProgress, CumulativeDay, CumulativeByYear,
  MonthlyYoy, YearlyByType, WeeklyNpHr, NpHrByYear,
  TrainingLoadDay, WeeklySummary, Activity, DashboardData,
} from "./types";

const CURRENT_YEAR = new Date().getFullYear();

export async function fetchYtdProgress(): Promise<YtdProgress | null> {
  const { data } = await supabase.from("ytd_progress").select("*").single();
  return data;
}

export async function fetchCumulativeDaily(): Promise<CumulativeDay[]> {
  const { data } = await supabase.from("ytd_cumulative_daily").select("*").order("doy");
  return data ?? [];
}

export async function fetchCumulativeByYear(year: number): Promise<CumulativeByYear[]> {
  const { data } = await supabase.rpc("get_cumulative_by_year", { target_year: year });
  return data ?? [];
}

export async function fetchMonthlyYoy(): Promise<MonthlyYoy[]> {
  const { data } = await supabase
    .from("monthly_yoy")
    .select("*")
    .in("year", [CURRENT_YEAR, CURRENT_YEAR - 1])
    .order("year", { ascending: false })
    .order("month", { ascending: false });
  return data ?? [];
}

export async function fetchYearlyByType(): Promise<YearlyByType[]> {
  const { data } = await supabase
    .from("yearly_by_type")
    .select("*")
    .in("year", [CURRENT_YEAR, CURRENT_YEAR - 1])
    .order("year", { ascending: false });
  return data ?? [];
}

export async function fetchWeeklyNpHr(): Promise<WeeklyNpHr[]> {
  const { data } = await supabase
    .from("weekly_np_hr")
    .select("*")
    .order("week_start", { ascending: false })
    .limit(52);
  return (data ?? []).reverse();
}

export async function fetchNpHrByYear(year: number): Promise<NpHrByYear[]> {
  const { data } = await supabase.rpc("get_np_hr_by_year", { target_year: year });
  return data ?? [];
}

export async function fetchTrainingLoad(): Promise<TrainingLoadDay[]> {
  const { data } = await supabase.from("training_load_trend").select("*").order("day");
  return data ?? [];
}

export async function fetchWeeklySummaries(limit = 12): Promise<WeeklySummary[]> {
  const { data } = await supabase
    .from("weekly_summary")
    .select("*")
    .order("week_start", { ascending: false })
    .limit(limit);
  return (data ?? []).reverse();
}

export async function fetchRecentActivities(limit = 20): Promise<Activity[]> {
  const { data } = await supabase
    .from("activities")
    .select("id,strava_activity_id,name,sport_type,start_date,elapsed_time_seconds,moving_time_seconds,distance_meters,total_elevation_gain,average_speed,average_watts,normalized_power,intensity_factor,tss,effective_tss,average_heartrate,max_heartrate,has_power_data")
    .eq("is_ride", true)
    .order("start_date", { ascending: false })
    .limit(limit);
  return data ?? [];
}

export async function fetchDashboardData(): Promise<DashboardData> {
  const [
    ytdProgress,
    cumulativeDaily,
    cumulativePrevYear,
    monthlyYoy,
    yearlyByType,
    weeklyNpHr,
    npHrCurrentYear,
    npHrPrevYear,
    trainingLoad,
    weeklySummaries,
    recentActivities,
  ] = await Promise.all([
    fetchYtdProgress(),
    fetchCumulativeDaily(),
    fetchCumulativeByYear(CURRENT_YEAR - 1),
    fetchMonthlyYoy(),
    fetchYearlyByType(),
    fetchWeeklyNpHr(),
    fetchNpHrByYear(CURRENT_YEAR),
    fetchNpHrByYear(CURRENT_YEAR - 1),
    fetchTrainingLoad(),
    fetchWeeklySummaries(),
    fetchRecentActivities(),
  ]);

  return {
    ytdProgress,
    cumulativeDaily,
    cumulativePrevYear,
    monthlyYoy,
    yearlyByType,
    weeklyNpHr,
    npHrCurrentYear,
    npHrPrevYear,
    trainingLoad,
    weeklySummaries,
    recentActivities,
  };
}
