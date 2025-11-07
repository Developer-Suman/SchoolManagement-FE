"use client";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { ISchool } from "../types/ISchool";
import { useAddSchool, useGetAllSchool } from "../hooks";
import { InputElement } from "@/components/Input/InputElement";
import { ButtonElement } from "@/components/Buttons/ButtonElement";
import { Toast } from "@/components/Toast/toast";
import { AxiosError } from "axios";
import { useGetAllInstitution } from "@/app/SuperAdmin/institutionSetup/Institution/hooks";
import { AppCombobox } from "@/components/Input/ComboBox";

import { useState } from "react";
import { X } from "lucide-react";

type Props = {
  form: UseFormReturn<ISchool>;
  onClose: () => void;
};

const AddSchoolForm = ({ form, onClose }: Props) => {
  const { refetch: schoolRefetch } = useGetAllSchool();
  const addSchool = useAddSchool();
  const [institutionId, setInstitutionId] = useState("");
  const { data: institution, refetch } = useGetAllInstitution();

  const onSubmit: SubmitHandler<ISchool> = async (data) => {
    try {
      await addSchool.mutateAsync(data);
      Toast.success("Successfully added School");
      refetch();
      schoolRefetch();
    } catch (error: AxiosError | unknown) {
      if (error instanceof AxiosError) {
        Toast.error(error.response?.data);
      } else {
        Toast.error("Failed to add School" + error);
      }
    } finally {
      onClose();
    }
  };

  // const handleSelectFiscalYear = (id: string) => {
  //   form.setValue("fiscalYearId", id);
  // };

  const handleSelectInstitution = (id: string) => {
    form.setValue("institutionId", id);
  };

  return (
    <div
      id="container"
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm overflow-y-auto ml-56 md:ml-64 sm:ml-16 "
    >
      <div className="w-full max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[50%] xl:max-w-[40%] bg-white rounded-xl shadow-2xl p-4 sm:p-6 m-4">
        <div className="w-full">
          <form onSubmit={form.handleSubmit(onSubmit)} className="h-full">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-base sm:text-lg font-semibold">Add School</h1>
              <button
                type="button"
                onClick={onClose}
                className="text-red-400 hover:text-red-500 transition-colors"
              >
                <X strokeWidth={3} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-4">
                <InputElement
                  label="Name"
                  layout="column"
                  form={form}
                  name="name"
                  placeholder="Enter Company name"
                  customStyle="w-full"
                />
                <InputElement
                  label="Address"
                  layout="column"
                  form={form}
                  name="address"
                  placeholder="Enter Address"
                  customStyle="w-full placeholder:text-gray-300"
                />
                <InputElement
                  label="Email"
                  layout="column"
                  form={form}
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  customStyle="w-full"
                />
                <InputElement
                  label="Short Name"
                  layout="column"
                  form={form}
                  name="shortName"
                  placeholder="Enter short name"
                  customStyle="w-full"
                />
                <InputElement
                  label="Contact Number"
                  layout="column"
                  form={form}
                  name="contactNumber"
                  placeholder="Enter Contact Number"
                  customStyle="w-full"
                />
                <InputElement
                  label="Contact Person"
                  layout="column"
                  form={form}
                  name="contactPerson"
                  placeholder="Enter Contact Person"
                  customStyle="w-full"
                />
                <InputElement
                  label="Pan"
                  layout="column"
                  form={form}
                  name="pan"
                  placeholder="Enter Pan"
                  customStyle="w-full"
                />
              </div>
              <div className="space-y-4">
                <InputElement
                  label="Image Url"
                  layout="column"
                  form={form}
                  name="imageUrl"
                  placeholder="Enter Image Url"
                  customStyle="w-full"
                />
                <AppCombobox
                  required
                  value={institutionId}
                  form={form}
                  name="institutionId"
                  dropDownWidth="w-full"
                  dropdownPositionClass="absolute z-50"
                  label="Institution"
                  options={institution?.Items}
                  selected={
                    institution?.Items.find((g) => g.id === institutionId) ||
                    null
                  }
                  onSelect={(group) => {
                    if (group) {
                      setInstitutionId(group.id || "");
                      handleSelectInstitution(group.id || "");
                    } else {
                      setInstitutionId("");
                    }
                  }}
                  getLabel={(g) => g?.name || ""}
                  getValue={(g) => g?.id ?? ""}
                />
                <div className="flex items-center">
                  <InputElement
                    label=""
                    layout="column"
                    form={form}
                    inputTypeCheckBox="checkbox"
                    name="isEnable"
                    customStyle="!border-0 after:!content-none"
                  />
                  <p className="ml-3 text-sm sm:text-base">Is Enable</p>
                </div>
                <div className="flex items-center">
                  <InputElement
                    label=""
                    layout="column"
                    form={form}
                    inputTypeCheckBox="checkbox"
                    name="isDeleted"
                    customStyle="!border-0 after:!content-none"
                  />
                  <p className="ml-3 text-sm sm:text-base">Is Deleted</p>
                </div>
                {/* <div>
                  <label className="text-sm text-slate-500 mb-1 block">
                    Type For Purchase
                  </label>
                  <SelectElement
                    form={form}
                    name="billNumberGenerationTypeForPurchase"
                    className="w-full"
                    data={
                      data?.map(({ name, value }) => ({
                        label: name,
                        value: value,
                      })) || []
                    }
                  />
                </div> */}
                {/* <div>
                  <label className="text-sm text-slate-500 mb-1 block">
                    Bill Number Generation Type For Sales
                  </label>
                  <SelectElement
                    form={form}
                    name="billNumberGenerationTypeForSales"
                    className="w-full"
                    data={
                      data?.map(({ name, value }) => ({
                        label: name,
                        value: value,
                      })) || []
                    }
                  />
                </div> */}
                {/* <div className="flex mt-8">
                  <AppCombobox
                    required
                    name="fiscalYearId"
                    form={form}
                    value={fiscalYearId}
                    dropDownWidth="w-full"
                    dropdownPositionClass="absolute z-50"
                    label="Fiscal Year"
                    options={AllFiscalYear?.Items}
                    selected={
                      (AllFiscalYear?.Items ?? []).find(
                        (g) => g.Id === fiscalYearId
                      ) || null
                    }
                    onSelect={(group) => {
                      if (group) {
                        setFiscalYearId(group.Id || "");
                        handleSelectFiscalYear(group.Id || "");
                      } else {
                        setFiscalYearId("");
                      }
                    }}
                    getLabel={(g) => g?.FyName || ""}
                    getValue={(g) => g?.Id ?? ""}
                  />
                </div> */}
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <ButtonElement type="submit" text="Submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSchoolForm;
