import { api } from "@/utils/instance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IAssignableRole, IRolePermission } from "../types/IRolePermission";
import { IPaginationResponse } from "@/types/IPaginationResponse";
import { IPermissionToRole } from "../types/IRolePermission";
const rolePermissionEntryPoints = {
  permissionByPermissionId: "/api/Authentication/Permission",
  AssignRole: "/api/Authentication/AssignRolePermission",
  AddPermission: "/api/Authentication/AddPermission",
  AddPermissionToRoles: "/api/Authentication/AddPermissionToRoles",
  getAllPermission: "/api/Authentication/all-permission",
  deleteRole: "/api/Authentication/DeletePermission",
  updateRole: "/api/Authentication/UpdatePermission",
  getOtherRole: "/api/Authentication/AssignableRolesToUser",
  getAssignableRolesByPermission:
    "/api/Authentication/AssignableRolesByPermissionId",
};
const query_Key = "rolePermission";

type PermissionToRoleRequest = {
  permissionId: string;
  rolesId: string[];
};
type PermissionRequest = {
  id: string;
  name: string;
  roleId: string;
};

export const useAddPermission = () => {
  const queryClient = useQueryClient();
  return useMutation<IRolePermission, Error, PermissionRequest>({
    mutationFn: async (data: PermissionRequest): Promise<IRolePermission> => {
      const response = await api.post(
        rolePermissionEntryPoints.AddPermission,
        data,
        {
          params: data,
        }
      );

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [query_Key] });
      queryClient.refetchQueries({ queryKey: [query_Key] });
    },
    onError: (error) => {
      console.error("Error adding role Permission", error);
    },
  });
};
export const useAddPermissionToRoles = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IPermissionToRole,
    Error,
    { permissionId: string; rolesId: string[] }
  >({
    mutationFn: async (
      data: PermissionToRoleRequest
    ): Promise<IPermissionToRole> => {
      const response = await api.post(
        rolePermissionEntryPoints.AddPermissionToRoles,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [query_Key] });
      queryClient.refetchQueries({ queryKey: [query_Key] });
    },
    onError: (error: Error) => {
      console.log("error Assigning permission to role", error);
    },
  });
};

export const useRemoveRolePermission = () => {
  const queryClient = useQueryClient();
  return useMutation<IRolePermission, Error, string | undefined>({
    mutationFn: async (Id: string | undefined): Promise<IRolePermission> => {
      if (!Id) {
        throw new Error("Id is required to edit a role");
      }
      const response = await api.delete(
        `${rolePermissionEntryPoints.deleteRole}/${Id}`
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [query_Key] });
      queryClient.refetchQueries({ queryKey: [query_Key] });
    },
  });
};
export const useGetAllPermission = (params?: string) => {
  return useQuery({
    queryKey: [query_Key],
    queryFn: async () => {
      const url = params
        ? `${rolePermissionEntryPoints.getAllPermission}${params}`
        : `${rolePermissionEntryPoints.getAllPermission}`;
      const response = await api.get<IPaginationResponse<IRolePermission>>(url);
      return response.data;
    },
  });
};
export const useAssignRole = (userId: "", roleName: string[]) => {
  return useMutation({
    mutationKey: ["assignRolePermission", userId],
    mutationFn: async () => {
      const url = `${rolePermissionEntryPoints.AssignRole}`;
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

export const useGetPermissionByPermission = (Id: string) => {
  return useQuery({
    queryKey: [query_Key, Id],
    queryFn: async () => {
      const response = await api.get(
        `${rolePermissionEntryPoints.permissionByPermissionId}/${Id}`
      );
      return response.data;
    },
    enabled: !!Id,
    staleTime: 0,
    retry: false,
  });
};

export const useGetAssignableRolesByPermission = (Id: string | undefined) => {
  return useQuery({
    queryKey: ["assignableRoles", Id],
    queryFn: async () => {
      const response = await api.get<IPermissionToRole[]>(
        `${rolePermissionEntryPoints.getAssignableRolesByPermission}/${Id}`
      );
      return response.data ?? [];
    },
    enabled: !!Id,
  });
};
export const useEditRolePermission = (Id: string | undefined) => {
  const queryClient = useQueryClient();
  return useMutation<IRolePermission, Error, PermissionRequest>({
    mutationFn: async (data: PermissionRequest): Promise<IRolePermission> => {
      if (!Id) {
        throw new Error("Id is required to edit a role");
      }
      const response = await api.patch(
        `${rolePermissionEntryPoints.updateRole}/${Id}`,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [query_Key] });
      queryClient.refetchQueries({ queryKey: [query_Key] });
    },
  });
};

export const useGetRolesForOtherRole = (params?: string) => {
  return useQuery({
    queryKey: [query_Key],
    queryFn: async () => {
      const url = params
        ? `${rolePermissionEntryPoints.getOtherRole}${params}`
        : `${rolePermissionEntryPoints.getOtherRole}`;
      const response = await api.get<IAssignableRole[]>(url);
      return response.data;
    },
  });
};
