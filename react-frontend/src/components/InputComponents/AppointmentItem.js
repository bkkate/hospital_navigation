import React from "react";
import { BiTrash } from "react-icons/bi";
import "../../style/AppointmentItem.css";
import AppointmentContext from "../../context/appointments.js";
import { useContext } from "react";

// *parent component is the InputPage
const AppointmentItem = ({ apptData, idx }) => {
  // format time from military to a more readable form
  const militaryFormat = apptData.appointment_time;
  let hour = militaryFormat.slice(0, 2);
  const min = militaryFormat.slice(3, 5);
  let period = "AM";

  if (parseInt(hour, 10) > 12) {
    hour -= 12;
    period = "PM";
  }

  // delete appt at context
  const { deleteAppt } = useContext(AppointmentContext);
  const deleteItem = () => {
    deleteAppt(apptData, idx);
  };

  return (
    <div className="appt-wrapper">
      <div className="location appt">{apptData.location}</div>
      <div className="time appt">{`${hour} : ${min} ${period}`}</div>
      <div className="deleteBtn" onClick={deleteItem}>
        <BiTrash />
      </div>
    </div>
  );
};

export default AppointmentItem;
