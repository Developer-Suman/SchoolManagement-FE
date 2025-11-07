"use client";
import { useEffect, useState, MouseEvent } from "react";
import { useAssignRole } from "../hooks";
import { useGetAllRoles, useGetRolesByUserId } from "../../roles/hooks";
import { ButtonElement } from "@/components/Buttons/ButtonElement";
import { IAssign } from "../types/IUserResponse";
import { useForm, SubmitHandler } from "react-hook-form";

interface Props {
  userId: string;
  visible: boolean;
  onClose: () => void;
}

const AssignRoleForm = ({ userId, visible, onClose }: Props) => {
  const { handleSubmit } = useForm<IAssign>();
  const { data: roles, isLoading, refetch } = useGetAllRoles();
  const { data: assignedData } = useGetRolesByUserId(userId);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const assignRole = useAssignRole();

  const assignedRoleIds = assignedData
    ? assignedData.map((role: { Id: string }) => role.Id)
    : [];

  useEffect(() => {
    if (assignedData && assignedData.length > 0) {
      setSelectedRole(assignedRoleIds[0]);
    }
  }, [assignedData]);

  const handleCheckboxChange = (roleId: string, isAssigned: boolean) => {
    if (!isAssigned) {
      setSelectedRole((prevSelected) =>
        prevSelected === roleId ? null : roleId
      );
    }
  };

  const onSubmit: SubmitHandler<IAssign> = async () => {
    if (!selectedRole) {
      console.log("No role selected");
      return;
    }
    try {
      await assignRole.mutateAsync({
        userId,
        rolesId: [selectedRole],
      });
      refetch();
    } catch (error) {
      console.log("Failed to assign roles", error);
    } finally {
      onClose();
    }
  };

  const handleOnClose = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).id === userId) onClose();
  };

  if (!visible) return null;

  return (
    <div
      onClick={handleOnClose}
      id={userId}
      className="fixed inset-0 flex justify-center items-start pt-24 bg-black/30 backdrop-blur-sm z-50 p-4"
    >
      <div className="bg-white rounded-xl shadow-xl border border-gray-200 w-full max-w-xs max-h-[60vh] overflow-y-auto p-4">
        <h1 className="text-lg font-semibold mb-4 text-gray-800">
          Assign Roles
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          {roles && roles.Items.length > 0
            ? roles.Items.map((role) => {
                const isAssigned = assignedRoleIds.includes(role.Id);
                return (
                  <label
                    key={role.Id}
                    className={`flex items-center p-2 rounded-md cursor-pointer transition 
                      ${isAssigned ? "bg-gray-100" : "hover:bg-gray-50"}`}
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-teal-500"
                      checked={selectedRole === role.Id || isAssigned}
                      onChange={() => handleCheckboxChange(role.Id, isAssigned)}
                      disabled={
                        selectedRole !== null && selectedRole !== role.Id
                      }
                    />
                    <span className="ml-2 text-gray-700 font-medium">
                      {role.Name}
                    </span>
                  </label>
                );
              })
            : !isLoading && (
                <p className="text-sm text-gray-500 text-center mt-2">
                  No roles found
                </p>
              )}

          <div className="flex justify-center mt-4">
            <ButtonElement
              type="submit"
              text="Submit"
              className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-4 py-2 rounded-lg transition"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignRoleForm;
