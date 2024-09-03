package com.example.hospital_navigation.dao;

import com.example.hospital_navigation.model.Imaging;

public interface ImagingDao {

    // retrieve imaging details
    Imaging getImagingDetails(int appointmentType);

    // starting location to main landmark directions logic
    String startPointToLandmark (int appointmentType);

    // main landmark to end/next location directions logic
    String landmarkToEndPoint(int appointmentType);
}
