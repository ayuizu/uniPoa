package com.unipoa.app.entities;

import com.unipoa.app.entities.enums.StatusMatricula;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(
        name = "matricula",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"id_aluno", "id_turma"})
        }
)
public class Matricula {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_aluno", nullable = false)
    private Aluno aluno;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_turma", nullable = false)
    private Turma turma;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private StatusMatricula status = StatusMatricula.MATRICULADA;

    @Column(name = "created_at", updatable = false)
    @CreationTimestamp
    private Instant createdAt;

    @Column(name = "updated_at")
    @UpdateTimestamp
    private Instant updatedAt;
}