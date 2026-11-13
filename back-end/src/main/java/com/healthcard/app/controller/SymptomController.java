package com.healthcard.app.controller;

import com.healthcard.app.controller.dto.symptom.CreateSymptomDto;
import com.healthcard.app.controller.dto.symptom.GetSymptomDto;
import com.healthcard.app.controller.dto.symptom.ListSymptomDto;
import com.healthcard.app.service.SymptomService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class SymptomController {

    @Autowired
    private SymptomService symptomService;

    @PostMapping("/user/symptom")
    public ResponseEntity<Void> createSymptom (@Valid @RequestBody CreateSymptomDto dto, JwtAuthenticationToken token) {
        symptomService.createSymptom(dto, token);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/user/symptom/{id}")
    public ResponseEntity<GetSymptomDto> getSymptom(JwtAuthenticationToken token, @PathVariable Long id) {
        try {
            var symptom = symptomService.getSymptom(token, id);
            return ResponseEntity.ok(symptom);
        } catch (Exception | Error e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @GetMapping("/user/symptom")
    public ResponseEntity<ListSymptomDto> getAllSymptoms(JwtAuthenticationToken token) {
        try {
            var symptoms = symptomService.listSymptom(token);
            return ResponseEntity.ok(new ListSymptomDto(symptoms));
        } catch (Exception | Error e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @PutMapping("/user/symptom/{id}")
    public ResponseEntity<String> updateSymptom (@Valid @RequestBody CreateSymptomDto dto, JwtAuthenticationToken token, @PathVariable Long id) {
        try {
            symptomService.updateSymptom(dto, token, id);
            return ResponseEntity.ok().build();
        } catch (Exception | Error e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/user/symptom/{id}")
    public ResponseEntity<String> deleteSymptom (JwtAuthenticationToken token, @PathVariable Long id) {
        try {
            symptomService.deleteSymptom(token, id);
            return ResponseEntity.ok().build();
        } catch (Exception | Error e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }


}
