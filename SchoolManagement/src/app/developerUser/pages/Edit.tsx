import { useForm } from "react-hook-form";
import type { IOrganization } from "../types/IOrganization";
import { yupResolver } from "@hookform/resolvers/yup";
import { OrganizationValidator } from "../validators/index";
import { MouseEvent } from "react";
import EditOrganizationForm from "../component/EditOrganizationForm";
import { useGetAllOrganizationById } from "../hooks";

interface Props {
  visible: boolean;
  onClose: () => void;
  organizationsId: string;
  currentPageIndex: number;
}

const EditOrganization = ({
  visible,
  onClose,
  organizationsId,
  currentPageIndex,
}: Props) => {
  const { data: Organization } = useGetAllOrganizationById(organizationsId);

  const form = useForm<IOrganization>({
    values: {
      id: Organization?.id ?? "",
      name: Organization?.name ?? "",
      address: Organization?.address ?? "",
      email: Organization?.email ?? "",
      phoneNumber: Organization?.phoneNumber ?? "",
      mobileNumber: Organization?.mobileNumber ?? "",
      logo: Organization?.logo ?? "",
      provinceId: 0,
    },
    resolver: yupResolver(OrganizationValidator),
  });

  const handleOnClose = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).id === "container") onClose();
  };

  if (!visible) return null;

  return (
    <div onClick={handleOnClose}>
      <EditOrganizationForm
        currentPageIndex={currentPageIndex}
        form={form}
        organizationId={organizationsId}
        onClose={() => onClose()}
      />
    </div>
  );
};

export default EditOrganization;
