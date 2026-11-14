package com.unipoa.app.controllers;

import com.unipoa.app.entities.Aluno;
import com.unipoa.app.entities.Disciplina;
import com.unipoa.app.entities.Professor;
import com.unipoa.app.repositories.AlunoRepository;
import com.unipoa.app.repositories.DisciplinaRepository;
import com.unipoa.app.repositories.ProfessorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/academico")
@CrossOrigin(origins = "*")
public class AlunoController {

    @Autowired
    private ProfessorRepository professorRepository;

    @Autowired
    private DisciplinaRepository disciplinaRepository;

    @Autowired
    private AlunoRepository alunoRepository;

    @GetMapping("/professores")
    public ResponseEntity<List<Professor>> listarProfessores() {
        return ResponseEntity.ok(professorRepository.findAll());
    }

    @GetMapping("/disciplinas")
    public ResponseEntity<List<Disciplina>> listarDisciplinas() {
        return ResponseEntity.ok(disciplinaRepository.findAll());
    }

    @GetMapping("/alunos/{id}")
    public ResponseEntity<Aluno> buscarAluno(@PathVariable Long id) {
        return alunoRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}