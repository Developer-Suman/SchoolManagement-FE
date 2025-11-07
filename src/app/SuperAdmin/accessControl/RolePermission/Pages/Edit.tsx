"use client";
import { useForm } from "react-hook-form";
import { IRolePermission } from "../types/IRolePermission";
import EditRolePermissionForm from "../components/EditPermissionForm";
import { MouseEvent } from "react";
import { useGetPermissionByPermission } from "../hooks";

interface Props {
  visible: boolean;
  Id: string;
  onClose: () => void;
  permissionId: string;
}
const EditRolePermission = ({ visible, Id, onClose, permissionId }: Props) => {
  const { data: permission } = useGetPermissionByPermission(permissionId);
  const form = useForm<IRolePermission>({
    values: {
      id: permission?.id ?? "",
      name: permission?.name ?? "",
      roleId: permission?.roleId ?? "",
    },
  });
  const handleOnClose = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).id === "container") onClose();
  };
  if (!visible) return null;
  return (
    <div onClick={handleOnClose}>
      <EditRolePermissionForm form={form} Id={Id} onClose={() => onClose} />
    </div>
  );
};

export default EditRolePermission;
