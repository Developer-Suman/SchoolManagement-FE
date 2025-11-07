"use client";
import { useForm } from "react-hook-form";
import EditMenuForm from "../components/EditMenuForm";
import { IMenu } from "../types/IMenu";
import { useGetMenuById } from "../hooks";

interface Props {
  visible: boolean;
  onClose: () => void;
  menuId: string;
}

const EditMenu = ({ visible, menuId, onClose }: Props) => {
  const { data: menuData } = useGetMenuById(menuId);
  const form = useForm<IMenu>({
    values: {
      id: menuData?.id ?? "",
      name: menuData?.name ?? "",
      targetUrl: menuData?.targetUrl ?? "",
      iconUrl: menuData?.iconUrl ?? "",
      subModulesId: menuData?.subModulesId ?? "",
      rank: menuData?.rank ?? 0,
      isActive: menuData?.isActive ?? false,
    },
  });

  if (!visible) return null;
  return (
    <EditMenuForm
      form={form}
      menuId={menuId}
      subModulesId={menuData?.subModulesId ?? ""}
      onClose={() => onClose()}
    />
  );
};

export default EditMenu;
