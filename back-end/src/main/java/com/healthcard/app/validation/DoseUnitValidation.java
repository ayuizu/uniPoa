package com.healthcard.app.validation;

import com.healthcard.app.entities.enums.DoseUnitEnum;
import com.healthcard.app.validation.constraints.DoseUnit;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class DoseUnitValidation implements ConstraintValidator<DoseUnit, String> {

    @Override
    public void initialize(DoseUnit constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String s, ConstraintValidatorContext constraintValidatorContext) {
        try {
            DoseUnitEnum.valueOf(s);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
