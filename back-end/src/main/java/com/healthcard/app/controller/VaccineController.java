package com.healthcard.app.controller;

import com.healthcard.app.controller.dto.vaccine.CreateVaccineDto;
import com.healthcard.app.controller.dto.vaccine.GetVaccineDto;
import com.healthcard.app.controller.dto.vaccine.ListVaccineDto;
import com.healthcard.app.service.VaccineService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class VaccineController {
    @Autowired
    private VaccineService vaccineService;

    @PostMapping("/user/vaccine")
    public ResponseEntity<Void> createVaccine (@Valid @RequestBody CreateVaccineDto dto, JwtAuthenticationToken token) {
        vaccineService.createVaccine(dto, token);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/user/vaccine/{id}")
    public ResponseEntity<GetVaccineDto> getVaccine(JwtAuthenticationToken token, @PathVariable Long id) {
        try {
            var vaccine = vaccineService.getVaccine(token, id);
            return ResponseEntity.ok(vaccine);
        } catch (Exception | Error e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @GetMapping("/user/vaccine")
    public ResponseEntity<ListVaccineDto> getAllVaccines(JwtAuthenticationToken token) {
        try {
            var vaccines = vaccineService.listVaccine(token);
            return ResponseEntity.ok(new ListVaccineDto(vaccines));
        } catch (Exception | Error e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @PutMapping("/user/vaccine/{id}")
    public ResponseEntity<String> updateVaccine (@Valid @RequestBody CreateVaccineDto dto, JwtAuthenticationToken token, @PathVariable Long id) {
        try {
            vaccineService.updateVaccine(dto, token, id);
            return ResponseEntity.ok().build();
        } catch (Exception | Error e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/user/vaccine/{id}")
    public ResponseEntity<String> deleteVaccine (JwtAuthenticationToken token, @PathVariable Long id) {
        try {
            vaccineService.deleteVaccine(token, id);
            return ResponseEntity.ok().build();
        } catch (Exception | Error e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
