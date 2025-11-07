"use client";
import { useForm } from "react-hook-form";
import { useGetInstitutionById } from "../hooks";
import { IInstitution } from "../types/IInstitution";
import EditInstitutionForm from "../components/EditInstitutionForm";
type Props = {
  visible: boolean;
  onClose: () => void;
  institutionId: string;
  currentPageIndex: number;
  organizationId: string;
};
const EditInstitution = ({
  visible,
  onClose,
  institutionId,
  currentPageIndex,
  organizationId,
}: Props) => {
  const { data: institutionData } = useGetInstitutionById(institutionId);
  const form = useForm<IInstitution>({
    values: {
      id: institutionData?.id ?? "",
      name: institutionData?.name ?? "",
      address: institutionData?.address ?? "",
      email: institutionData?.email ?? "",
      shortName: institutionData?.shortName ?? "",
      contactNumber: institutionData?.contactNumber ?? "",
      contactPerson: institutionData?.contactPerson ?? "",
      pan: institutionData?.pan ?? "",
      imageUrl: institutionData?.imageUrl ?? "",
      isEnable: institutionData?.isEnable ?? "",
      isDeleted: institutionData?.isDeleted ?? "",
      organizationId: institutionData?.organizationId ?? "",
    },
  });

  if (!visible) return null;
  return (
    <EditInstitutionForm
      form={form}
      institutionId={institutionId}
      organizationId={organizationId}
      onClose={() => onClose()}
      currentPageIndex={currentPageIndex}
    />
  );
};
export default EditInstitution;
