"use client";
import { useGetRolesByUserId } from "../../roles/hooks";
interface Props {
  userId: string;
}
const AssignedRoles = ({ userId }: Props) => {
  const { data: assignedData, isLoading } = useGetRolesByUserId(userId);
  return (
    <div id={userId} className="flex flex-wrap">
      {assignedData && assignedData.length > 0
        ? assignedData.map((subMod) => {
            return (
              <div key={subMod.Id} className="pl-1 ">
                <div className="text-md font-medium ">{subMod.Name},</div>
              </div>
            );
          })
        : !isLoading && <p className="text-sm ml-8">No Roles found</p>}
    </div>
  );
};
export default AssignedRoles;
