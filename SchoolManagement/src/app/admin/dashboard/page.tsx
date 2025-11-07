import LayoutWrapper from "@/components/Sidebar/ClientWrapper";
import Dashboard from "./components/Dashboard";

export default function DashboardPageForAdmin() {
  return (
    <LayoutWrapper title="Dashboard">
      <Dashboard />
    </LayoutWrapper>
  );
}
