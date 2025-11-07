"use client";
import { useSidebar } from "@/context/SidebarContext";
import { Menu } from "lucide-react";

export default function SidebarToggle() {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className="p-2 rounded hover:bg-gray-300"
    >
      <Menu className="text-xl cursor-pointer" />
    </button>
  );
}
