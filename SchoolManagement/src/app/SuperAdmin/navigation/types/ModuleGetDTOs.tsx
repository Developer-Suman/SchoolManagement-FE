import { SubModuleGetDTOs } from "./SubModuleGetDTOs";

export type ModuleGetDTO = {
  id?: string;
  name: string;
  role: string[];
  targetUrl: string;
  iconUrl?: string;
  routeName: string;
  isActive?: boolean;
  rank?: number;
  subModulesResponse?: SubModuleGetDTOs[];
};
