package com.example.hospital_navigation.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalTime;

public class Appointment {
    @JsonProperty("user_id")
    private int userId;
    @JsonProperty("appointment_type")
    private int appointmentType;
    @JsonProperty("appointment_time")
    private LocalTime appointmentTime;

    public Appointment () {}
    public Appointment(int userId, int appointmentType, LocalTime appointmentTime) {
        this.userId = userId;
        this.appointmentType = appointmentType;
        this.appointmentTime = appointmentTime;
    }

    public int getUserId() { return userId; }

    public int getAppointmentType() { return appointmentType; }

    public LocalTime getAppointmentTime() { return appointmentTime; }

    public void setUserId(int userId) { this.userId = userId; }

    public void setAppointmentType(int appointmentType) { this.appointmentType = appointmentType; }

    public void setAppointmentTime(LocalTime appointmentTime) { this.appointmentTime = appointmentTime; }
}
