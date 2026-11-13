package com.healthcard.app.controller.dto.medicine;

import com.healthcard.app.entities.enums.DoseUnitEnum;
import com.healthcard.app.entities.enums.FrequencyUnitEnum;

import java.time.LocalDateTime;

public record GetMedicineDto(
        Long id,
        String name,
        String description,
        Double frequencyValue,
        FrequencyUnitEnum frequencyUnit,
        Double doseValue,
        DoseUnitEnum doseUnit,
        LocalDateTime startDate,
        LocalDateTime endDate

) {
}
