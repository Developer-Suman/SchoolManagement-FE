"use client";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { IUserResponse } from "../types/IUserResponse";
import { useEditUser, useGetAllUsers } from "../hooks";
import { InputElement } from "@/components/Input/InputElement";
import { ButtonElement } from "@/components/Buttons/ButtonElement";
import { AxiosError } from "axios";
import { Toast } from "@/components/Toast/toast";
import { useRef, useState } from "react";
import { X } from "lucide-react";

type Props = {
  form: UseFormReturn<IUserResponse>;
  userId: string;
  onClose: () => void;
  currentPageIndex: number;
};

const EditUserForm = ({ form, userId, onClose, currentPageIndex }: Props) => {
  const updateUser = useEditUser(userId);
  const pageSize = 5;
  const query = `?pagesize=${pageSize}&pageIndex=${currentPageIndex}&IsPagination=true`;
  const { refetch } = useGetAllUsers(query);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState("");

  const onSubmit: SubmitHandler<IUserResponse> = async (form) => {
    try {
      await updateUser.mutateAsync(form);
      Toast.success("Successfully updated User");
      onClose();
      refetch();
    } catch (error: AxiosError | unknown) {
      if (error instanceof AxiosError) {
        Toast.error(error.response?.data);
      } else {
        Toast.error("Failed to update user: " + error);
      }
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
      <div className="w-full max-w-md h-auto">
        <fieldset className="bg-white dark:bg-[#353535] rounded-xl shadow-xl border border-gray-200 p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-50">
              Edit User
            </h1>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <X size={28} strokeWidth={3} color="red" />
            </button>
          </div>
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="flex-1 grid gap-4">
              <InputElement
                label="User Name"
                form={form}
                layout="row"
                name="UserName"
                placeholder="Enter your name here"
              />
              <InputElement
                label="Email"
                form={form}
                layout="row"
                name="Email"
                placeholder="Enter your email here"
              />
              <InputElement
                label="Password"
                form={form}
                layout="row"
                name="Password"
                placeholder="Enter your password"
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

          {/* Submit */}
          <div className="flex justify-center mt-4">
            <ButtonElement
              type="submit"
              text="Submit"
              className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-2 rounded-lg transition"
            />
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default EditUserForm;
