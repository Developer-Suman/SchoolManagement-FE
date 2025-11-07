"use client";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { IRoles } from "../types/IRoles";
import { useEditRole, useGetRolesByRoleId } from "../hooks";
import { InputElement } from "@/components/Input/InputElement";
import { ButtonElement } from "@/components/Buttons/ButtonElement";
import { useGetAllRoles } from "../hooks";
import { Toast } from "@/components/Toast/toast";
import { AxiosError } from "axios";
import { X } from "lucide-react";
import { useEffect } from "react";
type Props = {
  form: UseFormReturn<IRoles>;
  Id: string | undefined;
  onClose: () => void;
};
const EditRoleForm = ({ form, Id, onClose }: Props) => {
  const updateRole = useEditRole(Id);
  const { data: RoleData } = useGetRolesByRoleId(Id);
  const onSubmit: SubmitHandler<IRoles> = async (form) => {
    try {
      await updateRole.mutateAsync(form);
      Toast.success("Successfully updated Role");
      onClose();
    } catch (error: AxiosError | unknown) {
      if (error instanceof AxiosError) {
        Toast.error(error.response?.data);
      } else {
        Toast.error("Failed to add module" + error);
      }
    } finally {
      onClose();
    }
  };
  useEffect(() => {
    if (RoleData) {
      form.reset({
        Name: RoleData?.Name ?? "",
      });
    }
  }, [RoleData]);
  return (
    <div
      id="container"
      className=" fixed inset-0 flex justify-center items-center border-rounded-lg bg-opacity-30 z-[5] backdrop-blur-sm"
    >
      <div className="w-[16rem] flex justify-center bg-white rounded-lg drop-shadow-lg py-4">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-lg  font-semibold">Update Role</h1>
            <button
              type="button"
              onClick={onClose}
              className="text-red-400 text-2xl hover:text-red-500 "
            >
              <X strokeWidth={3} />
            </button>
          </div>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-4">
              <InputElement
                label="Name"
                layout="row"
                form={form}
                name="Name"
                placeholder="Enter Role Name"
              />
            </div>

            <div className="flex justify-center ">
              <ButtonElement
                type="submit"
                className="hover:bg-teal-700 transition-all !text-xs font-bold !bg-teal-500"
                text={"Submit"}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditRoleForm;
