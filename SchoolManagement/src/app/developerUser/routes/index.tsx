import { RouteObject } from "react-router-dom";
import AllOrganization from "../pages/all";

const InitializationRoutes: RouteObject[] = [
  {
    path: "organization",
    element: <AllOrganization />,
  },
];

export default InitializationRoutes;
