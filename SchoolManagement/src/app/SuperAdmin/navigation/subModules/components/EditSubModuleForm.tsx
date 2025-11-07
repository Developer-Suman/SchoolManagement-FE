"use client";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { ISubModules } from "../types/ISubModules";
import { useEditSubModule } from "../hooks";
import { InputElement } from "@/components/Input/InputElement";
import { ButtonElement } from "@/components/Buttons/ButtonElement";
import { Toast } from "@/components/Toast/toast";
import { AxiosError } from "axios";
import { AppCombobox } from "@/components/Input/ComboBox";
import { useGetAllModules } from "../../modules/hooks";
import { useState } from "react";
import { X } from "lucide-react";
type Props = {
  form: UseFormReturn<ISubModules>;
  subModulesId: string;
  onClose: () => void;
  modulesId: string;
};

const EditSubModuleForm = ({ form, subModulesId, onClose }: Props) => {
  const editSubModule = useEditSubModule();
  const { data: modules } = useGetAllModules();
  const [moduleId, setModuleId] = useState("");
  const handleSelectModule = (moduleId: string) => {
    form.setValue("modulesId", moduleId);
  };
  const handleClose = () => {
    form.reset();
    setModuleId("");
    onClose();
  };
  const onSubmit: SubmitHandler<ISubModules> = async (form) => {
    try {
      await editSubModule.mutateAsync({
        id: subModulesId,
        data: form,
      });
      Toast.success("Successfully Updated SubModule");
      handleClose();
    } catch (error: AxiosError | unknown) {
      if (error instanceof AxiosError) {
        Toast.error(error.response?.data);
      } else {
        Toast.error("Failed to update SubModule" + error);
      }
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/30 backdrop-blur-sm z-50">
      <div className="w-full max-w-md mx-4">
        <fieldset className="bg-white dark:bg-[#353535] rounded-xl shadow-xl p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-50">
              Add SubModule
            </h1>
            <button
              type="button"
              onClick={handleClose}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <X strokeWidth={3} color="red" />
            </button>
          </div>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <div className="mb-4">
                <InputElement
                  label="Name"
                  layout="column"
                  form={form}
                  name="name"
                  placeholder="Enter submodule name"
                />
              </div>
              <div className="mb-4">
                <InputElement
                  label="Icon Url"
                  layout="column"
                  form={form}
                  name="iconUrl"
                  placeholder="Enter Icon Url"
                  customStyle="placeholder:text-red-300"
                />
              </div>
              <div className="mb-4">
                <InputElement
                  label="Target Url"
                  layout="column"
                  form={form}
                  name="targetUrl"
                  placeholder="Enter target URl"
                />
              </div>
              <div className="mb-4">
                <AppCombobox
                  value={moduleId}
                  dropDownWidth="w-full"
                  name="modulesId"
                  dropdownPositionClass="absolute"
                  label="Modules"
                  options={modules?.Items}
                  selected={
                    modules?.Items.find((g) => g.Id === moduleId) || null
                  }
                  onSelect={(group) => {
                    if (group) {
                      setModuleId(group.Id || "");
                      handleSelectModule(group.Id || "");
                    } else {
                      setModuleId("");
                    }
                  }}
                  getLabel={(g) => g?.Name || ""}
                  getValue={(g) => g?.Id ?? ""}
                />
              </div>
              <div className="mb-4">
                <InputElement
                  label="Rank"
                  layout="column"
                  form={form}
                  name="rank"
                  placeholder="Enter rank name"
                />
              </div>
              <div className="mb-2 flex items-center">
                <InputElement
                  label=""
                  layout="column"
                  form={form}
                  inputTypeCheckBox="checkbox"
                  name="isActive"
                  customStyle="!border-0 after:!content-none"
                />
                <p className="ml-4 ">Is Active</p>
              </div>
              <div className="flex mt-4 justify-center space-x-2">
                <ButtonElement type="submit" text="Submit" />
              </div>
            </div>
          </form>
        </fieldset>
      </div>
    </div>
  );
};

export default EditSubModuleForm;
