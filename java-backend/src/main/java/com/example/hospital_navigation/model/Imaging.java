package com.example.hospital_navigation.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Imaging {
    @JsonProperty("appointment_type")
    private int appointmentType;
    @JsonProperty("appointment_name")
    private String appointmentName;
    @JsonProperty("location_id")
    private int locationId;
    private String floor;
    private String suite;

    public Imaging() {}
    public Imaging(int appointmentType, String appointmentName, int locationId, String floor, String suite) {
        this.appointmentType = appointmentType;
        this.appointmentName = appointmentName;
        this.locationId = locationId;
        this.floor = floor;
        this.suite = suite;
    }

    public int getAppointmentType() {return appointmentType;}

    public String getAppointmentName() {return appointmentName;}

    public int getLocationId() {return locationId;}

    public String getFloor() {return floor;}

    public String getSuite() {return suite;}

    public void setAppointmentType(int appointmentType) {this.appointmentType = appointmentType;}

    public void setAppointmentName(String appointmentName) {this.appointmentName = appointmentName;}

    public void setLocationId(int locationId) {this.locationId = locationId;}

    public void setFloor(String floor) {this.floor = floor;}

    public void setSuite(String suite) {this.suite = suite;}
}
