package com.healthcard.app.validation.constraints;

import com.healthcard.app.validation.FrequencyUnitValidation;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = FrequencyUnitValidation.class)
@Target( { ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface FrequencyUnit {
    String message () default "Invalid frequency unit";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
