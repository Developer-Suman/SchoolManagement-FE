"use client";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { IInstitution } from "../types/IInstitution";
import { useEditInstitution, useGetAllInstitution } from "../hooks";
import { InputElement } from "@/components/Input/InputElement";
import { ButtonElement } from "@/components/Buttons/ButtonElement";
import { Toast } from "@/components/Toast/toast";
import { AxiosError } from "axios";
import { useGetAllOrganization } from "@/app/developerUser/hooks";
import { AppCombobox } from "@/components/Input/ComboBox";
import { useState } from "react";
import { X } from "lucide-react";

type Props = {
  form: UseFormReturn<IInstitution>;
  institutionId: string;
  onClose: () => void;
  currentPageIndex: number;
  organizationId: string;
};
const EditInstitutionForm = ({
  form,
  onClose,
  institutionId,
  currentPageIndex,
  organizationId,
}: Props) => {
  const editInstitution = useEditInstitution();
  const { data: organizations } = useGetAllOrganization();
  const pageSize = 5;
  const query = `?pagesize=${pageSize}&pageIndex=${currentPageIndex}&IsPagination=true`;
  const { refetch } = useGetAllInstitution(query);
  const [selectedOrganizationId, setSelectedOrganizationId] = useState("");
  const onSubmit: SubmitHandler<IInstitution> = async (form) => {
    try {
      await editInstitution.mutateAsync({
        id: institutionId,
        data: form,
      });

      Toast.success("Successfully Updated Module");
      refetch();
      onClose();
    } catch (error: AxiosError | unknown) {
      if (error instanceof AxiosError) {
        Toast.error(error.response?.data);
      } else {
        Toast.error("Failed to update institution" + error);
      }
    } finally {
      onClose();
    }
  };
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/30 backdrop-blur-sm z-50">
      <div className="w-full max-w-lg mx-4">
        <fieldset className="bg-white  dark:bg-[#353535] rounded-xl shadow-xl p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-50">
              sUpdate Institution
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
            <div className="flex justify-between mt-6">
              <div>
                <div className="mb-4">
                  <InputElement
                    label="Name"
                    layout="row"
                    form={form}
                    name="name"
                    placeholder="Enter Institution name"
                    customStyle="text-base px-4 py-2 h-12"
                  />
                </div>
                <div className="mb-4">
                  <InputElement
                    label="Address"
                    layout="row"
                    form={form}
                    name="address"
                    placeholder="Enter Address"
                    customStyle="text-base px-4 py-2 h-12"
                  />
                </div>
                <div className="mb-4">
                  <InputElement
                    label="Email"
                    layout="row"
                    form={form}
                    name="email"
                    type="email"
                    placeholder="Enter email"
                    customStyle="text-base px-4 py-2 h-12"
                  />
                </div>
                <div className="mb-4">
                  <InputElement
                    label="Short Name"
                    layout="row"
                    form={form}
                    name="shortName"
                    placeholder="Enter short name"
                    customStyle="text-base px-4 py-2 h-12"
                  />
                </div>
                <div className="mb-4">
                  <InputElement
                    label="Contact Number"
                    layout="row"
                    form={form}
                    name="contactNumber"
                    placeholder="Enter Contact Number"
                    customStyle="text-base px-4 py-2 h-12"
                  />
                </div>
              </div>

              <div>
                <div className="mb-4">
                  <InputElement
                    label="Contact Person"
                    layout="row"
                    form={form}
                    name="contactPerson"
                    placeholder="Enter Contact Person"
                    customStyle="text-base px-4 py-2 h-12"
                  />
                </div>
                <div className="mb-4">
                  <InputElement
                    label="Pan"
                    layout="row"
                    form={form}
                    name="pan"
                    placeholder="Enter Pan"
                    customStyle="text-base px-4 py-2 h-12"
                  />
                </div>
                <div className="mb-4">
                  <InputElement
                    label="Image Url"
                    layout="row"
                    form={form}
                    name="imageUrl"
                    placeholder="Enter Image Url"
                    customStyle="text-base px-4 py-2 h-12"
                  />
                </div>

                <div className="mb-4">
                  <AppCombobox
                    value={organizationId}
                    dropDownWidth="w-full"
                    name="organizationId"
                    dropdownPositionClass="absolute"
                    label="Organization"
                    options={organizations?.Items}
                    selected={
                      organizations?.Items.find(
                        (g) => g.id === organizationId
                      ) || null
                    }
                    onSelect={(group) => {
                      if (group) {
                        setSelectedOrganizationId(group.id || "");
                      } else {
                        setSelectedOrganizationId("");
                      }
                    }}
                    getLabel={(g) => g?.name || ""}
                    getValue={(g) => g?.id ?? ""}
                  />
                </div>

                <div className="flex items-center mb-2">
                  <InputElement
                    label=""
                    layout="row"
                    form={form}
                    inputTypeCheckBox="checkbox"
                    name="isEnable"
                    customStyle="!border-0 after:!content-none"
                  />
                  <p className="ml-4">Is Enable</p>
                </div>
                <div className="flex items-center">
                  <InputElement
                    label=""
                    layout="row"
                    form={form}
                    inputTypeCheckBox="checkbox"
                    name="isDeleted"
                    customStyle="!border-0 after:!content-none"
                  />
                  <p className="ml-4">Is Deleted</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-4 ">
              <ButtonElement type="submit" text={"Submit"} />
            </div>
          </form>
        </fieldset>
      </div>
    </div>
  );
};

export default EditInstitutionForm;
