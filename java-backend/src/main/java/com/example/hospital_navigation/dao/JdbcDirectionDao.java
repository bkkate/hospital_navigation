package com.example.hospital_navigation.dao;

import com.example.hospital_navigation.model.Direction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

@Component
public class JdbcDirectionDao implements  DirectionDao {
    private final JdbcTemplate jdbcTemplate;
    public JdbcDirectionDao(JdbcTemplate jdbcTemplate){this.jdbcTemplate = jdbcTemplate;}

    // startPoint and endPoints will be appointment locations, not landmark locations
    public Direction getLandmarkDirections(int startPoint, int endPoint){
       String mainLocationIdSql = "SELECT main_location_id FROM imaging WHERE appointment_type=?";
       int startMainLocationId = jdbcTemplate.queryForObject(mainLocationIdSql, int.class,  startPoint);
       int endMainLocationId = jdbcTemplate.queryForObject(mainLocationIdSql, int.class, endPoint);

       String directionSql = "SELECT * FROM direction WHERE start_point=? AND end_point=?";
       SqlRowSet row = jdbcTemplate.queryForRowSet(directionSql, startMainLocationId, endMainLocationId);

       // if no row is returned (i.e. start_point and end_point main locations are the same building, will return a null object
       Direction directionObj = null;
       if (row.next()) {
           directionObj = mapRowSetToAppointment(row);
       }
       return directionObj;
    }

    public Direction mapRowSetToAppointment(SqlRowSet row) {
        Direction direction = new Direction();

        direction.setStartPoint(row.getInt("start_point"));
        direction.setEndPoint(row.getInt("end_point"));
        direction.setInstruction(row.getString("instruction"));

        return direction;
    }
}
