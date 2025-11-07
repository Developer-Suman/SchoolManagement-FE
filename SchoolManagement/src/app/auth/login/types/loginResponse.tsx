import { IUserRole } from "./userRoles";

export interface ILoginResponse {
  userResponse: {
    id?: string;
    firstName: string | null;
    middleName: string | null;
    lastName: string | null;
    email: string;
    phoneNumber: string | null;
    refreshToken: string;
    roleId: string;
    //branchId: string;
  };

  token: string;

  roles: {
    result: string[];
    id: number;
    exception: null;
    status: string;
    isCanceled: boolean;
    isCompleted: boolean;
    isCompletedSuccessfully: boolean;
    creationOptions: string;
    asyncState: null;
    isFaulted: boolean;
  };
}

export interface ILoginType {
  email: string;
  password: string;
  Email?: string;
  Password?: string;
  token?: string;
}

export interface ITokenPayload {
  sub: string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
  jti: string;
  SchoolId: string;
  InstitutionId: string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  exp: number;
  iss: string;
  email: string;
  aud: string;
}

export interface ITokenPayloadObject {
  institutionId: string;
  schoolId: string;
  username: string;
  email: string;
  role: IUserRole;
  id: string;
}
