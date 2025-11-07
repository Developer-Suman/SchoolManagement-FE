import { MouseEvent } from "react";
import Add from "../pages/add";

interface Props {
  visible: boolean;
  onClose: () => void;
}

const Initialize = ({ visible, onClose }: Props) => {
  const handleOnClose = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).id === "container") onClose();
  };
  if (!visible) return null;

  return (
    <div onClick={handleOnClose} id="container">
      <Add visible={visible} onClose={onClose} />
    </div>
  );
};
export default Initialize;
