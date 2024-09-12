package com.example.hospital_navigation.controller;

import com.example.hospital_navigation.dao.AppointmentDao;
import com.example.hospital_navigation.model.Appointment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/appointments")
public class AppointmentController {
    @Autowired
    private AppointmentDao apptDao;

    // retrieve all appointments for one person
    @GetMapping(path="/{schedulerId}")
    public List<Appointment> listAppointmentsById (@PathVariable int schedulerId) {
        return apptDao.getAppointmentsById(schedulerId);
    }

//    // add list of appointments by schedulerId
//    @PostMapping(path="/add/{schedulerId}")
//    public List<Appointment> addNewAppointments (@PathVariable int schedulerId, @RequestBody List<Appointment> newApptList) {
//        return apptDao.addAppointmentsById(schedulerId, newApptList);
//    }

    // add appointment(s)
    @PostMapping(path="/add")
    public List<Appointment> addNewAppointments (@RequestBody List<Appointment> newApptList) {
        return apptDao.addAppointments(newApptList);
    }

    // delete all appointments by schedulerId
    @DeleteMapping(path="/delete/{schedulerId}")
    public void deleteAppointments (@PathVariable int schedulerId) {
        apptDao.deleteAppointmentsById(schedulerId);
    }

    // delete specified appointment of a scheduler
    @DeleteMapping(path="/delete/{schedulerId}/{appointmentType}")
    public void deleteSpecificAppointment (@PathVariable int schedulerId, @PathVariable int appointmentType) {
        apptDao.deleteAppointmentByIdAndType(schedulerId, appointmentType);
    }
}
