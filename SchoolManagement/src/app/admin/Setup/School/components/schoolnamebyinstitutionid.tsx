import { useGetSchoolByInstitutionId } from "../hooks";

type Props = {
  id: string;
};

export const SchoolName = ({ id }: Props) => {
  const { data: schools } = useGetSchoolByInstitutionId(id);
  if (!schools) return <div>Loading...</div>;
  return (
    <div>
      {schools.map((school) => (
        <div key={school.id}>{school.name ?? "No School Found"}</div>
      ))}
    </div>
  );
};
