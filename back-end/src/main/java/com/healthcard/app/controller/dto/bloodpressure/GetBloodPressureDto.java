package com.healthcard.app.controller.dto.bloodpressure;

import java.time.LocalDateTime;

public record GetBloodPressureDto(
        Long id,
        Integer systolicPressure,
        Integer diastolicPressure,
        Integer heartRate,
        LocalDateTime checkTime
) {
}
