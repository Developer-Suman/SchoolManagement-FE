"use client";
import {
  useGetAllModules,
  useGetModuleByRoleId,
} from "@/app/SuperAdmin/navigation/modules/hooks";
import { IModules } from "@/app/SuperAdmin/navigation/modules/types/IModules";
import { useEffect, useState, MouseEvent } from "react";
import { useAssignModule } from "../assignrole/hooks";
import { useForm, SubmitHandler } from "react-hook-form";
import { IAssignModule } from "../assignrole/types/IAssign";
import { ButtonElement } from "@/components/Buttons/ButtonElement";
import { X } from "lucide-react";

interface Props {
  roleId: string;
  refetchRoles: () => void;
  visible: boolean;
  onClose: () => void;
}

const AssignModuleForm = ({
  roleId,
  refetchRoles,
  visible,
  onClose,
}: Props) => {
  const { handleSubmit } = useForm<IAssignModule>();
  const [modules, setModules] = useState<IModules[]>([]);
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const { data: assignedData } = useGetModuleByRoleId(roleId);
  const { data, refetch } = useGetAllModules();
  const assignModule = useAssignModule();

  useEffect(() => {
    if (data?.Items) setModules(data.Items);
  }, [data]);

  useEffect(() => {
    if (assignedData) {
      const assignedModuleIds = assignedData.map((m: IModules) => m.Id);
      setSelectedModules(assignedModuleIds);
    }
  }, [assignedData]);

  const handleCheckboxChange = (moduleId: string) => {
    setSelectedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const handleSelectAll = () => {
    const allIds = modules.map((m) => m.Id);
    const areAllSelected = allIds.every((id) => selectedModules.includes(id));
    setSelectedModules(areAllSelected ? [] : allIds);
  };

  const onSubmit: SubmitHandler<IAssignModule> = async () => {
    if (!selectedModules.length) return;
    try {
      await assignModule.mutateAsync({
        roleId,
        modulesId: selectedModules,
        isActive: true,
        isAssign: true,
      });
      refetch();
      refetchRoles();
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
      id={roleId}
      onClick={handleOnClose}
      className="absolute inset-0 flex justify-center items-center bg-black/50  z-40 overflow-auto"
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl p-6">
        <div className="flex items-center justify-between space-x-5 mb-3 border-b pb-2">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Assign Modules
          </h2>
          <button onClick={onClose} className="cursor-pointer">
            <X strokeWidth={3} color="red" className="mb-6" />
          </button>
        </div>
        {modules.length > 0 && (
          <div className="flex items-center justify-between mb-4 border rounded-lg p-3 bg-gray-100 hover:bg-gray-200 cursor-pointer transition">
            <span className="font-medium text-gray-700">Select All</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={modules.every((m) => selectedModules.includes(m.Id))}
                onChange={handleSelectAll}
              />
              <div className="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-blue-500 transition-all"></div>
              <div className="absolute left-1 w-4 h-4 bg-white rounded-full shadow transform transition-all peer-checked:translate-x-5"></div>
            </label>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {modules.length > 0 ? (
            modules.map((mod) => (
              <div
                key={mod.Id}
                className="flex items-center justify-between border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
              >
                <span className="text-gray-700 font-medium">{mod.Name}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={selectedModules.includes(mod.Id)}
                    onChange={() => handleCheckboxChange(mod.Id)}
                  />
                  <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-blue-500 transition-all"></div>
                  <div className="absolute left-1 w-4 h-4 bg-white rounded-full shadow transform transition-all peer-checked:translate-x-5"></div>
                </label>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full">Modules not found</p>
          )}
        </div>

        <div className="flex justify-center mt-6">
          <ButtonElement
            type="submit"
            className="hover:bg-teal-700 transition-all"
            text="Submit"
            onClick={handleSubmit(onSubmit)}
          />
        </div>
      </div>
    </div>
  );
};

export default AssignModuleForm;
