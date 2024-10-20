import React, { useEffect, useContext, useState } from "react";
import AppointmentContext from "../context/appointments";
import LocationSetter from "../components/DisplayComponents/LocationSetter";
import { useParams } from "react-router-dom";
import {
  getAllAppointmentsById,
  getImagingDetails,
} from "../service/AxiosService";
import DisplayItem from "../components/DisplayComponents/DisplayItem";
import { getDirections } from "../service/AxiosService.js";
import Directions from "../components/DisplayComponents/Directions.js";

const DisplayPage = () => {
  const { id } = useParams();
  const { updateApptsFromDB, updateSchedulerId } =
    useContext(AppointmentContext);

  const [apptsFromDB, setApptsFromDB] = useState([]);
  const [loading, setLoading] = useState(true);

  // state to track whether user pressed the Go! button to get directions
  const [showDirections, setShowDirections] = useState(false);
  const [directions, setDirections] = useState("");

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
            const imagingResponse = await getImagingDetails(
              appt.appointment_type
            ); // returns Imaging object with location details
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

  const retrieveDirections = async (startPoint, nextPoint) => {
    const response = await getDirections(startPoint, nextPoint);
    const instructionsStr = response.data;
    console.log(instructionsStr);
    setShowDirections(true);
    setDirections(instructionsStr);
  };

  // check if still loading (loading == true) or apptsFromDB has not been updated
  return loading || apptsFromDB.length <= 0 ? (
    <div> Loading Data... </div>
  ) : (
    <div>
      <LocationSetter
        apptData={apptsFromDB}
        retrieveDirections={retrieveDirections}
      />

      {apptsFromDB.map((appt) => {
        return <DisplayItem apptData={appt} key={appt.appointment_type} />;
      })}

      {(showDirections || directions.length > 0) && (
        <Directions instructions={directions} />
      )}
    </div>
  );
};

export default DisplayPage;
