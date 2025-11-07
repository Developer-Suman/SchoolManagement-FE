"use client";
import { useGetSubModulesByModuleId } from "@/app/SuperAdmin/navigation/subModules/hooks";
import { useEffect } from "react";

interface Props {
  moduleId: string;
  selectedSubModules: string[];
  handleCheckboxChange: (subModuleId: string) => void;
  handleSelectAllChange: (allSubMods: string[]) => void;
}

const SubModuleList = ({
  moduleId,
  selectedSubModules,
  handleCheckboxChange,
  handleSelectAllChange,
}: Props) => {
  const { data, refetch } = useGetSubModulesByModuleId(moduleId);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const allSubModIds = data?.map((sub) => sub.id) || [];
  const isAllSelected =
    allSubModIds.length > 0 &&
    allSubModIds.every((id) => selectedSubModules.includes(id));

  return (
    <div className="flex flex-wrap gap-3">
      {allSubModIds.length > 0 && (
        <div className="flex items-center border rounded-lg p-2 bg-gray-100 hover:bg-gray-200 cursor-pointer transition">
          <span className="mr-2 font-medium text-gray-700">Select All</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isAllSelected}
              onChange={() => handleSelectAllChange(allSubModIds)}
            />
            <div className="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-blue-500 transition-all"></div>
            <div className="absolute left-1  w-4 h-4 bg-white rounded-full shadow transform transition-all peer-checked:translate-x-5"></div>
          </label>
        </div>
      )}
      {data && data.length > 0 ? (
        data.map((subModule) => (
          <div
            key={subModule.id}
            className="flex items-center justify-between border rounded-lg p-3 bg-gray-50 hover:bg-gray-100 cursor-pointer transition w-48"
          >
            <span className="text-gray-700 font-medium">{subModule.name}</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={selectedSubModules.includes(subModule.id)}
                onChange={() => handleCheckboxChange(subModule.id)}
              />
              <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-blue-500 transition-all"></div>
              <div className="absolute left-1 w-4 h-4 bg-white rounded-full shadow transform transition-all peer-checked:translate-x-5"></div>
            </label>
          </div>
        ))
      ) : (
        <div className="pl-4 text-gray-500">SubModules Not Found</div>
      )}
    </div>
  );
};

export default SubModuleList;
