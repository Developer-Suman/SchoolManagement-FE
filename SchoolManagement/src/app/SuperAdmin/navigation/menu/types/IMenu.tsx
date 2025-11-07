export interface IMenu {
  id: string;
  name: string;
  targetUrl: string;
  iconUrl: string;
  subModulesId: string;
  rank: number;
  isActive: boolean;
}
export interface IFilterMenusByDate {
  startDate: string;
  endDate: string;
  name: string;
}
