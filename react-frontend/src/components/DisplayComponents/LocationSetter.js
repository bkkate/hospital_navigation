import { useContext, useState, useEffect } from "react";
import AppointmentContext from "../../context/appointments";

// apptData is the data retrieved from DB that's stored in context, passed down by DisplayPage
const LocationSetter = ({ apptData }) => {
  // next stop appointment list (that excludes the start point location set by user)
  const [nextApptsList, setNextApptsList] = useState(apptData);
  const [startPoint, setStartPoint] = useState(apptData[0].location);
  const [nextPoint, setNextPoint] = useState(apptData[1].location);

  // FIXME: fix list being undefined & how to handle in that case
  const locationOptions = (list) => {
    console.log("display page list retrieval: ", list);

    if (list === undefined) {
      return <option> this is an error </option>;
    } else {
      return list.map((appt, index) => {
        return (
          <option key={appt.appointment_type} value={appt.location}>
            {appt.location}
          </option>
        );
      });
    }
    // return list.map((appt, index) => {
    //   return (
    //     <option key={appt.appointment_type} value={appt.location}>
    //       {appt.location}
    //     </option>
    //   );
    // });
  };
  // filtering out appointment selected as "start" point for listing of next stops
  const onStartContentChange = (e) => {
    const startLocation = e.target.value;
    const nextLocationOptions = apptData.filter(
      (appt) => appt.location !== startLocation
    );
    setNextApptsList(nextLocationOptions);
    setStartPoint(startLocation);
  };

  const onNextContentChange = (e) => {
    const nextLocation = e.target.value;
    setNextPoint(nextLocation);
  };

  return (
    <div className="location-setter">
      <div className="start-point">
        <div> start point</div>
        <select value={startPoint} onChange={onStartContentChange}>
          {locationOptions(apptData)}
        </select>
      </div>

      <div className="next-point">
        <div> next point</div>
        <select value={nextPoint} onChange={onNextContentChange}>
          {locationOptions(nextApptsList)}
        </select>
      </div>
    </div>
  );
};

export default LocationSetter;
