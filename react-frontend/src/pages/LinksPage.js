import React from "react";
import map from "../assets/big_map.png";
import "../style/LinksPage.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AppointmentContext from "../context/appointments.js";

const LinksPage = () => {
  // as user submits info from InputPage -> saved in database and creates/returns a newly created unique schedulerId -> used for dynamic link
  const { id } = useContext(AppointmentContext);

  return (
    <div>
      <Link to="/"> Submit New Set of Appointments</Link>
      <Link to={`/display/${id}`}>Go to Appointment Details </Link>
      <img src={map} alt="hospital map" />
    </div>
  );
};

export default LinksPage;
