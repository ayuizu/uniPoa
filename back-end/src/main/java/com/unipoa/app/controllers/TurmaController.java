package com.unipoa.app.controllers;

import com.unipoa.app.dtos.CriarTurmaDTO;
import com.unipoa.app.dtos.GradeProfessorDTO;
import com.unipoa.app.dtos.TurmaDisponivelDTO;
import com.unipoa.app.entities.Turma;
import com.unipoa.app.services.TurmaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/turmas")
@CrossOrigin(origins = "*")
public class TurmaController {

    @Autowired
    private TurmaService turmaService;

    // UC03 - Criar nova turma (Admin)
    @PostMapping
    public ResponseEntity<Turma> criarTurma(@RequestBody CriarTurmaDTO dto) {
        Turma novaTurma = turmaService.criarTurma(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(novaTurma);
    }

    // UC01 & UC03 - Listar turmas disponíveis (passar ?idAluno=1 na tela do aluno para checar pré-requisitos)
    @GetMapping
    public ResponseEntity<List<TurmaDisponivelDTO>> listarTurmas(
            @RequestParam(defaultValue = "2026/1") String semestre,
            @RequestParam(required = false) Long idAluno) {
        return ResponseEntity.ok(turmaService.listarTurmasDisponiveis(semestre, idAluno));
    }

    // UC04 - Consultar grade horária e carga horária de um professor (Admin)
    @GetMapping("/professor/{idProfessor}")
    public ResponseEntity<GradeProfessorDTO> consultarGradeProfessor(
            @PathVariable Long idProfessor,
            @RequestParam(defaultValue = "2026/1") String semestre) {
        return ResponseEntity.ok(turmaService.consultarGradeProfessor(idProfessor, semestre));
    }
}