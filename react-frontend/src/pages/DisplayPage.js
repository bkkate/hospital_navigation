import React, { useEffect, useContext, useState } from "react";
import AppointmentContext from "../context/appointments";
import LocationSetter from "../components/DisplayComponents/LocationSetter";
import { useParams } from "react-router-dom";
import { getAllAppointmentsById } from "../service/AxiosService";

const DisplayPage = () => {
  const { id } = useParams();
  const { apptsFromDB, updateApptsFromDB } = useContext(AppointmentContext);

  // FIXME: state not updating context in time for data to be used in child component LocationSetter
  const retrieveData = async () => {
    const response = await getAllAppointmentsById(id);

    // adding 'location' property with the exact imaging name for display
    return response.data.map((appt) => {
      let locationName;
      switch (appt.appointment_type) {
        case 1:
          locationName = "X-ray";
          break;
        case 2:
          locationName = "CT";
          break;
        case 3:
          locationName = "Labs/EKG";
          break;
        case 4:
          locationName = "Dopplers (Swedish)";
          break;
        case 5:
          locationName = "Dopplers (Pac Vas)";
          break;
        case 6:
          locationName = "Teaching";
          break;
        case 7:
          locationName = "Update H&P";
          break;
        default:
          locationName = "None to Display";
      }
      return { ...appt, location: locationName };
    });
  };

  useEffect(() => {
    const updatedAppts = retrieveData();
    console.log("retrieveData function return value: ", updatedAppts);

    // save retrieved data in context
    updateApptsFromDB(updatedAppts);
  });

  return (
    <div>
      <LocationSetter
        apptData={apptsFromDB}
        // tempData={tempData}
      ></LocationSetter>
    </div>
  );
};

export default DisplayPage;
