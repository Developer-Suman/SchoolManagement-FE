import LayoutWrapper from "@/components/Sidebar/ClientWrapper";
import AllModules from "./pages/All";

const Modules = () => {
  return (
    <div>
      <LayoutWrapper title="Module">
        <AllModules />
      </LayoutWrapper>
    </div>
  );
};
export default Modules;
