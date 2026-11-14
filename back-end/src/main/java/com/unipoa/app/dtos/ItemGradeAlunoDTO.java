package com.unipoa.app.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ItemGradeAlunoDTO {
    private Long idMatricula;
    private Long idTurma;
    private Long idDisciplina;
    private String nomeDisciplina;
    private Integer periodoDisciplina;
    private String nomeProfessor;
    private Integer horario;
    private String semestre;
    private String status;
}