package com.healthcard.app.controller.dto.medicine;

import com.healthcard.app.validation.constraints.DateTime;
import com.healthcard.app.validation.constraints.DoseUnit;
import com.healthcard.app.validation.constraints.FrequencyUnit;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public record CreateMedicineDto (
    @NotBlank
    String name,
    String description,
    @Min(0)
    Double frequencyValue,
    @FrequencyUnit
    String frequencyUnit,
    @Min(0)
    Double doseValue,
    @DoseUnit
    String doseUnit,
    @NotBlank
    @DateTime()
    String startDate,
    String endDate){}
