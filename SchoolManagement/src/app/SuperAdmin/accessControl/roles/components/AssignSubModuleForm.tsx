"use client";
import { useEffect, useState, MouseEvent } from "react";
import { useGetSubModuleByRoleId } from "@/app/SuperAdmin/navigation/subModules/hooks";
import { ISubModules } from "@/app/SuperAdmin/navigation/subModules/types/ISubModules";
import { useAssignSubModule } from "../assignrole/hooks";
import { useForm, SubmitHandler } from "react-hook-form";
import { IAssignSubModule } from "../assignrole/types/IAssign";
import { useGetModuleByRoleId } from "@/app/SuperAdmin/navigation/modules/hooks";
import { ButtonElement } from "@/components/Buttons/ButtonElement";
import SubModuleList from "../assignrole/components/SubModuleList";
import { X } from "lucide-react";

interface Props {
  roleId: string;
  refetchRoles: () => void;
  visible: boolean;
  onClose: () => void;
}

const AssignSubModuleForm = ({
  roleId,
  refetchRoles,
  visible,
  onClose,
}: Props) => {
  const { handleSubmit } = useForm<IAssignSubModule>();
  const [selectedSubModules, setSelectedSubModules] = useState<string[]>([]);
  const { data: assignedSubModule, refetch } = useGetSubModuleByRoleId(roleId);
  const { data: ModuleData, isLoading } = useGetModuleByRoleId(roleId);
  const assignSubModule = useAssignSubModule();

  useEffect(() => {
    if (assignedSubModule) {
      const assignedSubModuleIds = assignedSubModule.map(
        (subModule: ISubModules) => subModule.id
      );
      setSelectedSubModules(assignedSubModuleIds);
    }
  }, [assignedSubModule]);

  const handleCheckboxChange = (subModuleId: string) => {
    setSelectedSubModules((prev) =>
      prev.includes(subModuleId)
        ? prev.filter((id) => id !== subModuleId)
        : [...prev, subModuleId]
    );
  };

  const handleSelectAllChange = (allSubModIds: string[]) => {
    setSelectedSubModules((prev) => {
      const allSelected = allSubModIds.every((id) => prev.includes(id));
      return allSelected
        ? prev.filter((id) => !allSubModIds.includes(id))
        : [...prev, ...allSubModIds];
    });
  };

  const onSubmit: SubmitHandler<IAssignSubModule> = async () => {
    if (!selectedSubModules.length)
      return console.log("No subModules selected");
    try {
      await assignSubModule.mutateAsync({
        roleId,
        subModulesId: selectedSubModules,
        isActive: true,
        isAssign: true,
      });
      refetch();
      refetchRoles();
    } catch (error) {
      console.error("Failed to assign subModules", error);
    } finally {
      onClose();
    }
  };

  const handleOnClose = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).id === "assign-submodule-modal") onClose();
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
            Assign SubModules
          </h2>
          <button onClick={onClose} className="cursor-pointer">
            <X strokeWidth={3} color="red" className="mb-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {ModuleData && ModuleData.length > 0 ? (
            ModuleData.map((mod) => (
              <div
                key={mod.Id}
                className="border rounded-xl p-4 bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold text-gray-700">
                    {mod.Name}
                  </span>
                </div>

                <div className="flex flex-wrap gap-3">
                  <SubModuleList
                    moduleId={mod.Id}
                    selectedSubModules={selectedSubModules}
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

export default AssignSubModuleForm;
