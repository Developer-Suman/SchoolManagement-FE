import * as Yup from "yup";

export const ModuleValidator = Yup.object().shape({
  Id: Yup.string().required("Id is required"),
  UserName: Yup.string().required("UserName is required"),
  Email: Yup.string().required("email is required"),
  Password: Yup.string().required("Password is required"),
  rolesId: Yup.array()
    .of(Yup.string().required())
    .required("Roles are required"),
  InstitutionId: Yup.string().required("InstitutionId is required"),
  SchoolIds: Yup.array()
    .of(Yup.string().required())
    .required("SchoolId is required"),
});
