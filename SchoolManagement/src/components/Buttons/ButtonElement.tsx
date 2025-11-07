import React from "react";
import { Spinner } from "../ui/shadcn-io/spinner";

interface PropsT {
  disabled?: boolean;
  text?: string;
  onClick?: () => void;
  handleClick?: () => void;
  isLoading?: boolean;
  type?: "submit" | "reset" | "button";
  customStyle?: string;
  className?: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any;
}

export const ButtonElement = ({
  isLoading,
  text,
  type,
  onClick,
  disabled,
  handleClick,
  customStyle,
  icon,
  className,
}: PropsT) => {
  const buttonIcon = isLoading ? (
    <Spinner key={"circle"} variant={"circle"} />
  ) : null;

  return (
    <button
      disabled={disabled}
      type={type}
      onClick={handleClick || onClick}
      className={`px-3 py-2 text-sm font-medium text-white rounded-md ${className}  ${customStyle} transition ${
        disabled
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-[#035BBA] hover:bg-[#4788CD]"
      }`}
    >
      <div className="flex items-center justify-center">
        {icon} &nbsp;
        {buttonIcon}
        {`${text}`}
      </div>
    </button>
  );
};
