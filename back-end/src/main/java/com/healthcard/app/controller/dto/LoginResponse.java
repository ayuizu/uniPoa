package com.healthcard.app.controller.dto;

public record LoginResponse(String accessToken, Long expiresIn) {
}
