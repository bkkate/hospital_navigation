package com.example.hospital_navigation.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Location {
    @JsonProperty("location_id")
    private int locationId;
    @JsonProperty("location_name")
    private String locationName;

    public Location() {};
    public Location(int locationId, String locationName) {
        this.locationId = locationId;
        this.locationName = locationName;
    }

    public int getLocationId() {
        return locationId;
    }
    public String getLocationName() {
        return locationName;
    }
    public void setLocationId(int locationId) {
        this.locationId = locationId;
    }
    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }
}
