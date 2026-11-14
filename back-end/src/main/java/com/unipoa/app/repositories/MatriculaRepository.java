package com.unipoa.app.repositories;

import com.unipoa.app.entities.Matricula;
import com.unipoa.app.entities.enums.StatusMatricula;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MatriculaRepository extends JpaRepository<Matricula, Long> {
    long countByTurmaIdAndStatus(Long turmaId, StatusMatricula status);
    List<Matricula> findByAlunoIdAndStatus(Long alunoId, StatusMatricula status);
    List<Matricula> findByAlunoIdAndTurmaSemestreAndStatus(Long alunoId, String semestre, StatusMatricula status);
    Optional<Matricula> findByAlunoIdAndTurmaId(Long alunoId, Long turmaId);
}