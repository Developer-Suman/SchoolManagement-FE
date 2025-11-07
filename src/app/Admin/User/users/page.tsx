"use client";
import LayoutWrapper from "@/components/Sidebar/ClientWrapper";
import { AllUsers } from "@/app/SuperAdmin/accessControl/user/pages/All";

const AdminUser = () => {
  return (
    <div>
      <LayoutWrapper title="User">
        <AllUsers />
      </LayoutWrapper>
    </div>
  );
};
export default AdminUser;
