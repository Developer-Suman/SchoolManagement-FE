"use client";
import { useGetAllCompany } from "@/app/admin/Setup/Company/hooks";

interface Props {
  userId: string;
  selectedCompany: string | null;
  setSelectedCompany: React.Dispatch<React.SetStateAction<string | null>>;
  setCompanyName: React.Dispatch<React.SetStateAction<string | null>>;
}

const CompanyFormForAddUser = ({
  selectedCompany,
  setCompanyName,
  setSelectedCompany,
}: Props) => {
  const { data: Company, isLoading } = useGetAllCompany();

  const handleCheckboxChange = (
    CompanyId: string | null,
    companyName: string | null
  ) => {
    setSelectedCompany((prevSelected) =>
      prevSelected === CompanyId ? null : CompanyId
    );
    setCompanyName((prevSelected) =>
      prevSelected === companyName ? null : companyName
    );
  };
  return (
    <div className="  bg-white p-4 rounded-lg  h-[15rem]">
      <h1 className="text-xl font-semibold mb-2">Assign Company</h1>
      <div>
        {Company && Company.Items.length > 0
          ? Company.Items.map((Company) => {
              return (
                <div key={Company.id} className="">
                  <div className="flex items-center h-fit drop-shadow-md p-2 space w-fit py-1 rounded-sm">
                    <input
                      type="checkbox"
                      checked={selectedCompany === Company.id}
                      onChange={() => {
                        handleCheckboxChange(Company.id, Company?.name);
                      }}
                    />
                    <div className="text-md font-medium ml-2">
                      {Company.name}
                    </div>
                  </div>
                </div>
              );
            })
          : !isLoading && <p className="text-sm ml-8">No Company found</p>}
      </div>
    </div>
  );
};

export default CompanyFormForAddUser;
