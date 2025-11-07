export interface IModules {
  createdAt: string | number | Date;
  Name: string;
  TargetUrl: string;
  Id: string;
  IsActive: boolean;
  IconUrl: string;
  Rank: string;
}
export interface IFilterModulesByDate {
  startDate: string;
  endDate: string;
  name: string;
}
