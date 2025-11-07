"use client";
import { useForm } from "react-hook-form";
import AddSubModuleForm from "../components/AddSubModuleForm";
import { ISubModules } from "../types/ISubModules";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { SubModuleValidator } from "../validators";
import { useEffect } from "react";

interface Props {
  visible: boolean;
  onClose: () => void;
}
const Add = ({ visible, onClose }: Props) => {
  const form = useForm<ISubModules>({
    defaultValues: {
      id: "",
      name: "",
      iconUrl: "",
      targetUrl: "",
      modulesId: "",
      rank: "",
      isActive: false,
    },
    // resolver: yupResolver(SubModuleValidator),
  });

  useEffect(() => {
    if (visible) {
      form.reset({
        id: "",
        name: "",
        iconUrl: "",
        targetUrl: "",
        modulesId: "",
        rank: "",
        isActive: false,
      });
    }
  }, [visible, form]);

  if (!visible) return null;
  return <AddSubModuleForm form={form} onClose={() => onClose()} />;
};
export default Add;
