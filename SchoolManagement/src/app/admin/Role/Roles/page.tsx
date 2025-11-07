"use client";
import LayoutWrapper from "@/components/Sidebar/ClientWrapper";
import AllRole from "@/app/SuperAdmin/accessControl/roles/pages/AllRole";

const AdminRole = () => {
  return (
    <div>
      <LayoutWrapper title="Role">
        <AllRole />
      </LayoutWrapper>
    </div>
  );
};
export default AdminRole;
