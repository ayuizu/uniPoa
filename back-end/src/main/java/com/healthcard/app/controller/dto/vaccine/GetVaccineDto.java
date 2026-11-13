package com.healthcard.app.controller.dto.vaccine;

import com.healthcard.app.entities.enums.FrequencyUnitEnum;

import java.time.LocalDate;

public record GetVaccineDto (
        Long id,
        String name,
        String description,
        Double frequencyValue,
        FrequencyUnitEnum frequencyUnit,
        LocalDate applicationDate
){
}
