package com.healthcard.app.service;

import com.healthcard.app.controller.dto.vaccine.CreateVaccineDto;
import com.healthcard.app.controller.dto.vaccine.GetVaccineDto;
import com.healthcard.app.entities.Vaccine;
import com.healthcard.app.entities.enums.DoseUnitEnum;
import com.healthcard.app.entities.enums.FrequencyUnitEnum;
import com.healthcard.app.repository.UserRepository;
import com.healthcard.app.repository.VaccineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class VaccineService {
    @Autowired
    private VaccineRepository vaccineRepository;
    @Autowired
    private UserRepository userRepository;

    public void createVaccine (CreateVaccineDto dto, JwtAuthenticationToken token) {
        UUID userId = UUID.fromString(token.getName());
        var user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        var vaccine = new Vaccine();
        vaccine.setUser(user);
        vaccine.setName(dto.name());
        vaccine.setDescription(dto.description());
        vaccine.setFrequencyValue(dto.frequencyValue());
        vaccine.setFrequencyUnit(FrequencyUnitEnum.valueOf(dto.frequencyUnit()));
        vaccine.setApplicationDate(LocalDate.parse(dto.applicationDate()));
        vaccineRepository.save(vaccine);
    }

    public GetVaccineDto getVaccine (JwtAuthenticationToken token, Long vaccineId) {
        var userId = UUID.fromString(token.getName());
        userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        var vaccine = vaccineRepository.findById(vaccineId).orElseThrow(() ->
                new RuntimeException("Vaccine not found"));
        if (!userId.equals(vaccine.getUser().getUserId()))
            throw new RuntimeException("Forbidden");
        return new GetVaccineDto(
                vaccine.getId(),
                vaccine.getName(),
                vaccine.getDescription(),
                vaccine.getFrequencyValue(),
                vaccine.getFrequencyUnit(),
                vaccine.getApplicationDate()
        );
    }

    public List<GetVaccineDto> listVaccine (JwtAuthenticationToken token) {
        var userId = UUID.fromString(token.getName());
        var user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return vaccineRepository.findAllByUser(user).stream().map(
                vaccine -> new GetVaccineDto(
                        vaccine.getId(),
                        vaccine.getName(),
                        vaccine.getDescription(),
                        vaccine.getFrequencyValue(),
                        vaccine.getFrequencyUnit(),
                        vaccine.getApplicationDate()
                )
        ).toList();
    }

    public void updateVaccine(CreateVaccineDto dto, JwtAuthenticationToken token, Long vaccineId) {
        var userId = UUID.fromString(token.getName());
        userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        var updatedVaccine = vaccineRepository.findById(vaccineId).orElseThrow(() -> new RuntimeException("Vaccine not found"));
        if (!userId.equals(updatedVaccine.getUser().getUserId()))
            throw new RuntimeException("Forbidden");
        updatedVaccine.setName(dto.name());
        updatedVaccine.setDescription(dto.description());
        updatedVaccine.setFrequencyValue(dto.frequencyValue());
        updatedVaccine.setFrequencyUnit(FrequencyUnitEnum.valueOf(dto.frequencyUnit()));
        updatedVaccine.setApplicationDate(LocalDate.parse(dto.applicationDate()));
        updatedVaccine.setUpdatedAt(Instant.now());
        vaccineRepository.save(updatedVaccine);
    }

    public void deleteVaccine (JwtAuthenticationToken token, Long vaccineId) {
        var userId = UUID.fromString(token.getName());
        userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        var toDeleteVaccine = vaccineRepository.findById(vaccineId).orElseThrow(() -> new RuntimeException("Vaccine not found"));
        if (!userId.equals(toDeleteVaccine.getUser().getUserId()))
            throw new RuntimeException("Forbidden");
        vaccineRepository.deleteById(vaccineId);
    }
}
