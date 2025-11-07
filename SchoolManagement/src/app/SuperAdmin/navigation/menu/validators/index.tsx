import * as Yup from "yup";

export const MenuValidator = Yup.object().shape({
  id: Yup.string().required("Menu id is required"),
  name: Yup.string().required("Menu name is required"),
  targetUrl: Yup.string().required("Target URL is required"),
  iconUrl: Yup.string().required("Icon is required"),
  subModulesId: Yup.string().required("SubModuleId is required"),
  rank: Yup.number().required("Rank is required"),
  isActive: Yup.boolean().required("isActive is required"),
});
