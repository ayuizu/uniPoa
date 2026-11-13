package com.healthcard.app.controller;

import com.healthcard.app.controller.dto.user.CreateUserDto;
import com.healthcard.app.controller.dto.user.GetUserDto;
import com.healthcard.app.controller.dto.user.UpdateUserDto;
import com.healthcard.app.entities.User;
import com.healthcard.app.repository.UserRepository;
import com.healthcard.app.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;

    @Transactional
    @PostMapping("/register")
    public ResponseEntity<String> createUser(@Valid @RequestBody CreateUserDto dto) {
        try {
            userService.createUser(dto);
            return ResponseEntity.ok().build();
        } catch (Exception | Error e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/user")
    public ResponseEntity<GetUserDto> getUser(JwtAuthenticationToken token) {
        return ResponseEntity.ok(userService.getUser(token));
    }

    @PutMapping("/user")
    public ResponseEntity<String> updateUser(@Valid @RequestBody UpdateUserDto dto, JwtAuthenticationToken token) {
        try {
            userService.updateUser(dto, token);
            return ResponseEntity.ok().build();
        } catch (Exception | Error e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/user")
    public ResponseEntity<String> deleteUser(JwtAuthenticationToken token) {
        try {
            userService.deleteUser(token);
            return ResponseEntity.ok().build();
        } catch (Exception | Error e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    @GetMapping("/users")
    public ResponseEntity<List<User>> listUsers() {
        return ResponseEntity.ok(userService.getAll());
    }
}
