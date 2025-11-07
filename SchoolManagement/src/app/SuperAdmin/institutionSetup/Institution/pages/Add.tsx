"use client";
import { useForm } from "react-hook-form";
import AddInstitutionForm from "../components/AddInstitutionForm";
import { IInstitution } from "../types/IInstitution";
import { useEffect } from "react";
interface Props {
  visible: boolean;
  onClose: () => void;
}
const Add = ({ visible, onClose }: Props) => {
  const form = useForm<IInstitution>({
    defaultValues: {
      id: "",
      name: "",
      address: "",
      email: "",
      shortName: "",
      contactNumber: "",
      contactPerson: "",
      pan: "",
      imageUrl: "",
      isEnable: true,
      isDeleted: false,
      organizationId: "",
    },
    //resolver: yupResolver(SubModuleValidator),
  });
  useEffect(() => {
    if (visible) {
      form.reset({
        id: "",
        name: "",
        address: "",
        email: "",
        shortName: "",
        contactNumber: "",
        contactPerson: "",
        pan: "",
        imageUrl: "",
        isEnable: true,
        isDeleted: false,
        organizationId: "",
      });
    }
  }, [visible, form]);

  if (!visible) return null;
  return <AddInstitutionForm form={form} onClose={() => onClose()} />;
};
export default Add;
