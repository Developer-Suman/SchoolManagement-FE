import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/utils/instance";
import { IPaginationResponse } from "@/types/IPaginationResponse";
import { ISchool, ISchoolDetails, ISchoolUser } from "../types/ISchool";
const SchoolEndPoints = {
  getAllSchool: "/api/SetupControllers/all-school",
  createSchool: "/api/SetupControllers/AddSchool",
  getSchoolById: "/api/SetupControllers/School",
  getSchoolByInstitutionId: "/api/SetupControllers/GetSchool",
  removeSchool: "/api/SetupControllers/DeleteSchool",
  updateSchool: "/api/SetupControllers/UpdateSchool",
  filterSchoolByDate: "/api/SetupControllers/FilterSchoolByDate",
  GetSchoolDetails: "/api/SetupControllers/GetSchoolDetails",
};

const queryKey = "";
enum Status {
  Manual = 0,
  Automatic = 1,
}
type SchoolRequest = {
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
  billNumberGenerationTypeForPurchase: Status;
  billNumberGenerationTypeForSales: Status;
  isDeleted: boolean;
  institutionId: string;
  fiscalYearId: string;
  Users: ISchoolUser[];
};

export const useGetSchoolByInstitutionId = (institutionId: string) => {
  return useQuery({
    queryKey: [queryKey + institutionId],
    queryFn: async () => {
      const response = await api.get<ISchool[]>(
        `${SchoolEndPoints.getSchoolByInstitutionId}/${institutionId}`
      );
      return response.data;
    },
    enabled: !!institutionId,
    staleTime: 0,
    retry: false,
  });
};

export const useGetAllSchool = (params?: string) => {
  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const url = params
        ? `${SchoolEndPoints.getAllSchool}${params}`
        : `${SchoolEndPoints.getAllSchool}`;
      const response = await api.get<IPaginationResponse<ISchool>>(url);
      return response.data;
    },
  });
};

export const useGetSchoolById = (Id: string | null) => {
  return useQuery({
    queryKey: [queryKey, Id],
    queryFn: async () => {
      const response = await api.get<ISchool>(
        `${SchoolEndPoints.getSchoolById}/${Id}`
      );
      return response.data;
    },
    enabled: !!Id,
    staleTime: 0,
    retry: false,
  });
};

export const useGetSchoolDetailsById = (Id: string | null) => {
  return useQuery({
    queryKey: [queryKey, Id],
    queryFn: async () => {
      const response = await api.get<ISchoolDetails[]>(
        `${SchoolEndPoints.GetSchoolDetails}/${Id}`
      );
      return response.data;
    },
    enabled: !!Id,
    staleTime: 0,
    retry: false,
  });
};

export const useAddSchool = () => {
  const queryClient = useQueryClient();
  return useMutation<ISchool, Error, SchoolRequest>({
    mutationFn: async (data: SchoolRequest): Promise<ISchool> => {
      const response = await api.post(SchoolEndPoints.createSchool, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["School"] });
      queryClient.refetchQueries({ queryKey: ["School"] });
    },
    onError: (error: Error) => {
      console.error("Error adding School:", error);
    },
  });
};

export const useEditSchool = () => {
  return useMutation<
    ISchool,
    Error,
    { id: string | unknown; data: SchoolRequest }
  >({
    mutationFn: async ({ id, data }): Promise<ISchool> => {
      if (!id) {
        throw new Error("Id is required to edit a School");
      }
      const response = await api.patch(
        `${SchoolEndPoints.updateSchool}/${id}`,
        data
      );
      return response.data;
    },
  });
};

export const useRemoveSchool = () => {
  return useMutation<ISchool, Error, string | undefined>({
    mutationFn: async (Id: string | undefined): Promise<ISchool> => {
      if (!Id) {
        throw new Error("Id is required to edit a role");
      }
      const response = await api.delete(
        `${SchoolEndPoints.removeSchool}/${Id}`
      );
      return response.data;
    },
  });
};
export const useGetFilterSchoolByDate = (
  startDate: string,
  endDate: string,
  name: string | null
) => {
  return useQuery({
    queryKey: [queryKey, name, startDate, endDate],
    queryFn: async () => {
      if (!startDate || !endDate || !name) {
        throw new Error("StartDate and EndDate are required to get a School");
      }
      const queryParams = new URLSearchParams({
        startDate,
        endDate,
        name,
      });

      const response = await api.get<ISchool[]>(
        `${SchoolEndPoints.filterSchoolByDate}?${queryParams.toString()}`
      );

      return response.data;
    },
    staleTime: 0,
    retry: false,
  });
};
