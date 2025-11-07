import { api } from "@/utils/instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IAssignModule, IAssignSubModule, IAssignMenu } from "../types/IAssign";

const assignEntryPoints = {
  assignModule: "/api/RoleModuleControllers/AssignModules",
  assignSubModule: "/api/RoleModuleControllers/AssignSubModules",
  assignMenu: "/api/RoleModuleControllers/AssignMenus",
  updateAssignModule: "/api/RoleModuleControllers/UpdateAssignModulesByModules",
  updateAssignSubModule:
    "/api/RoleModuleControllers/UpdateAssignSubModulesBySubModules",
  updateAssignMenu: "/api/RoleModuleControllers/UpdateAssignMenusByMenus",
};

type AssignRequestModule = {
  roleId: string;
  modulesId?: string[];
  isActive: boolean;
  isAssign?: boolean;
};
type AssignRequestSubModule = {
  roleId: string;
  subModulesId?: string[];
  isActive: boolean;
  isAssign?: boolean;
};
type AssignRequestMenu = {
  roleId: string;
  menusId?: string[];
  isActive: boolean;
  isAssign?: boolean;
};
export const useAssignModule = () => {
  const queryClient = useQueryClient();
  return useMutation<IAssignModule, Error, AssignRequestModule>({
    mutationFn: async (data: AssignRequestModule): Promise<IAssignModule> => {
      const response = await api.post(assignEntryPoints.assignModule, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["modules"] });
      queryClient.refetchQueries({ queryKey: ["modules"] });
    },
    onError: (error: Error) => {
      console.log("Error assigning module", error);
    },
  });
};

export const useAssignSubModule = () => {
  const queryClient = useQueryClient();
  return useMutation<IAssignSubModule, Error, AssignRequestSubModule>({
    mutationFn: async (
      data: AssignRequestSubModule
    ): Promise<IAssignSubModule> => {
      const response = await api.post(assignEntryPoints.assignSubModule, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subModules"] });
      queryClient.refetchQueries({ queryKey: ["subModules"] });
    },
    onError: (error: Error) => {
      console.log("Error assigning Sub module", error);
    },
  });
};
export const useAssignMenu = () => {
  const queryClient = useQueryClient();
  return useMutation<IAssignMenu, Error, AssignRequestMenu>({
    mutationFn: async (data: AssignRequestMenu): Promise<IAssignMenu> => {
      const response = await api.post(assignEntryPoints.assignMenu, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menus"] });
      queryClient.refetchQueries({ queryKey: ["menus"] });
    },
    onError: (error: Error) => {
      console.log("Error assigning Sub module", error);
    },
  });
};
export const useUpdateAssignModules = () => {
  return useMutation<
    IAssignModule,
    Error,
    { moduleId: string; roleId: string; isActive: boolean }
  >({
    mutationFn: async ({
      moduleId,
      roleId,
      isActive,
    }): Promise<IAssignModule> => {
      if (!moduleId) {
        throw new Error("Module Id is required to edit the assigned module");
      }

      try {
        const response = await api.patch(
          `${assignEntryPoints.updateAssignModule}/${moduleId}`,
          {
            roleId,
            isActive,
          }
        );
        return response.data;
      } catch (error) {
        console.error("❌ Error updating module:", error);
        throw error;
      }
    },
  });
};

export const useUpdateAssignSubModules = () => {
  return useMutation<
    IAssignSubModule,
    Error,
    { subModuleId: string; roleId: string; isActive: boolean }
  >({
    mutationFn: async ({
      subModuleId,
      roleId,
      isActive,
    }): Promise<IAssignSubModule> => {
      if (!subModuleId) {
        throw new Error("Module Id is required to edit the assigned module");
      }

      try {
        const response = await api.patch(
          `${assignEntryPoints.updateAssignSubModule}/${subModuleId}`,
          {
            roleId,
            isActive,
          }
        );
        return response.data;
      } catch (error) {
        console.error("❌ Error updating module:", error);
        throw error;
      }
    },
  });
};
// export const useUpdateAssignSubModules = () => {
//   return useMutation<
//     IAssignSubModule,
//     Error,
//     { subModuleId: string; roleId: string; isActive: boolean }
//   >({
//     mutationFn: async ({
//       subModuleId,
//       roleId,
//       isActive,
//     }): Promise<IAssignSubModule> => {
//       if (!subModuleId) {
//         throw new Error("SubModule Id is required to edit the assigned module");
//       }

//       try {
//         const response = await api.patch(
//           `${assignEntryPoints.updateAssignSubModule}/${subModuleId}`,
//           {
//             roleId,
//             isActive,
//           }
//         );
//         console.log("✅ Module updated successfully:", response.data);
//         return response.data;
//       } catch (error) {
//         console.error("❌ Error updating module:", error);
//         throw error;
//       }
//     },
//   });
// };

export const useUpdateAssignMenu = () => {
  return useMutation<
    IAssignMenu,
    Error,
    { menuId: string; data: AssignRequestMenu }
  >({
    mutationFn: async ({ menuId, data }): Promise<IAssignMenu> => {
      if (!menuId) {
        throw new Error("Menu Id is required to edit the assigned module");
      }
      const response = await api.patch(
        `${assignEntryPoints.updateAssignMenu}/${menuId}`,
        data
      );
      return response.data;
    },
  });
};
