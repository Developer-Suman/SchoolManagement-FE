import React, { JSX } from "react";

interface Props {
  button: JSX.Element;
  disabled?: boolean;
}

export const EditButton = ({ button, disabled }: Props) => {
  const cloned = React.cloneElement(button, {
    disabled,
    className: ` py-[0.65rem] ${button.props.className || ""} ${
      disabled ? "bg-teal-500 text-white cursor-not-allowed " : ""
    }`,
  });

  return <div>{cloned}</div>;
};
