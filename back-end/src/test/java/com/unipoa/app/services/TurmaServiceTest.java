package com.unipoa.app.services;

import com.unipoa.app.dtos.CriarTurmaDTO;
import com.unipoa.app.dtos.GradeProfessorDTO;
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
class TurmaServiceTest {

    @Mock
    private TurmaRepository turmaRepository;

    @Mock
    private ProfessorRepository professorRepository;

    @Mock
    private DisciplinaRepository disciplinaRepository;

    @Mock
    private PreRequisitoRepository preRequisitoRepository;

    @Mock
    private MatriculaRepository matriculaRepository;

    @InjectMocks
    private TurmaService turmaService;

    @Test
    @DisplayName("UC03 - Deve criar turma com sucesso quando professor não possui choque de horário")
    void deveCriarTurmaComSucesso() {
        // Arrange
        CriarTurmaDTO dto = new CriarTurmaDTO();
        dto.setIdProfessor(1L);
        dto.setIdDisciplina(2L);
        dto.setHorario(32); // Terça 10:00 - 12:00
        dto.setVagasMax(30);
        dto.setSemestre("2026/1");

        Professor professor = new Professor();
        professor.setId(1L);
        professor.setNome("Carlos");
        professor.setSobrenome("Mendes");

        Disciplina disciplina = new Disciplina();
        disciplina.setId(2L);
        disciplina.setNome("Matemática Discreta");
        disciplina.setPeriodo(1);

        when(professorRepository.findById(1L)).thenReturn(Optional.of(professor));
        when(disciplinaRepository.findById(2L)).thenReturn(Optional.of(disciplina));
        when(turmaRepository.existsByProfessorIdAndHorarioAndSemestre(1L, 32, "2026/1")).thenReturn(false);
        when(turmaRepository.save(any(Turma.class))).thenAnswer(invocation -> {
            Turma salva = invocation.getArgument(0);
            salva.setId(21L);
            return salva;
        });

        // Act
        Turma resultado = turmaService.criarTurma(dto);

        // Assert
        assertNotNull(resultado);
        assertEquals(21L, resultado.getId());
        assertEquals("Carlos", resultado.getProfessor().getNome());
        assertEquals("Matemática Discreta", resultado.getDisciplina().getNome());
        assertEquals(32, resultado.getHorario());
        assertEquals(30, resultado.getVagasMax());
        assertEquals("2026/1", resultado.getSemestre());
        verify(turmaRepository, times(1)).save(any(Turma.class));
    }

    @Test
    @DisplayName("UC04 - Deve consultar grade horária e calcular carga horária do professor com sucesso")
    void deveConsultarGradeProfessorComSucesso() {
        // Arrange
        Professor professor = new Professor();
        professor.setId(1L);
        professor.setNome("Carlos");
        professor.setSobrenome("Mendes");

        Disciplina d1 = new Disciplina();
        d1.setId(1L);
        d1.setNome("Algoritmos e Programação I");
        d1.setPeriodo(1);

        Disciplina d2 = new Disciplina();
        d2.setId(5L);
        d2.setNome("Programação Orientada a Objetos");
        d2.setPeriodo(3);

        Turma t1 = new Turma();
        t1.setId(1L);
        t1.setProfessor(professor);
        t1.setDisciplina(d1);
        t1.setHorario(21);
        t1.setVagasMax(40);
        t1.setSemestre("2026/1");

        Turma t2 = new Turma();
        t2.setId(4L);
        t2.setProfessor(professor);
        t2.setDisciplina(d2);
        t2.setHorario(25);
        t2.setVagasMax(30);
        t2.setSemestre("2026/1");

        when(professorRepository.findById(1L)).thenReturn(Optional.of(professor));
        when(turmaRepository.findByProfessorIdAndSemestre(1L, "2026/1")).thenReturn(List.of(t1, t2));
        when(matriculaRepository.countByTurmaIdAndStatus(1L, StatusMatricula.MATRICULADA)).thenReturn(15L);
        when(matriculaRepository.countByTurmaIdAndStatus(4L, StatusMatricula.MATRICULADA)).thenReturn(10L);
        when(preRequisitoRepository.findByDisciplinaId(anyLong())).thenReturn(List.of());

        // Act
        GradeProfessorDTO grade = turmaService.consultarGradeProfessor(1L, "2026/1");

        // Assert
        assertNotNull(grade);
        assertEquals(1L, grade.getIdProfessor());
        assertEquals("Carlos Mendes", grade.getNomeProfessor());
        assertEquals(4, grade.getCargaHorariaSemanal());   // 2 turmas * 2h
        assertEquals(60, grade.getCargaHorariaSemestral()); // 2 turmas * 30h
        assertEquals(2, grade.getTurmas().size());
        assertEquals(25L, grade.getTurmas().get(0).getVagasDisponiveis()); // 40 - 15
        assertEquals(20L, grade.getTurmas().get(1).getVagasDisponiveis()); // 30 - 10
    }
}