"use client";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { IModules } from "../types/IModules";
import { useEditModule, useGetAllModules, useGetModulesById } from "../hooks";
import { InputElement } from "@/components/Input/InputElement";
import { ButtonElement } from "@/components/Buttons/ButtonElement";
import { Toast } from "@/components/Toast/toast";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { X } from "lucide-react";

type Props = {
  form: UseFormReturn<IModules>;
  moduleId: string;
  onClose: () => void;
};
const EditModuleForm = ({ form, onClose, moduleId }: Props) => {
  const editModule = useEditModule();
  const { data: moduleData } = useGetModulesById(moduleId);
  const onSubmit: SubmitHandler<IModules> = async (form) => {
    try {
      await editModule.mutateAsync({
        id: moduleId,
        data: form,
      });
      Toast.success("Successfully Updated Module");
      onClose();
    } catch (error: AxiosError | unknown) {
      if (error instanceof AxiosError) {
        Toast.error(error.response?.data);
      } else {
        Toast.error("Failed to update module" + error);
      }
    } finally {
      onClose();
    }
  };

  useEffect(() => {
    if (moduleData) {
      form.reset({
        Id: moduleData?.Id ?? "",
        Name: moduleData?.Name ?? "",
        TargetUrl: moduleData?.TargetUrl ?? "",
        IsActive: moduleData?.isActive ?? false,
        IconUrl: moduleData?.IconUrl ?? "",
        Rank: moduleData?.Rank ?? "",
        createdAt: moduleData?.createdAt,
      });
    }
  }, [moduleData, form]);
  return (
    <div className="fixed inset-0 flex justify-center items-center backdrop-blur-xs z-50">
      <div className="w-full max-w-md mx-4">
        <fieldset className="bg-white rounded-xl shadow-xl p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-semibold text-gray-800">
              Update Module
            </h1>
            <button
              type="button"
              onClick={onClose}
              className="text-red-400 text-2xl hover:text-red-500 "
            >
              <X size={24} strokeWidth={3} color="red" />
            </button>
          </div>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="mb-4">
              <InputElement
                label="Name"
                layout="column"
                form={form}
                name="Name"
                placeholder="Enter module name"
                defaultValue={moduleData?.Name}
              />
            </div>

            <div className="mb-4">
              <InputElement
                label="Target Url"
                layout="column"
                form={form}
                name="TargetUrl"
                placeholder="Enter target URl"
                defaultValue={moduleData?.TargetUrl}
              />
            </div>
            <div className="mb-4">
              <InputElement
                label="Icon Url"
                layout="column"
                form={form}
                name="IconUrl"
                placeholder="Enter Icon URl"
                defaultValue={moduleData?.IconUrl}
              />
            </div>
            <div className="mb-4">
              <InputElement
                label="Rank"
                layout="column"
                form={form}
                name="Rank"
                placeholder="Enter Rank"
                defaultValue={moduleData?.Rank}
              />
            </div>
            <div className="mb-2 flex ml-4 items-center">
              <InputElement
                label=""
                layout="column"
                form={form}
                inputTypeCheckBox="checkbox"
                name="isActive"
                customStyle="!border-0 after:!content-none"
                defaultValue={moduleData?.isActive}
              />
              <p className="ml-4 ">Is Active</p>
            </div>
            <div className="flex justify-center mt-4">
              <ButtonElement type="submit" text="Submit" />
            </div>
          </form>
        </fieldset>
      </div>
    </div>
  );
};

export default EditModuleForm;
