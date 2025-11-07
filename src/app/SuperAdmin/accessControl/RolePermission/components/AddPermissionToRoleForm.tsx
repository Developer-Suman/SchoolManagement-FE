"use client";
import { useState, useEffect } from "react";
import { useAddPermissionToRoles } from "../hooks";
import { MouseEvent } from "react";
import { useGetAllRoles } from "../../roles/hooks";
import { ButtonElement } from "@/components/Buttons/ButtonElement";
import { IRolePermission } from "../types/IRolePermission";
import { useForm, SubmitHandler } from "react-hook-form";
import { useGetAssignableRolesByPermission } from "../hooks";

interface Props {
  permissionId: string;
  visible: boolean;
  onClose: () => void;
}

const AddPermissionToRole = ({ permissionId, visible, onClose }: Props) => {
  const { data: assignableRoles, refetch } =
    useGetAssignableRolesByPermission(permissionId);
  const { handleSubmit } = useForm<IRolePermission>();
  const { data: roles, isLoading } = useGetAllRoles();
  const [selectedRole, setSelectedRole] = useState<string[]>([]);
  const assignRole = useAddPermissionToRoles();
  const assignedRoleIds = Array.isArray(assignableRoles)
    ? assignableRoles.flatMap((role) => role.roleId ?? [])
    : [];

  useEffect(() => {
    if (assignableRoles && assignableRoles.length > 0) {
      setSelectedRole(assignedRoleIds);
    }
  }, [assignableRoles]);

  const handleCheckboxChange = (roleId: string) => {
    setSelectedRole((prevSelected) =>
      prevSelected.includes(roleId)
        ? prevSelected.filter((id) => id !== roleId)
        : [...prevSelected, roleId]
    );
  };

  const onSubmit: SubmitHandler<IRolePermission> = async () => {
    if (!selectedRole.length) {
      console.log("No menu selected");

      return;
    }

    try {
      await assignRole.mutateAsync({
        permissionId,
        rolesId: selectedRole,
      });
      refetch();
    } catch (error) {
      console.log("Failed to assign roles", error);
    } finally {
      onClose();
    }
  };

  const handleOnClose = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).id === permissionId) onClose();
  };

  if (!visible) return null;

  return (
    <div
      onClick={handleOnClose}
      id={permissionId}
      className="w-[13rem] fixed bg-white p-4 rounded-lg shadow-lg z-[5]"
    >
      <h1 className="text-xl font-semibold mb-2">Assign Roles</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {roles && roles.Items.length > 0
          ? roles.Items.map((role) => {
              const isChecked = selectedRole.includes(role.Id);

              return (
                <div
                  key={role.Id}
                  className="flex items-center h-fit drop-shadow-md p-2 py-1 rounded-sm"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleCheckboxChange(role.Id)}
                  />
                  <div className="text-md font-medium ml-2">{role.Name}</div>
                </div>
              );
            })
          : !isLoading && <p className="text-sm ml-8">No Roles found</p>}

        <div className="flex justify-center mt-4">
          <ButtonElement
            type="submit"
            customStyle="hover:bg-teal-700 transition-all"
            text={"Submit"}
          />
        </div>
      </form>
    </div>
  );
};

export default AddPermissionToRole;
