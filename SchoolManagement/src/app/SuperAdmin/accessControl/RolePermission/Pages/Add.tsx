"use client";
import { useForm } from "react-hook-form";
import AddPermissionForm from "../components/AddPermissionForm";
import { IRolePermission } from "../types/IRolePermission";

interface Props {
  visible: boolean;
  onClose: () => void;
}
const Add = ({ visible, onClose }: Props) => {
  const form = useForm<IRolePermission>({
    defaultValues: {
      name: "",
      id: "",
      roleId: "",
    },
  });

  if (!visible) return null;
  return <AddPermissionForm form={form} onClose={() => onClose()} />;
};

export default Add;
