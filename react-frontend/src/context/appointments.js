import { createContext, useState } from "react";
import { v4 as uuid4 } from "uuid";

const AppointmentContext = createContext();

function Provider({ children }) {
  // apptsToAdd is new appointments to submit at InputPage
  const [apptsToAdd, setApptsToAdd] = useState([]);

  // savedAppts is retrieved appointments that were saved in database
  const [apptsFromDB, setApptsFromDB] = useState([]);
  const [schedulerId, setSchedulerId] = useState(0);

  // appts to submit
  const addAppt = (newAppt) => {
    // newAppt will be an object passed as user clicks on "add appt" button
    const updatedAppts = [...apptsToAdd, newAppt];
    setApptsToAdd(updatedAppts);
  };

  const deleteAppt = (apptToDelete, index) => {
    const newApptList = apptsToAdd.filter((appt, apptIndx) => {
      return index !== apptIndx;
    });

    setApptsToAdd(newApptList);
  };

  // retrieving appts from database (saved for user/scheduler)
  const updateApptsFromDB = (appts) => {
    setApptsFromDB(appts);
  };

  const updateSchedulerId = (id) => setSchedulerId(id);

  const valueToShare = {
    apptsToAdd,
    addAppt,
    deleteAppt,
    schedulerId,
    updateSchedulerId,
    updateApptsFromDB,
    apptsFromDB,
  };

  return (
    <AppointmentContext.Provider value={valueToShare}>
      {children}
    </AppointmentContext.Provider>
  );
}

export default AppointmentContext;
export { Provider };
