package com.example.hospital_navigation.controller;

import com.example.hospital_navigation.dao.DirectionDao;
import com.example.hospital_navigation.dao.ImagingDao;
import com.example.hospital_navigation.model.Direction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/directions")
public class DirectionController {
    @Autowired
    private ImagingDao imagingDao;
    @Autowired
    private DirectionDao directionDao;

    @GetMapping(path="/{startPoint}/{endPoint}")
    public String retrieveFullDirections(@PathVariable int startPoint, @PathVariable int endPoint) {
        // info about directions between "landmarks"
        Direction mainLocationDirection = directionDao.getLandmarkDirections(startPoint, endPoint);

        // if start and end locations are within the same landmark building, Direction object returned will be null (no row found)
        String mainDirections =  (mainLocationDirection == null) ?  "" : mainLocationDirection.getInstruction();

        // specific instructions from start to landmark and landmark to end
            // if they're within the same building, no need for start instructions (which would direct them to main building, making it redundant)
        String startInstructions =  (mainLocationDirection == null) ?  "" : imagingDao.startPointToLandmark(startPoint);
        String endInstructions = imagingDao.landmarkToEndPoint(endPoint);

        return startInstructions + " " + mainDirections + " " + endInstructions;
    }

}
