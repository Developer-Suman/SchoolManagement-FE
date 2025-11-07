import { useGetRolesByRoleId } from "../../roles/hooks";
import { useGetPermissionByPermission } from "../hooks";
type Props = {
  permissionId: string;
};
const AssignedRole = ({ permissionId }: Props) => {
  const { data: permission } = useGetPermissionByPermission(permissionId);
  const { data: role } = useGetRolesByRoleId(permission?.roleId);
  return <div>{role?.Name}</div>;
};
export default AssignedRole;
