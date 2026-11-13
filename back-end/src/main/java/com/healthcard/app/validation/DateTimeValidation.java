package com.healthcard.app.validation;

import com.healthcard.app.validation.constraints.DateTime;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.time.LocalDateTime;

public class DateTimeValidation implements ConstraintValidator<DateTime, String> {
    @Override
    public void initialize(DateTime constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String s, ConstraintValidatorContext constraintValidatorContext) {
        try {
            LocalDateTime validate = LocalDateTime.parse(s);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
