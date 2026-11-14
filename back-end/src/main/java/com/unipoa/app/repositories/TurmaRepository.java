package com.unipoa.app.repositories;

import com.unipoa.app.entities.Turma;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TurmaRepository extends JpaRepository<Turma, Long> {
    List<Turma> findBySemestre(String semestre);
    List<Turma> findByProfessorIdAndSemestre(Long professorId, String semestre);
    boolean existsByProfessorIdAndHorarioAndSemestre(Long professorId, Integer horario, String semestre);
}