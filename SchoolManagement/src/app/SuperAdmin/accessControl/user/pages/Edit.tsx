"use client";
import { useGetUserById } from "../hooks";
import { IUserResponse } from "../types/IUserResponse";
import { useForm } from "react-hook-form";
import EditUserForm from "../components/EditUserForm";

interface Props {
  visible: boolean;
  onClose: () => void;
  userId: string;
  currentPageIndex: number;
}

const EditUser = ({ visible, onClose, userId, currentPageIndex }: Props) => {
  const { data: userData } = useGetUserById(userId);

  const form = useForm<IUserResponse>({
    values: {
      Id: userData?.Id ?? "",
      UserName: userData?.UserName ?? "",
      Email: userData?.Email ?? "",
      Password: userData?.Password ?? "",
      rolesId: userData?.rolesId ?? [""],
      InstitutionId: userData?.InstitutionId ?? "",
      SchoolIds: userData?.SchoolIds ?? [""],
    },
  });

  if (!visible) return null;
  return (
    <EditUserForm
      form={form}
      currentPageIndex={currentPageIndex}
      userId={userId}
      onClose={() => onClose()}
    />
  );
};

export default EditUser;
