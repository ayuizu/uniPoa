package com.healthcard.app.repository;

import com.healthcard.app.entities.User;
import com.healthcard.app.entities.WeightCheck;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WeightCheckRepository extends JpaRepository<WeightCheck, Long> {
    List<WeightCheck> findAllByUser(User user);
}
