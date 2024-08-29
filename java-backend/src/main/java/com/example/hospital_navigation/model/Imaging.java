package com.example.hospital_navigation.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Imaging {
    @JsonProperty("appointment_type")
    private int appointmentType;
    @JsonProperty("appointment_name")
    private String appointmentName;
    @JsonProperty("main_location_id")
    private int mainLocationId;
    @JsonProperty("main_location_name")
    private String mainLocationName;
    private String floor;
    private String suite;

    public Imaging() {}
    public Imaging(int appointmentType, String appointmentName, int mainLocationId, String floor, String suite) {
        this.appointmentType = appointmentType;
        this.appointmentName = appointmentName;
        this.mainLocationId = mainLocationId;
        this.floor = floor;
        this.suite = suite;
    }

    public int getAppointmentType() {return appointmentType;}

    public String getAppointmentName() {return appointmentName;}

    public int getMainLocationId() {return mainLocationId;}

    public String getFloor() {return floor;}

    public String getSuite() {return suite;}

    public void setAppointmentType(int appointmentType) {this.appointmentType = appointmentType;}

    public void setAppointmentName(String appointmentName) {this.appointmentName = appointmentName;}

    public void setMainLocationId(int mainLocationId) {this.mainLocationId = mainLocationId;}

    public void setFloor(String floor) {this.floor = floor;}

    public void setSuite(String suite) {this.suite = suite;}
}
