import React from "react";
import "../style/DropdownItem.css";

// DropdownContent is the parent component
const DropdownItem = ({ children, updateOnClick }) => {
  // children prop is the 'items' variable wrapped around DropdownItem in DropdownContent

  return (
    <div className="dropdown-item" onClick={() => updateOnClick(children)}>
      {children}
    </div>
  );
};

export default DropdownItem;
