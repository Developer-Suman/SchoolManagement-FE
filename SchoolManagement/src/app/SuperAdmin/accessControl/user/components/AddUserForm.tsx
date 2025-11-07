"use client";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { IUserResponse } from "../types/IUserResponse";
import { useAddUser, useGetAllUsers } from "../hooks";
import { InputElement } from "@/components/Input/InputElement";
import { ButtonElement } from "@/components/Buttons/ButtonElement";
import { Toast } from "@/components/Toast/toast";
import { AxiosError } from "axios";
import { useState, useRef, useEffect } from "react";
import AssignRoleForAddUser from "./AssignRoleForAddUser";
import { X } from "lucide-react";
import InstitutionFormForAddUser from "./InstitutionFormForAddUser";
import CompanyFormForAddUser from "./SchoolFormForAddUser";

type Props = {
  form: UseFormReturn<IUserResponse>;
  onClose: () => void;
};

const AddUserForm = ({ form, onClose }: Props) => {
  const addUser = useAddUser();
  const { refetch } = useGetAllUsers();

  const [selectedRole, setSelectedRole] = useState<string | undefined>("");
  const [selectedInstitution, setSelectedInstitution] = useState<string | null>(
    null
  );
  const [companyName, setCompanyName] = useState<string | null>("");
  const [roleName, setRoleName] = useState<string | undefined>("");
  const [selectedCompany, setSelectedCompany] = useState<string | null>("");
  const [institutionName, setInstitutionName] = useState<string | null>("");
  const [activeTab, setActiveTab] = useState("Assign roles");
  const [profileImage, setProfileImage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const storedUser = localStorage.getItem("userDetails");
  let role = "";
  if (storedUser) {
    try {
      const parsedUser = JSON.parse(storedUser);
      role = parsedUser.role;
    } catch (error) {
      console.error("Failed to parse user details:", error);
    }
  }

  useEffect(() => {
    localStorage.setItem("SchoolId", selectedCompany ?? "");
  }, [selectedCompany]);

  useEffect(() => {
    if (selectedRole)
      form.setValue("rolesId", [selectedRole], { shouldValidate: true });
    if (selectedInstitution)
      form.setValue("InstitutionId", selectedInstitution, {
        shouldValidate: true,
      });
    if (selectedCompany)
      form.setValue("SchoolIds", [selectedCompany], { shouldValidate: true });
  }, [selectedCompany, selectedInstitution, selectedRole, form]);

  const onSubmit: SubmitHandler<IUserResponse> = async (data) => {
    try {
      await addUser.mutateAsync(data);
      Toast.success("Successfully added user");
      onClose();
      refetch();
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data
          : `Failed to add user: ${error}`;
      Toast.error(errorMessage);
    }
  };

  const handleImageClick = () => fileInputRef.current?.click();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/30 backdrop-blur-sm z-50 p-4">
      <div className="w-full max-w-3xl h-[90vh] overflow-y-auto">
        <fieldset className="bg-white dark:bg-[#353535] rounded-xl shadow-xl border border-gray-200 p-6 max-h-[85vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-50">
              Add User
            </h1>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <X size={28} strokeWidth={3} color="red" />
            </button>
          </div>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <div className="flex-1 grid gap-4">
                <InputElement
                  label="User Name"
                  form={form}
                  layout="row"
                  name="UserName"
                  placeholder="Enter name"
                />
                <InputElement
                  label="Email"
                  form={form}
                  layout="row"
                  name="Email"
                  placeholder="Enter email"
                />
                <InputElement
                  label="Password"
                  form={form}
                  layout="row"
                  name="Password"
                  placeholder="Enter password"
                />
              </div>

              <div className="flex-shrink-0 flex flex-col items-center justify-center">
                <div
                  onClick={handleImageClick}
                  className="w-24 h-24 bg-gray-100 rounded-full overflow-hidden flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-teal-500 transition"
                >
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">Click to add</span>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <div className="border-b-4 border-[#035BBA] mb-6 rounded-t-md">
              <div className="flex space-x-2">
                {(role === "superadmin"
                  ? ["Assign roles", "Institution"]
                  : ["Assign roles", "Company"]
                ).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    className={`py-2 px-4 rounded-t-md font-medium transition-all ${
                      activeTab === tab
                        ? "bg-[#035BBA] text-white "
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {activeTab === "Assign roles" && (
                <>
                  <InputElement
                    label="Role"
                    form={form}
                    name="rolesId"
                    value={roleName || ""}
                  />
                  <AssignRoleForAddUser
                    setRoleName={setRoleName}
                    userId=""
                    selectedRole={selectedRole}
                    setSelectedRole={setSelectedRole}
                  />
                </>
              )}
              {role === "superadmin" && activeTab === "Institution" && (
                <>
                  <InputElement
                    label="Institution"
                    form={form}
                    name="InstitutionId"
                    value={institutionName || ""}
                  />
                  <InstitutionFormForAddUser
                    setInstitutionName={setInstitutionName}
                    userId=""
                    selectedInstitution={selectedInstitution}
                    setSelectedInstitution={setSelectedInstitution}
                  />
                </>
              )}
              {role !== "superadmin" && activeTab === "Company" && (
                <>
                  <InputElement
                    label="Company"
                    form={form}
                    name="SchoolIds"
                    value={companyName || ""}
                  />
                  <CompanyFormForAddUser
                    userId=""
                    selectedCompany={selectedCompany}
                    setSelectedCompany={setSelectedCompany}
                    setCompanyName={setCompanyName}
                  />
                </>
              )}
            </div>
            <div className="flex justify-center mt-6">
              <ButtonElement type="submit" text="Submit" />
            </div>
          </form>
        </fieldset>
      </div>
    </div>
  );
};

export default AddUserForm;
