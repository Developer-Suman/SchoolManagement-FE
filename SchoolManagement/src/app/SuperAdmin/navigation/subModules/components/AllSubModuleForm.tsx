"use client";
import { useEffect, useState } from "react";
import { ISubModules } from "../types/ISubModules";
import { useGetAllSubModules } from "../hooks";
import { useForm } from "react-hook-form";
import { useRemoveSubModule } from "../hooks";
import Pagination from "@/components/Pagination";
import { ButtonElement } from "@/components/Buttons/ButtonElement";
import DeleteButton from "@/components/Buttons/DeleteButton";
import { Edit, Plus, Trash } from "lucide-react";
import EditSubModule from "../pages/Edit";
import AddSubModule from "../pages/Add";
import { EditButton } from "@/components/Buttons/EditButton";
import { useRouter } from "next/navigation";
const AllSubModuleForm = () => {
  const [modal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("");

  const buttonElement = (id: string) => {
    return (
      <ButtonElement
        icon={<Edit size={14} />}
        type="button"
        text=""
        onClick={() => {
          setShowModal(true);
          setSelectedId(id);
        }}
        className="!text-xs font-semibold !bg-blue-500 hover:!bg-blue-600"
      />
    );
  };
  const [state, setState] = useState({
    loading: true,
    subModules: [] as ISubModules[],
    errorMessage: "",
  });
  const [paginationParams, setPaginationParams] = useState({
    pageSize: 10,
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
  const { data: allSubModules, refetch } = useGetAllSubModules(query);
  type SearchParam = {
    pageSize: number;
    pageIndex: number;
    isPagination: boolean;
  };

  const handleSubmit = useForm<SearchParam>({
    defaultValues: {},
  });
  const deleteSubModule = useRemoveSubModule();
  const handleDelete = async (id: string | undefined) => {
    try {
      await deleteSubModule.mutateAsync(id);
      refetch();
    } catch (error) {
      console.log("Error Deleting: ", error);
    }
  };

  useEffect(() => {
    refetch();
  }, [paginationParams]);

  const handleSearch = (params: SearchParam) => {
    params.pageSize = paginationParams.pageSize;
    setPaginationParams(params);
    updateState({ loading: true, subModules: [] });
  };
  const [addModal, setAddModal] = useState(false);
  return (
    <div className="md:px-4   ">
      <div className="overflow-x-auto bg-white dark:bg-[#353535] border border-gray-200 rounded-xl">
        <div className="flex w-full justify-between p-3 px-4 pt-4 items-center ">
          <h1 className=" text-lg font-semibold ">All Sub Modules</h1>
          <ButtonElement
            icon={<Plus size={24} />}
            type="button"
            text="Add New Sub Module"
            onClick={() => setAddModal(true)}
            className="!text-md !font-bold"
          />
        </div>
        <table className="min-w-full table-auto text-left border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-50 dark:text-white text-gray-700 dark:bg-[#80878c] uppercase text-sm font-semibold border-b border-gray-200">
              <th className="py-3 px-4">SN</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">ICON URL</th>
              <th className="py-3 px-4">TARGET URL</th>
              <th className="py-3 px-4">Rank</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {allSubModules && allSubModules?.Items?.length > 0 ? (
              allSubModules.Items?.map(
                (subModule: ISubModules, index: number) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 dark:hover:bg-gray-600  transition-colors border-b border-gray-100 dark:text-gray-100 text-gray-700"
                  >
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4 font-medium">{subModule.name}</td>
                    <td className="py-3 px-4">{subModule.iconUrl}</td>
                    <td className="py-3 px-4">{subModule.targetUrl}</td>

                    <td className="py-3 px-4">{subModule.rank}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center space-x-3">
                        <DeleteButton
                          headerText={<Trash className="w-4 h-4" />}
                          content="By confirming, you will permanently delete this module. Proceed?"
                          onConfirm={() => handleDelete(subModule.id)}
                        />
                        <EditButton
                          button={buttonElement(subModule.id ?? "")}
                        />
                        {selectedId && (
                          <EditSubModule
                            visible={modal}
                            onClose={() => setShowModal(false)}
                            subModulesId={selectedId}
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
                  colSpan={3}
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
      </div>
      <AddSubModule visible={addModal} onClose={() => setAddModal(false)} />
      {allSubModules && allSubModules?.Items?.length > 0 && (
        <Pagination
          form={handleSubmit}
          pagination={{
            currentPage: Array.isArray(allSubModules)
              ? 1
              : allSubModules?.PageIndex ?? 1,
            firstPage: Array.isArray(allSubModules)
              ? 1
              : allSubModules?.FirstPage ?? 1,
            lastPage: Array.isArray(allSubModules)
              ? 1
              : allSubModules?.LastPage ?? 1,
            nextPage: Array.isArray(allSubModules)
              ? 1
              : allSubModules?.NextPage ?? 1,
            previousPage: Array.isArray(allSubModules)
              ? 1
              : allSubModules?.PreviousPage ?? 1,
          }}
          handleSearch={handleSearch}
        />
      )}
    </div>
  );
};
export default AllSubModuleForm;
