package com.healthcard.app.controller.dto.weightcheck;

public record GetWeightCheckDto(Float weight, java.time.LocalDateTime checkDate, Long id) {
}
