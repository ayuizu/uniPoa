package com.healthcard.app.repository;

import com.healthcard.app.entities.Medicine;
import com.healthcard.app.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MedicineRepository extends JpaRepository<Medicine, Long> {
    List<Medicine> findAllByUser(User user);
}
