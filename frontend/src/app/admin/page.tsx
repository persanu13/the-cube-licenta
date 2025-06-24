import Chart from "@/components/statistics/chart";
import DisplayCard from "@/components/statistics/display-card";
import { ChartConfig } from "@/components/ui/chart";
import {
  getMonthlyUserCount,
  getRoleCounts,
  getWeeklyUserCount,
} from "@/lib/actions/user";
import { roundUpToNiceNumber } from "@/lib/utility";

export default async function Page() {
  const usersPerWeek = await getWeeklyUserCount();
  const usersPerMonth = await getMonthlyUserCount();
  const usersRoleCounts = await getRoleCounts();

  const chartDataWeek: { day: string; users: number }[] = Object.entries(
    usersPerWeek
  ).map(([day, count]) => ({
    day,
    users: Number(count),
  }));
  const maxValueWeek = roundUpToNiceNumber(
    Math.max(...chartDataWeek.map((d) => d.users))
  );

  const chartDataMonth: { month: string; users: number }[] = Object.entries(
    usersPerMonth
  ).map(([month, count]) => ({
    month,
    users: Number(count),
  }));
  const maxValueMonth = roundUpToNiceNumber(
    Math.max(...chartDataMonth.map((d) => d.users))
  );

  const chartConfig = {
    users: {
      label: "New users",
      color: "#FF6868",
    },
  } satisfies ChartConfig;

  return (
    <main className="flex flex-col h-full w-full gap-12 bg-bej-100 px-6 pt-6 pb-8 lg:px-12 overflow-auto">
      <h1 className="font-hanuman text-xl text-charade-950">Dashboard</h1>
      <div>
        <h1 className="font-hanuman text-[28px] font-bold text-tuatara-900">
          Users Statistics
        </h1>
        <div className="flex gap-8 flex-wrap mt-4">
          <DisplayCard
            name="Total Users"
            display={usersRoleCounts.total}
          ></DisplayCard>
          <DisplayCard
            name="Total Students"
            display={usersRoleCounts.student}
          ></DisplayCard>
          <DisplayCard
            name="Total Teachers"
            display={usersRoleCounts.teacher}
          ></DisplayCard>
          <DisplayCard
            name="Total Admins"
            display={usersRoleCounts.admin}
          ></DisplayCard>
        </div>
      </div>
      <div className="flex gap-8 flex-wrap">
        <div className="flex-col flex gap-4 flex-50">
          <h1 className="font-hanuman text-[28px] font-bold text-tuatara-900">
            New users per week
          </h1>
          <Chart
            chartData={chartDataWeek}
            xKey="day"
            yKey="users"
            chartConfig={chartConfig}
            yDomain={[0, maxValueWeek]}
          />
        </div>
        <div className="flex-col flex gap-4 flex-50">
          <h1 className="font-hanuman text-[28px] font-bold text-tuatara-900">
            New users per year
          </h1>
          <Chart
            chartData={chartDataMonth}
            xKey="month"
            yKey="users"
            chartConfig={chartConfig}
            yDomain={[0, maxValueMonth]}
          />
        </div>
      </div>
    </main>
  );
}
