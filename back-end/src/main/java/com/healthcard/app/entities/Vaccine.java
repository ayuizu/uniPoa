package com.healthcard.app.entities;

import com.healthcard.app.entities.enums.FrequencyUnitEnum;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "vaccine")
public class Vaccine {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false)
    private String name;

    private String description;

    @Column(name = "frequency_value")
    private Double frequencyValue;

    @Column(name = "frequency_unit")
    private FrequencyUnitEnum frequencyUnit;

    @Column(nullable = false, name = "application_date")
    private LocalDate applicationDate;

    @Column(name = "created_at")
    @CreationTimestamp
    private Instant createdAt;

    @Column(name = "updated_at")
    @UpdateTimestamp
    private Instant updatedAt;
}
