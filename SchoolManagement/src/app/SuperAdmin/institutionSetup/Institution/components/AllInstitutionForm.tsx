"use client";
import { useEffect, useState } from "react";
import { IInstitution } from "../types/IInstitution";
import { useGetAllInstitution } from "../hooks";
import { useForm } from "react-hook-form";
import Pagination from "@/components/Pagination";
import { EditButton } from "@/components/Buttons/EditButton";
import EditInstitution from "../pages/Edit";
import DeleteButton from "@/components/Buttons/DeleteButton";
import { useRemoveInstitution } from "../hooks";
import { ButtonElement } from "@/components/Buttons/ButtonElement";
import { Edit, Plus, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import Add from "../pages/Add";
const AllInstitutionForm = () => {
  const [modal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const buttonElement = (id: string) => {
    return (
      <ButtonElement
        icon={<Edit size={14} />}
        type="button"
        text=""
        handleClick={() => {
          setShowModal(true);
          setSelectedId(id);
        }}
        className="!text-xs font-semibold !bg-blue-500 hover:!bg-blue-600"
      />
    );
  };

  const [state, setState] = useState({
    loading: true,
    institutions: [] as IInstitution[],
    errorMessage: "",
  });
  const [paginationParams, setPaginationParams] = useState({
    pageSize: 5,
    pageIndex: 1,
    isPagination: true,
  });
  const navigate = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate.push("/");
    }
  }, [navigate]);
  const updateState = (updates: Partial<typeof state>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const query = `?pagesize=${paginationParams.pageSize}&pageIndex=${paginationParams.pageIndex}&IsPagination=${paginationParams.isPagination}`;
  const { data: allInstitution, error, refetch } = useGetAllInstitution(query);
  type SearchParam = {
    pageSize: number;
    pageIndex: number;
    isPagination: boolean;
  };

  const deleteInstitution = useRemoveInstitution();

  const handleDelete = async (id: string | undefined) => {
    try {
      await deleteInstitution.mutateAsync(id);
      refetch();
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const handleSubmit = useForm<SearchParam>({
    defaultValues: {},
  });

  useEffect(() => {
    refetch();
  }, [paginationParams, refetch]);

  const handleSearch = (params: SearchParam) => {
    params.pageSize = paginationParams.pageSize;
    setPaginationParams(params);
    updateState({ loading: true, institutions: [] });
  };
  const [addModal, setAddModal] = useState(false);
  return (
    <div className="md:px-4  px-4 ">
      <div className="overflow-x-auto bg-white dark:bg-[#353535] border border-gray-200 rounded-xl">
        <div className="flex w-full justify-between p-3 px-4 pt-4 items-center ">
          <h1 className=" text-xl font-semibold ">All Institutions</h1>
          <ButtonElement
            icon={<Plus size={24} />}
            type="button"
            text="Add New Institution"
            onClick={() => setAddModal(true)}
            className="!text-md !font-bold"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-gray-50 dark:text-white text-gray-700 dark:bg-[#80878c] uppercase text-sm font-semibold border-b border-gray-200">
                <th className="py-3 px-4 text-left">SN</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Address</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Short Name</th>
                <th className="py-3 px-4 text-left">company</th>
                <th className="py-3 px-4 text-left">Contact Number</th>
                <th className="py-3 px-4 text-left">Contact Person</th>
                <th className="py-3 px-4 text-left">Pan</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allInstitution && allInstitution?.Items?.length > 0 ? (
                allInstitution?.Items?.map(
                  (institution: IInstitution, index: number) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 dark:hover:bg-gray-600  transition-colors border-b border-gray-100 dark:text-gray-100 text-gray-700"
                    >
                      <td className="py-3 px-4">{index + 1}</td>
                      <td className="py-3 px-4">{institution.name}</td>
                      <td className="py-3 px-4">{institution.address}</td>
                      <td className="py-3 px-4">{institution.email}</td>
                      <td className="py-3 px-4">{institution.shortName}</td>
                      <td className="py-3 px-4">
                        {/* <CompanyName id={institution.id} /> */}
                      </td>
                      <td className="py-3 px-4">{institution.contactNumber}</td>
                      <td className="py-3 px-4">{institution.contactPerson}</td>
                      <td className="py-3 px-4">{institution.pan}</td>

                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <DeleteButton
                            onConfirm={() => handleDelete(institution.id)}
                            headerText={<Trash />}
                            content="You cannot undo it. Do you really want to delete this Institution?"
                          />
                          <EditButton
                            button={buttonElement(institution.id ?? "")}
                          />

                          {selectedId && selectedId !== "" && (
                            <EditInstitution
                              visible={modal}
                              onClose={() => setShowModal(false)}
                              institutionId={selectedId}
                              currentPageIndex={paginationParams.pageIndex}
                              organizationId={institution.organizationId}
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    style={{
                      padding: "12px",
                      textAlign: "center",
                      justifyContent: "center",
                    }}
                  ></td>
                </tr>
              )}
            </tbody>
          </table>
          <Add visible={addModal} onClose={() => setAddModal(false)} />
        </div>
      </div>
      {allInstitution && allInstitution?.Items?.length > 0 && (
        <Pagination
          form={handleSubmit}
          pagination={{
            currentPage: Array.isArray(allInstitution)
              ? 1
              : allInstitution?.PageIndex ?? 1,
            firstPage: Array.isArray(allInstitution)
              ? 1
              : allInstitution?.FirstPage ?? 1,
            lastPage: Array.isArray(allInstitution)
              ? 1
              : allInstitution?.LastPage ?? 1,
            nextPage: Array.isArray(allInstitution)
              ? 1
              : allInstitution?.NextPage ?? 1,
            previousPage: Array.isArray(allInstitution)
              ? 1
              : allInstitution?.PreviousPage ?? 1,
          }}
          handleSearch={handleSearch}
        />
      )}
    </div>
  );
};
export default AllInstitutionForm;
