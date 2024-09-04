package com.example.hospital_navigation.dao;

import com.example.hospital_navigation.model.Imaging;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

@Component
public class JdbcImagingDao implements ImagingDao {
    private final JdbcTemplate jdbcTemplate;
    public JdbcImagingDao(JdbcTemplate jdbcTemplate) {this.jdbcTemplate = jdbcTemplate;}

    @Override  // retrieve imaging details
    public Imaging getImagingDetails(int appointmentType) {
        Imaging imgObj = new Imaging();

        String sql = "SELECT * FROM imaging WHERE appointment_type=?;";
        SqlRowSet row = jdbcTemplate.queryForRowSet(sql, appointmentType);

        // would expect to return one row; map into Imaging object with all the info
        if (row.next()) {
            imgObj.setAppointmentName(row.getString("appointment_name"));
            imgObj.setAppointmentType(row.getInt("appointment_type"));
            imgObj.setMainLocationId(row.getInt("main_location_id"));
            imgObj.setFloor(row.getString("floor"));
            imgObj.setSuite(row.getString("suite"));
        }
        return imgObj;
    }

    @Override // starting location (floor) to main landmark directions logic
    public String startPointToLandmark(int appointmentType) {
        Imaging imgObj = getImagingDetails(appointmentType);

        String startDirections = "";
        // if not on the 1st floor, direct pt to 1st floor first
        if (!imgObj.getFloor().equals("1st")) {
            startDirections = "Take the elevators to the 1st floor.";
        }
        return startDirections;
    }

    @Override // main landmark to end/next location directions logic
    public String landmarkToEndPoint(int appointmentType) {
        Imaging imgObj = getImagingDetails(appointmentType);

        String finalDirections = "";
        String floor = imgObj.getFloor();
        String suite = imgObj.getSuite();

        if (floor != "1st") {
            finalDirections += " Take the elevators to " + floor + " level.";
        }
        if (suite != null) {
            finalDirections += " Look for " + suite + ".";
        }
        return finalDirections;
    }
}
