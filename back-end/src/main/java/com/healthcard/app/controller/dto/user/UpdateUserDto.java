package com.healthcard.app.controller.dto.user;

import com.healthcard.app.validation.constraints.Date;
import com.healthcard.app.validation.constraints.Gender;
import jakarta.validation.constraints.*;

public record UpdateUserDto (
        @NotBlank(message = "Invalid name")
        String username,
        @Size(min = 8, max = 64, message = "The min and max size for password is 8 and 64")
        String password,
        @Email(message = "Invalid email")
        String email,
        @Pattern(regexp = "^(19|20)\\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$",
                message = "Birthdate must be in the format YYYY-MM-DD")
        @NotNull(message = "Invalid birthdate")
        @Date
        String birthdate,
        @Min(20)
        Float height,
        @Pattern(regexp = "^\\+?[0-9]{10,15}$", message = "Phone number must contain 10 to 15 digits and can start with +")
        String phone,
        @NotNull(message = "Invalid gender")
        @Gender
        String gender
){
}
