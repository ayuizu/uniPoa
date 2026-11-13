package com.healthcard.app.controller.dto.appointment;

import java.time.LocalDateTime;

public record GetAppointmentDto(
        Long id,
        String name,
        String address,
        LocalDateTime date,
        String doctorsName,
        String description,
        String reminders
) {
}
