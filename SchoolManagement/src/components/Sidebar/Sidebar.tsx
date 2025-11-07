/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Icon } from "@iconify/react";
import React, { useState, useEffect } from "react";
import adi from "@/assets/adi.jpg";
import {
  BadgeCent,
  Banknote,
  BookCheck,
  BookOpen,
  BriefcaseBusiness,
  Calculator,
  ChevronDown,
  ChevronRight,
  Factory,
  Hand,
  LogOut,
  LucideProps,
  NotebookPen,
  SheetIcon,
  User,
  UserCog,
  Users,
  Home,
  Navigation,
  School,
  LockKeyholeOpen,
  Settings,
} from "lucide-react";
import { ISidebar } from "@/types/ISidebar";
import { usePermissions } from "@/context/auth/PermissionContext";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import DialogButton from "../Buttons/DialogButton";
import { useSidebar } from "@/context/SidebarContext";
import Image from "next/image";

type Props = {
  sideBarItems: ISidebar;
};

const Sidebar: React.FC<Props> = ({ sideBarItems }: Props) => {
  const { setMenuStatus } = usePermissions();
  const { isOpen } = useSidebar();
  let role = "";
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [activeSubModule, setActiveSubModule] = useState<string | null>(null);
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);
  const pathAfterFirst = `/${parts.slice(1).join("/")}`;
  const navigate = useRouter();
  const storedUser = localStorage.getItem("userDetails");

  if (storedUser) {
    try {
      const parsedUser = JSON.parse(storedUser);
      role = parsedUser.role;
    } catch (error) {
      console.error("Failed to parse user details:", error);
    }
  }

  const withRolePrefix = (path: string) => {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;

    let prefix;
    if (role === "superadmin") {
      prefix = "SuperAdmin";
    } else if (role === "admin") prefix = "Admin";
    else prefix = "endUser";
    return `/${prefix?.toLowerCase()}${cleanPath}`;
  };

  useEffect(() => {
    if (role === "superadmin" || role === "developeruser") {
      setMenuStatus([
        {
          menuName: "add",
          isActive: true,
          submoduleId: "",
          icon: "",
          targetUrl: "",
          role: "",
          rank: 0,
        },
        {
          menuName: "edit",
          isActive: true,
          submoduleId: "",
          icon: "",
          targetUrl: "",
          role: "",
          rank: 0,
        },
        {
          menuName: "delete",
          isActive: true,
          submoduleId: "",
          icon: "",
          targetUrl: "",
          role: "",
          rank: 0,
        },
        {
          menuName: "assign",
          isActive: true,
          submoduleId: "",
          icon: "",
          targetUrl: "",
          role: "",
          rank: 0,
        },
      ]);
    }
  }, [role, setMenuStatus]);

  const staticIcons: {
    [key: string]:
      | React.ForwardRefExoticComponent<
          Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
        >
      | React.ReactElement;
  } = {
    Dashboard: Home,
    Navigation: Navigation,
    "Access Control": LockKeyholeOpen,
    "Institution SetUp": School,
    "Student Management": Users,
    "Parents / Guardian Information": (
      <Icon icon="mynaui:users-group" width="24" height="24" />
    ),
    "Academic Information": BookOpen,
    "Fee and Accounting": Banknote,
    "Attendance Management": Hand,
    "Exam and Grading": BookCheck,
    "Class and Section Management": NotebookPen,
    "Staff Management": BriefcaseBusiness,
    User: User,
    Role: UserCog,
    Inventory: Factory,
    Sales: BadgeCent,
    Report: SheetIcon,
    Account: Calculator,
    Setup: Settings,
  };

  const sortByRank = (a: any, b: any) => (a.rank ?? 999) - (b.rank ?? 999);
  const handleLogout = () => navigate.push("/");

  const sortedModules = [...sideBarItems.module]
    .sort(sortByRank)
    .map((item) => ({
      ...item,
      subModulesResponse: item.subModulesResponse
        ? [...item.subModulesResponse].sort(sortByRank)
        : [],
    }));

  const navLinks = sortedModules.map((item) => ({
    name: item.name,
    url: item.targetUrl,
    key: item.targetUrl,
    icon: staticIcons[item.name],
    subItems: item.subModulesResponse
      ? [...item.subModulesResponse].sort(sortByRank)
      : [],
    allowedRoles: item.role,
  }));

  const toggleSection = (section: string) => {
    setActiveSection((prev) => (prev === section ? null : section));
    if (activeSection !== section) setActiveSubModule(null);
  };

  const handleSelectSubModule = (subModuleId: string) =>
    setActiveSubModule(subModuleId);

  return (
    <div
      className={`h-screen flex flex-col dark:bg-[#353535] bg-white border-r border-gray-200 shadow-sm 
    transition-[width,background-color,border-color] duration-300 ease-in-out overflow-hidden ${
      isOpen ? "w-64" : "w-16"
    }`}
    >
      <div className="flex flex-col md:flex-row items-center justify-between px-4 py-2 text-gray-800 dark:text-white bg-white dark:bg-[#353535] shadow-sm border-y dark:border-white space-y-2 md:space-y-0">
        <div className="flex items-center justify-center md:justify-start w-full md:w-auto space-x-3 ">
          <Image
            src={adi}
            alt="User"
            width={30}
            className="rounded-full w-[2.5rem] h-[2.5rem] object-cover cursor-pointer bg-amber-200"
            priority
          />
          {isOpen && <span className="text-md font-semibold">{role}</span>}
        </div>
        <div className="flex justify-center w-full md:w-auto">
          <DialogButton
            icon={<LogOut className="hover:text-red-500 transition-colors" />}
            onConfirm={handleLogout}
            content="Do you want to log out?"
          />
        </div>
      </div>
      <div className="flex-1 mt-4 px-2 overflow-y-auto space-y-1">
        {navLinks
          .filter((item) => {
            const lowerRole = role?.toLowerCase() || "";
            if (lowerRole === "superadmin" || lowerRole === "developeruser")
              return (item.allowedRoles ?? []).includes(lowerRole);
            return true;
          })
          .map((item) => {
            const hasSubItems = item.subItems.length > 0;
            const isOpenSection = activeSection === item.key;
            const hasActiveChild = item.subItems.some(
              (child) => pathAfterFirst === child.targetUrl
            );
            const active = pathAfterFirst === item.url;

            if (!hasSubItems) {
              return (
                <Link
                  key={item.key}
                  href={
                    role === "superadmin" || role === "developeruser"
                      ? item.url
                      : withRolePrefix(item.url)
                  }
                  className={`group relative flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-100 ease
                    ${
                      active
                        ? "bg-[#CCE3FC] text-[#035BBA] font-semibold rounded-l-none"
                        : "text-gray-600 hover:bg-gray-300 dark:text-white hover:text-gray-800 dark:hover:text-black"
                    }`}
                >
                  {active && (
                    <span className="absolute left-0 top-0 h-full w-[3px] bg-[#035BBA] rounded-r-lg" />
                  )}
                  {item.icon &&
                    (React.isValidElement(item.icon)
                      ? item.icon
                      : React.createElement(item.icon, { size: 18 }))}
                  {isOpen && (
                    <span className="transition-opacity duration-300 ease-in-out opacity-100">
                      {item.name}
                    </span>
                  )}
                </Link>
              );
            }

            return (
              <div key={item.key} className="relative group">
                <button
                  data-key={item.key}
                  onClick={() => toggleSection(item.key)}
                  className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-sm font-medium transition-all duration-100 ease-in-out
                    ${
                      hasActiveChild
                        ? "bg-[#CCE3FC] text-[#035BBA] font-semibold rounded-l-none"
                        : "text-gray-600 hover:bg-gray-300 dark:text-white hover:text-gray-800 dark:hover:text-black"
                    }`}
                >
                  {hasActiveChild && (
                    <span className="absolute left-0 top-0 h-full w-[3px] bg-[#035BBA] rounded-r-lg" />
                  )}
                  <div className="flex items-center gap-3">
                    {item.icon &&
                      (React.isValidElement(item.icon)
                        ? item.icon
                        : React.createElement(item.icon, { size: 18 }))}
                    {isOpen && (
                      <span className="transition-all duration-100 ease-in-out">
                        {item.name}
                      </span>
                    )}
                  </div>
                  {isOpen && (
                    <span>
                      {isOpenSection ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                    </span>
                  )}
                </button>
                {isOpen && (
                  <div
                    className={`ml-3 mt-1 flex flex-col gap-1 overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out
                  ${
                    isOpenSection ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                  >
                    {item.subItems.map((subItem, index) => {
                      const activeSub = pathAfterFirst === subItem.targetUrl;
                      return (
                        <Link
                          key={subItem.targetUrl + index}
                          href={
                            role === "superadmin" || role === "developeruser"
                              ? subItem.targetUrl
                              : withRolePrefix(subItem.targetUrl)
                          }
                          onClick={() =>
                            handleSelectSubModule(subItem.subModulesId!)
                          }
                          className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm ml-4 transition-colors
                          ${
                            activeSub
                              ? "bg-[#e5f1fe] text-[#035BBA] font-medium"
                              : "text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-400 dark:text-[#e2e2e2] hover:text-gray-800 dark:hover:text-black"
                          }`}
                        >
                          {subItem.icon &&
                            (React.isValidElement(subItem.icon)
                              ? subItem.icon
                              : React.createElement(subItem.icon, {
                                  size: 16,
                                }))}
                          {isOpen && (
                            <span className="transition-all duration-300 ease-in-out">
                              {subItem.name}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
                {!isOpen &&
                  isOpenSection &&
                  item.subItems.length > 0 &&
                  activeSection === item.key && (
                    <div
                      className="fixed z-[9999] left-[4rem] bg-white dark:bg-[#353535] shadow-lg border rounded-md min-w-[180px]"
                      style={{
                        top: `${
                          document
                            ?.querySelector(`[data-key='${item.key}']`)
                            ?.getBoundingClientRect().bottom ?? 0
                        }px`,
                      }}
                      onMouseEnter={() => setActiveSection(item.key)}
                    >
                      {item.subItems.map((subItem, index) => (
                        <Link
                          key={subItem.targetUrl + index}
                          href={
                            role === "superadmin" || role === "developeruser"
                              ? subItem.targetUrl
                              : withRolePrefix(subItem.targetUrl)
                          }
                          className={`flex items-center px-4 py-2 text-sm whitespace-nowrap 
          hover:bg-gray-200 dark:hover:bg-gray-400 dark:text-white
          ${
            pathAfterFirst === subItem.targetUrl
              ? "bg-[#e5f1fe] text-[#035BBA] font-medium"
              : ""
          }`}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
              </div>
            );
          })}
      </div>
      {isOpen && (
        <div className="p-4 border-t border-gray-200 hidden md:block">
          <p className="text-xs text-gray-500">© 2025 MyApp</p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
