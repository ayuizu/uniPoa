package com.healthcard.app.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "blood_pressure")
public class BloodPressure {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "systolic_pressure", nullable = false)
    private Integer systolicPressure;

    @Column(name = "diastolic_pressure", nullable = false)
    private Integer diastolicPressure;

    @Column(name = "heart_rate", nullable = false)
    private Integer heartRate;

    @Column(nullable = false, name = "check_time")
    private LocalDateTime checkTime;

    @Column(name = "created_at")
    @CreationTimestamp
    private Instant createdAt;

    @Column(name = "updated_at")
    @UpdateTimestamp
    private Instant updatedAt;
}
