import { useContext, useState, useEffect } from "react";
import AppointmentContext from "../../context/appointments";

// apptData is the data retrieved from DB that's stored in context, passed down by DisplayPage
const LocationSetter = ({ apptData, retrieveDirections }) => {
  // next stop appointment list (that excludes the start point location set by user)
  const [nextApptsList, setNextApptsList] = useState(apptData);
  const [startPoint, setStartPoint] = useState(
    apptData[0].imagingData.appointmentName
  );
  const [nextPoint, setNextPoint] = useState(
    apptData[1].imagingData.appointmentName
  );

  const [startPointKey, setStartPointKey] = useState(
    apptData[0].appointment_type
  );
  const [nextPointKey, setNextPointKey] = useState(
    apptData[1].appointment_type
  );

  // FIXME: fix list being undefined & how to handle in that case
  const locationOptions = (list) => {
    console.log("display page list retrieval: ", list);

    return list.map((appt, index) => {
      const imagingData = appt.imagingData;
      return (
        <option
          key={appt.appointment_type}
          value={imagingData.appointmentName}
          appt-type={appt.appointment_type}
        >
          {imagingData.appointmentName}
        </option>
      );
    });
  };
  // filtering out appointment selected as "start" point for listing of next stops
  const onStartContentChange = (e) => {
    const startLocation = e.target.value;
    const selectedOption = e.target.selectedOptions[0];

    setStartPoint(startLocation);
    setStartPointKey(selectedOption.getAttribute("appt-type"));

    const nextLocationOptions = apptData.filter(
      (appt) => appt.imagingData.appointmentName !== startLocation
    );
    setNextApptsList(nextLocationOptions);
    setNextPointKey(nextLocationOptions[0].appointment_type);
  };

  const onNextContentChange = (e) => {
    const nextLocation = e.target.value;
    const selectedOption = e.target.selectedOptions[0];

    setNextPoint(nextLocation);
    setNextPointKey(selectedOption.getAttribute("appt-type"));
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
      <button
        className="go-btn"
        onClick={() => {
          // console.log(`startKey: ${startPointKey}, endKey: ${nextPointKey}`);
          retrieveDirections(startPointKey, nextPointKey);
        }}
      >
        {" "}
        Go!{" "}
      </button>
    </div>
  );
};

export default LocationSetter;
