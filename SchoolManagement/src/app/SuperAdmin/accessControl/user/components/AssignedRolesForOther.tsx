"use client";
import { useGetRolesByRoleId } from "../../roles/hooks";
type Props = {
  roleId: string;
  selectedRole: string | undefined;
  handleCheckboxChange: (
    id: string | undefined,
    name: string | undefined
  ) => void;
};
const AssignedRoleForOther = ({
  roleId,
  selectedRole,
  handleCheckboxChange,
}: Props) => {
  const { data: roles } = useGetRolesByRoleId(roleId);
  return (
    <div>
      <div className="flex items-center h-fit drop-shadow-md p-2 space w-fit py-1 rounded-sm">
        <input
          type="checkbox"
          checked={selectedRole === roles?.Id}
          onChange={() => handleCheckboxChange(roles?.Id, roles?.Name)}
        />
        <div className="text-md font-medium ml-2">{roles?.Name}</div>
      </div>
    </div>
  );
};

export default AssignedRoleForOther;
