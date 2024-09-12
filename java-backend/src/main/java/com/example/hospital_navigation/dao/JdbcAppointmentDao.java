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
    private final JdbcTemplate jdbcTemplate;
    public JdbcAppointmentDao(JdbcTemplate jdbcTemplate) {this.jdbcTemplate = jdbcTemplate;}

    // manually incrementing serial number logic
    private Integer createSchedulerId() {
        String queryForIdExistence = "SELECT MAX(scheduler_id) FROM appointment";
        Integer maxId = jdbcTemplate.queryForObject(queryForIdExistence, Integer.class);

        // if there's no id returned (no row in database existing), return null; else, increment the max number by 1
        return maxId == null ? 1 : maxId+1;
    }

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
    public List<Appointment> addAppointments (List<Appointment> apptsToAdd) {
        // returns either -1 or a newly generated (incremented) number
        int schedulerId = createSchedulerId();

        String insertWithIdSql = "INSERT INTO appointment (scheduler_id, appointment_type, appointment_time) "
                + "VALUES(?, ?, ?);";
        for(Appointment appt: apptsToAdd) {
            jdbcTemplate.update(insertWithIdSql, schedulerId, appt.getAppointmentType(), appt.getAppointmentTime());
        }
        return getAppointmentsById(schedulerId);
    }

//    @Override
//    public List<Appointment> addAppointments (List<Appointment> apptsToAdd) {
//        // First, create a serial scheduler Id unique for these appointments using the first appt in the list
//        String createSchedulerIdSql = "INSERT INTO appointment (appointment_type, appointment_time) "
//                + "VALUES(?, ?) RETURNING scheduler_id;";
//
//        int schedulerId = jdbcTemplate.queryForObject(createSchedulerIdSql, Integer.class, apptsToAdd.get(0).getAppointmentType(), apptsToAdd.get(0).getAppointmentTime());
//
//        // using the schedulerId created/retrieved, add rest of appointments
//        String insertWithIdSql = "INSERT INTO appointment (scheduler_id, appointment_type, appointment_time) "
//                + "VALUES(?, ?, ?);";
//        for(Appointment appt: apptsToAdd) {
//            jdbcTemplate.update(insertWithIdSql, schedulerId, appt.getAppointmentType(), appt.getAppointmentTime());
//        }
//
//        return getAppointmentsById(schedulerId);
//    }
    @Override
    public void deleteAppointmentsById (int schedulerId) {
        String sql = "DELETE FROM appointment WHERE scheduler_id=?;";
        jdbcTemplate.update(sql, schedulerId);
    }
    @Override
    public void deleteAppointmentByIdAndType (int schedulerId, int appointmentType) {
        String sql = "DELETE FROM appointment WHERE scheduler_id=? AND appointment_type=?;";
        jdbcTemplate.update(sql, schedulerId, appointmentType);
    }
    public Appointment mapRowSetToAppointment(SqlRowSet row) {
        Appointment appt = new Appointment();

        appt.setSchedulerId(row.getInt("scheduler_id"));
        appt.setAppointmentType(row.getInt("appointment_type"));
        appt.setAppointmentTime(row.getTime("appointment_time"));

        return appt;
    }
}
