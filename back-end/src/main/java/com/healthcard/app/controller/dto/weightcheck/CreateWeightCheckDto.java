package com.healthcard.app.controller.dto.weightcheck;

import com.healthcard.app.validation.constraints.Date;
import com.healthcard.app.validation.constraints.DateTime;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record CreateWeightCheckDto(
        @NotNull(message = "Weight is required")
        @Positive(message = "Weight must be greater than 0")
        @Max(value = 1000, message = "Weight must be less than 1000")
        Float weight,
        @NotBlank
        @DateTime
        String checkDate) {
}
