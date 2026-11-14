package com.unipoa.app.services;

import com.unipoa.app.dtos.GradeAlunoDTO;
import com.unipoa.app.dtos.RealizarMatriculaDTO;
import com.unipoa.app.entities.*;
import com.unipoa.app.entities.enums.StatusMatricula;
import com.unipoa.app.repositories.*;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class MatriculaServiceTest {

    @Mock
    private MatriculaRepository matriculaRepository;

    @Mock
    private AlunoRepository alunoRepository;

    @Mock
    private TurmaRepository turmaRepository;

    @Mock
    private PreRequisitoRepository preRequisitoRepository;

    @InjectMocks
    private MatriculaService matriculaService;

    @Test
    @DisplayName("UC01 - Deve realizar matrícula com sucesso quando pré-requisitos, vagas e horários são válidos")
    void deveRealizarMatriculaComSucesso() {
        // Arrange
        Aluno aluno = new Aluno();
        aluno.setId(1L);
        aluno.setNome("Mariana");
        aluno.setSobrenome("Silva");
        aluno.setPeriodoAtual(3);

        // Disciplina pré-requisito já concluída (id = 3, Estruturas de Dados)
        Disciplina discPrereq = new Disciplina();
        discPrereq.setId(3L);
        discPrereq.setNome("Estruturas de Dados");

        Turma turmaConcluida = new Turma();
        turmaConcluida.setId(2L);
        turmaConcluida.setDisciplina(discPrereq);

        Matricula matConcluida = new Matricula();
        matConcluida.setAluno(aluno);
        matConcluida.setTurma(turmaConcluida);
        matConcluida.setStatus(StatusMatricula.CONCLUIDA);

        // Nova disciplina alvo da matrícula (id = 5, POO)
        Disciplina discAlvo = new Disciplina();
        discAlvo.setId(5L);
        discAlvo.setNome("Programação Orientada a Objetos");

        Turma turmaAlvo = new Turma();
        turmaAlvo.setId(4L);
        turmaAlvo.setDisciplina(discAlvo);
        turmaAlvo.setHorario(25);
        turmaAlvo.setVagasMax(30);
        turmaAlvo.setSemestre("2026/1");

        PreRequisito prereq = new PreRequisito();
        prereq.setDisciplina(discAlvo);
        prereq.setPreRequisito(discPrereq);

        RealizarMatriculaDTO dto = new RealizarMatriculaDTO();
        dto.setIdAluno(1L);
        dto.setIdsTurmas(List.of(4L));

        when(alunoRepository.findById(1L)).thenReturn(Optional.of(aluno));
        when(matriculaRepository.findByAlunoIdAndStatus(1L, StatusMatricula.CONCLUIDA))
                .thenReturn(List.of(matConcluida));
        when(matriculaRepository.findByAlunoIdAndStatus(1L, StatusMatricula.MATRICULADA))
                .thenReturn(List.of());
        when(turmaRepository.findById(4L)).thenReturn(Optional.of(turmaAlvo));
        when(preRequisitoRepository.findByDisciplinaId(5L)).thenReturn(List.of(prereq));
        when(matriculaRepository.countByTurmaIdAndStatus(4L, StatusMatricula.MATRICULADA)).thenReturn(10L);
        when(matriculaRepository.findByAlunoIdAndTurmaId(1L, 4L)).thenReturn(Optional.empty());
        when(matriculaRepository.save(any(Matricula.class))).thenAnswer(invocation -> {
            Matricula m = invocation.getArgument(0);
            m.setId(100L);
            return m;
        });

        // Act
        List<Matricula> resultado = matriculaService.matricularAluno(dto);

        // Assert
        assertNotNull(resultado);
        assertEquals(1, resultado.size());
        assertEquals(100L, resultado.get(0).getId());
        assertEquals(StatusMatricula.MATRICULADA, resultado.get(0).getStatus());
        assertEquals("Programação Orientada a Objetos", resultado.get(0).getTurma().getDisciplina().getNome());
        verify(matriculaRepository, times(1)).save(any(Matricula.class));
    }

    @Test
    @DisplayName("UC02 - Deve consultar a grade horária ativa do aluno com sucesso")
    void deveConsultarGradeAlunoComSucesso() {
        // Arrange
        Aluno aluno = new Aluno();
        aluno.setId(27L);
        aluno.setNome("Arthur");
        aluno.setSobrenome("Nogueira");
        aluno.setPeriodoAtual(1);

        Professor professor = new Professor();
        professor.setId(1L);
        professor.setNome("Carlos");
        professor.setSobrenome("Mendes");

        Disciplina disciplina = new Disciplina();
        disciplina.setId(1L);
        disciplina.setNome("Algoritmos e Programação I");
        disciplina.setPeriodo(1);

        Turma turma = new Turma();
        turma.setId(1L);
        turma.setProfessor(professor);
        turma.setDisciplina(disciplina);
        turma.setHorario(21);
        turma.setSemestre("2026/1");

        Matricula matricula = new Matricula();
        matricula.setId(10L);
        matricula.setAluno(aluno);
        matricula.setTurma(turma);
        matricula.setStatus(StatusMatricula.MATRICULADA);

        when(alunoRepository.findById(27L)).thenReturn(Optional.of(aluno));
        when(matriculaRepository.findByAlunoIdAndTurmaSemestreAndStatus(27L, "2026/1", StatusMatricula.MATRICULADA))
                .thenReturn(List.of(matricula));

        // Act
        GradeAlunoDTO grade = matriculaService.consultarGradeAluno(27L, "2026/1");

        // Assert
        assertNotNull(grade);
        assertEquals(27L, grade.getIdAluno());
        assertEquals("Arthur Nogueira", grade.getNomeAluno());
        assertEquals(1, grade.getTotalDisciplinas());
        assertEquals(2, grade.getCargaHorariaSemanal());
        assertEquals(30, grade.getCargaHorariaSemestral());
        assertEquals(1, grade.getTurmas().size());
        assertEquals(10L, grade.getTurmas().get(0).getIdMatricula());
        assertEquals("Algoritmos e Programação I", grade.getTurmas().get(0).getNomeDisciplina());
        assertEquals("Carlos Mendes", grade.getTurmas().get(0).getNomeProfessor());
        assertEquals(21, grade.getTurmas().get(0).getHorario());
    }
}