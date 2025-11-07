import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/utils/instance";
import { IPaginationResponse } from "@/types/IPaginationResponse";
import { IOrganization } from "../types/IOrganization";

const OrganizationEndPoints = {
  getAllOrganization: "/api/SetupControllers/all-organization",
  createOrganization: "/api/SetupControllers/AddOrganization",
  getAllOrganizationById: "/api/SetupControllers/Organization",
  EditOrg: "/api/SetupControllers/UpdateOrganization",
  removeOrganization: "api/SetupControllers/DeleteOrganization",
  initializeControllers: "api/InitializeControllers",
};

const queryKey = "organization";
type OrganizationRequest = {
  id: string;
  name: string;
  address: string;
  email: string;
  phoneNumber: string;
  mobileNumber: string;
  logo: string;
  provinceId: number;
};

export const useGetAllOrganization = (params?: string) => {
  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const url = params
        ? `${OrganizationEndPoints.getAllOrganization}${params}`
        : `${OrganizationEndPoints.getAllOrganization}`;
      const response = await api.get<IPaginationResponse<IOrganization>>(url);
      return response.data;
    },
  });
};

export const useGetAllOrganizationById = (Id: string) => {
  return useQuery({
    queryKey: [queryKey, Id],
    queryFn: async () => {
      const response = await api.get(
        `${OrganizationEndPoints.getAllOrganizationById}/${Id}`
      );
      return response.data;
    },
  });
};

export const useAddOrganization = () => {
  const queryClient = useQueryClient();
  return useMutation<IOrganization, Error, OrganizationRequest>({
    mutationFn: async (data: OrganizationRequest): Promise<IOrganization> => {
      const response = await api.post(
        OrganizationEndPoints.createOrganization,
        data
      );
      console.log("Test", response);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [queryKey],
        exact: true,
      });
      console.log("organization has been added successfully", data);
    },
    onError: (error) => {
      console.log("Error adding organization", error);
    },
  });
};

export const useInitializeControllers = () => {
  return api.post(OrganizationEndPoints.initializeControllers);
};

export const useEditOrganization = (Id: string) => {
  return useMutation<IOrganization, Error, OrganizationRequest>({
    mutationFn: async (data: OrganizationRequest): Promise<IOrganization> => {
      const response = await api.put(
        `${OrganizationEndPoints.EditOrg}/${Id}`,
        data
      );
      return response.data;
    },
  });
};

export const useRemoveOrganization = () => {
  return useMutation<IOrganization, Error, string | undefined>({
    mutationFn: async (Id: string | undefined): Promise<IOrganization> => {
      if (!Id) {
        throw new Error("Id is required to remove Organization");
      }
      const response = await api.delete(
        `${OrganizationEndPoints.removeOrganization}/${Id}`
      );
      return response.data;
    },
  });
};
