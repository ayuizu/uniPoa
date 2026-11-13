package com.healthcard.app.controller;

import com.healthcard.app.controller.dto.bloodpressure.CreateBloodPressureDto;
import com.healthcard.app.controller.dto.bloodpressure.GetBloodPressureDto;
import com.healthcard.app.controller.dto.bloodpressure.ListBloodPressureDto;
import com.healthcard.app.service.BloodPressureService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class BloodPressureController {
    @Autowired
    private BloodPressureService bloodPressureService;

    @PostMapping("/user/bloodPressure")
    public ResponseEntity<Void> createBloodPressure (@Valid @RequestBody CreateBloodPressureDto dto, JwtAuthenticationToken token) {
        bloodPressureService.createBloodPressure(dto, token);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/user/bloodPressure/{id}")
    public ResponseEntity<GetBloodPressureDto> getBloodPressure(JwtAuthenticationToken token, @PathVariable Long id) {
        try {
            var bloodPressure = bloodPressureService.getBloodPressure(token, id);
            return ResponseEntity.ok(bloodPressure);
        } catch (Exception | Error e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @GetMapping("/user/bloodPressure")
    public ResponseEntity<ListBloodPressureDto> getAllBloodPressures(JwtAuthenticationToken token) {
        try {
            var bloodPressures = bloodPressureService.listBloodPressure(token);
            return ResponseEntity.ok(new ListBloodPressureDto(bloodPressures));
        } catch (Exception | Error e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @PutMapping("/user/bloodPressure/{id}")
    public ResponseEntity<String> updateBloodPressure (@Valid @RequestBody CreateBloodPressureDto dto, JwtAuthenticationToken token, @PathVariable Long id) {
        try {
            bloodPressureService.updateBloodPressure(dto, token, id);
            return ResponseEntity.ok().build();
        } catch (Exception | Error e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/user/bloodPressure/{id}")
    public ResponseEntity<String> deleteBloodPressure (JwtAuthenticationToken token, @PathVariable Long id) {
        try {
            bloodPressureService.deleteBloodPressure(token, id);
            return ResponseEntity.ok().build();
        } catch (Exception | Error e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
