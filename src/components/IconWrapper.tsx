import useDragElement from "@/hooks/useDragElement";
import type { ReactNode } from "react";
import React, { useRef } from "react";

type IconWrapperProps = {
  toggleShow: () => void;
  show: boolean;
  setShow: any;
  isVisible: boolean;
  icon: ReactNode;
  positionClassName?: string;
  title: string;
  handleToggleShow: () => void;
  handleToggle: () => void;
};

const IconWrapper = ({
  toggleShow,
  show,
  setShow,
  isVisible,
  icon,
  positionClassName,
  title,
  handleToggleShow,
  handleToggle
}: IconWrapperProps) => {
  const iconRef = useRef<any | null>(null);
  useDragElement({ eleRef: iconRef });
 

  return (
    <div
      className={`flex flex-col items-center ${positionClassName} hover:drop-shadow-[0_0_10px_#fff] cursor-pointer `}
      onDoubleClick={handleToggleShow}
      onClick={handleToggle}
      ref={iconRef}
    >
      {icon}
      <span className="text-sm text-[#ba88f5] font-mono">{title}</span>
    </div>
  );
};

export default IconWrapper;
