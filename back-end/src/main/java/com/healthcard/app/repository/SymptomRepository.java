package com.healthcard.app.repository;

import com.healthcard.app.entities.Symptom;
import com.healthcard.app.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SymptomRepository extends JpaRepository<Symptom, Long> {
    List<Symptom> findAllByUser(User user);
}
