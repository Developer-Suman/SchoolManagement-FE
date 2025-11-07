import { useForm } from "react-hook-form";
import { useGetCompanyById } from "../hooks";
import { ICompany } from "../types/ICompany";
import EditCompanyForm from "../components/EditCompanyForm";
type Props = {
  visible: boolean;
  onClose: () => void;
  CompanyId: string;
  currentPageIndex: number;
};
// enum Status {
//   Manual = 0,
//   Automatic = 1,
// }
const EditCompany = ({
  visible,
  onClose,
  CompanyId,
  currentPageIndex,
}: Props) => {
  const { data: CompanyData } = useGetCompanyById(CompanyId);
  const form = useForm<ICompany>({
    defaultValues: {
      id: CompanyData?.id ?? "",
      name: CompanyData?.name ?? "",
      address: CompanyData?.address ?? "",
      email: CompanyData?.email ?? "",
      shortName: CompanyData?.shortName ?? "",
      contactNumber: CompanyData?.contactNumber ?? "",
      contactPerson: CompanyData?.contactPerson ?? "",
      pan: CompanyData?.pan ?? "",
      imageUrl: CompanyData?.imageUrl ?? undefined,
      isEnable: CompanyData?.isEnable ?? undefined,
      isDeleted: CompanyData?.isDeleted ?? undefined,
      institutionId: CompanyData?.institutionId ?? "",
      billNumberGenerationTypeForPurchase:
        CompanyData?.billNumberGenerationTypeForPurchase ?? undefined,
      fiscalYearId: CompanyData?.fiscalYearId ?? "",
      billNumberGenerationTypeForSales:
        CompanyData?.billNumberGenerationTypeForSales ?? undefined,
    },
  });

  if (!visible) return null;
  return (
    <EditCompanyForm
      form={form}
      CompanyId={CompanyId}
      onClose={() => onClose()}
      currentPageIndex={currentPageIndex}
    />
  );
};
export default EditCompany;
