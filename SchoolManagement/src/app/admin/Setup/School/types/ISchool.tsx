enum Status {
  Manual = 0,
  Automatic = 1,
}
export interface ISchool {
  id: string;
  name: string;
  address: string;
  email: string;
  shortName: string;
  contactNumber: string;
  contactPerson: string;
  pan: string;
  imageUrl: string;
  isEnable: boolean;
  isDeleted: boolean;
  fyName: string;
  institutionId: string;
  billNumberGenerationTypeForPurchase: Status;
  billNumberGenerationTypeForSales: Status;
  fiscalYearId: string;
  Users: ISchoolUser[];
}
export interface ISchoolUser {
  userId: string;
}
export interface ISchoolDetails {
  id: string;
  name: string;
  address: string;
  pan: string;
  phoneNumber: string;
  totalPurchaseBills: number;
  totalSalesBills: number;
  totalPurchaseAmount: number;
  totalSalesAmount: number;
  totalVatPurchase: number;
  totalVatSales: number;
}

export interface IFilterSchoolByDate {
  startDate: string;
  endDate: string;
  name: string;
}
