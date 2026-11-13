package com.healthcard.app.controller.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record LoginRequest (
        @Email(message = "Invalid credentials")
        String email,
        @NotBlank(message = "Invalid credentials")
        String password){
}
