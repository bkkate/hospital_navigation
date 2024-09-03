package com.example.hospital_navigation.dao;

import com.example.hospital_navigation.model.Direction;

public interface DirectionDao {
    // startPoint and endPoints will be appointment locations, not landmark locations
    Direction getLandmarkDirections(int startPoint, int endPoint);
    
}
