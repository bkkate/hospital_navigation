import { createContext, useState } from "react";
import { v4 as uuid4 } from "uuid";

const AppointmentContext = createContext();

function Provider({ children }) {
  const [appts, setAppts] = useState([]);

  const uniqueId = uuid4();

  const addAppt = (newAppt) => {
    // newAppt will be an object passed as user clicks on "add appt" button
    const updatedAppts = [...appts, newAppt];
    setAppts(updatedAppts);
  };

  const deleteAppt = (apptToDelete, index) => {
    const newApptList = appts.filter((appt, apptIndx) => {
      return index !== apptIndx;
    });

    setAppts(newApptList);
  };

  const valueToShare = {
    appts,
    addAppt,
    deleteAppt,
    uniqueId,
  };

  return (
    <AppointmentContext.Provider value={valueToShare}>
      {children}
    </AppointmentContext.Provider>
  );
}

export default AppointmentContext;
export { Provider };
