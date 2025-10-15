import useDragElement from "@/hooks/useDragElement";
import React, { useRef } from "react";

const TerminalIcon = ({
  toggleShow,
  show,
  setShow,
  isVisible,
}: {
  toggleShow: () => void;
  show: boolean;
  setShow: any;
  isVisible: boolean;
}) => {
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
    if(!show && !isVisible)
      toggleShow()
  }
  return (
    <div
      className="flex flex-col items-center fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] hover:drop-shadow-[0_0_10px_#fff] cursor-pointer"
      onDoubleClick={handleToggleShow}
      onClick={handleToggle}
      ref={iconRef}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        className="w-[90px] h-[90px]  transition duration-300"
      >
        <g>
          <g>
            <linearGradient
              id="grad1"
              gradientUnits="userSpaceOnUse"
              x1="8.9773"
              y1="-3.1065"
              x2="40.7645"
              y2="53.1914"
            >
              <stop offset="0" stopColor="#41474A" />
              <stop offset="1" stopColor="#323538" />
            </linearGradient>
            <path
              fill="url(#grad1)"
              d="M43,40H5c-1.105,0-2-0.895-2-2V9c0-1.105,0.895-2,2-2h38c1.105,0,2,0.895,2,2v29C45,39.105,44.105,40,43,40z"
            />
            <linearGradient
              id="grad2"
              gradientUnits="userSpaceOnUse"
              x1="8.9773"
              y1="-3.1065"
              x2="40.7645"
              y2="53.1914"
            >
              <stop offset="0" stopColor="#ECEFF1" />
              <stop offset="1" stopColor="#CFD8DC" />
            </linearGradient>
            <path
              fill="url(#grad2)"
              d="M42,10v27H6V10H42 M43,7H5C3.895,7,3,7.895,3,9v29c0,1.105,0.895,2,2,2h38c1.105,0,2-0.895,2-2V9C45,7.895,44.105,7,43,7L43,7z"
            />
          </g>
          <g>
            <path
              fill="#FFFFFF"
              d="M14.283,22.695V24h-0.87v-1.269c-0.807-0.004-1.557-0.188-2.252-0.553v-1.666
              c0.23,0.188,0.574,0.363,1.031,0.523c0.457,0.161,0.864,0.253,1.221,0.277v-2.189c-0.93-0.349-1.564-0.727-1.904-1.133
              C11.17,17.582,11,17.086,11,16.5c0-0.63,0.22-1.166,0.661-1.609c0.441-0.443,1.025-0.7,1.752-0.773V13h0.87v1.095
              c0.838,0.04,1.464,0.176,1.877,0.409v1.624c-0.556-0.341-1.182-0.549-1.877-0.625v2.279c0.87,0.317,1.493,0.679,1.871,1.086
              c0.378,0.407,0.567,0.899,0.567,1.476c0,0.666-0.211,1.202-0.633,1.609C15.667,22.359,15.066,22.607,14.283,22.695z
              M13.413,17.432v-1.907c-0.552,0.1-0.829,0.391-0.829,0.872C12.584,16.811,12.861,17.156,13.413,17.432z
              M14.283,19.465v1.822c0.568-0.088,0.852-0.375,0.852-0.86C15.134,20.035,14.851,19.714,14.283,19.465z"
            />
          </g>
          <rect x="19" y="23" fill="#FFFFFF" width="6" height="1" />
        </g>
      </svg>
      <span className="text-sm text-[#ba88f5] font-mono">Terminal</span>
    </div>
  );
};

export default TerminalIcon;
