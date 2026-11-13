package com.healthcard.app.controller.dto.vaccine;

import com.healthcard.app.validation.constraints.Date;
import com.healthcard.app.validation.constraints.FrequencyUnit;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public record CreateVaccineDto(
        @NotBlank
        String name,
        String description,
        @Min(0)
        Double frequencyValue,
        @FrequencyUnit
        String frequencyUnit,
        @NotBlank
        @Date
        String applicationDate
) {
}
