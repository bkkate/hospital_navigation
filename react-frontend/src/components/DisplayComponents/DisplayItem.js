import React from "react";

const DisplayItem = (apptData) => {
  const imagingObj = apptData.imagingData;
  return (
    <div className="item-wrapper">
      <div className="appt-name"> {imagingObj.appointmentName} </div>
      <div className="appt-time">{apptData.appointment_time}</div>
      <div className="appt-location">{imagingObj.mainLocationName}</div>
      <div>
        `{imagingObj.floor} {imagingObj.suite}`
      </div>
    </div>
  );
};

export default DisplayItem;
