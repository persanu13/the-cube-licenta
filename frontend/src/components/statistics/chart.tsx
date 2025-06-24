"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type ChartProps = {
  chartData: Record<string, any>[];
  chartConfig: ChartConfig;
  xKey: string;
  yKey: string;
  yDomain?: [number, number]; // optional
};

export default function UserChart({
  chartData,
  chartConfig,
  xKey,
  yKey,
  yDomain,
}: ChartProps) {
  return (
    <ChartContainer
      config={chartConfig}
      className="min-h-[200px] w-full flex-50 border-2 bg-spring-white border-tuatara-900 py-4 pt-8 px-4  rounded-[8px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
    >
      <BarChart data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={xKey}
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value: string) => `${value.toString().slice(0, 3)}`}
        />
        <YAxis
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          domain={yDomain || [0, "auto"]}
          tickFormatter={(value: number) => `${value}`}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey={yKey} fill="#FF6868" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
