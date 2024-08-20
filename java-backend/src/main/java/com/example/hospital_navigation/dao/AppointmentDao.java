package com.example.hospital_navigation.dao;

import com.example.hospital_navigation.model.Appointment;

import java.util.List;

public interface AppointmentDao {
    List<Appointment> getAppointmentsById (int userId);
    List<Appointment> addAppointmentsById (int userId);
    void deleteAppointmentsById (int userId);

}
