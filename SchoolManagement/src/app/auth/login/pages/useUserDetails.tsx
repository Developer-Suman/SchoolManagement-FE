// import { useQuery } from "@tanstack/react-query";
// import { api } from "@/utils/instance";
// import { ITokenPayloadObject } from "@/modules/auth/login/types/loginResponse";

// const fetchUserDetails = async (): Promise<ITokenPayloadObject> => {
//   const response = await api.get("/api/user-details");
//   return response.data;
// };

// export const useUserDetails = () => {
//   return useQuery<ITokenPayloadObject, Error>({
//     queryKey: ["userDetails"],
//     queryFn: fetchUserDetails,
//     gcTime: 1000 * 60 * 10, // replaces cacheTime in v5
//     staleTime: 1000 * 60 * 5, // same as v4
//     refetchOnMount: true,
//     refetchOnWindowFocus: true,
//   });
// };
