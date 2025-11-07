"use client";
import { useEffect, useState } from "react";
import { IMenu } from "../types/IMenu";
import { useGetAllMenus } from "../hooks";
import { useForm } from "react-hook-form";
import { useRemoveMenu } from "../hooks";
import Pagination from "@/components/Pagination";
import { ButtonElement } from "@/components/Buttons/ButtonElement";
import DeleteButton from "@/components/Buttons/DeleteButton";
import { Edit, Plus, Trash } from "lucide-react";
import EditMenu from "../pages/Edit";
import { EditButton } from "@/components/Buttons/EditButton";
import { useRouter } from "next/navigation";
import Add from "../pages/Add";
const AllMenuForm = () => {
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
    menus: [] as IMenu[],
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
  const { data: allMenus, error, refetch } = useGetAllMenus(query);
  type SearchParam = {
    pageSize: number;
    pageIndex: number;
    isPagination: boolean;
  };
  const deleteMenu = useRemoveMenu();
  const handleSubmit = useForm<SearchParam>({
    defaultValues: {},
  });
  const handleDelete = async (id: string) => {
    try {
      await deleteMenu.mutateAsync(id);
      const updatedMenus = state.menus.filter((menu) => menu.id !== id);
      updateState({ menus: updatedMenus });
    } catch (error) {
      console.log("Error deleting: ", error);
    }
  };

  useEffect(() => {
    refetch();
  }, [paginationParams]);

  const handleSearch = (params: SearchParam) => {
    params.pageSize = paginationParams.pageSize;
    setPaginationParams(params);
    updateState({ loading: true, menus: [] });
  };
  const [addModal, setAddModal] = useState(false);
  return (
    <div className="md:px-4  px-4 ">
      <div className="overflow-x-auto bg-white dark:bg-[#353535] border border-gray-200 rounded-xl">
        <div className="flex w-full justify-between p-3 px-4 pt-4 items-center ">
          <h1 className=" text-xl font-semibold ">All Menus</h1>
          <ButtonElement
            icon={<Plus size={24} />}
            type="button"
            text="Add New Menu"
            onClick={() => setAddModal(true)}
            className="!text-md !font-bold"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-left border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-50 dark:text-white text-gray-700 dark:bg-[#80878c] uppercase text-sm font-semibold border-b border-gray-200">
                <th className="py-3 px-4">SN</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">TargetUrl</th>
                <th className="py-3 px-4">IconUrl</th>
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {allMenus && allMenus?.Items?.length > 0 ? (
                allMenus?.Items?.map((menu: IMenu, index: number) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 dark:hover:bg-gray-600  transition-colors border-b border-gray-100 dark:text-gray-100 text-gray-700"
                  >
                    <td className="py-3 px-4 ">{index + 1}</td>
                    <td className="py-3 px-4 ">{menu.name}</td>
                    <td className="py-3 px-4 ">{menu.targetUrl}</td>
                    <td className="py-3 px-4 ">{menu.iconUrl}</td>
                    <td className="py-3 px-4 ">{menu.rank}</td>
                    <td className="py-3 px-4 ">
                      <div className="flex space-x-2">
                        <DeleteButton
                          onConfirm={() => handleDelete(menu.id)}
                          headerText={<Trash />}
                          content="Are you sure you want to delete this menu?"
                        />
                        <EditButton button={buttonElement(menu.id ?? "")} />
                        {selectedId && selectedId !== "" && (
                          <EditMenu
                            visible={modal}
                            onClose={() => setShowModal(false)}
                            menuId={selectedId}
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                ))
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
          <Add visible={addModal} onClose={() => setAddModal(false)} />
        </div>
      </div>

      {allMenus && allMenus?.Items?.length > 0 && (
        <Pagination
          form={handleSubmit}
          pagination={{
            currentPage: Array.isArray(allMenus) ? 1 : allMenus?.PageIndex ?? 1,
            firstPage: Array.isArray(allMenus) ? 1 : allMenus?.FirstPage ?? 1,
            lastPage: Array.isArray(allMenus) ? 1 : allMenus?.LastPage ?? 1,
            nextPage: Array.isArray(allMenus) ? 1 : allMenus?.NextPage ?? 1,
            previousPage: Array.isArray(allMenus)
              ? 1
              : allMenus?.PreviousPage ?? 1,
          }}
          handleSearch={handleSearch}
        />
      )}
    </div>
  );
};
export default AllMenuForm;
