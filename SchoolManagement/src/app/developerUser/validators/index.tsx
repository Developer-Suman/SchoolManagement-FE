import * as Yup from "yup";

export const OrganizationValidator = Yup.object().shape({
  id: Yup.string().required("Organization id is required"),
  name: Yup.string().required("Organization name is required"),
  address: Yup.string().required("address is required"),
  email: Yup.string().required("email  is required"),
  phoneNumber: Yup.string().required("phoneNumber  is required"),
  provinceId: Yup.number().required("ProvinceId  is required"),
  mobileNumber: Yup.string().required("mobile number is required"),
  logo: Yup.string().required("logo is required"),
});
