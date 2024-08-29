package com.example.hospital_navigation.dao;

import com.example.hospital_navigation.model.Appointment;

import java.util.List;

public interface AppointmentDao {
    List<Appointment> getAppointmentsById (int schedulerId);
    List<Appointment> addAppointmentsById (int schedulerId, List<Appointment> apptsToAdd);
    void deleteAppointmentById (int schedulerId);

}
