package com.healthcard.app.service;

import com.healthcard.app.controller.dto.bloodpressure.CreateBloodPressureDto;
import com.healthcard.app.controller.dto.bloodpressure.GetBloodPressureDto;
import com.healthcard.app.entities.BloodPressure;
import com.healthcard.app.repository.BloodPressureRepository;
import com.healthcard.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class BloodPressureService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    BloodPressureRepository bloodPressureRepository;

    public void createBloodPressure (CreateBloodPressureDto dto, JwtAuthenticationToken token) {
        UUID userId = UUID.fromString(token.getName());
        var user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        var bloodPressure = new BloodPressure();
        bloodPressure.setUser(user);
        bloodPressure.setSystolicPressure(dto.systolicPressure());
        bloodPressure.setDiastolicPressure(dto.diastolicPressure());
        bloodPressure.setHeartRate(dto.heartRate());
        bloodPressure.setCheckTime(LocalDateTime.parse(dto.checkTime()));
        bloodPressureRepository.save(bloodPressure);
    }

    public GetBloodPressureDto getBloodPressure (JwtAuthenticationToken token, Long bloodPressureId) {
        var userId = UUID.fromString(token.getName());
        userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        var bloodPressure = bloodPressureRepository.findById(bloodPressureId).orElseThrow(() ->
                new RuntimeException("Blood pressure not found"));
        if (!userId.equals(bloodPressure.getUser().getUserId()))
            throw new RuntimeException("Forbidden");
        return new GetBloodPressureDto(
                bloodPressure.getId(),
                bloodPressure.getSystolicPressure(),
                bloodPressure.getDiastolicPressure(),
                bloodPressure.getHeartRate(),
                bloodPressure.getCheckTime()
        );
    }

    public List<GetBloodPressureDto> listBloodPressure (JwtAuthenticationToken token) {
        var userId = UUID.fromString(token.getName());
        var user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return bloodPressureRepository.findAllByUser(user).stream().map(
                bloodPressure -> new GetBloodPressureDto(
                        bloodPressure.getId(),
                        bloodPressure.getSystolicPressure(),
                        bloodPressure.getDiastolicPressure(),
                        bloodPressure.getHeartRate(),
                        bloodPressure.getCheckTime()
                )
        ).toList();
    }

    public void updateBloodPressure(CreateBloodPressureDto dto, JwtAuthenticationToken token, Long bloodPressureId) {
        var userId = UUID.fromString(token.getName());
        userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        var updatedBloodPressure = bloodPressureRepository.findById(bloodPressureId).orElseThrow(() -> new RuntimeException("Blood Pressure not found"));
        if (!userId.equals(updatedBloodPressure.getUser().getUserId()))
            throw new RuntimeException("Forbidden");
        updatedBloodPressure.setSystolicPressure(dto.systolicPressure());
        updatedBloodPressure.setDiastolicPressure(dto.diastolicPressure());
        updatedBloodPressure.setHeartRate(dto.heartRate());
        updatedBloodPressure.setCheckTime(LocalDateTime.parse(dto.checkTime()));
        updatedBloodPressure.setUpdatedAt(Instant.now());
        bloodPressureRepository.save(updatedBloodPressure);
    }

    public void deleteBloodPressure (JwtAuthenticationToken token, Long bloodPressureId) {
        var userId = UUID.fromString(token.getName());
        userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        var toDeleteBloodPressure = bloodPressureRepository.findById(bloodPressureId).orElseThrow(() -> new RuntimeException("Blood Pressure not found"));
        if (!userId.equals(toDeleteBloodPressure.getUser().getUserId()))
            throw new RuntimeException("Forbidden");
        bloodPressureRepository.deleteById(bloodPressureId);
    }
}
