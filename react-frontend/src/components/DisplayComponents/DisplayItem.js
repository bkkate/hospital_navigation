import React, { useState } from "react";

const DisplayItem = ({apptData}) => {
  const [imagingObj, setImagingObj] = useState(apptData.imagingData)
 
  return (
  
      imagingObj &&   <div className="item-wrapper">
      <div className="appt-name"> {imagingObj.appointmentName} </div>
      <div className="appt-time">{apptData.appointment_time}</div>
      <div className="appt-location">{imagingObj.mainLocationName}</div>
      <div>
        `{imagingObj.floor} {imagingObj.suite}`
      </div> </div>
      
   
  );
};

export default DisplayItem;
