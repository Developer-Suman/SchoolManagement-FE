"use client";
import LayoutWrapper from "@/components/Sidebar/ClientWrapper";
import AllRolePermission from "@/app/SuperAdmin/accessControl/RolePermission/Pages/All";

const AdminRoles = () => {
  return (
    <div>
      <LayoutWrapper title="Role Permission">
        <AllRolePermission />
      </LayoutWrapper>
    </div>
  );
};
export default AdminRoles;
