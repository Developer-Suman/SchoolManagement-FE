"use client";
import ModuleByRoleId from "../components/ModulesByRoleId";
import { MouseEvent } from "react";
interface Props {
  roleId: string;
  visible: boolean;
  onClose: () => void;
}
const All = ({ roleId, visible, onClose }: Props) => {
  const handleOnClose = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).id === roleId) onClose();
  };
  if (!visible) return null;

  return (
    <div onClick={handleOnClose} className="z-[1] fixed  ">
      <ModuleByRoleId roleId={roleId} visible={visible} onClose={onClose} />
    </div>
  );
};
export default All;
