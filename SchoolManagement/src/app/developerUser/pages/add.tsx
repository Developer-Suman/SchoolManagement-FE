import { useForm } from "react-hook-form";
import AddOrganization from "../component/AddOrganization";
import type { IOrganization } from "../types/IOrganization";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { OrganizationValidator } from "../validators/index";
import { MouseEvent } from "react";
interface Props {
  visible: boolean;
  onClose: () => void;
}

const Add = ({ visible, onClose }: Props) => {
  const form = useForm<IOrganization>({
    defaultValues: {
      name: "",
      address: "",
      email: "",
      phoneNumber: "",
      mobileNumber: "",
      logo: "",
      provinceId: 0,
    },

    // resolver: yupResolver(OrganizationValidator),
  });
  const handleOnClose = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).id === "container") onClose();
  };
  if (!visible) return null;

  return (
    <div onClick={handleOnClose}>
      <AddOrganization form={form} onClose={() => onClose()} />
    </div>
  );
};
export default Add;
