import AppointmentBar from "../components/InputComponents/AppointmentBar.js";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppointmentContext from "../context/appointments.js";
import AppointmentItem from "../components/InputComponents/AppointmentItem.js";
import "../style/InputPage.css";
import { addNewAppointments } from "../service/AxiosService.js";

const InputPage = () => {
  const { apptsToAdd, updateSchedulerId } = useContext(AppointmentContext);
  const navigate = useNavigate();
  const [isMultipleAppts, setIsMultipleAppts] = useState(false);

  useEffect(() => {
    setIsMultipleAppts(apptsToAdd.length > 0); // set isMultipleAppts to true if there's 1 or more appts
  }, [apptsToAdd]);

  const listAppt = apptsToAdd.map((appt, index) => {
    return (
      <AppointmentItem
        key={index}
        apptData={appt}
        idx={index}
      ></AppointmentItem>
    );
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // submit list of appointments, then update retrieved (saved) appts & newly created id in context
    try {
      const response = await addNewAppointments(apptsToAdd);
      // for id parameter in the link to be directed to
      updateSchedulerId(response.data[0].scheduler_id);

    } catch (err) {
      // TODO: pop up with error message saying that it didn't do through & Button to reload page
      window.location.reload();
      console.error(err);
    }

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
