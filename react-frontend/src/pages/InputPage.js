import AppointmentBar from "../components/AppointmentBar.js";
import { useContext } from "react";
import AppointmentContext from "../context/appointments.js";
import AppointmentItem from "../components/AppointmentItem.js";
import "../style/InputPage.css";

const InputPage = () => {
  const { appts, uniqueId } = useContext(AppointmentContext);

  const listAppt = appts.map((appt, index) => {
    return (
      <AppointmentItem
        key={index}
        apptData={appt}
        idx={index}
      ></AppointmentItem>
    );
  });

  // TODO: show button only if there's one or more appts, and hide when no appointment is added

  return (
    <div className="wrapper">
      <AppointmentBar />
      <div className="appt-lists">{listAppt} </div>
      <button className="submit-btn"> Submit </button>
    </div>
  );
};

export default InputPage;
