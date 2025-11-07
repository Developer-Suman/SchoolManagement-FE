import { useEffect, useState } from "react";
import { MenuGetDTOs } from "../types/MenuGetDTOs";

const useMenuPermissionData = (menus: MenuGetDTOs[] | undefined) => {
  const [permissions, setPermissions] = useState({
    canDelete: false,
    canEdit: false,
    canAdd: false,
    canAssign: false,
  });

  useEffect(() => {
    if (!menus || !Array.isArray(menus)) return;

    const hasAdd = menus.some(
      ({ menuName, isActive }) =>
        menuName?.toLowerCase().includes("add") && isActive
    );

    const hasEdit = menus.some(
      ({ menuName, isActive }) =>
        menuName?.toLowerCase().includes("edit") && isActive
    );

    const hasDelete = menus.some(
      ({ menuName, isActive }) =>
        menuName?.toLowerCase().includes("delete") && isActive
    );
    const hasAssign = menus.some(
      ({ menuName, isActive }) =>
        menuName?.toLowerCase().includes("assign") && isActive
    );

    setPermissions({
      canAdd: hasAdd,
      canEdit: hasEdit,
      canDelete: hasDelete,
      canAssign: hasAssign,
    });
  }, [menus]);

  return permissions;
};

export default useMenuPermissionData;
