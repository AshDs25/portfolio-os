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
};

const IconWrapper = ({
  toggleShow,
  show,
  setShow,
  isVisible,
  icon,
  positionClassName,
  title,
}: IconWrapperProps) => {
  const iconRef = useRef<any | null>(null);
  useDragElement({ eleRef: iconRef });
  const handleToggle = () => {
    if (show && isVisible) {
      setShow(false);
    } else if (!show && isVisible) {
      setShow(true);
    }
    // Do nothing if not visible
  };
  const handleToggleShow = () => {
    if (!show && !isVisible) toggleShow();
  };
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
