"use client";
import { useGetAllInstitution } from "@/app/SuperAdmin/institutionSetup/Institution/hooks";

interface Props {
  userId: string;
  selectedInstitution: string | null;
  setSelectedInstitution: React.Dispatch<React.SetStateAction<string | null>>;
  // institutionName: string | null;
  setInstitutionName: React.Dispatch<React.SetStateAction<string | null>>;
}

const InstitutionFormForAddUser = ({
  selectedInstitution,
  setInstitutionName,
  setSelectedInstitution,
}: Props) => {
  const { data: institution, isLoading } = useGetAllInstitution();
  const handleCheckboxChange = (
    InstitutionId: string | null,
    institutionName: string | null
  ) => {
    setSelectedInstitution((prevSelected) =>
      prevSelected === InstitutionId ? null : InstitutionId
    );
    setInstitutionName((prevSelected) =>
      prevSelected === institutionName ? null : institutionName
    );
  };
  return (
    <div className="  bg-white p-4 rounded-lg  h-[15rem]">
      <h1 className="text-xl font-semibold mb-2">Assign Institutions</h1>
      <div>
        {institution && institution.Items.length > 0
          ? institution.Items.map((Institution) => {
              return (
                <div key={Institution.id} className="">
                  <div className="flex items-center h-fit drop-shadow-md p-2 space w-fit py-1 rounded-sm">
                    <input
                      type="checkbox"
                      checked={selectedInstitution === Institution.id}
                      onChange={() => {
                        handleCheckboxChange(Institution.id, Institution.name);
                      }}
                    />
                    <div className="text-md font-medium ml-2">
                      {Institution.name}
                    </div>
                  </div>
                </div>
              );
            })
          : !isLoading && <p className="text-sm ml-8">No Institution found</p>}
      </div>
    </div>
  );
};

export default InstitutionFormForAddUser;
