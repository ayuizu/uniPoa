package com.healthcard.app.service;

import com.healthcard.app.controller.dto.appointment.CreateAppointmentDto;
import com.healthcard.app.controller.dto.appointment.GetAppointmentDto;
import com.healthcard.app.entities.Appointment;
import com.healthcard.app.repository.AppointmentRepository;
import com.healthcard.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class AppointmentService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    AppointmentRepository appointmentRepository;

    public void createAppointment (CreateAppointmentDto dto, JwtAuthenticationToken token) {
        UUID userId = UUID.fromString(token.getName());
        var user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        var appointment = new Appointment();
        appointment.setUser(user);
        appointment.setName(dto.name());
        appointment.setAddress(dto.address());
        appointment.setDate(LocalDateTime.parse(dto.date()));
        appointment.setDoctorsName(dto.doctorsName());
        appointment.setDescription(dto.description());
        appointment.setReminders(dto.reminders());
        appointmentRepository.save(appointment);
    }

    public GetAppointmentDto getAppointment (JwtAuthenticationToken token, Long appointmentId) {
        var userId = UUID.fromString(token.getName());
        userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        var appointment = appointmentRepository.findById(appointmentId).orElseThrow(() ->
                new RuntimeException("Appointment not found"));
        if (!userId.equals(appointment.getUser().getUserId()))
            throw new RuntimeException("Forbidden");
        return new GetAppointmentDto(
                appointment.getId(),
                appointment.getName(),
                appointment.getAddress(),
                appointment.getDate(),
                appointment.getDoctorsName(),
                appointment.getDescription(),
                appointment.getReminders()
        );
    }

    public List<GetAppointmentDto> listAppointment (JwtAuthenticationToken token) {
        var userId = UUID.fromString(token.getName());
        var user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return appointmentRepository.findAllByUser(user).stream().map(
                appointment -> new GetAppointmentDto(
                        appointment.getId(),
                        appointment.getName(),
                        appointment.getAddress(),
                        appointment.getDate(),
                        appointment.getDoctorsName(),
                        appointment.getDescription(),
                        appointment.getReminders()
                )
        ).toList();
    }

    public void updateAppointment(CreateAppointmentDto dto, JwtAuthenticationToken token, Long appointmentId) {
        var userId = UUID.fromString(token.getName());
        userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        var updatedAppointment = appointmentRepository.findById(appointmentId).orElseThrow(() -> new RuntimeException("Appointment not found"));
        if (!userId.equals(updatedAppointment.getUser().getUserId()))
            throw new RuntimeException("Forbidden");
        updatedAppointment.setName(dto.name());
        updatedAppointment.setAddress(dto.address());
        updatedAppointment.setDate(LocalDateTime.parse(dto.date()));
        updatedAppointment.setDoctorsName(dto.doctorsName());
        updatedAppointment.setDescription(dto.description());
        updatedAppointment.setReminders(dto.reminders());
        updatedAppointment.setUpdatedAt(Instant.now());
        appointmentRepository.save(updatedAppointment);
    }

    public void deleteAppointment (JwtAuthenticationToken token, Long appointmentId) {
        var userId = UUID.fromString(token.getName());
        userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        var toDeleteAppointment = appointmentRepository.findById(appointmentId).orElseThrow(() -> new RuntimeException("Appointment not found"));
        if (!userId.equals(toDeleteAppointment.getUser().getUserId()))
            throw new RuntimeException("Forbidden");
        appointmentRepository.deleteById(appointmentId);
    }
}
