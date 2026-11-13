package com.healthcard.app.service;

import com.healthcard.app.controller.dto.medicine.CreateMedicineDto;
import com.healthcard.app.controller.dto.medicine.GetMedicineDto;
import com.healthcard.app.entities.Medicine;
import com.healthcard.app.entities.enums.DoseUnitEnum;
import com.healthcard.app.entities.enums.FrequencyUnitEnum;
import com.healthcard.app.repository.MedicineRepository;
import com.healthcard.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class MedicineService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MedicineRepository medicineRepository;

    public void createMedicine (CreateMedicineDto dto, JwtAuthenticationToken token) {
        UUID userId = UUID.fromString(token.getName());
        var user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        var medicine = new Medicine();
        medicine.setUser(user);
        medicine.setName(dto.name());
        medicine.setDescription(dto.description());
        medicine.setFrequencyValue(dto.frequencyValue());
        medicine.setFrequencyUnit(FrequencyUnitEnum.valueOf(dto.frequencyUnit()));
        medicine.setDoseValue(dto.doseValue());
        medicine.setDoseUnit(DoseUnitEnum.valueOf(dto.doseUnit()));
        medicine.setStartDate(LocalDateTime.parse(dto.startDate()));
        var endDate = dto.endDate();
        if (endDate != null && !endDate.isEmpty())
            try {
                medicine.setEndDate(LocalDateTime.parse(endDate));
            } catch (Exception e) {
                throw new RuntimeException("Bad Request");
            }
        medicineRepository.save(medicine);
    }

    public GetMedicineDto getMedicine (JwtAuthenticationToken token, Long medicineId) {
        var userId = UUID.fromString(token.getName());
        userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        var medicine = medicineRepository.findById(medicineId).orElseThrow(() ->
                new RuntimeException("Medicine not found"));
        if (!userId.equals(medicine.getUser().getUserId()))
            throw new RuntimeException("Forbidden");
        return new GetMedicineDto(
                medicine.getId(),
                medicine.getName(),
                medicine.getDescription(),
                medicine.getFrequencyValue(),
                medicine.getFrequencyUnit(),
                medicine.getDoseValue(),
                medicine.getDoseUnit(),
                medicine.getStartDate(),
                medicine.getEndDate()
        );
    }

    public List<GetMedicineDto> listMedicine (JwtAuthenticationToken token) {
        var userId = UUID.fromString(token.getName());
        var user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return medicineRepository.findAllByUser(user).stream().map(
                medicine -> new GetMedicineDto(
                        medicine.getId(),
                        medicine.getName(),
                        medicine.getDescription(),
                        medicine.getFrequencyValue(),
                        medicine.getFrequencyUnit(),
                        medicine.getDoseValue(),
                        medicine.getDoseUnit(),
                        medicine.getStartDate(),
                        medicine.getEndDate()
                )
        ).toList();
    }

    public void updateMedicine(CreateMedicineDto dto, JwtAuthenticationToken token, Long medicineId) {
        var userId = UUID.fromString(token.getName());
        userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        var updatedMedicine = medicineRepository.findById(medicineId).orElseThrow(() -> new RuntimeException("Medicine not found"));
        if (!userId.equals(updatedMedicine.getUser().getUserId()))
            throw new RuntimeException("Forbidden");
        updatedMedicine.setName(dto.name());
        updatedMedicine.setDescription(dto.description());
        updatedMedicine.setFrequencyValue(dto.frequencyValue());
        updatedMedicine.setFrequencyUnit(FrequencyUnitEnum.valueOf(dto.frequencyUnit()));
        updatedMedicine.setDoseValue(dto.doseValue());
        updatedMedicine.setDoseUnit(DoseUnitEnum.valueOf(dto.doseUnit()));
        updatedMedicine.setStartDate(LocalDateTime.parse(dto.startDate()));
        updatedMedicine.setEndDate(LocalDateTime.parse(dto.endDate()));;
        updatedMedicine.setUpdatedAt(Instant.now());
        medicineRepository.save(updatedMedicine);
    }

    public void deleteMedicine (JwtAuthenticationToken token, Long medicineId) {
        var userId = UUID.fromString(token.getName());
        userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        var toDeleteMedicine = medicineRepository.findById(medicineId).orElseThrow(() -> new RuntimeException("Medicine not found"));
        if (!userId.equals(toDeleteMedicine.getUser().getUserId()))
            throw new RuntimeException("Forbidden");
        medicineRepository.deleteById(medicineId);
    }
}
