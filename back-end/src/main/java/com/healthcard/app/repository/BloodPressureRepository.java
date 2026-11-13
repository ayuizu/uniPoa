package com.healthcard.app.repository;

import com.healthcard.app.entities.BloodPressure;
import com.healthcard.app.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BloodPressureRepository extends JpaRepository<BloodPressure, Long> {
    List<BloodPressure> findAllByUser(User user);
}
