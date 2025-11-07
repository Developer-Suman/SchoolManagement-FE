"use client";
import { TrendingUp } from "lucide-react";
import { Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
export const description = "A donut chart with an active sector";
const chartData = [
  { browser: "Reliance", visitors: 275, fill: "#C5EACC" },
  { browser: "Damak Technical", visitors: 200, fill: "#F6D1B5" },
  { browser: "Sidhartha", visitors: 187, fill: "#C2D4FB" },
  { browser: "Mother", visitors: 173, fill: "#F3C2C2" },
  { browser: "other", visitors: 90, fill: "000000" },
];
const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  reliance: {
    label: "Reliance",
    color: "var(--chart-1)",
  },
  damakTechnical: {
    label: "Damak Technical",
    color: "var(--chart-2)",
  },
  sidhartha: {
    label: "Sidhartha",
    color: "var(--chart-3)",
  },
  mother: {
    label: "Mother",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;
export default function PieChartSection() {
  return (
    <div className=" w-full bg-background text-text rounded-lg shadow-md p-5 border border-green-700 h-full">
      <Card className="flex flex-col gap-0 h-full">
        <CardHeader className="items-center pb-0">
          <CardTitle>System Activity</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0 ">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="visitors"
                nameKey="browser"
                innerRadius={60}
                strokeWidth={5}
                activeIndex={0}
                activeShape={({
                  outerRadius = 0,
                  ...props
                }: PieSectorDataItem) => (
                  <Sector {...props} outerRadius={outerRadius + 10} />
                )}
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 leading-none font-medium">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground leading-none">
            Showing total Revenue in $ for the last 6 months
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
