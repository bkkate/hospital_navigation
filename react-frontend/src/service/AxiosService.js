import axios from "axios";

const http = axios.create({ baseURL: "http://localhost:9000" });

const getAllAppointmentsById = (schedulerId) => {
  return http.get(`/appointments/${schedulerId}`);
};

const addNewAppointments = (apptsToAdd) => {
  return http.post(`/appointments/add`, apptsToAdd);
};

const deleteAllAppointmentsById = (schedulerId) => {
  return http.delete(`/appointments/delete/${schedulerId}`);
};

const deleteSpecificAppointment = (schedulerId, appointmentType) => {
  return http.delete(`/appointments/delete/${schedulerId}/${appointmentType}`);
};

const getDirections = (startPoint, endPoint) => {
  return http.get(`/directions/${startPoint}/${endPoint}`);
};

const getImagingDetails = (apptType) => {
  return http.get(`/imaging/${apptType}`);
};

export {
  getAllAppointmentsById,
  addNewAppointments,
  deleteAllAppointmentsById,
  deleteSpecificAppointment,
  getDirections,
  getImagingDetails,
};
