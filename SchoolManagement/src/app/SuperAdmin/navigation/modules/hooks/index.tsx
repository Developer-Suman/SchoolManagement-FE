import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/utils/instance";
import { IPaginationResponse } from "@/types/IPaginationResponse";
import { IModules } from "../types/IModules";
const modulesEndPoints = {
  getAllModules: "/api/RoleModuleControllers/all-modules",
  createModules: "/api/RoleModuleControllers/AddModules",
  getModuleById: "/api/RoleModuleControllers/Modules",
  getModuleByRoleId: "/api/RoleModuleControllers/GetModulesByRoleId",
  removeModules: "api/RoleModuleControllers/Delete",
  updateModules: "/api/RoleModuleControllers/UpdateModules",
  assignModules: "/api/RoleModuleControllers/AssignModules",
  filterModulesByDate: "/api/RoleModuleControllers/FilterModulesByDate",
};

const queryKey = "modules";

type ModuleRequest = {
  Id?: string;
  Name: string;
  TargetUrl: string;
  IsActive: boolean;
  IconUrl: string;
  Rank: string;
};

export const useGetModuleByRoleId = (id: string) => {
  return useQuery({
    queryKey: [queryKey + id],
    queryFn: async () => {
      const response = await api.get<IModules[]>(
        `${modulesEndPoints.getModuleByRoleId}/${id}`
      );

      return response.data;
    },
    enabled: !!id,
    staleTime: 0,
    retry: false,
  });
};

export const useGetAllModules = (params?: string) => {
  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const url = params
        ? `${modulesEndPoints.getAllModules}${params}`
        : `${modulesEndPoints.getAllModules}`;
      const response = await api.get<IPaginationResponse<IModules>>(url);
      return response.data;
    },
  });
};

export const useGetModulesById = (Id: string) => {
  return useQuery({
    queryKey: [queryKey, Id],
    queryFn: async () => {
      const response = await api.get(`${modulesEndPoints.getModuleById}/${Id}`);
      return response.data;
    },
    enabled: !!Id,
    staleTime: 0,
    retry: false,
  });
};

export const useAddModule = () => {
  const queryClient = useQueryClient();
  return useMutation<IModules, Error, ModuleRequest>({
    mutationFn: async (data: ModuleRequest): Promise<IModules> => {
      const response = await api.post(modulesEndPoints.createModules, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["modules"] });
      queryClient.refetchQueries({ queryKey: ["modules"] });
    },
    onError: (error: Error) => {
      console.error("Error adding module:", error);
    },
  });
};

export const useEditModule = () => {
  return useMutation<
    IModules,
    Error,
    { id: string | unknown; data: ModuleRequest }
  >({
    mutationFn: async ({ id, data }): Promise<IModules> => {
      if (!id) {
        throw new Error("Id is required to edit a role");
      }
      const response = await api.patch(
        `${modulesEndPoints.updateModules}/${id}`,
        data
      );
      return response.data;
    },
  });
};

export const useRemoveModule = () => {
  return useMutation<IModules, Error, string | undefined>({
    mutationFn: async (Id: string | undefined): Promise<IModules> => {
      if (!Id) {
        throw new Error("Id is required to edit a role");
      }
      const response = await api.delete(
        `${modulesEndPoints.removeModules}/${Id}`
      );
      return response.data;
    },
  });
};
export const useGetFilterModulesByDate = (
  startDate: string,
  endDate: string,
  name: string | null
) => {
  return useQuery({
    queryKey: [queryKey, name, startDate, endDate],
    queryFn: async () => {
      if (!startDate || !endDate || !name) {
        throw new Error("StartDate and EndDate are required to get a Modules");
      }
      const queryParams = new URLSearchParams({
        startDate,
        endDate,
        name,
      });

      const response = await api.get<IModules[]>(
        `${modulesEndPoints.filterModulesByDate}?${queryParams.toString()}`
      );

      return response.data;
    },
    staleTime: 0,
    retry: false,
  });
};
