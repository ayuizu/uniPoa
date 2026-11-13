package com.healthcard.app.controller.dto.symptom;

import com.healthcard.app.entities.enums.SymptomIntensityEnum;

import java.time.LocalDateTime;

public record GetSymptomDto(
        Long id,
        String name,
        String description,
        SymptomIntensityEnum intensity,
        LocalDateTime registerDate

) {
}
