package com.healthcard.app.validation;

import com.healthcard.app.entities.enums.FrequencyUnitEnum;
import com.healthcard.app.validation.constraints.FrequencyUnit;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class FrequencyUnitValidation implements ConstraintValidator<FrequencyUnit, String> {
    @Override
    public void initialize(FrequencyUnit constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String s, ConstraintValidatorContext constraintValidatorContext) {
        try {
            FrequencyUnitEnum.valueOf(s);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
