package com.unipoa.app.dtos;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class RealizarMatriculaDTO {
    private Long idAluno;
    private List<Long> idsTurmas;
}