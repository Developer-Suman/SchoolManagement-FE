"use client";
import { JSX, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { BellDot } from "lucide-react";
import ThemeToggle from "@/context/Theme/ToggleTheme";
type Props = {
  title: string;
};

const TitleHeader = ({ title }: Props) => {
  const pathname = usePathname();
  const pathParts = pathname.split("/").filter(Boolean);
  const [openNotification, setOpenNotification] = useState(false);
  const toggleNotificationVisibility = () => {
    setOpenNotification(!openNotification);
  };
  const dropdownRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <header className="mb-4 py-4 px-8 font-bold dark:bg-[#353535] dark:text-white bg-white text-lg flex justify-between border-b border-l border-r border-[#ECECEC]">
        <h1 className="">
          {`${title}`}
          <div className="text-xs font-bold text-[#035BBA]">
            {pathParts.map((part, index) => {
              const partialPath = "/" + pathParts.slice(0, index + 1).join("/");

              if (index === pathParts.length - 2) {
                return null;
              }

              const uuidRegex =
                /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
              if (uuidRegex.test(part)) {
                return null;
              }

              return (
                <Link href={partialPath} key={index + 1}>
                  <span>/{`${part}`}</span>
                </Link>
              );
            })}
          </div>
        </h1>

        <div className="flex justify-end gap-3 ">
          <button
            type="button"
            className=" dark:bg-[#d5d5d52d] p-3 rounded-[50rem] bg-gray-100 "
          >
            <BellDot
              size={23}
              className="text-black dark:text-white"
              onClick={toggleNotificationVisibility}
            />
          </button>
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </header>
      {openNotification && (
        <div
          ref={dropdownRef}
          className="absolute top-[4.5rem] mt-[-1%] right-[1rem] sm:right-[5rem]
      min-w-[250px] sm:min-w-[300px] w-auto max-w-[420px] h-[28rem]
      bg-white border border-gray-200 rounded-md shadow-xl z-50
      dark:bg-[#0f0f0f] dark:border-[#272727] dark:text-white
      animate-fade-in overflow-y-auto"
        >
          <div className="sticky top-0 bg-white dark:bg-[#0f0f0f] px-4 py-3 border-b border-gray-200 dark:border-[#272727] flex justify-between items-center">
            <h2 className="text-base font-semibold">Notifications</h2>
          </div>

          <ul className="divide-y divide-gray-100 dark:divide-[#1e1e1e]">
            {[
              {
                icon: "🧾",
                title: "New Student Added",
                desc: "Purchase #PCH-102 created successfully.",
                time: "5 min ago",
              },
            ].map((n, i) => (
              <li
                key={i}
                className="flex gap-3 items-start px-4 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-[#1c1c1c] transition"
              >
                <div className="text-xl">{n.icon}</div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium leading-tight">
                    {n.title}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-snug">
                    {n.desc}
                  </p>
                  <span className="text-[11px] text-gray-400 dark:text-gray-500">
                    {n.time}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
export default TitleHeader;
