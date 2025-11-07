import { ModuleGetDTO } from "../types/ModuleGetDTOs";
import { api } from "@/utils/instance";
import { useQuery } from "@tanstack/react-query";

const RoleWiseSideBarEndPoint = {
  getRoleWiseSidebarMenu: "/api/RoleModuleControllers/GetNavigationByUser",
};

const queryKey = "roleWiseSidebarMenu";

const useRoleWiseSidebarMenu = (Id?: string) => {
  return useQuery({
    queryKey: [queryKey, Id],
    queryFn: async () => {
      const response = await api.get<ModuleGetDTO>(
        `${RoleWiseSideBarEndPoint.getRoleWiseSidebarMenu}/${Id}`
      );

      return response.data;
    },

    enabled: !!Id, //Only fetch when Id is present
    staleTime: 0, //Ensures fresh data is fetched every time
    retry: false, // Prevent retries when Id is undefined
  });
};

export default useRoleWiseSidebarMenu;
