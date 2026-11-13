package com.healthcard.app.service;

import com.healthcard.app.controller.dto.symptom.CreateSymptomDto;
import com.healthcard.app.controller.dto.symptom.GetSymptomDto;
import com.healthcard.app.entities.Symptom;
import com.healthcard.app.entities.enums.SymptomIntensityEnum;
import com.healthcard.app.repository.SymptomRepository;
import com.healthcard.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class SymptomService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SymptomRepository symptomRepository;

    public void createSymptom (CreateSymptomDto dto, JwtAuthenticationToken token) {
        UUID userId = UUID.fromString(token.getName());
        var user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        var symptom = new Symptom();
        symptom.setUser(user);
        symptom.setName(dto.name());
        symptom.setDescription(dto.description());
        symptom.setIntensity(SymptomIntensityEnum.valueOf(dto.intensity()));
        symptom.setRegisterDate(LocalDateTime.parse(dto.registerDate()));
        symptomRepository.save(symptom);
    }

    public GetSymptomDto getSymptom (JwtAuthenticationToken token, Long symptomId) {
        var userId = UUID.fromString(token.getName());
        userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        var symptom = symptomRepository.findById(symptomId).orElseThrow(() ->
                new RuntimeException("Symptom not found"));
        if (!userId.equals(symptom.getUser().getUserId()))
            throw new RuntimeException("Forbidden");
        return new GetSymptomDto(
                symptom.getId(),
                symptom.getName(),
                symptom.getDescription(),
                symptom.getIntensity(),
                symptom.getRegisterDate()
        );
    }

    public List<GetSymptomDto> listSymptom (JwtAuthenticationToken token) {
        var userId = UUID.fromString(token.getName());
        var user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return symptomRepository.findAllByUser(user).stream().map(
                symptom -> new GetSymptomDto(
                        symptom.getId(),
                        symptom.getName(),
                        symptom.getDescription(),
                        symptom.getIntensity(),
                        symptom.getRegisterDate()
                )
        ).toList();
    }

    public void updateSymptom(CreateSymptomDto dto, JwtAuthenticationToken token, Long symptomId) {
        var userId = UUID.fromString(token.getName());
        userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        var updatedSymptom = symptomRepository.findById(symptomId).orElseThrow(() -> new RuntimeException("Symptom not found"));
        if (!userId.equals(updatedSymptom.getUser().getUserId()))
            throw new RuntimeException("Forbidden");
        updatedSymptom.setName(dto.name());
        updatedSymptom.setDescription(dto.description());
        updatedSymptom.setIntensity(SymptomIntensityEnum.valueOf(dto.intensity()));
        updatedSymptom.setRegisterDate(LocalDateTime.parse(dto.registerDate()));
        updatedSymptom.setUpdatedAt(Instant.now());
        symptomRepository.save(updatedSymptom);
    }

    public void deleteSymptom (JwtAuthenticationToken token, Long symptomId) {
        var userId = UUID.fromString(token.getName());
        userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        var toDeleteSymptom = symptomRepository.findById(symptomId).orElseThrow(() -> new RuntimeException("Symptom not found"));
        if (!userId.equals(toDeleteSymptom.getUser().getUserId()))
            throw new RuntimeException("Forbidden");
        symptomRepository.deleteById(symptomId);
    }
}
