package com.healthcard.app.service;

import com.healthcard.app.controller.dto.user.CreateUserDto;
import com.healthcard.app.controller.dto.user.GetUserDto;
import com.healthcard.app.controller.dto.user.UpdateUserDto;
import com.healthcard.app.entities.Role;
import com.healthcard.app.entities.User;
import com.healthcard.app.entities.enums.GenderEnum;
import com.healthcard.app.repository.RoleRepository;
import com.healthcard.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public void createUser (CreateUserDto dto) {
        var userFromDb = userRepository.findByEmail(dto.username());
        if (userFromDb.isPresent())
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY);

        var basicRole = roleRepository.findByName(Role.Values.BASIC.name());
        var user = new User();
        user.setUsername(dto.username());
        user.setPassword(passwordEncoder.encode(dto.password()));
        user.setEmail(dto.email());
        user.setBirthdate(LocalDate.parse(dto.birthdate()));
        user.setHeight(dto.height());
        user.setPhone(dto.phone());
        user.setGender(GenderEnum.valueOf(dto.gender()));
        user.setRoles(Set.of(basicRole));

        userRepository.save(user);
    }

    public GetUserDto getUser (JwtAuthenticationToken token) {
        UUID id = UUID.fromString(token.getName());
        var user = userRepository.findById(id).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        return new GetUserDto(
                user.getUsername(),
                user.getEmail(),
                user.getPassword(),
                user.getBirthdate(),
                user.getHeight(),
                user.getPhone(),
                user.getGender()
        );
    }

    public void updateUser (UpdateUserDto dto, JwtAuthenticationToken token) {
        UUID userToUpdateUuid = UUID.fromString(token.getName());
        var userToUpdate = userRepository.findById(userToUpdateUuid).orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

//        boolean loggedInUserIsAdmin = userToUpdate
//                .getRoles()
//                .stream()
//                .anyMatch(role -> role.getName().equalsIgnoreCase(Role.Values.ADMIN.name()));


            userToUpdate.setUsername(dto.username());
            userToUpdate.setPassword(passwordEncoder.encode(dto.password()));

            var userWithEmail = userRepository.findByEmail(dto.email());
            if (userWithEmail.isPresent() && !userWithEmail.get().getUserId().equals(userToUpdate.getUserId())) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Email is already in use");
            }

            userToUpdate.setEmail(dto.email());
            userToUpdate.setBirthdate(LocalDate.parse(dto.birthdate()));
            userToUpdate.setHeight(dto.height());
            userToUpdate.setPhone(dto.phone());
            userToUpdate.setGender(GenderEnum.valueOf(dto.gender()));
            userToUpdate.setUpdatedAt(Instant.now());
            userRepository.save(userToUpdate);
    }

    @Transactional
    public void deleteUser (JwtAuthenticationToken token) {
        UUID id = UUID.fromString(token.getName());
        var user = userRepository.findById(id).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        userRepository.delete(user);
    }

    public List<User> getAll () {
        return userRepository.findAll();
    }

}
