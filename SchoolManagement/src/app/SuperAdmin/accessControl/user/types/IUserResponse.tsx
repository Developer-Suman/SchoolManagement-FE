export interface IUserResponse {
  Id: string;
  UserName: string;
  Email: string;
  Password: string;
  rolesId: string[];
  InstitutionId: string;
  SchoolId?: string;
  SchoolIds: string[];
}
export interface IAssign {
  userId: string;
  rolesId: string[];
}
export interface IFilterUserByDate {
  email: string;
  SchoolId: string;
  userName: string;
}
