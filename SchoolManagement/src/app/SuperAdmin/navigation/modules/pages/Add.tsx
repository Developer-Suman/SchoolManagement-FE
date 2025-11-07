"use client";
import { useForm } from "react-hook-form";
import AddModuleForm from "../components/AddModuleForm";
import type { IModules } from "../types/IModules";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { ModuleValidator } from "../validators";
import { useEffect } from "react";
interface Props {
  visible: boolean;
  onClose: () => void;
}

const Add = ({ visible, onClose }: Props) => {
  const form = useForm<IModules>({
    defaultValues: {
      Name: "",
      TargetUrl: "",
      Id: "",
      IsActive: true,
      IconUrl: "",
      Rank: "",
    },

    // resolver: yupResolver(ModuleValidator),
  });

  // Reset form when modal opens
  useEffect(() => {
    if (visible) {
      form.reset({
        Name: "",
        TargetUrl: "",
        Id: "",
        IsActive: true,
        IconUrl: "",
        Rank: "",
      });
    }
  }, [visible, form]);

  if (!visible) return null;

  return <AddModuleForm form={form} onClose={() => onClose()} />;
};
export default Add;
