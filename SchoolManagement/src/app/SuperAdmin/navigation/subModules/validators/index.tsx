import * as Yup from "yup";

export const SubModuleValidator = Yup.object().shape({
  id: Yup.string().required(),
  name: Yup.string().required("Module name is required"),
  iconUrl: Yup.string().required("Icon Url is required"),
  modulesId: Yup.string().required("Module Id is required"),
  rank: Yup.string().required("Rank is required"),
  targetUrl: Yup.string().required("Target URL is required"),
  isActive: Yup.boolean().default(true),
});
