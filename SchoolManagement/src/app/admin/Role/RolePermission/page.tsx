"use client";
import LayoutWrapper from "@/components/Sidebar/ClientWrapper";
import AllRolePermission from "@/app/SuperAdmin/accessControl/RolePermission/Pages/All";

const AdminRolePermission = () => {
  return (
    <div>
      <LayoutWrapper title="Role Permission">
        <AllRolePermission />
      </LayoutWrapper>
    </div>
  );
};
export default AdminRolePermission;
