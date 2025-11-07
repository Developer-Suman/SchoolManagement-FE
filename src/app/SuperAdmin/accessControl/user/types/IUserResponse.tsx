export interface IUserResponse {
  Id: string;
  UserName: string;
  Email: string;
  Password: string;
  rolesId: string[];
  InstitutionId: string;
  CompanyId?: string;
  companyIds: string[];
}
export interface IAssign {
  userId: string;
  rolesId: string[];
}
export interface IFilterUserByDate {
  email: string;
  companyId: string;
  userName: string;
}
