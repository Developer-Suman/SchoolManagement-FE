import { api } from "@/utils/instance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ISubModules } from "../types/ISubModules";
import { IPaginationResponse } from "@/types/IPaginationResponse";

const subModulesEndPoints = {
  createSubModules: "/api/RoleModuleControllers/AddSubModule",
  getSubModulesByModuleId:
    "/api/RoleModuleControllers/GetSubModulesByModulesId",
  getAllSubModules: "/api/RoleModuleControllers/all-submodules",
  removeSubModules: "/api/RoleModuleControllers/DeleteSubModules",
  updateSubModules: "/api/RoleModuleControllers/UpdateSubModules",
  getSubModulesById: "api/RoleModuleControllers/SubModules",
  getSubModulesByRoleId: "api/RoleModuleControllers/GetSubModulesByRoleId",
  filterSubModulesByDate: "/api/RoleModuleControllers/FilterSubModulesByDate",
};
const queryKey = "subModules";
type SubModuleRequest = {
  id?: string;
  name: string;
  iconUrl: string;
  targetUrl: string;
  modulesId: string;
  rank: string;
  isActive?: boolean;
};

export const useGetAllSubModules = (params?: string) => {
  return useQuery({
    queryKey: [queryKey, params],

    queryFn: async () => {
      const url = params
        ? `${subModulesEndPoints.getAllSubModules}${params}`
        : `${subModulesEndPoints.getAllSubModules}`;
      const response = await api.get<IPaginationResponse<ISubModules>>(url);
      return response.data;
    },
  });
};

export const useGetSubModulesById = (Id: string) => {
  return useQuery({
    queryKey: [queryKey, Id],
    queryFn: async () => {
      const response = await api.get<ISubModules>(
        `${subModulesEndPoints.getSubModulesById}/${Id}`
      );

      return response.data;
    },
    enabled: !!Id,
    staleTime: 0,
    retry: false,
  });
};
export const useGetSubModulesByModuleId = (id: string) => {
  return useQuery({
    queryKey: [queryKey, id],
    queryFn: async () => {
      const response = await api.get<ISubModules[]>(
        `${subModulesEndPoints.getSubModulesByModuleId}/${id}`
      );
      return response.data;
    },
    enabled: !!id,
    staleTime: 0,
    retry: false,
  });
};
export const useAddSubModule = () => {
  const queryClient = useQueryClient();
  return useMutation<ISubModules, Error, SubModuleRequest>({
    mutationFn: async (data: SubModuleRequest): Promise<ISubModules> => {
      const response = await api.post(
        subModulesEndPoints.createSubModules,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKey],
      });
    },
    onError: (error) => {
      console.log("Error adding SubModule", error);
    },
  });
};

export const useEditSubModule = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ISubModules,
    Error,
    { id: string; data: SubModuleRequest }
  >({
    mutationFn: async ({ id, data }): Promise<ISubModules> => {
      if (!id) {
        throw new Error("Id is required to edit a subModule");
      }
      const response = await api.patch(
        `${subModulesEndPoints.updateSubModules}/${id}`,
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

export const useRemoveSubModule = () => {
  const queryClient = useQueryClient();
  return useMutation<ISubModules, Error, string | undefined>({
    mutationFn: async (Id: string | undefined): Promise<ISubModules> => {
      if (!Id) {
        throw new Error("Id is required to edit a role");
      }
      const response = await api.delete(
        `${subModulesEndPoints.removeSubModules}/${Id}`
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

export const useGetSubModuleByRoleId = (id: string) => {
  return useQuery({
    queryKey: [queryKey + id],
    queryFn: async () => {
      const response = await api.get<ISubModules[]>(
        `${subModulesEndPoints.getSubModulesByRoleId}/${id}`
      );
      return response.data;
    },
  });
};

export const useGetFilterSubModulesByDate = (
  startDate: string,
  endDate: string,
  name: string | null
) => {
  return useQuery({
    queryKey: [queryKey, name, startDate, endDate],
    queryFn: async () => {
      if (!startDate || !endDate || !name) {
        throw new Error(
          "StartDate and EndDate are required to get a SubModules"
        );
      }
      const queryParams = new URLSearchParams({
        startDate,
        endDate,
        name,
      });

      const response = await api.get<ISubModules[]>(
        `${
          subModulesEndPoints.filterSubModulesByDate
        }?${queryParams.toString()}`
      );

      return response.data;
    },
    staleTime: 0,
    retry: false,
  });
};
