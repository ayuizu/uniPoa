package com.healthcard.app.controller.dto.bloodpressure;

import com.healthcard.app.validation.constraints.DateTime;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record CreateBloodPressureDto(
        @NotNull(message = "Field cannot be null")
        @Positive
        @Max(300)
        Integer systolicPressure,
        @NotNull(message = "Field cannot be null")
        @Positive
        @Max(300)
        Integer diastolicPressure,
        @NotNull(message = "Field cannot be null")
        @Positive
        @Max(300)
        Integer heartRate,
        @NotBlank
        @DateTime
        String checkTime
) {
}
