package com.healthcard.app.validation.constraints;

import com.healthcard.app.validation.DoseUnitValidation;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = DoseUnitValidation.class)
@Target( { ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface DoseUnit {
    String message () default "Invalid dose unit";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
