"use client";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { ISchool } from "../types/ISchool";
import { useEditSchool, useGetAllSchool } from "../hooks";
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
  SchoolId: string;
  onClose: () => void;
  currentPageIndex: number;
};
const EditSchoolForm = ({
  form,
  onClose,
  SchoolId,
  currentPageIndex,
}: Props) => {
  const editCompany = useEditSchool();
  const { data: institution } = useGetAllInstitution();
  const pageSize = 5;
  const query = `?pagesize=${pageSize}&pageIndex=${currentPageIndex}&IsPagination=true`;
  const { refetch } = useGetAllSchool(query);
  const [fiscalYearId, setFiscalYearId] = useState("");
  const [institutionId, setInstitutionId] = useState("");
  const handleSelectFiscalYear = (id: string) => {
    form.setValue("fiscalYearId", id);
  };
  const handleSelectInstitution = (id: string) => {
    form.setValue("institutionId", id);
  };
  const data = [
    { name: "Automatic", value: 1 },
    { name: "Manual", value: 0 },
  ];
  const onSubmit: SubmitHandler<ISchool> = async (form) => {
    try {
      await editCompany.mutateAsync({
        id: SchoolId,
        data: form,
      });

      Toast.success("Successfully Updated School");
      refetch();
      onClose();
    } catch (error: AxiosError | unknown) {
      if (error instanceof AxiosError) {
        Toast.error(error.response?.data);
      } else {
        Toast.error("Failed to update School" + error);
      }
    } finally {
      onClose();
    }
  };

  return (
    <div
      id="container"
      className=" fixed inset-0 flex justify-center  items-center border-rounded-lg bg-opacity-30 backdrop-blur-sm"
    >
      <div className="w-[36rem] flex  bg-white py-4 rounded-lg drop-shadow-lg">
        <div className="w-full">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-lg ml-4 font-semibold">Update School</h1>
              <button
                type="button"
                onClick={onClose}
                className="text-red-400 mr-2 text-2xl hover:text-red-500 "
              >
                <X strokeWidth={3} />
              </button>
            </div>
            <div className="flex justify-evenly mt-6">
              <div>
                <div className="mb-4">
                  <InputElement
                    label="Name"
                    layout="row"
                    form={form}
                    name="name"
                    placeholder="Enter School name"
                  />
                </div>
                <div className="mb-4">
                  <InputElement
                    label="Address"
                    layout="row"
                    form={form}
                    name="address"
                    placeholder="Enter address"
                    customStyle="placeholder:text-red-300"
                  />
                </div>
                <div className="mb-4">
                  <InputElement
                    label="Email"
                    layout="row"
                    form={form}
                    name="email"
                    placeholder="Enter email"
                  />
                </div>
                <div className="mb-4">
                  <InputElement
                    label="Short Name"
                    layout="row"
                    form={form}
                    name="shortName"
                    placeholder="Enter shortName"
                  />
                </div>
                <div className="mb-4">
                  <InputElement
                    label="Contact Number"
                    layout="row"
                    form={form}
                    name="contactNumber"
                    placeholder="Enter Contact Number"
                  />
                </div>
                <div className="mb-4">
                  <InputElement
                    label="Contact Person"
                    layout="row"
                    form={form}
                    name="contactPerson"
                    placeholder="Enter Contact Person"
                  />
                </div>
                <div className="mb-4">
                  <InputElement
                    label="Pan"
                    layout="row"
                    form={form}
                    name="pan"
                    placeholder="Enter pan"
                  />
                </div>
              </div>
              <div>
                <div className="mb-4">
                  <InputElement
                    label="Image Url"
                    layout="row"
                    form={form}
                    name="imageUrl"
                    placeholder="Enter Image Url"
                  />
                </div>
                <div className="my-4 justify-between mt-[3%]">
                  <AppCombobox
                    required
                    name="institutionId"
                    form={form}
                    value={institutionId}
                    dropDownWidth="w-full"
                    dropdownPositionClass="absolute"
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
                        setFiscalYearId("");
                      }
                    }}
                    getLabel={(g) => g?.name || ""}
                    getValue={(g) => g?.id ?? ""}
                  />
                </div>
                <div className="mb-2 flex items-center">
                  <InputElement
                    label=""
                    layout="row"
                    form={form}
                    inputTypeCheckBox="checkbox"
                    name="isDeleted"
                    customStyle="!border-0 after:!content-none"
                  />
                  <p className="ml-4 ">Is Deleted</p>
                </div>
                {/* <div className="">
                  <label className=" text-sm !text-slate-500 ml-2">
                    Bill Number Generation Type For Purchase
                  </label>
                  <SelectElement
                    form={form}
                    name="billNumberGenerationTypeForPurchase"
                    className="sm:!min-w-[150px] !min-w-full"
                    data={
                      data?.map(({ name, value }) => {
                        return {
                          label: name,
                          value: value,
                        };
                      }) || []
                    }
                  />
                </div>
                <div className="">
                  <label className=" text-sm !text-slate-500 ml-2">
                    Bill Number Generation Type For Sales
                  </label>
                  <SelectElement
                    form={form}
                    name="billNumberGenerationTypeForSales"
                    className="sm:!min-w-[150px] !min-w-full"
                    data={
                      data?.map(({ name, value }) => {
                        return {
                          label: name,
                          value: value,
                        };
                      }) || []
                    }
                  />
                </div>
                <div className="my-4 justify-between mt-[3%] ">
                  <AppCombobox
                    required
                    value={fiscalYearId}
                    dropDownWidth="w-full"
                    dropdownPositionClass="absolute"
                    label="Fiscal Year"
                    name="fiscalYearId"
                    form={form}
                    options={AllFiscalYear?.Items}
                    selected={
                      AllFiscalYear?.Items.find((g) => g.Id === fiscalYearId) ||
                      null
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
            <div className="flex justify-center mt-4 mx-10">
              <ButtonElement
                type="submit"
                customStyle="hover:bg-teal-700 transition-all !text-xm !font-bold"
                text={"Submit"}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditSchoolForm;
