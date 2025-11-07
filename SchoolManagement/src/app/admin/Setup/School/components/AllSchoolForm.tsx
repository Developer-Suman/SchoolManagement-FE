"use client";
import { useEffect, useState } from "react";
import { ISchool } from "../types/ISchool";
import { useGetAllSchool, useGetFilterSchoolByDate } from "../hooks";
import { useForm } from "react-hook-form";
import Pagination from "@/components/Pagination";
import { EditButton } from "@/components/Buttons/EditButton";
import EditCompany from "../pages/Edit";
import DeleteButton from "@/components/Buttons/DeleteButton";
import { useRemoveSchool } from "../hooks";
import { ButtonElement } from "@/components/Buttons/ButtonElement";
import { Edit, Plus, Trash } from "lucide-react";
import { IFilterSchoolByDate } from "../types/ISchool";
import { IPaginationResponse } from "@/types/IPaginationResponse";
import { UserName } from "./UserName";
import { useRouter } from "next/navigation";
import Add from "../pages/Add";
const AllSchoolForm = () => {
  const [modal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const [addModal, setAddModal] = useState(false);
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
        customStyle="!text-xs font-bold !bg-teal-500"
      />
    );
  };

  const [state, setState] = useState({
    loading: true,
    School: [] as ISchool[],
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
  const { data: allSchool, error, refetch } = useGetAllSchool(query);

  type SearchParam = {
    pageSize: number;
    pageIndex: number;
    isPagination: boolean;
  };

  const deleteCompany = useRemoveSchool();

  const handleDelete = async (id: string | undefined) => {
    setIsLoading(true);
    try {
      await deleteCompany.mutateAsync(id);
      refetch();
    } catch (error) {
      console.error("Error deleting:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = useForm<SearchParam>({
    defaultValues: {},
  });

  useEffect(() => {
    refetch();
  }, [paginationParams]);

  const handleSearch = (params: SearchParam) => {
    params.pageSize = paginationParams.pageSize;
    setPaginationParams(params);
    updateState({ loading: true, School: [] });
  };

  return (
    <div className="md:px-4  px-4 ">
      <div className="overflow-x-auto bg-white dark:bg-[#353535] border border-gray-200 rounded-xl">
        <div className="flex w-full justify-between p-3 px-4 pt-4 items-center ">
          <h1 className=" text-xl font-semibold ">All School</h1>
          <ButtonElement
            icon={<Plus size={24} />}
            type="button"
            text="Add New School"
            onClick={() => setAddModal(true)}
            className="!text-md !font-bold"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs sm:text-sm">
            <thead>
              <tr style={{ backgroundColor: "#f2f2f2", textAlign: "left" }}>
                <th className="px-4 py-3 text-left">SN</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Address</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Short Name</th>
                <th className="px-4 py-3 text-left">Contact Number</th>
                <th className="px-4 py-3 text-left">Contact Person</th>
                <th className="px-4 py-3 text-left">Assigned Users</th>
                <th className="px-4 py-3 text-left">Pan</th>
                <th className="px-4 py-3 text-left ">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allSchool && allSchool?.Items?.length > 0 ? (
                allSchool?.Items.map((School: ISchool, index: number) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 dark:hover:bg-gray-600  transition-colors border-b border-gray-100 dark:text-gray-100 text-gray-700"
                  >
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">{School.name}</td>
                    <td className="py-3 px-4">{School.address}</td>
                    <td className="py-3 px-4">{School.email}</td>
                    <td className="py-3 px-4">{School.shortName}</td>
                    <td className="py-3 px-4">{School.contactNumber}</td>
                    <td className="py-3 px-4">{School.contactPerson}</td>
                    <td className="py-3 px-4">
                      {School.Users.map((item, index) => (
                        <div key={index} className="flex">
                          <UserName userId={item.userId} /> , &nbsp;
                        </div>
                      ))}
                    </td>
                    <td className="py-3 px-4">{School.pan}</td>

                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <DeleteButton
                          onConfirm={() => handleDelete(School.id)}
                          headerText={<Trash />}
                          content="Are you sure you want to delete this company?"
                        />
                        <EditButton button={buttonElement(School.id ?? "")} />

                        {selectedId && selectedId !== "" && (
                          <EditCompany
                            visible={modal}
                            onClose={() => setShowModal(false)}
                            SchoolId={selectedId}
                            currentPageIndex={paginationParams.pageIndex}
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                ))
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
              <Add visible={addModal} onClose={() => setAddModal(!addModal)} />
            </tbody>
          </table>
        </div>
      </div>
      {allSchool && allSchool?.Items?.length > 0 && (
        <Pagination
          form={handleSubmit}
          pagination={{
            currentPage: Array.isArray(allSchool)
              ? 1
              : allSchool?.PageIndex ?? 1,
            firstPage: Array.isArray(allSchool) ? 1 : allSchool?.FirstPage ?? 1,
            lastPage: Array.isArray(allSchool) ? 1 : allSchool?.LastPage ?? 1,
            nextPage: Array.isArray(allSchool) ? 1 : allSchool?.NextPage ?? 1,
            previousPage: Array.isArray(allSchool)
              ? 1
              : allSchool?.PreviousPage ?? 1,
          }}
          handleSearch={handleSearch}
        />
      )}
    </div>
  );
};
export default AllSchoolForm;
