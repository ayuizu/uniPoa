package com.unipoa.app.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class TurmaDisponivelDTO {
    private Long id;
    private Long idDisciplina;
    private String nomeDisciplina;
    private Integer periodoDisciplina;
    private String nomeProfessor;
    private Integer horario;
    private Integer vagasMax;
    private Long vagasDisponiveis;
    private String semestre;
    private List<String> preRequisitos;
    private Boolean elegivel; // true if student has completed all prerequisites (or if queried by Admin)
}