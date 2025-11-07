import LayoutWrapper from "@/components/Sidebar/ClientWrapper";
import AllSubModule from "./pages/All";

const SubModules = () => {
  return (
    <div>
      <LayoutWrapper title="Sub Module">
        <AllSubModule />
      </LayoutWrapper>
    </div>
  );
};
export default SubModules;
