package com.healthcard.app.service;

import com.healthcard.app.controller.dto.weightcheck.CreateWeightCheckDto;
import com.healthcard.app.controller.dto.weightcheck.GetWeightCheckDto;
import com.healthcard.app.entities.WeightCheck;
import com.healthcard.app.repository.UserRepository;
import com.healthcard.app.repository.WeightCheckRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class WeightCheckService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private WeightCheckRepository weightCheckRepository;

    public void createWeightCheck (CreateWeightCheckDto dto, JwtAuthenticationToken token) {
        UUID userId = UUID.fromString(token.getName());
        var user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        var weightCheck = new WeightCheck();
        weightCheck.setUser(user);
        weightCheck.setWeight(dto.weight());
        weightCheck.setRegisterDate(LocalDateTime.parse(dto.checkDate()));
        weightCheckRepository.save(weightCheck);
    }

    public GetWeightCheckDto getWeightCheck (JwtAuthenticationToken token, Long weightCheckId) {
        var userId = UUID.fromString(token.getName());
        userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        var weightCheck = weightCheckRepository.findById(weightCheckId).orElseThrow(() ->
                new RuntimeException("Weight Check not found"));
        if (!userId.equals(weightCheck.getUser().getUserId()))
            throw new RuntimeException("Forbidden");
        return new GetWeightCheckDto(
                weightCheck.getWeight(),
                weightCheck.getRegisterDate(),
                weightCheck.getId()
        );
    }

    public List<GetWeightCheckDto> listWeightCheck (JwtAuthenticationToken token) {
        var userId = UUID.fromString(token.getName());
        var user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return weightCheckRepository.findAllByUser(user).stream().map(
                weightCheck -> new GetWeightCheckDto(
                        weightCheck.getWeight(),
                        weightCheck.getRegisterDate(),
                        weightCheck.getId()
                )
        ).toList();
    }

    public void updateWeightCheck(CreateWeightCheckDto dto, JwtAuthenticationToken token, Long weightCheckId) {
        var userId = UUID.fromString(token.getName());
        userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        var updatedWeightCheck = weightCheckRepository.findById(weightCheckId).orElseThrow(() -> new RuntimeException("Weight check not found"));
        if (!userId.equals(updatedWeightCheck.getUser().getUserId()))
            throw new RuntimeException("Forbidden");
        updatedWeightCheck.setWeight(dto.weight());
        updatedWeightCheck.setRegisterDate(LocalDateTime.parse(dto.checkDate()));
        updatedWeightCheck.setUpdatedAt(Instant.now());
        weightCheckRepository.save(updatedWeightCheck);
    }

    public void deleteWeightCheck (JwtAuthenticationToken token, Long weightCheckId) {
        var userId = UUID.fromString(token.getName());
        userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        var toDeleteWeightCheck = weightCheckRepository.findById(weightCheckId).orElseThrow(() -> new RuntimeException("Weight check not found"));
        if (!userId.equals(toDeleteWeightCheck.getUser().getUserId()))
            throw new RuntimeException("Forbidden");
        weightCheckRepository.deleteById(weightCheckId);
    }
}
