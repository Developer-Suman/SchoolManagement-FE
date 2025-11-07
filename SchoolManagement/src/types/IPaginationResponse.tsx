export interface IPaginationResponse<T> {
  items: any;
  id(id: any): unknown;
  length(length: any): unknown;
  Items: T[];
  TotalItems: number;
  PageIndex: number;
  PageSize: number;
  TotalPages: number;
  CurrentPage: number;
  FirstPage: number;
  LastPage: number;
  NextPage: number;
  PreviousPage: number;
}
