package com.example.hospital_navigation.controller;

import com.example.hospital_navigation.dao.ImagingDao;
import com.example.hospital_navigation.model.Imaging;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin
@Component
@RequestMapping("/imaging")
public class ImagingController {
    private final JdbcTemplate jdbcTemplate;
    public ImagingController(JdbcTemplate jdbcTemplate) {this.jdbcTemplate = jdbcTemplate;}

    @GetMapping(path="/{appointmentType}")
    public Map<String, Object> getImagingLocationDetails(@PathVariable int appointmentType) {
        Map<String, Object> fullImagingMap = new HashMap<>();

        // join table to get the main location name (in 'location' table) along with 'imaging' table data
        String sql = "SELECT imaging.*, location.main_location_name FROM imaging JOIN location ON imaging.main_location_id = location.main_location_id " +
                "WHERE appointment_type = ?;";

        SqlRowSet row = jdbcTemplate.queryForRowSet(sql, appointmentType);

        if (row.next()) {
            fullImagingMap.put("appointmentName", row.getString("appointment_name"));
            //   fullImagingMap.put("appointmentType", row.getInt("appointment_type"));
            fullImagingMap.put("mainLocationId", row.getInt("main_location_id"));
            fullImagingMap.put("floor", row.getString("floor"));
            fullImagingMap.put("suite", row.getString("suite"));
            fullImagingMap.put("mainLocationName", row.getString("main_location_name"));
        }

        return fullImagingMap;
    }

}
