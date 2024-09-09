import AppointmentBar from "../components/AppointmentBar.js";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppointmentContext from "../context/appointments.js";
import AppointmentItem from "../components/AppointmentItem.js";
import "../style/InputPage.css";

const InputPage = () => {
  const { appts } = useContext(AppointmentContext);
  const navigate = useNavigate();
  const [isMultipleAppts, setIsMultipleAppts] = useState(false);

  useEffect(() => {
    setIsMultipleAppts(appts.length>0); // set isMultipleAppts to true if there's 1 or more appts 
  }, [appts]);

  const listAppt = appts.map((appt, index) => {
    return (
      <AppointmentItem
        key={index}
        apptData={appt}
        idx={index}
      ></AppointmentItem>
    );
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: axios for submitting details.

    // navigate the LinksPage page
    navigate("/links");
  };

  // show submit button only if there's one or more appts, and hide when no appointment is added
  const button = isMultipleAppts && (
    <button className="submit-btn" onClick={handleSubmit}>
      Submit
    </button>
  );

  return (
    <div className="wrapper">
      <AppointmentBar />
      <div className="appt-lists">{listAppt} </div>
      {button} 
    </div>
  );
};

export default InputPage;
