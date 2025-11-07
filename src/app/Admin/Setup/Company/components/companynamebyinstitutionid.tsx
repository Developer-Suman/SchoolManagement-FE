import { useGetCompanyByInstitutionId } from "../hooks";

type Props = {
  id: string;
};

export const CompanyName = ({ id }: Props) => {
  const { data: companies } = useGetCompanyByInstitutionId(id);
  if (!companies) return <div>Loading...</div>;
  return (
    <div>
      {companies.map((company) => (
        <div key={company.id}>{company.name ?? "No Company Found"}</div>
      ))}
    </div>
  );
};
