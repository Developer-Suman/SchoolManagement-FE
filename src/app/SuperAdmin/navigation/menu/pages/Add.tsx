"use client";
import { useForm } from "react-hook-form";
import AddMenuForm from "../components/AddMenuForm";
import { IMenu } from "../types/IMenu";
import { useEffect } from "react";

interface Props {
  visible: boolean;
  onClose: () => void;
}
const Add = ({ visible, onClose }: Props) => {
  const form = useForm<IMenu>({
    defaultValues: {
      id: "",
      name: "",
      targetUrl: "",
      iconUrl: "",
      subModulesId: "",
      rank: 0,
      isActive: false,
    },
    // resolver: yupResolver(MenuValidator),
  });

  useEffect(() => {
    if (visible) {
      form.reset();
    }
  }, [visible, form]);

  if (!visible) return null;
  return <AddMenuForm form={form} onClose={() => onClose()} />;
};
export default Add;
