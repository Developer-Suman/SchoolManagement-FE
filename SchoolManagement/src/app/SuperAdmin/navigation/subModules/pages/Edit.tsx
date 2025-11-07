"use client";
import { useForm } from "react-hook-form";
import EditSubModuleForm from "../components/EditSubModuleForm";
import { ISubModules } from "../types/ISubModules";
import { useGetSubModulesById } from "../hooks";

interface Props {
  visible: boolean;
  onClose: () => void;
  subModulesId: string;
}

const EditSubModule = ({ visible, subModulesId, onClose }: Props) => {
  const { data: subModuleData } = useGetSubModulesById(subModulesId);

  const form = useForm<ISubModules>({
    values: {
      id: subModuleData?.id ?? "",
      name: subModuleData?.name ?? "",
      iconUrl: subModuleData?.iconUrl ?? "",
      targetUrl: subModuleData?.targetUrl ?? "",
      modulesId: subModuleData?.modulesId ?? "",
      rank: subModuleData?.rank ?? "",
      isActive: subModuleData?.isActive ?? false,
    },
  });

  if (!visible) return null;
  return (
    <EditSubModuleForm
      form={form}
      subModulesId={subModulesId}
      modulesId={subModuleData?.modulesId ?? ""}
      onClose={() => onClose()}
    />
  );
};

export default EditSubModule;
