import React from "react";

interface sectionDividerProps {
  color: string;
}

function SectionDivider(props: sectionDividerProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1512 77"
      fill="none"
      className="z-10 absolute pointer-events-none -bottom-1 md:-bottom-2 left-0 w-full"
      preserveAspectRatio="none"
    >
      <title>Divider</title>
      <path
        d="M-0.167969 0C-0.167969 0 232.174 62.9929 743.968 62.9929C1255.76 62.9929 1512.1 0 1512.1 0V77H-0.167969V0Z"
        fill={props.color}
      />
    </svg>
  );
}

export default SectionDivider;
