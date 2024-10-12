import React, { useEffect, useContext, useState } from "react";
import AppointmentContext from "../context/appointments";
import LocationSetter from "../components/DisplayComponents/LocationSetter";
import { useParams } from "react-router-dom";
import {
  getAllAppointmentsById,
  getImagingDetails,
} from "../service/AxiosService";
import DisplayItem from "../components/DisplayComponents/DisplayItem";

const DisplayPage = () => {
  const { id } = useParams();
  const { updateApptsFromDB, updateSchedulerId } =
    useContext(AppointmentContext);
  const [apptsFromDB, setApptsFromDB] = useState([]);
  const [loading, setLoading] = useState(true);

  // FIXME: state not updating context in time for data to be used in child component LocationSetter
  useEffect(() => {
    // when user types in the link, update the "id" in context from id parameter in url
    updateSchedulerId(id);

    const fetchData = async () => {
      try {
        const response = await getAllAppointmentsById(id);

        // Promise.All to ensure all promises have resolved for the mapped array before we update data in context
        /* adding 'location' property with the exact imaging name (e.g. CT) for display
           adding 'imagingData' property for all location details (e.g. 'Jefferson Tower', 'Suite 202', etc )    */
        const updatedData = await Promise.all(
          response.data.map(async (appt) => {
            // let apptName;
            // switch (appt.appointment_type) {
            //   case 1:
            //     apptName = "X-ray";
            //     break;
            //   case 2:
            //     apptName = "CT";
            //     break;
            //   case 3:
            //     apptName = "Labs/EKG";
            //     break;
            //   case 4:
            //     apptName = "Dopplers (Swedish)";
            //     break;
            //   case 5:
            //     apptName = "Dopplers (Pac Vas)";
            //     break;
            //   case 6:
            //     apptName = "Teaching";
            //     break;
            //   case 7:
            //     apptName = "Update H&P";
            //     break;
            //   default:
            //     apptName = "None to Display";
            // }

            const imagingResponse = await getImagingDetails(appt.appointment_type); // returns Imaging object with location details
            const imagingData = imagingResponse.data;
            
            return { ...appt, imagingData };
          })
        );

        // update context and state (for immediate use) with the revised/added data above
        updateApptsFromDB(updatedData);
        setApptsFromDB(updatedData);
      } catch (err) {
        console.error("Error fetching appointments: ", err);
      } finally {
        setLoading(false); // once the try block runs completely
      }
    };

    fetchData();
  }, [id]);

  // const appointmentsList = apptsFromDB.map((appt) => {
  //   return <DisplayItem apptData={appt} key={appt.appointment_type} />;
  // });


  return (
    <div>
      {loading ? (
        <div> Loading Data... </div>
      ) : (
        <LocationSetter apptData={apptsFromDB} />
      )}

      {/* {apptsFromDB.length > 0 ? (
        apptsFromDB.map((appt) => (
          <DisplayItem key={appt.appointment_type} apptData={appt} />
        ))
      ) : (
        <div>No appointments to display</div> // Render a fallback if no data is available
      )} */}
    </div>
  );
};

export default DisplayPage;
