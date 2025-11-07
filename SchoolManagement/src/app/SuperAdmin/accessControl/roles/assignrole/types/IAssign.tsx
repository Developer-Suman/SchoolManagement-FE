export interface IAssignModule {
  roleId: string;
  modulesId: string[];
  isActive?: boolean;
}

export interface IAssignSubModule {
  roleId: string;
  subModulesId: string[];
  isActive?: boolean;
}

export interface IAssignMenu {
  roleId: string;
  menusId: string[];
  isActive?: boolean;
}
