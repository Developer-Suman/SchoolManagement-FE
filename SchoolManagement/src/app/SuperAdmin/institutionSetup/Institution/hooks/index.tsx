import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/utils/instance";
import { IPaginationResponse } from "@/types/IPaginationResponse";
import { IInstitution } from "../types/IInstitution";
const institutionEndPoints = {
  getAllInstitution: "/api/SetupControllers/all-institution",
  createInstitution: "/api/SetupControllers/AddInstitution",
  getInstitutionById: "/api/SetupControllers/Institution",
  getInstitutionByOrganizationId: "/api/SetupControllers/GetInstitution",
  removeInstitution: "/api/SetupControllers/DeleteInstitution",
  updateInstitution: "/api/SetupControllers/UpdateInstitution",
  filterInstitutionByDate: "/api/SetupControllers/FilterInstitutionByDate",
  
};

const queryKey = "institution";

type InstitutionRequest = {
  id: string;
  name: string;
  address: string;
  email: string;
  shortName: string;
  contactNumber: string;
  contactPerson: string;
  pan: string;
  imageUrl: string;
  isEnable: boolean;
  isDeleted: boolean;
  organizationId: string;
};

export const useGetInstitutionByOrganizationId = (id: string) => {
  return useQuery({
    queryKey: [queryKey + id],
    queryFn: async () => {
      const response = await api.get<IInstitution[]>(
        `${institutionEndPoints.getInstitutionByOrganizationId}/${id}`
      );
      return response.data;
    },
    enabled: !!id,
    staleTime: 0,
    retry: false,
  });
};

export const useGetAllInstitution = (params?: string) => {
  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const url = params
        ? `${institutionEndPoints.getAllInstitution}${params}`
        : `${institutionEndPoints.getAllInstitution}`;
      const response = await api.get<IPaginationResponse<IInstitution>>(url);
      return response.data;
    },
  });
};

export const useGetInstitutionById = (Id: string | null) => {
  return useQuery({
    queryKey: [queryKey, Id],
    queryFn: async () => {
      const response = await api.get(
        `${institutionEndPoints.getInstitutionById}/${Id}`
      );
      return response.data;
    },
    enabled: !!Id,
    staleTime: 0,
    retry: false,
  });
};

export const useAddInstitution = () => {
  const queryClient = useQueryClient();
  return useMutation<IInstitution, Error, InstitutionRequest>({
    mutationFn: async (data: InstitutionRequest): Promise<IInstitution> => {
      const response = await api.post(
        institutionEndPoints.createInstitution,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["institution"] });
      queryClient.refetchQueries({ queryKey: ["institution"] });
    },
    onError: (error: Error) => {
      console.error("Error adding institution:", error);
    },
  });
};

export const useEditInstitution = () => {
  return useMutation<
    IInstitution,
    Error,
    { id: string | unknown; data: InstitutionRequest }
  >({
    mutationFn: async ({ id, data }): Promise<IInstitution> => {
      if (!id) {
        throw new Error("Id is required to edit a institution");
      }
      const response = await api.patch(
        `${institutionEndPoints.updateInstitution}/${id}`,
        data
      );
      return response.data;
    },
  });
};

export const useRemoveInstitution = () => {
  return useMutation<IInstitution, Error, string | undefined>({
    mutationFn: async (Id: string | undefined): Promise<IInstitution> => {
      if (!Id) {
        throw new Error("Id is required to edit a role");
      }
      const response = await api.delete(
        `${institutionEndPoints.removeInstitution}/${Id}`
      );
      return response.data;
    },
  });
};

export const useGetFilterInstitutionByDate = (
  startDate: string,
  endDate: string,
  name: string | null
) => {
  return useQuery({
    queryKey: [queryKey, name, startDate, endDate],
    queryFn: async () => {
      if (!startDate || !endDate || !name) {
        throw new Error(
          "StartDate and EndDate are required to get a Institution"
        );
      }
      const queryParams = new URLSearchParams({
        startDate,
        endDate,
        name,
      });

      const response = await api.get<IInstitution[]>(
        `${
          institutionEndPoints.filterInstitutionByDate
        }?${queryParams.toString()}`
      );

      return response.data;
    },
    staleTime: 0,
    retry: false,
  });
};
