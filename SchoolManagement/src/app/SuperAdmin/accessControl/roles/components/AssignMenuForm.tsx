"use client";
import { useGetMenuByRoleId } from "@/app/SuperAdmin/navigation/menu/hooks";
import { IMenu } from "@/app/SuperAdmin/navigation/menu/types/IMenu";
import { useEffect, useState } from "react";
import { useAssignMenu } from "../assignrole/hooks";
import { useForm, SubmitHandler } from "react-hook-form";
import { IAssignMenu } from "../assignrole/types/IAssign";
import { ButtonElement } from "@/components/Buttons/ButtonElement";
import { MouseEvent } from "react";
import { useGetSubModuleByRoleId } from "@/app/SuperAdmin/navigation/subModules/hooks";
import MenuList from "../assignrole/components/MenuList";
import { X } from "lucide-react";

interface Props {
  roleId: string;
  refetchRoles: () => void;
  visible: boolean;
  onClose: () => void;
}
const AssignMenuForm = ({ roleId, refetchRoles, visible, onClose }: Props) => {
  const { handleSubmit } = useForm<IAssignMenu>();
  const { data: subModuleData, isLoading } = useGetSubModuleByRoleId(roleId);
  const [selectedMenu, setSelectedMenu] = useState<string[]>([]);
  const { data: assignedData, refetch } = useGetMenuByRoleId(roleId);

  useEffect(() => {
    if (assignedData) {
      const assignedMenu = assignedData.map((menu: IMenu) => menu.id);
      setSelectedMenu(assignedMenu);
    }
  }, [assignedData]);
  const assignMenu = useAssignMenu();

  const handleCheckboxChange = (menuId: string) => {
    setSelectedMenu((prevSelected) =>
      prevSelected.includes(menuId)
        ? prevSelected.filter((id) => id !== menuId)
        : [...prevSelected, menuId]
    );
  };

  const handleSelectAllChange = (allMenuIds: string[]) => {
    setSelectedMenu((prevSelected) => {
      const areAllSelected = allMenuIds.every((id) =>
        prevSelected.includes(id)
      );
      return areAllSelected
        ? prevSelected.filter((id) => !allMenuIds.includes(id)) // Unselect all
        : [...prevSelected, ...allMenuIds]; // Select all
    });
  };
  const onSubmit: SubmitHandler<IAssignMenu> = async () => {
    if (selectedMenu.length === 0) {
      console.log("No menu selected");
      return;
    }

    try {
      await assignMenu.mutateAsync({
        roleId,
        menusId: selectedMenu,
        isActive: true,
        isAssign: true,
      });
      refetch();
      refetchRoles();
    } catch (error) {
      console.log("Failed to assign menus", error);
    } finally {
      onClose();
    }
  };

  const handleOnClose = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).id === roleId) onClose();
  };
  if (!visible) return null;

  return (
    <div
      id="assign-submodule-modal"
      onClick={handleOnClose}
      className="fixed inset-0 bg-black/50 flex justify-end items-start z-50 overflow-auto "
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-[88%] p-6 mt-3">
        <div className="flex items-center justify-between space-x-5 mb-3 border-b pb-2">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Assign Menu
          </h2>
          <button onClick={onClose} className="cursor-pointer">
            <X strokeWidth={3} color="red" className="mb-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {subModuleData && subModuleData.length > 0 ? (
            subModuleData.map((mod) => (
              <div
                key={mod.id}
                className="border rounded-xl p-4 bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold text-gray-700">
                    {mod.name}
                  </span>
                </div>

                <div className="flex flex-wrap gap-3">
                  <MenuList
                    subModuleId={mod.id}
                    selectedMenu={selectedMenu}
                    handleCheckboxChange={handleCheckboxChange}
                    handleSelectAllChange={handleSelectAllChange}
                  />
                </div>
              </div>
            ))
          ) : !isLoading ? (
            <p className="text-gray-500 text-base font-medium">
              No modules found
            </p>
          ) : (
            <p className="text-gray-400">Loading modules...</p>
          )}
          <div className="flex justify-center mt-4">
            <ButtonElement
              type="submit"
              className="hover:bg-teal-700 transition-all"
              text="Submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export default AssignMenuForm;
