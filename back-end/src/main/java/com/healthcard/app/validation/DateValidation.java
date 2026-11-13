package com.healthcard.app.validation;

import com.healthcard.app.validation.constraints.Date;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.time.LocalDate;

public class DateValidation implements ConstraintValidator<Date, String> {
    @Override
    public void initialize(Date constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String s, ConstraintValidatorContext constraintValidatorContext) {
        try {
            LocalDate validate = LocalDate.parse(s);
            return true;
        } catch (Exception e) {
            return false;
        }

    }
}
