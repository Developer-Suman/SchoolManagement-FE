"use client";
import { BriefcaseBusiness, Bus, DollarSign, School, User } from "lucide-react";
import StatCard from "./StatCard";
import BarChartSection from "./BarChart";
import PieChartSection from "./PieChart";

const Dashboard: React.FC = () => {
  return (
    <div className=" bg-[#FBFBFB] dark:bg-[#0A0A0A] ">
      <div className="px-6 flex flex-col gap-4">
        <div className="lg:w-full flex-none">
          <StatCard
            cards={[
              {
                cardHead: "Total Students",
                cardStats: "1200",
                cardIcon: <User className="text-green-400 text-4xl" />,
              },
              {
                cardHead: "Total Staffs",
                cardStats: "40",
                cardStyle: "!bg-orange-500/30",
                cardIcon: (
                  <BriefcaseBusiness className="text-orange-400 text-4xl" />
                ),
              },
              {
                cardHead: "Total Vehicle",
                cardStats: "5",
                cardStyle: "!bg-blue-500/30",
                cardIcon: <Bus className="text-blue-400 text-4xl" />,
              },
              {
                cardHead: "Total Revenue",
                cardStats: "500k",
                cardStyle: "!bg-red-500/30",
                cardIcon: <DollarSign className="text-red-400 text-4xl" />,
              },
              {
                cardHead: "Total ",
                cardStats: "5",
                cardStyle: "!bg-amber-500/30",
                cardIcon: <School className="text-amber-800 text-4xl" />,
              },
            ]}
          />
        </div>
        <div className="lg:w-full  flex space-x-6 h-[28rem]">
          <div className="w-[70%]">
            <BarChartSection />
          </div>
          <div className="w-[30%]">
            <PieChartSection />
          </div>
        </div>
        <div className="lg:w-full flex space-x-6 h-[20rem] ">
          <div className="w-[40%] ">
            <div className="relative h-full">
              <div className="relative h-full bg-white dark:bg-[#171717] backdrop-blur-sm p-8 rounded-2xl border border-[#4e97f1]">
                <div className="flex items-center justify-start gap-3 mb-6">
                  <h3 className="text-lg font-bold text-[#227ded] tracking-wider">
                    PACKAGE TYPE
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="bg-white/10 rounded-xl p-4 border border-[#4e97f1] ">
                      <p className="text-xs  uppercase tracking-wide mb-1">
                        Premium
                      </p>
                      <p className="text-2xl font-mono font-bold text-[#4e97f1] animate-pulse">
                        5
                      </p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4 border border-[#4e97f1]  mt-2">
                      <p className="text-xs  uppercase tracking-wide mb-1">
                        Basic
                      </p>
                      <p className="text-2xl font-mono font-bold text-emerald-400">
                        10
                      </p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-white/10 rounded-xl p-4 border border-[#4e97f1]">
                      <p className="text-xs  uppercase tracking-wide mb-1">
                        Gold
                      </p>
                      <p className="text-2xl font-mono font-bold text-yellow-400">
                        4
                      </p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4 border border-[#4e97f1] mt-2">
                      <p className="text-xs  uppercase tracking-wide mb-1">
                        Silver
                      </p>
                      <p className="text-2xl font-mono font-bold text-red-400">
                        20
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[60%]">
            <div className="relative h-full">
              <div className="relative h-full dark:bg-[#171717] bg-white backdrop-blur-sm p-8 rounded-2xl border border-[#4e97f1]">
                <div className="flex items-center justify-start gap-3 mb-6">
                  <h3 className="text-lg font-bold text-[#4e97f1] tracking-wider">
                    RECENT ACTIVITIES
                  </h3>
                </div>
                <div className="max-h-[12rem] overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-[#e6f0ff]">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#4e97f1] uppercase tracking-wider">
                          Activity
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#4e97f1] uppercase tracking-wider">
                          Time
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-[#353535]">
                      <tr className="hover:bg-[#f0f8ff] dark:hover:bg-gray-600  transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-white">
                          Purchased New Feature by Reliance School
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                          Oct 10, 2025
                        </td>
                      </tr>
                      <tr className="hover:bg-[#f0f8ff] transition-colors dark:hover:bg-gray-600 ">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-white">
                          Subscription about to expire of Mother School
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                          Oct 11, 2025
                        </td>
                      </tr>
                      <tr className="hover:bg-[#f0f8ff] transition-colors dark:hover:bg-gray-600 ">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-white">
                          Sidhartha School Started the Subscription
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                          Oct 11, 2025
                        </td>
                      </tr>
                      <tr className="hover:bg-[#f0f8ff] transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-white">
                          Subscription about to expire of Mother School
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                          Oct 11, 2025
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
