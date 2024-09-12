package com.example.hospital_navigation.dao;

import com.example.hospital_navigation.model.Appointment;

import java.util.List;

public interface AppointmentDao {
    List<Appointment> getAppointmentsById (int schedulerId);
    List<Appointment> addAppointments (List<Appointment> apptsToAdd);
    void deleteAppointmentsById (int schedulerId);
    void deleteAppointmentByIdAndType (int schedulerId, int appointmentType);
}
