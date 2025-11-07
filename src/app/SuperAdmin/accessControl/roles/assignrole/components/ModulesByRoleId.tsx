"use client";
import { useEffect, useState, MouseEvent } from "react";
import { useGetModuleByRoleId } from "@/app/SuperAdmin/navigation/modules/hooks";
import { useUpdateAssignModules } from "../hooks";
import SubModulesByRoleId from "./SubModulesByRoleId";
import { X } from "lucide-react";

interface Props {
  roleId: string;
  visible: boolean;
  onClose: () => void;
}

const ModuleByRoleId = ({ roleId, visible, onClose }: Props) => {
  const editModule = useUpdateAssignModules();
  const { data, isLoading, refetch } = useGetModuleByRoleId(roleId);
  const [moduleStatuses, setModuleStatuses] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (data) {
      setModuleStatuses((prev) => {
        const newStatuses = { ...prev };
        data.forEach((mod) => {
          if (!(mod.Id in newStatuses)) {
            newStatuses[mod.Id] = mod.IsActive;
          }
        });
        return newStatuses;
      });
    }
  }, [data]);

  const handleToggle = async (moduleId: string) => {
    setModuleStatuses((prev) => ({ ...prev, [moduleId]: !prev[moduleId] }));
    try {
      await editModule.mutateAsync({
        moduleId,
        roleId,
        isActive: !moduleStatuses[moduleId],
      });
      refetch();
    } catch (error) {
      console.error("Failed to update module:", error);
      setModuleStatuses((prev) => ({ ...prev, [moduleId]: !prev[moduleId] }));
    }
  };

  const handleOnClose = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).id === "module-modal") onClose();
  };

  if (!visible) return null;

  return (
    <div
      id="module-modal"
      onClick={handleOnClose}
      className="fixed inset-0 bg-black/50 flex justify-end items-start z-50 overflow-auto "
    >
      <div className="bg-white rounded-md shadow-xl w-full max-w-[85%] p-6 mt-3">
        <div className="flex items-center justify-between space-x-5 mb-3 border-b pb-2">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Modules</h2>
          <button onClick={onClose} className="cursor-pointer">
            <X strokeWidth={3} color="red" className="mb-6" />
          </button>
        </div>

        {isLoading && <p className="text-gray-400">Loading modules...</p>}

        {data && data.length > 0 ? (
          <div className="space-y-6">
            {data.map((mod) => (
              <div key={mod.Id} className="flex flex-col w-full">
                <div className="flex items-center space-x-5 mb-3 border-b pb-2">
                  <span className="font-medium text-gray-700 text-lg">
                    {mod.Name}
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={moduleStatuses[mod.Id]}
                      onChange={() => handleToggle(mod.Id)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-400 rounded-full peer peer-checked:bg-blue-500 transition-all"></div>
                    <div className="absolute left-1 w-4 h-4 bg-white rounded-full shadow transform transition-all peer-checked:translate-x-5"></div>
                  </label>
                </div>
                {moduleStatuses[mod.Id] && (
                  <div className="flex flex-wrap gap-3">
                    <SubModulesByRoleId
                      roleId={roleId}
                      moduleId={mod.Id}
                      activateAll={moduleStatuses[mod.Id]}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : !isLoading ? (
          <p className="text-gray-500">No modules found</p>
        ) : null}
      </div>
    </div>
  );
};

export default ModuleByRoleId;
