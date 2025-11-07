import { useForm } from "react-hook-form";
import { useGetSchoolById } from "../hooks";
import { ISchool } from "../types/ISchool";
import EditSchoolForm from "../components/EditSchoolForm";
type Props = {
  visible: boolean;
  onClose: () => void;
  SchoolId: string;
  currentPageIndex: number;
};
// enum Status {
//   Manual = 0,
//   Automatic = 1,
// }
const EditSchool = ({
  visible,
  onClose,
  SchoolId,
  currentPageIndex,
}: Props) => {
  const { data: SchoolData } = useGetSchoolById(SchoolId);
  const form = useForm<ISchool>({
    defaultValues: {
      id: SchoolData?.id ?? "",
      name: SchoolData?.name ?? "",
      address: SchoolData?.address ?? "",
      email: SchoolData?.email ?? "",
      shortName: SchoolData?.shortName ?? "",
      contactNumber: SchoolData?.contactNumber ?? "",
      contactPerson: SchoolData?.contactPerson ?? "",
      pan: SchoolData?.pan ?? "",
      imageUrl: SchoolData?.imageUrl ?? undefined,
      isEnable: SchoolData?.isEnable ?? undefined,
      isDeleted: SchoolData?.isDeleted ?? undefined,
      institutionId: SchoolData?.institutionId ?? "",
      billNumberGenerationTypeForPurchase:
        SchoolData?.billNumberGenerationTypeForPurchase ?? undefined,
      fiscalYearId: SchoolData?.fiscalYearId ?? "",
      billNumberGenerationTypeForSales:
        SchoolData?.billNumberGenerationTypeForSales ?? undefined,
    },
  });

  if (!visible) return null;
  return (
    <EditSchoolForm
      form={form}
      SchoolId={SchoolId}
      onClose={() => onClose()}
      currentPageIndex={currentPageIndex}
    />
  );
};
export default EditSchool;
