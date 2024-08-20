import React from "react";
import Dropdown from "./Dropdown.js";
import Timepicker from "./Timepicker.js";
import "../style/AppointmentBar.css";
import { useContext, useState } from "react";
import AppointmentContext from "../context/appointments.js";

const AppointmentBar = () => {
  const { appts, addAppt } = useContext(AppointmentContext);
  const [locationToUpload, setLocationToUpload] = useState("");
  const [timeToUpload, setTimeToUpload] = useState("");

  // receive the selected content from Dropdown child component, then update state at this component
  const receiveSelectContent = (content) => {
    setLocationToUpload(content);
  };

  // receive the selected time from TimePicker child component, then update state at this component
  // data types: all hour, min, period are strings
  const receiveSelectTime = (hour, min, period) => {
    // console.log(
    //   "data received from timePicker, on Appointment Bar: ",
    //   hour,
    //   min,
    //   period
    // );
    if (period === "PM" && hour < 12) {
      hour = parseInt(hour, 10) + 12;
    }

    if (min.length < 2) {
      min = "0" + min;
    }
    // a string format of hh:mm:00
    const timeString = `${hour.toString().padStart(2, "0")}:${min}:00`;
    setTimeToUpload(timeString);
  };

  const handleAdd = (event) => {
    event.preventDefault();

    //use context's addApt function to pass in a new appt object with all the info
    const newAppt = {
      location: locationToUpload,
      time: timeToUpload,
    };

    addAppt(newAppt);

    console.log(appts);
  };

  return (
    <div className="add-bar">
      <Dropdown onContentChange={receiveSelectContent} />
      <Timepicker onTimeChange={receiveSelectTime}></Timepicker>
      <button type="submit" className="add-appt-btn" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
};

export default AppointmentBar;
