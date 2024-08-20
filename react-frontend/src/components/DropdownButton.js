import React, { forwardRef } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "../style/DropdownButton.css";

// Wrapping around forwardRef as this is a component, not an html element, to use it as a ref
const DropdownButton = forwardRef((props, ref) => {
  // 'toggle' (which value is toggleDropdown) and 'open' are props handed down from parent Dropdown
  const { children, open, toggle } = props;
  const handleIconClick = (event) => {
    event.stopPropagation();
    toggle();
  };

  return (
    <div
      className={`dropdown-btn ${open ? "button-open" : null}`}
      onClick={toggle}
      ref={ref}
    >
      {" "}
      {children}
      <span className="toggle-icon" onClick={handleIconClick}>
        {open ? <FaChevronUp /> : <FaChevronDown />}
      </span>
    </div>
  );
});

export default DropdownButton;
