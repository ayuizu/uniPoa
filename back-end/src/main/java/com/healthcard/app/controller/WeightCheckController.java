package com.healthcard.app.controller;

import com.healthcard.app.controller.dto.weightcheck.CreateWeightCheckDto;
import com.healthcard.app.controller.dto.weightcheck.GetWeightCheckDto;
import com.healthcard.app.controller.dto.weightcheck.ListWeightCheckDto;
import com.healthcard.app.service.WeightCheckService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class WeightCheckController {

    @Autowired
    private WeightCheckService weightCheckService;

    @PostMapping("/user/weight-check")
    public ResponseEntity<Void> createWeightCheck (@Valid @RequestBody CreateWeightCheckDto dto, JwtAuthenticationToken token) {
        weightCheckService.createWeightCheck(dto, token);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/user/weight-check/{id}")
    public ResponseEntity<GetWeightCheckDto> getWeightCheck(JwtAuthenticationToken token, @PathVariable Long id) {
        try {
            var weightCheck = weightCheckService.getWeightCheck(token, id);
            return ResponseEntity.ok(weightCheck);
        } catch (Exception | Error e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @GetMapping("/user/weight-check")
    public ResponseEntity<ListWeightCheckDto> getAllWeightChecks(JwtAuthenticationToken token) {
        try {
            var weightChecks = weightCheckService.listWeightCheck(token);
            return ResponseEntity.ok(new ListWeightCheckDto(weightChecks));
        } catch (Exception | Error e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @PutMapping("/user/weight-check/{id}")
    public ResponseEntity<String> updateWeightCheck (@Valid @RequestBody CreateWeightCheckDto dto, JwtAuthenticationToken token, @PathVariable Long id) {
        try {
            weightCheckService.updateWeightCheck(dto, token, id);
            return ResponseEntity.ok().build();
        } catch (Exception | Error e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/user/weight-check/{id}")
    public ResponseEntity<String> deleteWeightCheck (JwtAuthenticationToken token, @PathVariable Long id) {
        try {
            weightCheckService.deleteWeightCheck(token, id);
            return ResponseEntity.ok().build();
        } catch (Exception | Error e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }


}
