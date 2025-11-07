"use client";
import { useEffect, useState } from "react";
import {
  useDeleteUser,
  useGetAllUsers,
  useGetFilterUserByDate,
} from "../hooks";
import { IUserResponse, IFilterUserByDate } from "../types/IUserResponse";
import DeleteButton from "@/components/Buttons/DeleteButton";
import { EditButton } from "@/components/Buttons/EditButton";
import { ButtonElement } from "@/components/Buttons/ButtonElement";
import EditUser from "../pages/Edit";
import {
  Edit,
  Trash,
  UserRoundPen,
  Filter,
  RotateCcw,
  Plus,
} from "lucide-react";
import AssignRoleForm from "./AssignRoleForm";
import { usePermissions } from "@/context/auth/PermissionContext";
import useMenuPermissionData from "@/app/SuperAdmin/navigation/hooks/useMenuPermissionData";
import toast, { Toaster } from "react-hot-toast";
import { AppCombobox } from "@/components/Input/ComboBox";
import { useRouter } from "next/navigation";
import Add from "../pages/Add";
import { useGetAllSchool } from "@/app/admin/Setup/School/hooks";

const AllUserForm = () => {
  const navigate = useRouter();
  const { menuStatus } = usePermissions();
  const { canDelete, canEdit, canAssign } = useMenuPermissionData(menuStatus);

  const [modal, setShowModal] = useState(false);
  const [modalForAssignRole, setModalForAssignRole] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [selectedIdForAssignRole, setSelectedIdForAssignRole] = useState("");
  const [selectedUserName, setSelectedUserName] = useState("");
  const [selectedEmail, setSelectedEmail] = useState("");
  const [selectedSchool, setSelectedSchool] = useState("");
  const { data: allschool } = useGetAllSchool();

  const [formData, setFormData] = useState<IFilterUserByDate>({
    SchoolId: "",
    email: "",
    userName: "",
  });

  const {
    data: allUsers,
    refetch,
    error,
    isLoading,
  } = useGetFilterUserByDate(
    formData.SchoolId,
    formData.email,
    formData.userName
  );

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate.push("/");
  }, [navigate]);

  const deleteUser = useDeleteUser();

  const handleDelete = async (id: string) => {
    try {
      await deleteUser.mutateAsync(id);
      toast.success("User deleted successfully!");
      refetch();
    } catch (error) {
      console.log("Error deleting:", error);
    }
  };

  const handleAssignRole = (userId: string) => {
    setSelectedIdForAssignRole((prev) => {
      const newId = prev === userId ? "" : userId;
      setModalForAssignRole(newId !== "");
      return newId;
    });
  };

  const handleSubmit = () => {
    setFormData({
      SchoolId: selectedSchool,
      email: selectedEmail,
      userName: selectedUserName,
    });
    toast.success("Filter applied!");
  };

  const handleClear = () => {
    setSelectedUserName("");
    setSelectedEmail("");
    setSelectedSchool("");
    setFormData({ SchoolId: "", email: "", userName: "" });
    toast("Filters cleared", { icon: "🧹" });
  };
  const [openFilter, setOpenFilter] = useState(false);
  const buttonElement = (userId: string) => (
    <ButtonElement
      icon={<Edit size={14} />}
      type="button"
      text=""
      onClick={() => {
        setShowModal(true);
        setSelectedUserId(userId);
      }}
      className="!text-xs font-semibold !bg-blue-500 hover:!bg-blue-600"
    />
  );
  const [addModal, setAddModal] = useState(false);
  return (
    <div className="md:px-4  px-4 ">
      <div className="overflow-x-auto bg-white dark:bg-[#353535] border border-gray-200 rounded-xl">
        <div className="flex w-full justify-between p-3 px-4 pt-4 items-center ">
          <h1 className=" text-xl font-semibold ">All Users</h1>
          <div className="flex items-center space-x-3">
            <ButtonElement
              type="button"
              text="Filter"
              icon={<Filter size={14} />}
              onClick={() => setOpenFilter(!openFilter)}
              className="!bg-emerald-600 hover:!bg-emerald-700"
            />
            <ButtonElement
              icon={<Plus size={24} />}
              type="button"
              text="Add New User"
              onClick={() => setAddModal(true)}
              className="!text-md !font-bold"
            />
          </div>
        </div>
        <Toaster position="top-right" />
        {openFilter && (
          <div className="mb-6 bg-white p-4 rounded-lg shadow-md border border-gray-100 overflow-x-auto">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="flex items-end gap-4"
            >
              <AppCombobox
                dropDownWidth="w-[25rem]"
                label="User Name"
                name="userName"
                dropdownPositionClass="fixed"
                value={selectedUserName}
                options={allUsers ?? []}
                selected={
                  selectedUserName
                    ? allUsers?.find((g) => g.UserName === selectedUserName) ??
                      null
                    : null
                }
                onSelect={(user) => setSelectedUserName(user?.UserName ?? "")}
                getLabel={(g) => g?.UserName ?? ""}
                getValue={(g) => g?.Id ?? ""}
              />

              <AppCombobox
                dropDownWidth="w-[25rem]"
                dropdownPositionClass="fixed"
                label="Email"
                name="email"
                value={selectedEmail}
                options={allUsers ?? []}
                selected={
                  selectedEmail
                    ? allUsers?.find((g) => g.Email === selectedEmail) ?? null
                    : null
                }
                onSelect={(user) => setSelectedEmail(user?.Email ?? "")}
                getLabel={(g) => g?.Email ?? ""}
                getValue={(g) => g?.Email ?? ""}
              />

              <AppCombobox
                dropDownWidth="w-[25rem]"
                dropdownPositionClass="fixed"
                label="School"
                name="SchoolId"
                value={selectedSchool}
                options={allUsers ?? []}
                selected={
                  selectedSchool
                    ? allUsers?.find((g) => g.SchoolId === selectedSchool) ??
                      null
                    : null
                }
                onSelect={(user) => setSelectedSchool(user?.SchoolId ?? "")}
                getLabel={(g) =>
                  allschool?.Items.find((i) => i.id === g?.SchoolId)?.name ?? ""
                }
                getValue={(g) => g?.SchoolId ?? ""}
              />

              <div className="flex gap-2 ml-auto">
                <ButtonElement
                  type="submit"
                  text="Filter"
                  icon={<Filter size={14} />}
                  className="!bg-emerald-600 hover:!bg-emerald-700"
                />
                <ButtonElement
                  type="button"
                  text="Clear"
                  icon={<RotateCcw size={14} />}
                  onClick={handleClear}
                  className="!bg-gray-500 hover:!bg-gray-600"
                />
              </div>
            </form>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-gray-50 dark:text-white text-gray-700 dark:bg-[#80878c] uppercase text-sm font-semibold border-b border-gray-200">
                <th className="px-4 py-3 text-left w-[60px]">S.N</th>
                <th className="px-4 py-3 text-left">Company</th>
                <th className="px-4 py-3 text-left">User Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Created At</th>
                <th className="px-4 py-3 text-left">Expires At</th>
                <th className="px-4 py-3 text-center w-[180px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="p-4 text-center text-gray-500">
                    Loading users...
                  </td>
                </tr>
              ) : allUsers && allUsers.length > 0 ? (
                allUsers.map((user: IUserResponse, index: number) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 dark:hover:bg-gray-600  transition-colors border-b border-gray-100 dark:text-gray-100 text-gray-700"
                  >
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">
                      {allschool?.Items.find((i) => i.id === user.SchoolId)
                        ?.name ?? ""}
                    </td>
                    <td className="py-3 px-4">{user.UserName}</td>
                    <td className="py-3 px-4">{user.Email}</td>
                    <td className="py-3 px-4">—</td>
                    <td className="py-3 px-4">—</td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center gap-2">
                        <DeleteButton
                          onConfirm={() => handleDelete(user.Id)}
                          headerText={<Trash />}
                          content="Are you sure you want to delete this user?"
                        />
                        <EditButton button={buttonElement(user.Id ?? "")} />
                        {/* <ButtonElement
                        icon={<UserRoundPen size={14} />}
                        type="button"
                        text=""
                        onClick={() => handleAssignRole(user.Id)}
                        className="!text-xs font-semibold !bg-amber-500 hover:!bg-amber-600 py-[0.65rem]"
                      /> */}
                      </div>

                      {/* {selectedIdForAssignRole === user.Id &&
                      modalForAssignRole && (
                        <AssignRoleForm
                          userId={user.Id}
                          key={selectedIdForAssignRole}
                          onClose={() => {
                            setModalForAssignRole(false);
                            setSelectedIdForAssignRole("");
                          }}
                          visible={modalForAssignRole}
                        />
                      )}

                    {selectedUserId && (
                      <EditUser
                        visible={modal}
                        onClose={() => setShowModal(false)}
                        userId={selectedUserId}
                        currentPageIndex={1}
                      />
                    )} */}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="p-4 text-center text-gray-500 italic"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Add visible={addModal} onClose={() => setAddModal(false)} />
      </div>
    </div>
  );
};

export default AllUserForm;
