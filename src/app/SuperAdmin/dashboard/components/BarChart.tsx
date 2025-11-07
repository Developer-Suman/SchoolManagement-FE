"use client";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import { useTheme } from "@/context/Theme/ThemeContext";

const mode = [
  { id: 1, name: "Attendance" },
  { id: 2, name: "Revenue" },
  { id: 3, name: "Income" },
];
const time = [
  { id: 1, name: "Today" },
  { id: 2, name: "This week" },
  { id: 3, name: "This Month" },
  { id: 4, name: "This Year" },
];
export default function BarChartSection() {
  const [selectedMode, setSelectedMode] = useState(mode[0]);
  const [selectedTime, setSelectedTime] = useState(time[0]);
  const chartData = useMemo(() => {
    switch (selectedMode.name) {
      case "Attendance":
        if (selectedTime.name === "Today") {
          return [
            { name: "10 AM", value: 30 },
            { name: "12 PM", value: 45 },
            { name: "2 PM", value: 20 },
            { name: "4 PM", value: 60 },
          ];
        } else if (selectedTime.name === "This week") {
          return [
            { name: "Mon", value: 120 },
            { name: "Tue", value: 150 },
            { name: "Wed", value: 80 },
            { name: "Thu", value: 170 },
            { name: "Fri", value: 200 },
          ];
        } else if (selectedTime.name === "This Month") {
          return [
            { name: "Week 1", value: 500 },
            { name: "Week 2", value: 650 },
            { name: "Week 3", value: 420 },
            { name: "Week 4", value: 700 },
          ];
        } else {
          return [
            { name: "Q1", value: 1200 },
            { name: "Q2", value: 1450 },
            { name: "Q3", value: 980 },
            { name: "Q4", value: 1600 },
          ];
        }

      case "Revenue":
        if (selectedTime.name === "Today") {
          return [
            { name: "10 AM", value: 300 },
            { name: "12 PM", value: 450 },
            { name: "2 PM", value: 200 },
            { name: "4 PM", value: 600 },
          ];
        } else if (selectedTime.name === "This week") {
          return [
            { name: "Mon", value: 1200 },
            { name: "Tue", value: 1500 },
            { name: "Wed", value: 800 },
            { name: "Thu", value: 1700 },
            { name: "Fri", value: 2000 },
          ];
        } else if (selectedTime.name === "This Month") {
          return [
            { name: "Week 1", value: 50002 },
            { name: "Week 2", value: 65000 },
            { name: "Week 3", value: 42000 },
            { name: "Week 4", value: 70021 },
          ];
        } else {
          return [
            { name: "Q1", value: 120021 },
            { name: "Q2", value: 145034 },
            { name: "Q3", value: 98021 },
            { name: "Q4", value: 160031 },
          ];
        }
        break;

      case "Income":
        if (selectedTime.name === "This Month") {
          return [
            { name: "Week 1", value: 5000 },
            { name: "Week 2", value: 6500 },
            { name: "Week 3", value: 4200 },
            { name: "Week 4", value: 7000 },
          ];
        } else if (selectedTime.name === "This Year") {
          return [
            { name: "Q1", value: 12000 },
            { name: "Q2", value: 14500 },
            { name: "Q3", value: 9800 },
            { name: "Q4", value: 16000 },
          ];
        } else if (selectedTime.name === "This Month") {
          return [
            { name: "Week 1", value: 5000 },
            { name: "Week 2", value: 6500 },
            { name: "Week 3", value: 4200 },
            { name: "Week 4", value: 7000 },
          ];
        } else {
          return [
            { name: "Q1", value: 12000 },
            { name: "Q2", value: 14500 },
            { name: "Q3", value: 9800 },
            { name: "Q4", value: 16000 },
          ];
        }
        break;

      default:
        return [];
    }
  }, [selectedMode, selectedTime]);
  const { theme } = useTheme();
  const barColor = theme === "dark" ? "#b0c2d5" : "#000000";

  return (
    <div className="w-full lg:flex-2  text-text rounded-lg shadow-md p-4 pr-8 border border-[#035BBA] h-full dark:bg-[#171717]">
      <div className="h-[10%]">
        <Listbox value={selectedMode} onChange={setSelectedMode}>
          <ListboxButton className="flex space-x-1 justify-center items-center float-left ml-4 border-1 border-[#035BBA] px-3 py-1 rounded text-[#035BBA] font-normal text-sm focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25">
            <div>{selectedMode.name}</div>
            <ChevronDown className="group pointer-events-none size-4 fill-white/60" />
          </ListboxButton>
          <ListboxOptions
            anchor="bottom"
            className="mt-2 shadow-xl rounded bg-white"
          >
            {mode.map((mode) => (
              <ListboxOption
                key={mode.id}
                value={mode}
                className="data-focus:bg-[#CCE3FC] rounded px-6 justify-center flex shadow-2xl cursor-pointer text-text text-sm p-1 "
              >
                {mode.name}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Listbox>
        <span className="m-5">Chart</span>
        <Listbox value={selectedTime} onChange={setSelectedTime}>
          <ListboxButton className=" float-right flex space-x-1 justify-center items-center border-1 border-[#035BBA] px-3 py-1 rounded text-[#035BBA] font-normal text-sm focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25">
            <div>{selectedTime.name}</div>
            <ChevronDown className="group pointer-events-none size-4 fill-white/60" />
          </ListboxButton>
          <ListboxOptions anchor="bottom" className="mt-2 shadow-xl bg-white">
            {time.map((time) => (
              <ListboxOption
                key={time.id}
                value={time}
                className="data-focus:bg-[#CCE3FC] rounded px-6 justify-center flex shadow-2xl cursor-pointer text-text text-sm p-1 "
              >
                {time.name}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Listbox>
      </div>
      <div className=" mt-4 h-full w-full">
        <ChartContainer
          className=" h-[90%] w-full"
          config={{
            value: {
              label: selectedMode.name,
              color: "hsl(var(--chart-1))",
            },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Bar dataKey="value" fill={barColor} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
}
