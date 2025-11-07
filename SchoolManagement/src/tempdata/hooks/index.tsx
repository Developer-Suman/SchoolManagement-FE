// import { useQuery } from "@tanstack/react-query";
// import { api } from "@/utils/instance";
// import { IPaginationResponse } from "@/types/IPaginationResponse";
// import { IOrganization } from "../../modules/developerUser/types/IOrganization";

// const OrganizationEndPoints = {
//   getAllOrganization: "/api/SetupControllers/all-organization",
//   getAllOrganizationById: "api/SystemManagement/GetModulesByUserId/{Id}",
// };

// const queryKey = "organization";

// export const useGetAllOrganization = (params?: string) => {
//   return useQuery({
//     queryKey: [queryKey],
//     queryFn: async () => {
//       const url = params
//         ? `${OrganizationEndPoints.getAllOrganization}${params}`
//         : `${OrganizationEndPoints.getAllOrganization}`;
//       const response = await api.get<IPaginationResponse<IOrganization>>(url);
//       return response.data;
//     },
//   });
// };

// export const useGetAllOrganizationById = (Id: string) => {
//   return useQuery({
//     queryKey: [queryKey, Id],
//     queryFn: async () => {
//       const response = await api.get(
//         `${OrganizationEndPoints.getAllOrganizationById}/${Id}`
//       );
//       return response.data;
//     },
//   });
// };
