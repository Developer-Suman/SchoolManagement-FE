"use client";
import { useEffect, useState } from "react";
import { IRoles } from "../types/IRoles";
import { useGetAllRoles } from "../hooks";
import { useForm } from "react-hook-form";
import DeleteButton from "@/components/Buttons/DeleteButton";
import { EditButton } from "@/components/Buttons/EditButton";
import { ButtonElement } from "@/components/Buttons/ButtonElement";
import { useRemoveRole } from "../hooks";
import {
  Box,
  Boxes,
  Edit,
  FileLock,
  Plus,
  SquareMenu,
  Trash,
} from "lucide-react";
import All from "../assignrole/pages/All";
import AssignModuleForm from "./AssignModuleForm";
import AssignMenuForm from "./AssignMenuForm";
import AssignSubModuleForm from "./AssignSubModuleForm";
import EditRole from "../pages/Edit";
import AssignedUser from "./AssignedUser";
import Pagination from "@/components/Pagination";
import { useRouter } from "next/navigation";
import Add from "../pages/Add";

const AllRoleForm = () => {
  const [state, setState] = useState({
    loading: true,
    roles: [] as IRoles[],
    errorMessage: "",
  });
  const [modal, setShowModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [selectedIdEdit, setSelectedIdEdit] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [modalForAssignModule, setModalForAssignModule] = useState(false);
  const [selectedIdForAssignModule, setSelectedIdForAssignModule] =
    useState("");
  const [modalForSubModule, setModalForSubModule] = useState(false);
  const [selectedIdForSubModule, setSelectedIdForSubModule] = useState("");
  const [modalForMenu, setModalForMenu] = useState(false);
  const [selectedIdForMenu, setSelectedIdForMenu] = useState("");
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

  const { data: allRole, refetch } = useGetAllRoles(query);

  type SearchParams = {
    pageSize: number;
    pageIndex: number;
    isPagination: boolean;
  };

  const handleSubmit = useForm<SearchParams>({
    defaultValues: {},
  });
  const deleteRole = useRemoveRole();
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

  const handleAssignModule = (roleId: string) => {
    setSelectedIdForAssignModule(
      selectedIdForAssignModule === roleId ? "" : roleId
    );
    setModalForAssignModule(selectedIdForAssignModule !== roleId);
  };

  const handleAssignSubModule = (roleId: string) => {
    setSelectedIdForSubModule(selectedIdForSubModule === roleId ? "" : roleId);
    setModalForSubModule(selectedIdForSubModule !== roleId);
  };

  const handleAssignMenu = (roleId: string) => {
    setSelectedIdForMenu(selectedIdForMenu === roleId ? "" : roleId);
    setModalForMenu(selectedIdForMenu !== roleId);
  };

  const handleGrantPermission = (roleId: string) => {
    setSelectedId(selectedId === roleId ? "" : roleId);
    setShowModal(selectedId !== roleId);
  };
  const [addModal, setAddModal] = useState(false);
  return (
    <div className="md:px-4  px-4 ">
      <div className="overflow-x-auto bg-white dark:bg-[#353535] border border-gray-200 rounded-xl">
        <div className="flex w-full justify-between p-3 px-4 pt-4 items-center ">
          <h1 className=" text-xl font-semibold ">All Roles</h1>
          <ButtonElement
            icon={<Plus size={24} />}
            type="button"
            text="Add New Role"
            onClick={() => setAddModal(true)}
            className="!text-md !font-bold"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-left border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-50 dark:text-white text-gray-700 dark:bg-[#80878c] uppercase text-sm font-semibold border-b border-gray-200">
                <th className="py-3 px-4 text-left">SN</th>
                <th className="py-3 px-4 text-left">ROLE</th>
                <th className="py-3 px-4 text-left">USERS</th>
                <th className="py-3 px-4 text-left">ACTION</th>
                <th className="py-3 px-4 text-left">ASSIGN</th>
                <th className="py-3 px-4 text-left">PERMISSION</th>
              </tr>
            </thead>

            <tbody>
              {allRole && allRole?.Items?.length > 0 ? (
                allRole?.Items.filter(
                  (role): role is IRoles => role !== undefined
                ).map((role: IRoles, index: number) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 dark:hover:bg-gray-600  transition-colors border-b border-gray-100 dark:text-gray-100 text-gray-700"
                  >
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">{role?.Name}</td>
                    <td className="py-3 px-4">
                      <AssignedUser roleId={role?.Id} />
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        {/* {canDelete && ( */}
                        <div className="tooltip">
                          {/* <span className="tooltiptext">Delete Role</span> */}
                          <DeleteButton
                            onConfirm={() => handleDelete(role?.Id)}
                            headerText={<Trash />}
                            content="Are you sure you want to delete this Role?"
                          />
                        </div>
                        {/* )} */}
                        {/* {canEdit && ( */}
                        <div className="tooltip">
                          {/* <span className="tooltiptext">Edit Role</span> */}
                          <EditButton button={buttonElement(role?.Id ?? "")} />
                          {selectedIdEdit && selectedIdEdit !== " " && (
                            <EditRole
                              visible={modalEdit}
                              onClose={() => setModalEdit(false)}
                              Id={selectedIdEdit}
                              roleId={selectedIdEdit}
                            />
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      <div className="flex space-x-2 ">
                        <div className="tooltip">
                          <ButtonElement
                            icon={<Box size={14} />}
                            type="button"
                            text=""
                            handleClick={() => {
                              handleAssignModule(role?.Id);
                              if (modal) {
                                setShowModal(false);
                              }
                              if (modalForSubModule) {
                                setModalForSubModule(false);
                              }
                              if (modalForMenu) {
                                setModalForMenu(false);
                              }
                            }}
                            customStyle="!text-xs font-bold !bg-teal-500  py-[0.65rem]"
                          />
                        </div>

                        <div className="tooltip">
                          <ButtonElement
                            icon={<Boxes size={14} />}
                            type="button"
                            text=""
                            handleClick={() => {
                              if (modal) {
                                setShowModal(false);
                              }
                              handleAssignSubModule(role?.Id);
                              if (modalForAssignModule) {
                                setModalForAssignModule(false);
                              }
                              if (modalForMenu) {
                                setModalForMenu(false);
                              }
                            }}
                            customStyle="!text-xs font-bold !bg-teal-500  py-[0.65rem]"
                          />
                        </div>

                        <div className="tooltip">
                          {/* <span className="tooltiptext">Assign Menu</span> */}
                          <ButtonElement
                            icon={<SquareMenu size={14} />}
                            type="button"
                            text=""
                            handleClick={() => {
                              if (modal) {
                                setShowModal(false);
                              }
                              handleAssignMenu(role?.Id);
                              if (modalForAssignModule) {
                                setModalForAssignModule(false);
                              }
                              if (modalForSubModule) {
                                setModalForSubModule(false);
                              }
                            }}
                            customStyle="!text-xs font-bold !bg-teal-500  py-[0.65rem]"
                          />
                        </div>
                      </div>
                      {selectedIdForAssignModule === role?.Id &&
                        modalForAssignModule && (
                          <div className="ml-8">
                            <AssignModuleForm
                              key={selectedIdForAssignModule}
                              roleId={role?.Id}
                              refetchRoles={refetch}
                              onClose={() => {
                                setModalForAssignModule(false);
                              }}
                              visible={modalForAssignModule}
                            />
                          </div>
                        )}
                      {selectedIdForSubModule === role?.Id &&
                        modalForSubModule && (
                          <div className="ml-16 ">
                            <AssignSubModuleForm
                              key={selectedIdForSubModule}
                              roleId={role?.Id}
                              refetchRoles={refetch}
                              onClose={() => {
                                setModalForSubModule(false);
                              }}
                              visible={modalForSubModule}
                            />
                          </div>
                        )}
                      {selectedIdForMenu === role?.Id && modalForMenu && (
                        <div className="ml-28">
                          <AssignMenuForm
                            key={selectedIdForMenu}
                            roleId={role?.Id}
                            refetchRoles={refetch}
                            onClose={() => {
                              setModalForMenu(false);
                            }}
                            visible={modalForMenu}
                          />
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      <div className="tooltip">
                        {/* <span className="tooltiptext ">Grant Permission</span> */}
                        <ButtonElement
                          icon={<FileLock size={14} />}
                          type="button"
                          text=""
                          handleClick={() => {
                            handleGrantPermission(role?.Id);
                            if (modalForAssignModule) {
                              setModalForAssignModule(false);
                            }
                            if (modalForSubModule) {
                              setModalForSubModule(false);
                            }
                            if (modalForMenu) {
                              setModalForMenu(false);
                            }
                          }}
                          customStyle="!text-xs font-bold !bg-teal-500"
                        />
                      </div>

                      {selectedId === role?.Id && modal && (
                        <div className="ml-8">
                          <All
                            key={selectedId}
                            roleId={selectedId}
                            onClose={() => {
                              setShowModal(false);
                              setSelectedId("");
                            }}
                            visible={modal}
                          />
                        </div>
                      )}
                    </td>
                  </tr>
                ))
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
            </tbody>
          </table>
          <Add visible={addModal} onClose={() => setAddModal(false)} />
        </div>
      </div>

      {allRole && allRole?.Items?.length > 0 && (
        <Pagination
          form={handleSubmit}
          pagination={{
            currentPage: Array.isArray(allRole) ? 1 : allRole?.PageIndex ?? 1,
            firstPage: Array.isArray(allRole) ? 1 : allRole?.FirstPage ?? 1,
            lastPage: Array.isArray(allRole) ? 1 : allRole?.LastPage ?? 1,
            nextPage: Array.isArray(allRole) ? 1 : allRole?.NextPage ?? 1,
            previousPage: Array.isArray(allRole)
              ? 1
              : allRole?.PreviousPage ?? 1,
          }}
          handleSearch={handleSearch}
        />
      )}
    </div>
  );
};

export default AllRoleForm;
