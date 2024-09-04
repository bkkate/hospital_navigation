package com.example.hospital_navigation.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.sql.Time;
import java.time.LocalTime;

public class Appointment {
    @JsonProperty("scheduler_id")
    private int schedulerId;
    @JsonProperty("appointment_type")
    private int appointmentType;
    @JsonProperty("appointment_time")
    private Time appointmentTime;

    public Appointment () {}
    public Appointment(int schedulerId, int appointmentType, Time appointmentTime) {
        this.schedulerId = schedulerId;
        this.appointmentType = appointmentType;
        this.appointmentTime = appointmentTime;
    }
    public int getSchedulerId() { return schedulerId; }
    public int getAppointmentType() { return appointmentType; }
    public Time getAppointmentTime() { return appointmentTime; }
    public void setSchedulerId(int schedulerId) { this.schedulerId = schedulerId; }
    public void setAppointmentType(int appointmentType) { this.appointmentType = appointmentType; }
    public void setAppointmentTime(Time appointmentTime) { this.appointmentTime = appointmentTime; }
}
