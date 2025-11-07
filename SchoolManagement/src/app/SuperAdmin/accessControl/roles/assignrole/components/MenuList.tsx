"use client";
import { useGetAllMenuBySubModulesId } from "@/app/SuperAdmin/navigation/menu/hooks";
import { useEffect } from "react";
interface Props {
  subModuleId: string;
  selectedMenu: string[];
  handleCheckboxChange: (menuId: string) => void;
  handleSelectAllChange: (allMenuIds: string[]) => void;
}

const MenuList = ({
  subModuleId,
  selectedMenu,
  handleCheckboxChange,
  handleSelectAllChange,
}: Props) => {
  const { data: menus, refetch } = useGetAllMenuBySubModulesId(subModuleId);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const allMenuIds = menus?.map((menu) => menu.id) || [];
  const isAllSelected =
    allMenuIds.length > 0 &&
    allMenuIds.every((id) => selectedMenu.includes(id));

  return (
    <div className="flex flex-wrap gap-3">
      {allMenuIds.length > 0 && (
        <div className="flex items-center border rounded-lg p-2 bg-gray-100 hover:bg-gray-200 cursor-pointer transition">
          <span className="mr-2 font-medium text-gray-700">Select All</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isAllSelected}
              onChange={() => handleSelectAllChange(allMenuIds)}
            />
            <div className="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-blue-500 transition-all"></div>
            <div className="absolute left-1  w-4 h-4 bg-white rounded-full shadow transform transition-all peer-checked:translate-x-5"></div>
          </label>
        </div>
      )}
      {menus && menus.length > 0 ? (
        menus.map((menu) => (
          <div
            key={menu.id}
            className="flex items-center justify-between border rounded-lg p-3 bg-gray-50 hover:bg-gray-100 cursor-pointer transition w-48"
          >
            <span className="text-gray-700 font-medium">{menu.name}</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={selectedMenu.includes(menu.id)}
                onChange={() => handleCheckboxChange(menu.id)}
              />
              <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-blue-500 transition-all"></div>
              <div className="absolute left-1  w-4 h-4 bg-white rounded-full shadow transform transition-all peer-checked:translate-x-5"></div>
            </label>
          </div>
        ))
      ) : (
        <div className="pl-4 text-gray-500">SubModules Not Found</div>
      )}
    </div>
  );
};

export default MenuList;
