"use client";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { IRoles } from "../types/IRoles";
import { useAddRole } from "../hooks";
import { InputElement } from "@/components/Input/InputElement";
import { ButtonElement } from "@/components/Buttons/ButtonElement";
import { Toast } from "@/components/Toast/toast";
import { AxiosError } from "axios";
import { X } from "lucide-react";
type Props = {
  form: UseFormReturn<IRoles>;
  onClose: () => void;
};

const AddRoleForm = ({ form, onClose }: Props) => {
  const addRole = useAddRole();
  const onSubmit: SubmitHandler<IRoles> = async (data) => {
    try {
      await addRole.mutateAsync(data);
      Toast.success("Successfully added Role");
    } catch (error: AxiosError | unknown) {
      if (error instanceof AxiosError) {
        Toast.error(error.response?.data);
      }
    } finally {
      onClose();
    }
  };
  return (
    <div
      id="container"
      className="fixed inset-0 flex justify-center items-center border-rounded-lg bg-opacity-30 backdrop-blur-sm"
    >
      <div className="w-[16rem] flex justify-center dark:bg-[#353535] bg-white py-4 rounded-lg drop-shadow-lg">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-50">
              Add Role
            </h1>
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
                placeholder="Enter role name"
              />
            </div>
            <div className="flex justify-center">
              <ButtonElement
                type="submit"
                className="hover:bg-teal-700 transition-all"
                text={"Submit"}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRoleForm;
