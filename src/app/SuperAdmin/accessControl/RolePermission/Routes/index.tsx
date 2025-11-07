import { RouteObject } from "react-router-dom";
import AllRolePermission from "../Pages/All";

const RolePermissionRoute: RouteObject[] = [
  {
    path: "all-roles-permission",
    element: <AllRolePermission />,
  },
];

export default RolePermissionRoute;
