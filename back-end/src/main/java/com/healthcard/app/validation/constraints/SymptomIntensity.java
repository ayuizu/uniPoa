package com.healthcard.app.validation.constraints;

import com.healthcard.app.validation.SymptomIntensityValidation;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = SymptomIntensityValidation.class)
@Target( { ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface SymptomIntensity {
    String message () default "Invalid symptom intensity";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
