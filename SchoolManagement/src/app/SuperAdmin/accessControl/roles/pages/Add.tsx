"use client";
import { useForm } from "react-hook-form";
import AddRoleForm from "../components/AddRoleForm";
import type { IRoles } from "../types/IRoles";
import { useEffect } from "react";

interface Props {
  visible: boolean;
  onClose: () => void;
}
const Add = ({ visible, onClose }: Props) => {
  const form = useForm<IRoles>({
    defaultValues: {
      Name: "",
      Id: "",
    },
  });
  useEffect(() => {
    if (visible) {
      form.reset({
        Id: "",
        Name: "",
      });
    }
  }, [visible, form]);
  if (!visible) return null;
  return <AddRoleForm form={form} onClose={() => onClose()} />;
};

export default Add;
