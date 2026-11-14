package com.unipoa.app.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class GradeProfessorDTO {
    private Long idProfessor;
    private String nomeProfessor;
    private Integer cargaHorariaSemanal;
    private Integer cargaHorariaSemestral;
    private List<TurmaDisponivelDTO> turmas;
}