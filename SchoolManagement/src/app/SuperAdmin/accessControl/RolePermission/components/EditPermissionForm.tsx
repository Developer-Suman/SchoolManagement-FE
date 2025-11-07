"use client";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { IRolePermission } from "../types/IRolePermission";
import { useEditRolePermission, useGetPermissionByPermission } from "../hooks";
import { InputElement } from "@/components/Input/InputElement";
import { ButtonElement } from "@/components/Buttons/ButtonElement";
import { Toast } from "@/components/Toast/toast";
import { AxiosError } from "axios";
import { AppCombobox } from "@/components/Input/ComboBox";
import { useGetAllRoles, useGetRolesByRoleId } from "../../roles/hooks";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

type Props = {
  form: UseFormReturn<IRolePermission>;
  Id: string | undefined;
  onClose: () => void;
};
const EditRolePermissionForm = ({ form, Id, onClose }: Props) => {
  const updateRole = useEditRolePermission(Id);
  const { data: roles } = useGetAllRoles();
  const [roleId, setRoleId] = useState("");
  const handleSelectRole = (roleId: string) => {
    form.setValue("roleId", roleId);
  };
  const { data: RoleData } = useGetPermissionByPermission(Id || "");
  const handleClose = () => {
    form.reset();
    setRoleId("");
    onClose();
  };
  useEffect(() => {
    if (RoleData) {
      form.reset({
        name: RoleData?.name ?? "",
        roleId: RoleData?.roleId ?? "",
      });
      setRoleId(RoleData.roleId);
    }
  }, [RoleData]);
  const onSubmit: SubmitHandler<IRolePermission> = async (form) => {
    try {
      await updateRole.mutateAsync(form);
      Toast.success("Successfully updated Role");
      handleClose();
    } catch (error: AxiosError | unknown) {
      if (error instanceof AxiosError) {
        Toast.error(error.response?.data);
      } else {
        Toast.error("Failed to add module" + error);
      }
    }
  };
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/30 backdrop-blur-sm z-50">
      <div className="w-full max-w-md mx-4">
        <fieldset className="bg-white dark:bg-[#353535] rounded-xl shadow-xl p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-50">
              Update Permission
            </h1>
            <button
              type="button"
              onClick={onClose}
              className="text-red-400 text-2xl hover:text-red-500 "
            >
              <X className="w-8 h-7" strokeWidth={3} />
            </button>
          </div>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex items-center gap-4 mb-6">
              <div className="grid grid-rows-2 gap-4 flex-1">
                <InputElement
                  label="Name"
                  form={form}
                  layout="row"
                  name="name"
                  placeholder="Enter permission name"
                />
                <div className="mb-4">
                  <AppCombobox
                    value={roleId}
                    dropDownWidth="w-full"
                    name="roleId"
                    dropdownPositionClass="absolute"
                    label="Roles"
                    options={roles?.Items}
                    selected={roles?.Items.find((g) => g.Id === roleId) || null}
                    onSelect={(group) => {
                      if (group) {
                        setRoleId(group.Id || "");
                        handleSelectRole(group.Id || "");
                      } else {
                        setRoleId("");
                      }
                    }}
                    getLabel={(g) => g?.Name || ""}
                    getValue={(g) => g?.Id ?? ""}
                  />
                </div>
              </div>
            </div>
            <div className="flex mt-4 justify-center space-x-2">
              <ButtonElement type="submit" text="Submit" />
              <ButtonElement
                type="button"
                customStyle="hover:bg-gray-700 transition-all !text-xm font-bold !bg-gray-400 "
                text="Discard"
                handleClick={handleClose}
              />
            </div>
          </form>
        </fieldset>
      </div>
    </div>
  );
};

export default EditRolePermissionForm;
