"use client";
import { useEffect, useState } from "react";
import { useUpdateAssignMenu } from "../hooks";
import {
  useGetMenuByRoleId,
  useGetAllMenuBySubModulesId,
} from "@/app/SuperAdmin/navigation/menu/hooks";

interface Props {
  subModuleId: string;
  roleId: string;
}

const MenuByRoleId = ({ roleId, subModuleId }: Props) => {
  const editMenu = useUpdateAssignMenu();
  const { data, isLoading, refetch } = useGetMenuByRoleId(roleId);
  const { data: menu } = useGetAllMenuBySubModulesId(subModuleId);

  const [menuStatuses, setMenuStatuses] = useState<{ [key: string]: boolean }>(
    {}
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  // Initialize statuses from API
  useEffect(() => {
    if (menu && data) {
      const initialStatuses: { [key: string]: boolean } = {};
      menu.forEach((menuItem) => {
        const roleMenu = data.find((d) => d.id === menuItem.id);
        initialStatuses[menuItem.id] = roleMenu?.isActive ?? false;
      });
      setMenuStatuses(initialStatuses);
    }
  }, [menu, data]);

  const handleToggle = async (menuId: string) => {
    const currentStatus = menuStatuses[menuId] ?? false;
    const newStatus = !currentStatus;
    setMenuStatuses((prev) => ({ ...prev, [menuId]: newStatus }));

    try {
      await editMenu.mutateAsync({
        menuId,
        data: { roleId, isActive: newStatus },
      });
      refetch();
    } catch (error) {
      console.error("Error updating menu:", error);
      // Revert toggle on error
      setMenuStatuses((prev) => ({ ...prev, [menuId]: currentStatus }));
    }
  };

  if (!menu || !data) return null;

  const filteredMenu = menu.filter((menuItem) =>
    data.some((roleMod) => roleMod.id === menuItem.id)
  );

  if (!filteredMenu.length && !isLoading) {
    return (
      <p className="text-gray-500 text-sm font-light ml-2">No menu found</p>
    );
  }

  return (
    <div className="ml-4 flex flex-wrap gap-3 mt-2">
      {filteredMenu.map((menuItem) => (
        <div
          key={menuItem.id}
          className={`flex items-center space-x-2 px-3 py-1 rounded-full transition cursor-pointer ${
            menuStatuses[menuItem.id] ? "bg-blue-50" : "bg-gray-100"
          }`}
        >
          <input
            type="checkbox"
            checked={menuStatuses[menuItem.id] ?? false}
            onChange={() => handleToggle(menuItem.id)}
            className="h-4 w-4 text-blue-500 rounded transition duration-150"
          />
          <span
            className={`text-sm font-medium transition ${
              menuStatuses[menuItem.id] ? "text-blue-600" : "text-gray-700"
            }`}
          >
            {menuItem.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default MenuByRoleId;
