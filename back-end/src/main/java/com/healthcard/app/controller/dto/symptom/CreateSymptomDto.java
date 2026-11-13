package com.healthcard.app.controller.dto.symptom;

import com.healthcard.app.validation.constraints.DateTime;
import com.healthcard.app.validation.constraints.SymptomIntensity;
import jakarta.validation.constraints.NotBlank;


public record CreateSymptomDto(
        @NotBlank
        String name,
        @SymptomIntensity
        @NotBlank
        String intensity,
        String description,
        @NotBlank
        @DateTime
        String registerDate
) {
}
