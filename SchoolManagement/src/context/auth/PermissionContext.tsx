"use client";
import { MenuGetDTOs } from "@/app/Admin/rolesmodules/types/MenuGetDTOs";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface PermissionContextType {
  menuStatus: MenuGetDTOs[] | undefined;
  setMenuStatus: (status: MenuGetDTOs[] | undefined) => void;
}

const PermissionContext = createContext<PermissionContextType | undefined>(
  undefined
);

export const PermissionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [menuStatus, setMenuStatus] = useState<MenuGetDTOs[] | undefined>([]);

  return (
    <PermissionContext.Provider value={{ menuStatus, setMenuStatus }}>
      {children}
    </PermissionContext.Provider>
  );
};

export const usePermissions = () => {
  const context = useContext(PermissionContext);
  if (!context) {
    throw new Error("usePermissions must be used within a PermissionProvider");
  }
  return context;
};
