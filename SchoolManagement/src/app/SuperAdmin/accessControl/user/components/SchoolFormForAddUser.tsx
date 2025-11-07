"use client";
import { useGetAllSchool } from "@/app/admin/Setup/School/hooks";

interface Props {
  userId: string;
  selectedSchool: string | null;
  setSelectedSchool: React.Dispatch<React.SetStateAction<string | null>>;
  setSchoolName: React.Dispatch<React.SetStateAction<string | null>>;
}

const SchoolFormForAddUser = ({
  selectedSchool,
  setSchoolName,
  setSelectedSchool,
}: Props) => {
  const { data: School, isLoading } = useGetAllSchool();

  const handleCheckboxChange = (
    SchoolId: string | null,
    schoolName: string | null
  ) => {
    setSelectedSchool((prevSelected) =>
      prevSelected === SchoolId ? null : SchoolId
    );
    setSchoolName((prevSelected) =>
      prevSelected === schoolName ? null : schoolName
    );
  };
  return (
    <div className="  bg-white p-4 rounded-lg  h-[15rem]">
      <h1 className="text-xl font-semibold mb-2">Assign School</h1>
      <div>
        {School && School.Items.length > 0
          ? School.Items.map((School) => {
              return (
                <div key={School.id} className="">
                  <div className="flex items-center h-fit drop-shadow-md p-2 space w-fit py-1 rounded-sm">
                    <input
                      type="checkbox"
                      checked={selectedSchool === School.id}
                      onChange={() => {
                        handleCheckboxChange(School.id, School?.name);
                      }}
                    />
                    <div className="text-md font-medium ml-2">
                      {School.name}
                    </div>
                  </div>
                </div>
              );
            })
          : !isLoading && <p className="text-sm ml-8">No School found</p>}
      </div>
    </div>
  );
};

export default SchoolFormForAddUser;
