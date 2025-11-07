import { api } from "@/utils/instance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IRoles } from "../types/IRoles";
import { IPaginationResponse } from "@/types/IPaginationResponse";

const rolesEntryPoints = {
  AssignRole: "/api/Authentication/AssignRoles",
  createRole: "/api/Authentication/CreateRoles",
  getAllRoles: "/api/Authentication/all-roles",
  deleteRole: "/api/Authentication/DeleteRole",
  updateRole: "/api/Authentication/UpdateRole",
  getByUserId: "/api/Authentication/GetRole",
  getByRoleId: "/api/Authentication/Role",
  filterRoleByDate: "/api/Authentication/FilterRoleByDate",
};
const query_Key = "roles";

type RoleRequest = {
  Id: string;
  Name: string;
};

export const useAddRole = () => {
  const queryClient = useQueryClient();
  return useMutation<IRoles, Error, RoleRequest>({
    mutationFn: async (data: RoleRequest): Promise<IRoles> => {
      const response = await api.post(rolesEntryPoints.createRole, data, {
        params: data,
      });

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [query_Key],
        exact: true,
      });
    },
    onError: (error) => {
      console.error("Error adding role", error);
    },
  });
};
export const useRemoveRole = () => {
  return useMutation<IRoles, Error, string | undefined>({
    mutationFn: async (Id: string | undefined): Promise<IRoles> => {
      if (!Id) {
        throw new Error("Id is required to edit a role");
      }
      const response = await api.delete(`${rolesEntryPoints.deleteRole}/${Id}`);
      return response.data;
    },
  });
};

export const useGetAllRoles = (params?: string) => {
  return useQuery({
    queryKey: [query_Key],
    queryFn: async () => {
      const url = params
        ? `${rolesEntryPoints.getAllRoles}${params}`
        : `${rolesEntryPoints.getAllRoles}`;
      const response = await api.get<IPaginationResponse<IRoles>>(url);
      return response.data;
    },
  });
};
export const useAssignRole = (userId: "", roleName: string[]) => {
  return useMutation({
    mutationKey: ["assignRoles", userId],
    mutationFn: async () => {
      const url = `${rolesEntryPoints.AssignRole}`;
      const payload = {
        roleName,
      };
      const response = await api.post(url, payload);
      return response.data;
    },
    onSuccess: () => {},
    onError: () => {},
  });
};

export const useGetRolesByUserId = (Id: string | undefined) => {
  return useQuery({
    queryKey: [query_Key, Id],
    queryFn: async () => {
      const response = await api.get<IRoles[]>(
        `${rolesEntryPoints.getByUserId}/${Id}`
      );
      return response.data;
    },
    enabled: !!Id,
  });
};

export const useGetRolesByRoleId = (Id: string | undefined) => {
  return useQuery({
    queryKey: [query_Key, Id],
    queryFn: async () => {
      const response = await api.get<IRoles>(
        `${rolesEntryPoints.getByRoleId}/${Id}`
      );
      return response.data;
    },
    enabled: !!Id,
  });
};
export const useEditRole = (Id: string | undefined) => {
  return useMutation<IRoles, Error, RoleRequest>({
    mutationFn: async (data: RoleRequest): Promise<IRoles> => {
      if (!Id) {
        throw new Error("Id is required to edit a role");
      }
      const response = await api.patch(
        `${rolesEntryPoints.updateRole}/${Id}`,
        data
      );
      return response.data;
    },
  });
};
export const useGetFilterRoleByDate = (
  startDate: string,
  endDate: string,
  name: string | null
) => {
  return useQuery({
    queryKey: [query_Key, name, startDate, endDate],
    queryFn: async () => {
      if (!startDate || !endDate || !name) {
        throw new Error("StartDate and EndDate are required to get a Role");
      }
      const queryParams = new URLSearchParams({
        startDate,
        endDate,
        name,
      });

      const response = await api.get<IRoles[]>(
        `${rolesEntryPoints.filterRoleByDate}?${queryParams.toString()}`
      );

      return response.data;
    },
    staleTime: 0,
    retry: false,
  });
};
