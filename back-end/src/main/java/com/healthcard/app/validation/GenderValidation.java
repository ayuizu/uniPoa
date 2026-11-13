package com.healthcard.app.validation;

import com.healthcard.app.entities.enums.GenderEnum;
import com.healthcard.app.validation.constraints.Gender;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class GenderValidation implements ConstraintValidator<Gender, String> {
    @Override
    public void initialize(Gender constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String s, ConstraintValidatorContext constraintValidatorContext) {
        try {
            GenderEnum.valueOf(s);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
