"use client";
import { useEffect } from "react";
import { useGetAllRoles } from "../../roles/hooks";
import { useGetRolesForOtherRole } from "../../RolePermission/hooks";
import AssignedRoleForOther from "./AssignedRolesForOther";

interface Props {
  userId: string;
  selectedRole: string | undefined;
  setSelectedRole: React.Dispatch<React.SetStateAction<string | undefined>>;
  setRoleName: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const AssignRoleForAddUser = ({
  selectedRole,
  setSelectedRole,
  setRoleName,
}: Props) => {
  const storedUser = localStorage.getItem("userDetails");
  let role = "";
  if (storedUser) {
    try {
      const parsedUser = JSON.parse(storedUser);
      role = parsedUser.role;
    } catch (error) {
      console.error("Failed to parse user details:", error);
    }
  }
  const { data: otherRoles, refetch } = useGetRolesForOtherRole();
  const { data: superAdminRoles, isLoading } = useGetAllRoles();

  const handleCheckboxChange = (
    roleId: string | undefined,
    roleName: string | undefined
  ) => {
    setSelectedRole((prevSelected) =>
      prevSelected === roleId ? undefined : roleId
    );
    setRoleName((prevSelected) =>
      prevSelected === roleName ? undefined : roleName
    );
  };
  useEffect(() => {
    refetch();
  }, [refetch]);
  return (
    <div className="bg-white dark:bg-[#353535] p-4 rounded-lg h-[15rem]">
      <h1 className="text-xl font-semibold mb-2">Assign Roles</h1>
      <div>
        {role === "superadmin"
          ? superAdminRoles?.Items && superAdminRoles.Items.length > 0
            ? superAdminRoles.Items.map((role, index) => {
                return (
                  <div key={role.Id + index} className="">
                    <div className="flex items-center h-fit drop-shadow-md p-2 space w-fit py-1 rounded-sm">
                      <input
                        type="checkbox"
                        checked={selectedRole === role.Id}
                        onChange={() =>
                          handleCheckboxChange(role.Id, role.Name)
                        }
                      />
                      <div className="text-md font-medium ml-2">
                        {role.Name}
                      </div>
                    </div>
                  </div>
                );
              })
            : !isLoading && <p className="text-sm ml-8">No Roles found</p>
          : otherRoles && otherRoles.length > 0
          ? otherRoles.map((role) => {
              return (
                <AssignedRoleForOther
                  roleId={role.roleId}
                  selectedRole={selectedRole}
                  handleCheckboxChange={handleCheckboxChange}
                />
              );
            })
          : !isLoading && (
              <p className="text-sm ml-8">No Roles found of other role</p>
            )}
      </div>
    </div>
  );
};

export default AssignRoleForAddUser;
