import { IPaginationResponse } from "@/types/IPaginationResponse";
import { api } from "@/utils/instance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IAssign, IUserResponse } from "../types/IUserResponse";
const queryKey = "userdepartments";
const filterQuery = "filterUser";
const loginEndPoint = {
  allUser: "/api/Authentication/all-users",
  editUser: "/api/Authentication/UpdateUser",
  userById: "/api/Authentication/User",
  deleteUser: "/api/Authentication/DeleteUser",
  addUsers: "/api/Authentication/AddUser",
  assignRoles: "/api/Authentication/AssignRoles",
  userByRoleId: "/api/Authentication/GetUserByRole",
  filterUserByDate: "/api/Authentication/FilterUserByDate",
};

type userRequest = {
  Id: string;
  UserName: string;
  Email: string;
  Password: string;
  rolesId: string[];
  InstitutionId: string;
  companyIds: string[];
};
type roleRequest = {
  userId: string;
  rolesId: string[];
};
export const useGetAllUsers = (params?: string) => {
  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const url = params
        ? `${loginEndPoint.allUser}${params}`
        : `${loginEndPoint.allUser}`;

      const response = await api.get<IPaginationResponse<IUserResponse>>(url);
      return response.data;
    },
  });
};

export const useEditUser = (Id: string) => {
  const queryClient = useQueryClient();
  return useMutation<IUserResponse, Error, userRequest>({
    mutationFn: async (data: userRequest): Promise<IUserResponse> => {
      if (!Id) {
        throw new Error("Id is required to edit a role");
      }
      const response = await api.patch(`${loginEndPoint.editUser}/${Id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      queryClient.invalidateQueries({ queryKey: [filterQuery] });
    },
  });
};

export const useGetUserById = (Id: string) => {
  return useQuery({
    queryKey: [queryKey, Id],
    queryFn: async () => {
      const response = await api.get<IUserResponse>(
        `${loginEndPoint.userById}/${Id}`
      );
      return response.data;
    },
  });
};
export const useGetUserByRoleId = (Id: string) => {
  return useQuery({
    queryKey: [queryKey, Id],
    queryFn: async () => {
      const response = await api.get<IUserResponse[]>(
        `${loginEndPoint.userByRoleId}/${Id}`
      );
      return response.data;
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation<IUserResponse, Error, string>({
    mutationFn: async (Id: string): Promise<IUserResponse> => {
      if (!Id) {
        throw new Error("Id is required to edit a role");
      }
      const response = await api.delete(`${loginEndPoint.deleteUser}/${Id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      queryClient.invalidateQueries({ queryKey: [filterQuery] });
    },
  });
};

export const useAddUser = () => {
  const queryClient = useQueryClient();
  return useMutation<IUserResponse, Error, userRequest>({
    mutationFn: async (data: userRequest): Promise<IUserResponse> => {
      const response = await api.post(loginEndPoint.addUsers, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      queryClient.invalidateQueries({ queryKey: [filterQuery] });
    },
    onError: (error: Error) => {
      console.log("Error adding user:", error);
    },
  });
};

export const useAssignRole = () => {
  return useMutation<IAssign, Error, { userId: string; rolesId: string[] }>({
    mutationFn: async (data: roleRequest): Promise<IAssign> => {
      const response = await api.post(loginEndPoint.assignRoles, data);
      return response.data;
    },
    onError: (error: Error) => {
      console.log("error Assigning role", error);
    },
  });
};

export const useGetFilterUserByDate = (
  companyId: string,
  email: string,
  userName: string
) => {
  return useQuery({
    queryKey: [filterQuery, userName, companyId, email],
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        companyId,
        email,
        userName,
      });

      const response = await api.get<IUserResponse[]>(
        `${loginEndPoint.filterUserByDate}?${queryParams.toString()}`
      );

      return response.data;
    },
    staleTime: 0,
    retry: false,
  });
};
