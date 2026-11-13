package com.healthcard.app.controller;

import com.healthcard.app.controller.dto.medicine.CreateMedicineDto;
import com.healthcard.app.controller.dto.medicine.GetMedicineDto;
import com.healthcard.app.controller.dto.medicine.ListMedicineDto;
import com.healthcard.app.service.MedicineService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class MedicineController {
    @Autowired
    private MedicineService medicineService;

    @PostMapping("/user/medicine")
    public ResponseEntity<Void> createMedicine (@Valid @RequestBody CreateMedicineDto dto, JwtAuthenticationToken token) {
        try {
            medicineService.createMedicine(dto, token);
            return ResponseEntity.ok().build();
        } catch (Exception | Error e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @GetMapping("/user/medicine/{id}")
    public ResponseEntity<GetMedicineDto> getMedicine(JwtAuthenticationToken token, @PathVariable Long id) {
        try {
            var medicine = medicineService.getMedicine(token, id);
            return ResponseEntity.ok(medicine);
        } catch (Exception | Error e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @GetMapping("/user/medicine")
    public ResponseEntity<ListMedicineDto> getAllMedicines(JwtAuthenticationToken token) {
        try {
            var medicines = medicineService.listMedicine(token);
            return ResponseEntity.ok(new ListMedicineDto(medicines));
        } catch (Exception | Error e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @PutMapping("/user/medicine/{id}")
    public ResponseEntity<String> updateMedicine (@Valid @RequestBody CreateMedicineDto dto, JwtAuthenticationToken token, @PathVariable Long id) {
        try {
            medicineService.updateMedicine(dto, token, id);
            return ResponseEntity.ok().build();
        } catch (Exception | Error e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/user/medicine/{id}")
    public ResponseEntity<String> deleteMedicine (JwtAuthenticationToken token, @PathVariable Long id) {
        try {
            medicineService.deleteMedicine(token, id);
            return ResponseEntity.ok().build();
        } catch (Exception | Error e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
