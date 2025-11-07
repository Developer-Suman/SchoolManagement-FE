import { api } from "@/utils/instance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IMenu } from "../types/IMenu";
import { IPaginationResponse } from "@/types/IPaginationResponse";
import { MenuGetDTOs } from "../../types/MenuGetDTOs";

const menuEndPoints = {
  createMenu: "/api/RoleModuleControllers/AddMenu",
  getMenuById: "/api/RoleModuleControllers/Menu",
  updateMenu: "/api/RoleModuleControllers/UpdateMenu",
  deleteMenu: "/api/RoleModuleControllers/DeleteMenu",
  getMenuBySubModuleId: "/api/RoleModuleControllers/GetMenuBySubmodulesId",
  getAllMenu: "/api/RoleModuleControllers/all-menu",
  getMenuByRoleId: "/api/RoleModuleControllers/GetMenuByRoleId",
  getMenuStatus: "/api/RoleModuleControllers/GetMenuStatusBySubModulesAndRoles",
  filterMenusByDate: "/api/RoleModuleControllers/FilterMenusByDate",
};

const queryKey = "menus";
type MenuRequest = {
  id: string;
  name: string;
  targetUrl: string;
  iconUrl: string;
  subModulesId: string;
  rank: number;
  isActive: boolean;
};
export const useGetAllMenuBySubModulesId = (id: string) => {
  return useQuery({
    queryKey: [queryKey + id],
    queryFn: async () => {
      const response = await api.get<IMenu[]>(
        `${menuEndPoints.getMenuBySubModuleId}/${id}`
      );
      return response.data;
    },
  });
};
export const useGetAllMenus = (params?: string) => {
  const queryResult = useQuery({
    queryKey: [queryKey, params],
    queryFn: async () => {
      const url = params
        ? `${menuEndPoints.getAllMenu}${params}`
        : `${menuEndPoints.getAllMenu}`;
      const response = await api.get<IPaginationResponse<IMenu>>(url);
      return response.data;
    },
  });
  return queryResult;
};

export const useGetMenuById = (id: string) => {
  return useQuery({
    queryKey: [queryKey, id],
    queryFn: async () => {
      const response = await api.get<IMenu>(
        `${menuEndPoints.getMenuById}/${id}`
      );
      return response.data;
    },
  });
};

export const useAddMenu = () => {
  const queryClient = useQueryClient();
  return useMutation<IMenu, Error, MenuRequest>({
    mutationFn: async (data: MenuRequest): Promise<IMenu> => {
      const response = await api.post(menuEndPoints.createMenu, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKey],
      });
    },
    onError: (error) => {
      console.log("failed to add menu", error);
    },
  });
};

export const useEditMenu = () => {
  const queryClient = useQueryClient();
  return useMutation<IMenu, Error, { id: string; data: MenuRequest }>({
    mutationFn: async ({ id, data }): Promise<IMenu> => {
      if (!id) {
        throw new Error("Id is required to edit a role");
      }
      const response = await api.patch(
        `${menuEndPoints.updateMenu}/${id}`,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKey],
      });
    },
  });
};

export const useRemoveMenu = () => {
  const queryClient = useQueryClient();
  return useMutation<IMenu, Error, string>({
    mutationFn: async (id: string): Promise<IMenu> => {
      if (!id) {
        throw new Error("Id is required to edit a role");
      }
      const response = await api.delete(`${menuEndPoints.deleteMenu}/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKey],
      });
    },
  });
};

export const useGetMenuByRoleId = (id: string) => {
  return useQuery({
    queryKey: [queryKey + id],
    queryFn: async () => {
      const response = await api.get<IMenu[]>(
        `${menuEndPoints.getMenuByRoleId}/${id}`
      );
      return response.data;
    },
  });
};

export const useGetMenuStatus = (subModId?: string, roleId?: string) => {
  return useQuery({
    queryKey: [queryKey, subModId, roleId],
    queryFn: async () => {
      if (!subModId || !roleId) {
        throw new Error("Both subModulesId and rolesId are required");
      }
      const response = await api.get<MenuGetDTOs[]>(
        `${menuEndPoints.getMenuStatus}?subModulesId=${subModId}&rolesId=${roleId}`
      );
      return response.data;
    },
    enabled: !!subModId && !!roleId,
  });
};

export const useGetFilterMenusByDate = (
  startDate: string,
  endDate: string,
  name: string | null
) => {
  return useQuery({
    queryKey: [queryKey, name, startDate, endDate],
    queryFn: async () => {
      if (!startDate || !endDate || !name) {
        throw new Error("StartDate and EndDate are required to get a Menus");
      }
      const queryParams = new URLSearchParams({
        startDate,
        endDate,
        name,
      });

      const response = await api.get<IMenu[]>(
        `${menuEndPoints.filterMenusByDate}?${queryParams.toString()}`
      );

      return response.data;
    },
    staleTime: 0,
    retry: false,
  });
};
