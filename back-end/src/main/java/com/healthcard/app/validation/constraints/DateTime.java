package com.healthcard.app.validation.constraints;

import com.healthcard.app.validation.DateTimeValidation;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = DateTimeValidation.class)
@Target( { ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface DateTime {
    String message () default "Invalid date and time";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
