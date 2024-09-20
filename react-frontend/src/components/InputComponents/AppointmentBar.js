import React from "react";
import Dropdown from "./Dropdown.js";
import Timepicker from "./Timepicker.js";
import "../../style/AppointmentBar.css";
import { useContext, useState } from "react";
import AppointmentContext from "../../context/appointments.js";

const AppointmentBar = () => {
  const { apptsToAdd, addAppt } = useContext(AppointmentContext);
  const [locationToUpload, setLocationToUpload] = useState("");
  const [timeToUpload, setTimeToUpload] = useState("");

  // receive the selected content from Dropdown child component, then update state at this component
  const receiveSelectContent = (content) => {
    setLocationToUpload(content);
  };

  // receive the selected time from TimePicker child component, then update state at this component
  // data types: all hour, min, period are strings
  const receiveSelectTime = (hour, min, period) => {
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

    let appointmentType;
    switch (locationToUpload) {
      case "X-ray":
        appointmentType = 1;
        break;
      case "CT":
        appointmentType = 2;
        break;
      case "Labs/EKG":
        appointmentType = 3;
        break;
      case "Dopplers (Swedish)":
        appointmentType = 4;
        break;
      case "Dopplers (Pac Vas)":
        appointmentType = 5;
        break;
      case "Teaching":
        appointmentType = 6;
        break;
      case "Update H&P":
        appointmentType = 7;
        break;
      default:
        appointmentType = 0;
    }

    //use context's addApt function to pass in a new appt object with all the info
    const newAppt = {
      location: locationToUpload,
      appointment_type: appointmentType,
      appointment_time: timeToUpload,
    };

    addAppt(newAppt);

    // console.log(apptsToAdd);
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
