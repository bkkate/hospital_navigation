import React, { useEffect, useContext, useState } from "react";
import AppointmentContext from "../context/appointments";
import LocationSetter from "../components/DisplayComponents/LocationSetter";
import { useParams } from "react-router-dom";
import { getAllAppointmentsById } from "../service/AxiosService";

const DisplayPage = () => {
  const { id } = useParams();
  const { apptsFromDB, updateApptsFromDB, updateSchedulerId } =
    useContext(AppointmentContext);
  const [loading, setLoading] = useState(true);

  // FIXME: state not updating context in time for data to be used in child component LocationSetter
  useEffect(() => {
    // when user types in the link, update the "id" in context from id parameter in url
    updateSchedulerId(id);

    const fetchData = async () => {
      try {
        const response = await getAllAppointmentsById(id);

        // adding 'location' property with the exact imaging name for display
        const updatedData = response.data.map((appt) => {
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
        updateApptsFromDB(updatedData);
      } catch (err) {
        console.error("Error fetching appointments: ", err);
      } finally {
        setLoading(false); // once the try block runs completely
      }
    };

    fetchData();
  }, [apptsFromDB]);

  return (
    <div>
      {!loading && <LocationSetter apptData={apptsFromDB}></LocationSetter>}
    </div>
  );
};

export default DisplayPage;
