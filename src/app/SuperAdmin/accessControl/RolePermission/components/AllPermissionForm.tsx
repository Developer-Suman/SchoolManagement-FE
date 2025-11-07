"use client";
import { useEffect, useState } from "react";
import { IRolePermission } from "../types/IRolePermission";
import { useGetAllPermission } from "../hooks";
import { useForm } from "react-hook-form";
import Pagination from "@/components/Pagination";
import DeleteButton from "@/components/Buttons/DeleteButton";
import { EditButton } from "@/components/Buttons/EditButton";
import { ButtonElement } from "@/components/Buttons/ButtonElement";
import { useRemoveRolePermission } from "../hooks";
import { Edit, FileLock, Plus, Trash, X } from "lucide-react";
import EditRolePermission from "../Pages/Edit";
import AddPermissionToRole from "./AddPermissionToRoleForm";
import AssignedRole from "./AssignedRole";
import { usePermissions } from "@/context/auth/PermissionContext";
import useMenuPermissionData from "@/app/SuperAdmin/navigation/hooks/useMenuPermissionData";
import { useRouter } from "next/navigation";
import Add from "../Pages/Add";

const AllRolePermissionForm = () => {
  const [state, setState] = useState({
    loading: true,
    roles: [] as IRolePermission[],
    errorMessage: "",
  });
  const { menuStatus } = usePermissions();
  const { canEdit, canDelete, canAssign } = useMenuPermissionData(menuStatus);
  const [modalEdit, setModalEdit] = useState(false);
  const [selectedIdEdit, setSelectedIdEdit] = useState("");
  const [modalForRole, setModalForRole] = useState(false);
  const [selectedIdForRole, setSelectedIdForRole] = useState("");
  const [paginationParams, setPaginationParams] = useState({
    pageSize: 5,
    pageIndex: 1,
    isPagination: true,
  });

  const query = `?pageSize=${paginationParams.pageSize}&pageIndex=${paginationParams.pageIndex}&IsPagination=${paginationParams.isPagination}`;

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

  const { data, isLoading, error, refetch } = useGetAllPermission(query);
  useEffect(() => {
    if (data?.Items) {
      updateState({
        loading: true,
        roles: data.Items,
        errorMessage: "",
      });
    } else if (error) {
      updateState({
        loading: false,
        roles: [],
        errorMessage: "Failed to fetch roles",
      });
    }
  }, [data, error]);

  type SearchParams = {
    pageSize: number;
    pageIndex: number;
    isPagination: boolean;
  };

  const handleSubmit = useForm<SearchParams>({
    defaultValues: {},
  });
  const deleteRole = useRemoveRolePermission();
  const handleDelete = async (Id: string) => {
    try {
      await deleteRole.mutateAsync(Id);
      refetch();
    } catch (error) {
      console.log("error", error);
    }
  };

  const buttonElement = (id: string) => {
    return (
      <ButtonElement
        icon={<Edit size={14} />}
        type="button"
        text=""
        handleClick={() => {
          setSelectedIdEdit(id);
          setModalEdit(true);
        }}
        className="!text-xs font-semibold !bg-blue-500 hover:!bg-blue-600"
      />
    );
  };

  useEffect(() => {
    refetch();
  }, [paginationParams, refetch]);

  const handleSearch = (params: SearchParams) => {
    params.pageSize = paginationParams.pageSize;
    setPaginationParams(params);
    updateState({ loading: true, roles: [] });
  };

  const handleGrantPermission = (roleId: string) => {
    setSelectedIdForRole(selectedIdForRole === roleId ? "" : roleId);
    setModalForRole(selectedIdForRole !== roleId);
  };
  const [addModal, setAddModal] = useState(false);
  return (
    <div className="md:px-4  px-4 ">
      <div className="overflow-x-auto bg-white dark:bg-[#353535] border border-gray-200 rounded-xl">
        <div className="flex w-full justify-between p-3 px-4 pt-4 items-center ">
          <h1 className=" text-xl font-semibold ">All Permission</h1>
          <ButtonElement
            icon={<Plus size={24} />}
            type="button"
            text="Add New Permission"
            onClick={() => setAddModal(true)}
            className="!text-md !font-bold"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-left border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-50 dark:text-white text-gray-700 dark:bg-[#80878c] uppercase text-sm font-semibold border-b border-gray-200">
                <th className="py-3 px-4">SN</th>
                <th className="py-3 px-4">PERMISSION NAME</th>
                <th className="py-3 px-4">ROLE NAME</th>
                <th className="py-3 px-4">ACTION</th>
                <th className="py-3 px-4">ASSIGN ROLE TO USER</th>
              </tr>
            </thead>
            <tbody>
              {data && data?.Items?.length > 0 ? (
                state?.roles?.map(
                  (permission: IRolePermission, index: number) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 dark:hover:bg-gray-600  transition-colors border-b border-gray-100 dark:text-gray-100 text-gray-700"
                    >
                      <td className="py-3 px-4">{index + 1}</td>
                      <td className="py-3 px-4">{permission.name}</td>
                      <td className="py-3 px-4">
                        <AssignedRole permissionId={permission.id} />
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <div className="tooltip">
                            {/* <span className="tooltiptext">Delete Role</span> */}
                            <DeleteButton
                              onConfirm={() => handleDelete(permission.id)}
                              headerText={<Trash strokeWidth={3} />}
                              content="Are you sure you want to delete it? You cannot undo it."
                            />
                          </div>
                          <div className="tooltip">
                            {/* <span className="tooltiptext">Edit Role</span> */}
                            <EditButton
                              button={buttonElement(permission.id ?? "")}
                            />
                            {selectedIdEdit && selectedIdEdit.trim() !== "" ? (
                              <EditRolePermission
                                permissionId={selectedIdEdit}
                                visible={modalEdit}
                                onClose={() => setModalEdit(false)}
                                Id={selectedIdEdit}
                              />
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        <div className="tooltip">
                          <ButtonElement
                            icon={<FileLock size={14} />}
                            type="button"
                            text=""
                            handleClick={() => {
                              handleGrantPermission(permission.id);
                            }}
                            customStyle="!text-xs font-bold !bg-teal-500"
                          />
                        </div>

                        {selectedIdForRole === permission.id &&
                          modalForRole && (
                            <div className="">
                              <AddPermissionToRole
                                permissionId={permission.id}
                                key={selectedIdForRole}
                                onClose={() => {
                                  setModalForRole(false);
                                  setSelectedIdForRole("");
                                }}
                                visible={modalForRole}
                              />
                            </div>
                          )}
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    style={{ padding: "12px", textAlign: "center" }}
                  >
                    No roles found.
                  </td>
                </tr>
              )}
              <Add visible={addModal} onClose={() => setAddModal(false)} />
            </tbody>
          </table>
        </div>
      </div>
      {data && data?.Items?.length > 0 && (
        <Pagination
          form={handleSubmit}
          pagination={{
            currentPage: data?.PageIndex,
            firstPage: data?.FirstPage,
            lastPage: data?.LastPage,
            nextPage: data?.NextPage,
            previousPage: data?.PreviousPage,
          }}
          handleSearch={handleSearch}
        />
      )}
    </div>
  );
};

export default AllRolePermissionForm;
