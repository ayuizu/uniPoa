package com.unipoa.app.repositories;

import com.unipoa.app.entities.PreRequisito;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PreRequisitoRepository extends JpaRepository<PreRequisito, Long> {
    List<PreRequisito> findByDisciplinaId(Long disciplinaId);
}