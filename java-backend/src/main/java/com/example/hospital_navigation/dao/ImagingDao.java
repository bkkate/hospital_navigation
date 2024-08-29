package com.example.hospital_navigation.dao;

import com.example.hospital_navigation.model.Imaging;

public interface ImagingDao {

    // retrieve imaging details
    Imaging getImagingDetails(int appointmentType);

    // starting location to generic landmark directions logic
    String startPointToLandmark (int appointmentType);

    // generic landmark to end location directions logic
    String landmarkToEndPoint();
}
