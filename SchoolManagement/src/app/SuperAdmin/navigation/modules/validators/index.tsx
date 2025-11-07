import * as Yup from "yup";

export const ModuleValidator = Yup.object().shape({
  name: Yup.string().required("Module name is required"),
  role: Yup.string().required("Role is required"),
  targetUrl: Yup.string().required("Target URL is required"),
  id: Yup.string().required("Id is required"),
  isActive: Yup.boolean().required("IsActive is required"),
});
