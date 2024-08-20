package com.example.hospital_navigation.dao;

import com.example.hospital_navigation.model.Appointment;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class JdbcAppointmentDao implements AppointmentDao {
    private JdbcTemplate jdbcTemplate;

    public JdbcAppointmentDao(JdbcTemplate jdbcTemplate) {this.jdbcTemplate = jdbcTemplate;}
    @Override
    public List<Appointment> getAppointmentsById (int userId) {

    }

    @Override
    public List<Appointment> addAppointmentsById (int userId) {

    }
    @Override
    public void deleteAppointmentsById (int userId) {

    }

    public Appointment mapRowSetToAppointment(SqlRowSet row) {
        Appointment appt = new Appointment();

        appt.setUserId(row.getInt("user_id"));
        appt.setAppointmentType(row.getInt("appointment_type"));
        appt.setAppointmentTime(row.getTime("appointment_time");

        return appt;
    }

}
