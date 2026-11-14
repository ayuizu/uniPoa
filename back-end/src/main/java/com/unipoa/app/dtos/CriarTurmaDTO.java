package com.unipoa.app.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CriarTurmaDTO {
    private Long idProfessor;
    private Long idDisciplina;
    private Integer horario;
    private Integer vagasMax;
    private String semestre;
}