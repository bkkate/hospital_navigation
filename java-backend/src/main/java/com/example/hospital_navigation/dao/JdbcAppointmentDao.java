package com.example.hospital_navigation.dao;

import com.example.hospital_navigation.model.Appointment;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import java.sql.Array;
import java.util.ArrayList;
import java.util.List;

@Component
public class JdbcAppointmentDao implements AppointmentDao {
    private JdbcTemplate jdbcTemplate;

    public JdbcAppointmentDao(JdbcTemplate jdbcTemplate) {this.jdbcTemplate = jdbcTemplate;}
    @Override
    public List<Appointment> getAppointmentsById (int schedulerId) {
        List<Appointment> appointments = new ArrayList<>();
        String sql = "SELECT * FROM appointment WHERE scheduler_id = ?;";

        SqlRowSet row = jdbcTemplate.queryForRowSet(sql, schedulerId);

        while(row.next()) {
            Appointment appt = mapRowSetToAppointment(row);
            appointments.add(appt);
        }
        return appointments;
    }

    @Override
    public List<Appointment> addAppointmentsById (int schedulerId, List<Appointment> apptsToAdd) {

        String sql = "INSERT INTO appointment (scheduler_id, appointment_type, appointment_time) "
                + "VALUES(?, ?, ?)";

        for(Appointment appt: apptsToAdd) {
            jdbcTemplate.update(sql, appt.getSchedulerId(), appt.getAppointmentType(), appt.getAppointmentTime());
        }

        return getAppointmentsById(schedulerId);
    }
    @Override
    public void deleteAppointmentById (int schedulerId) {
        String sql = "DELETE FROM appointment WHERE scheduler_id=?";
        jdbcTemplate.update(sql);
    }

    public Appointment mapRowSetToAppointment(SqlRowSet row) {
        Appointment appt = new Appointment();

        appt.setSchedulerId(row.getInt("scheduler_id"));
        appt.setAppointmentType(row.getInt("appointment_type"));
        appt.setAppointmentTime(row.getTime("appointment_time"));

        return appt;
    }

}
