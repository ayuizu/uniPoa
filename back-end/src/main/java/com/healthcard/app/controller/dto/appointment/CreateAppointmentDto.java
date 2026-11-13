package com.healthcard.app.controller.dto.appointment;

import com.healthcard.app.validation.constraints.DateTime;
import jakarta.validation.constraints.NotBlank;

public record CreateAppointmentDto(
        @NotBlank
        String address,
        @DateTime
        String date,
        @NotBlank
        String name,
        String doctorsName,
        String description,
        String reminders
) {
}
