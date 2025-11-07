"use client";

import { useSidebar } from "@/context/SidebarContext";
import Sidebar from "./Sidebar";
import SidebarToggle from "./SidebarToggle";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useRoleWiseSidebarMenu from "@/app/SuperAdmin/navigation/hooks/useRoleWiseSidebarMenu";
import TitleHeader from "../TitleHeader";
import SuperAdminSidebar from "@/tempdata/SuperAdminNavItems.json";

export default function LayoutWrapper({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  const { isOpen } = useSidebar();
  const sidebarWidth = isOpen ? "w-64" : "w-16";
  const [userId, setUserId] = useState(
    () => localStorage.getItem("userId") || ""
  );
  const userDetailsString = localStorage.getItem("userDetails");

  let role: string | null = null;

  if (userDetailsString) {
    const userDetails = JSON.parse(userDetailsString);
    role = userDetails.role;
  }

  const navigate = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate.push("/");
  }, [navigate]);
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) setUserId(storedUserId);
  }, []);

  const { data: sideBarMenu } = useRoleWiseSidebarMenu(userId);

  return (
    <div className="flex h-screen">
      <aside
        className={`${sidebarWidth}  border-r border-border flex flex-col transition-all duration-300`}
      >
        <div className="flex items-center bg-background text-text  justify-between p-1.5 py-[1.2rem] border-b px-5">
          {isOpen && (
            <span className="font-bold text-lg flex items-center gap-2">
              Shikshya
            </span>
          )}
          <SidebarToggle />
        </div>
        <Sidebar
          sideBarItems={
            role === "superadmin"
              ? SuperAdminSidebar
              : {
                  module: Array.isArray(sideBarMenu) ? sideBarMenu : [],
                }
          }
        />
      </aside>
      <div className="flex-1 flex flex-col">
        <TitleHeader title={title} />
        <main className="flex-1  overflow-auto">{children}</main>
      </div>
    </div>
  );
}
