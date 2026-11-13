package com.healthcard.app.controller;

import com.healthcard.app.controller.dto.appointment.CreateAppointmentDto;
import com.healthcard.app.controller.dto.appointment.GetAppointmentDto;
import com.healthcard.app.controller.dto.appointment.ListAppointmentDto;
import com.healthcard.app.service.AppointmentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class AppointmentController {
    @Autowired
    private AppointmentService appointmentService;

    @PostMapping("/user/appointment")
    public ResponseEntity<Void> createAppointment (@Valid @RequestBody CreateAppointmentDto dto, JwtAuthenticationToken token) {
        appointmentService.createAppointment(dto, token);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/user/appointment/{id}")
    public ResponseEntity<GetAppointmentDto> getAppointment(JwtAuthenticationToken token, @PathVariable Long id) {
        try {
            var appointment = appointmentService.getAppointment(token, id);
            return ResponseEntity.ok(appointment);
        } catch (Exception | Error e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @GetMapping("/user/appointment")
    public ResponseEntity<ListAppointmentDto> getAllAppointments(JwtAuthenticationToken token) {
        try {
            var appointments = appointmentService.listAppointment(token);
            return ResponseEntity.ok(new ListAppointmentDto(appointments));
        } catch (Exception | Error e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @PutMapping("/user/appointment/{id}")
    public ResponseEntity<String> updateAppointment (@Valid @RequestBody CreateAppointmentDto dto, JwtAuthenticationToken token, @PathVariable Long id) {
        try {
            appointmentService.updateAppointment(dto, token, id);
            return ResponseEntity.ok().build();
        } catch (Exception | Error e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/user/appointment/{id}")
    public ResponseEntity<String> deleteAppointment (JwtAuthenticationToken token, @PathVariable Long id) {
        try {
            appointmentService.deleteAppointment(token, id);
            return ResponseEntity.ok().build();
        } catch (Exception | Error e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
