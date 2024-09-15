import { createContext, useState } from "react";
import { v4 as uuid4 } from "uuid";

const AppointmentContext = createContext();

function Provider({ children }) {
  // apptsToAdd is new appointments to submit at InputPage
  const [apptsToAdd, setApptsToAdd] = useState([]);

  // savedAppts is retrieved appointments that were saved in database
  const [savedAppts, setSavedAppts] = useState([]);
  const [id, setId] = useState(0);

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
  const updatedApptsFromDB = (appts) => {
    setSavedAppts(appts);
  };

  const updateSchedulerId = (id) => setId(id);

  const valueToShare = {
    apptsToAdd,
    addAppt,
    deleteAppt,
    id,
    updateSchedulerId,
    updatedApptsFromDB,
  };

  return (
    <AppointmentContext.Provider value={valueToShare}>
      {children}
    </AppointmentContext.Provider>
  );
}

export default AppointmentContext;
export { Provider };
