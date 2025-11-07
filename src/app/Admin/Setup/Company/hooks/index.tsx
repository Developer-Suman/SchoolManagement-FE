import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/utils/instance";
import { IPaginationResponse } from "@/types/IPaginationResponse";
import { ICompany, ICompanyDetails, ICompanyUser } from "../types/ICompany";
const CompanyEndPoints = {
  getAllCompany: "/api/SetupControllers/all-Company",
  createCompany: "/api/SetupControllers/AddCompany",
  getCompanyById: "/api/SetupControllers/Company",
  getCompanyByInstitutionId: "/api/SetupControllers/GetCompany",
  removeCompany: "/api/SetupControllers/DeleteCompany",
  updateCompany: "/api/SetupControllers/UpdateCompany",
  filterCompanyByDate: "/api/SetupControllers/FilterCompanyByDate",
  GetCompanyDetails: "/api/SetupControllers/GetCompanyDetails",
};

const queryKey = "";
enum Status {
  Manual = 0,
  Automatic = 1,
}
type CompanyRequest = {
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
  Users: ICompanyUser[];
};

export const useGetCompanyByInstitutionId = (institutionId: string) => {
  return useQuery({
    queryKey: [queryKey + institutionId],
    queryFn: async () => {
      const response = await api.get<ICompany[]>(
        `${CompanyEndPoints.getCompanyByInstitutionId}/${institutionId}`
      );
      return response.data;
    },
    enabled: !!institutionId,
    staleTime: 0,
    retry: false,
  });
};

export const useGetAllCompany = (params?: string) => {
  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const url = params
        ? `${CompanyEndPoints.getAllCompany}${params}`
        : `${CompanyEndPoints.getAllCompany}`;
      const response = await api.get<IPaginationResponse<ICompany>>(url);
      return response.data;
    },
  });
};

export const useGetCompanyById = (Id: string | null) => {
  return useQuery({
    queryKey: [queryKey, Id],
    queryFn: async () => {
      const response = await api.get<ICompany>(
        `${CompanyEndPoints.getCompanyById}/${Id}`
      );
      return response.data;
    },
    enabled: !!Id,
    staleTime: 0,
    retry: false,
  });
};

export const useGetCompanyDetailsById = (Id: string | null) => {
  return useQuery({
    queryKey: [queryKey, Id],
    queryFn: async () => {
      const response = await api.get<ICompanyDetails[]>(
        `${CompanyEndPoints.GetCompanyDetails}/${Id}`
      );
      return response.data;
    },
    enabled: !!Id,
    staleTime: 0,
    retry: false,
  });
};

export const useAddCompany = () => {
  const queryClient = useQueryClient();
  return useMutation<ICompany, Error, CompanyRequest>({
    mutationFn: async (data: CompanyRequest): Promise<ICompany> => {
      const response = await api.post(CompanyEndPoints.createCompany, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Company"] });
      queryClient.refetchQueries({ queryKey: ["Company"] });
    },
    onError: (error: Error) => {
      console.error("Error adding Company:", error);
    },
  });
};

export const useEditCompany = () => {
  return useMutation<
    ICompany,
    Error,
    { id: string | unknown; data: CompanyRequest }
  >({
    mutationFn: async ({ id, data }): Promise<ICompany> => {
      if (!id) {
        throw new Error("Id is required to edit a Company");
      }
      const response = await api.patch(
        `${CompanyEndPoints.updateCompany}/${id}`,
        data
      );
      return response.data;
    },
  });
};

export const useRemoveCompany = () => {
  return useMutation<ICompany, Error, string | undefined>({
    mutationFn: async (Id: string | undefined): Promise<ICompany> => {
      if (!Id) {
        throw new Error("Id is required to edit a role");
      }
      const response = await api.delete(
        `${CompanyEndPoints.removeCompany}/${Id}`
      );
      return response.data;
    },
  });
};
export const useGetFilterCompanyByDate = (
  startDate: string,
  endDate: string,
  name: string | null
) => {
  return useQuery({
    queryKey: [queryKey, name, startDate, endDate],
    queryFn: async () => {
      if (!startDate || !endDate || !name) {
        throw new Error("StartDate and EndDate are required to get a Company");
      }
      const queryParams = new URLSearchParams({
        startDate,
        endDate,
        name,
      });

      const response = await api.get<ICompany[]>(
        `${CompanyEndPoints.filterCompanyByDate}?${queryParams.toString()}`
      );

      return response.data;
    },
    staleTime: 0,
    retry: false,
  });
};
