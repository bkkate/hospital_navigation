import React from "react";
import DropdownButton from "./DropdownButton";
import DropdownContent from "./DropdownContent";
import DropdownItem from "./DropdownItem";
import "../style/Dropdown.css";
import { useState, useEffect, useRef } from "react";

// content: list rendering of DropdownItem
const Dropdown = ({ onContentChange }) => {
  const [open, setOpen] = useState(false);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [dropdownContent, setDropdownContent] = useState("Update H&P");

  const dropdownRef = useRef();
  const buttonRef = useRef();
  const contentRef = useRef();

  // toggle function
  const toggleDropdown = () => {
    // styling so that it overlays on top of dropdown bar when it's at bottom of the page
    if (!open) {
      const spaceRemaining =
        window.innerHeight - buttonRef.current.getBoundingClientRect().bottom;
      const contentHeight = contentRef.current.clientHeight;
      const topPosition =
        spaceRemaining > contentHeight ? null : spaceRemaining - contentHeight;

      setDropdownTop(topPosition);
    }
    setOpen(!open);
  };

  // updating content with selected item from dropdown
  const updateDropdownContent = (itemText) => {
    // console.log(itemText);
    setDropdownContent(itemText);
    setOpen(false);

    // send the most "updated" content to parent component, AppointmentBar
    onContentChange(itemText);
  };

  useEffect(() => {
    // if user doesn't select any non-default ("Update H&P") option - send that content to parent to update appt
    onContentChange(dropdownContent);

    const handler = (event) => {
      // if the user clicks outside of the div with className="dropdown", close up the content piece
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handler);
    // cleaning up event listener with each re-render
    return () => {
      document.removeEventListener("click", handler);
    };
  }, [dropdownRef]);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <DropdownButton toggle={toggleDropdown} open={open} ref={buttonRef}>
        {dropdownContent}
      </DropdownButton>
      <DropdownContent
        open={open}
        updateOnClick={updateDropdownContent}
        ref={contentRef}
        top={dropdownTop}
      ></DropdownContent>
    </div>
  );
};

export default Dropdown;
