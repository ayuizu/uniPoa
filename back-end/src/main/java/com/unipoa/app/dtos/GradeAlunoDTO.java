package com.unipoa.app.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class GradeAlunoDTO {
    private Long idAluno;
    private String nomeAluno;
    private Integer periodoAtual;
    private Integer totalDisciplinas;
    private Integer cargaHorariaSemanal;
    private Integer cargaHorariaSemestral;
    private List<ItemGradeAlunoDTO> turmas;
}