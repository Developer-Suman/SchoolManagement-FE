import * as Yup from "yup";

export const RoleValidator = Yup.object().shape({
  rolename: Yup.string().required("Role name is required"),
  Id: Yup.string().required("Role name is required"),
});
