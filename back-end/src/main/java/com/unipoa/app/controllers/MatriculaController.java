package com.unipoa.app.controllers;

import com.unipoa.app.dtos.GradeAlunoDTO;
import com.unipoa.app.dtos.RealizarMatriculaDTO;
import com.unipoa.app.entities.Matricula;
import com.unipoa.app.services.MatriculaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/matriculas")
@CrossOrigin(origins = "*")
public class MatriculaController {

    @Autowired
    private MatriculaService matriculaService;

    // UC01 - Confirmar matrícula nas turmas selecionadas (Aluno)
    @PostMapping("/criar")
    public ResponseEntity<List<Matricula>> matricular(@RequestBody RealizarMatriculaDTO dto) {
        List<Matricula> matriculas = matriculaService.matricularAluno(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(matriculas);
    }

    // UC02 - Consultar grade de turmas matriculadas do aluno
    @GetMapping("/aluno/{idAluno}")
    public ResponseEntity<GradeAlunoDTO> consultarGradeAluno(
            @PathVariable Long idAluno,
            @RequestParam(defaultValue = "2026/1") String semestre) {
        return ResponseEntity.ok(matriculaService.consultarGradeAluno(idAluno, semestre));
    }

    // UC02 - Cancelar matrícula em uma turma
    @DeleteMapping("/{idMatricula}")
    public ResponseEntity<Void> cancelarMatricula(@PathVariable Long idMatricula) {
        matriculaService.cancelarMatricula(idMatricula);
        return ResponseEntity.noContent().build();
    }
}