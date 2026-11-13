package com.healthcard.app.validation.constraints;

import com.healthcard.app.validation.UniqueEmailValidation;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = UniqueEmailValidation.class)
@Target( { ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface UniqueEmail {
    String message () default "Email already taken";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
