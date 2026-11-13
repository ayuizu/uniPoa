package com.healthcard.app.repository;

import com.healthcard.app.entities.User;
import com.healthcard.app.entities.Vaccine;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VaccineRepository extends JpaRepository<Vaccine, Long> {
    List<Vaccine> findAllByUser (User user);
}
