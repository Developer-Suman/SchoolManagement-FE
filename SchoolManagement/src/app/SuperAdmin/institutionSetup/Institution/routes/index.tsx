import { RouteObject } from "react-router-dom";

import AllInstitution from "../pages/All";

const InstitutionRoutes: RouteObject[] = [
  {
    path: "all-institutions",
    element: <AllInstitution />,
  },
];

export default InstitutionRoutes;
