package com.healthcard.app.repository;

import com.healthcard.app.entities.Appointment;
import com.healthcard.app.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findAllByUser (User user);
}
