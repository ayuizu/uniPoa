package com.healthcard.app.entities;

import com.healthcard.app.entities.enums.DoseUnitEnum;
import com.healthcard.app.entities.enums.FrequencyUnitEnum;
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
@Table(name = "medicine")
public class Medicine {
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
    @Enumerated(EnumType.STRING)
    private FrequencyUnitEnum frequencyUnit;

    @Column(name = "dose_value")
    private Double doseValue;

    @Column(name = "dose_unit")
    @Enumerated(EnumType.STRING)
    private DoseUnitEnum doseUnit;

    @Column(nullable = false, name = "start_date")
    private LocalDateTime startDate;

    @Column(name = "end_date")
    private LocalDateTime endDate;

    @Column(name = "created_at")
    @CreationTimestamp
    private Instant createdAt;

    @Column(name = "updated_at")
    @UpdateTimestamp
    private Instant updatedAt;
}
