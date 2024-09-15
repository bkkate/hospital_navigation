import React, { forwardRef } from "react";
import "../style/DropdownContent.css";
import DropdownItem from "./DropdownItem";

const DropdownContent = forwardRef((props, ref) => {
  const { open, top, updateOnClick } = props;

  // DropdownItems
  const locations = [
    "Update H&P",
    "Teaching",
    "Dopplers (Swedish)",
    "Dopplers (Pac Vas)",
    "X-ray",
    "CT",
    "Labs/EKG",
  ];
  const items = locations.map((item, index) => {
    return (
      <DropdownItem key={index} updateOnClick={updateOnClick}>
        {item}
      </DropdownItem>
    );
  });

  return (
    <div
      className={`dropdown-content ${open ? "content-open" : null}`}
      ref={ref}
      style={{ top: top ? `${top}px` : "100%" }}
    >
      {items}
    </div>
  );
});

export default DropdownContent;
