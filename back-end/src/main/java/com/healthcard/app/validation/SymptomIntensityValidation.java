package com.healthcard.app.validation;

import com.healthcard.app.entities.enums.SymptomIntensityEnum;
import com.healthcard.app.validation.constraints.SymptomIntensity;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class SymptomIntensityValidation implements ConstraintValidator<SymptomIntensity, String> {

    @Override
    public void initialize(SymptomIntensity constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String s, ConstraintValidatorContext constraintValidatorContext) {
        try {
            SymptomIntensityEnum validate = SymptomIntensityEnum.valueOf(s);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
