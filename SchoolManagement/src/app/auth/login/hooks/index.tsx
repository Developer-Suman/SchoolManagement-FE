import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/utils/instance";
import { ILoginType } from "../types/loginResponse";
const loginEndPoint = {
  register: "/api/Authentication/Register",
  login: "/api/Authentication/login",
};
type LoginRequest = {
  email: string;
  password: string;
  Email?: string;
  Password?: string;
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation<ILoginType, Error, LoginRequest>({
    mutationFn: async (data: LoginRequest): Promise<ILoginType> => {
      const response = await api.post(loginEndPoint.login, data);
      console.log("Test", response);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.refetchQueries({ queryKey: ["user"] });
    },
    onError: (error: Error) => {
      console.error("Error adding module:", error);
    },
  });
};
