export interface IRolePermission {
  id: string;
  name: string;
  roleId: string;
}
export interface IPermissionToRole {
  permissionId: string;
  roleId: string;
}
export interface IAssignableRole {
  permissionId: string;
  roleId: string;
}
