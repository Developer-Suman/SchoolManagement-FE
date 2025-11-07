"use client";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { IMenu } from "../types/IMenu";
import { useAddMenu } from "../hooks";
import { InputElement } from "@/components/Input/InputElement";
import { ButtonElement } from "@/components/Buttons/ButtonElement";
import { Toast } from "@/components/Toast/toast";
import { AxiosError } from "axios";
import { useGetAllSubModules } from "../../subModules/hooks";
import { AppCombobox } from "@/components/Input/ComboBox";
import { useState } from "react";
import { X } from "lucide-react";
type Props = {
  form: UseFormReturn<IMenu>;
  onClose: () => void;
};
const AddMenuForm = ({ form, onClose }: Props) => {
  const addMenu = useAddMenu();
  const [subModuleId, setSubModuleId] = useState("");
  const handleSelectSubModule = (moduleId: string) => {
    form.setValue("subModulesId", moduleId);
  };
  const handleClose = () => {
    form.reset();
    setSubModuleId("");
    onClose();
  };
  const onSubmit: SubmitHandler<IMenu> = async (data) => {
    try {
      await addMenu.mutateAsync(data);
      Toast.success("Successfully added Menu");
      handleClose();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: AxiosError | any) {
      if (error instanceof AxiosError) {
        Toast.error(error.response?.data);
      } else {
        Toast.error("Failed to add Menu" + error);
      }
    }
  };

  const { data: submodules } = useGetAllSubModules();
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/30 backdrop-blur-sm z-50">
      <div className="w-full max-w-md mx-4">
        <fieldset className="bg-white dark:bg-[#353535] rounded-xl shadow-xl p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-50">
              Add Menu
            </h1>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400  hover:text-red-500 transition-colors"
            >
              <X strokeWidth={3} color="red" />
            </button>
          </div>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="mb-4">
              <InputElement
                label="Name"
                layout="column"
                form={form}
                name="name"
                placeholder="Enter menu name"
              />
            </div>
            <div className="mb-4">
              <InputElement
                label="Target Url"
                layout="column"
                form={form}
                name="targetUrl"
                placeholder="Enter Target Url"
                customStyle="placeholder:text-red-300"
              />
            </div>
            <div className="mb-4">
              <InputElement
                label="Icon Url"
                layout="column"
                form={form}
                name="iconUrl"
                placeholder="Enter Icon URl"
              />
            </div>
            <div className="mb-4">
              <AppCombobox
                value={subModuleId}
                dropDownWidth="w-full"
                name="sub"
                dropdownPositionClass="absolute"
                label="Sub Modules"
                options={submodules?.Items}
                selected={
                  submodules?.Items.find((g) => g.id === subModuleId) || null
                }
                onSelect={(group) => {
                  if (group) {
                    setSubModuleId(group.id || "");
                    handleSelectSubModule(group.id || "");
                  } else {
                    setSubModuleId("");
                  }
                }}
                getLabel={(g) => g?.name || ""}
                getValue={(g) => g?.id ?? ""}
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
          </form>
        </fieldset>
      </div>
    </div>
  );
};

export default AddMenuForm;
