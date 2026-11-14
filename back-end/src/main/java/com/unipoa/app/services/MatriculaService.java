package com.unipoa.app.services;

import com.unipoa.app.dtos.RealizarMatriculaDTO;
import com.unipoa.app.entities.*;
import com.unipoa.app.entities.enums.StatusMatricula;
import com.unipoa.app.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.unipoa.app.dtos.GradeAlunoDTO;
import com.unipoa.app.dtos.ItemGradeAlunoDTO;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class MatriculaService {

    @Autowired
    private MatriculaRepository matriculaRepository;

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private TurmaRepository turmaRepository;

    @Autowired
    private PreRequisitoRepository preRequisitoRepository;

    // UC01 - Realizar matrícula em uma ou mais turmas selecionadas
    @Transactional
    public List<Matricula> matricularAluno(RealizarMatriculaDTO dto) {
        if (dto.getIdsTurmas() == null || dto.getIdsTurmas().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Selecione ao menos uma turma para matrícula.");
        }

        Aluno aluno = alunoRepository.findById(dto.getIdAluno())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Aluno não encontrado."));

        // Disciplinas já concluídas pelo aluno (para validar pré-requisitos)
        Set<Long> concluidasIds = matriculaRepository.findByAlunoIdAndStatus(aluno.getId(), StatusMatricula.CONCLUIDA)
                .stream()
                .map(m -> m.getTurma().getDisciplina().getId())
                .collect(Collectors.toSet());

        // Matrículas ativas atuais do aluno
        List<Matricula> matriculasAtivas = matriculaRepository.findByAlunoIdAndStatus(aluno.getId(), StatusMatricula.MATRICULADA);
        Set<Integer> horariosOcupados = matriculasAtivas.stream()
                .map(m -> m.getTurma().getHorario())
                .collect(Collectors.toSet());
        Set<Long> disciplinasJaMatriculadas = matriculasAtivas.stream()
                .map(m -> m.getTurma().getDisciplina().getId())
                .collect(Collectors.toSet());

        List<Matricula> novasMatriculas = new ArrayList<>();

        for (Long idTurma : dto.getIdsTurmas()) {
            Turma turma = turmaRepository.findById(idTurma)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Turma não encontrada: " + idTurma));

            Long idDisciplina = turma.getDisciplina().getId();

            // 1. Verificar se já concluiu ou já está matriculado na disciplina
            if (concluidasIds.contains(idDisciplina)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "Aluno já concluiu a disciplina: " + turma.getDisciplina().getNome());
            }
            if (disciplinasJaMatriculadas.contains(idDisciplina)) {
                throw new ResponseStatusException(HttpStatus.CONFLICT,
                        "Aluno já está matriculado na disciplina: " + turma.getDisciplina().getNome());
            }

            // 2. Validar pré-requisitos
            List<PreRequisito> prereqs = preRequisitoRepository.findByDisciplinaId(idDisciplina);
            for (PreRequisito pr : prereqs) {
                if (!concluidasIds.contains(pr.getPreRequisito().getId())) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                            "Pré-requisito não cumprido para " + turma.getDisciplina().getNome()
                                    + ": " + pr.getPreRequisito().getNome());
                }
            }

            // 3. Validar choque de horário (com turmas já matriculadas e entre as selecionadas agora)
            if (horariosOcupados.contains(turma.getHorario())) {
                throw new ResponseStatusException(HttpStatus.CONFLICT,
                        "Choque de horário detectado para a disciplina: " + turma.getDisciplina().getNome());
            }

            // 4. Validar vagas disponíveis
            long ocupadas = matriculaRepository.countByTurmaIdAndStatus(turma.getId(), StatusMatricula.MATRICULADA);
            if (ocupadas >= turma.getVagasMax()) {
                throw new ResponseStatusException(HttpStatus.CONFLICT,
                        "Não há vagas disponíveis para a turma de: " + turma.getDisciplina().getNome());
            }

            // Reaproveita registro caso o aluno tenha cancelado esta mesma turma antes
            Matricula matricula = matriculaRepository.findByAlunoIdAndTurmaId(aluno.getId(), turma.getId())
                    .orElse(new Matricula());
            matricula.setAluno(aluno);
            matricula.setTurma(turma);
            matricula.setStatus(StatusMatricula.MATRICULADA);

            horariosOcupados.add(turma.getHorario());
            disciplinasJaMatriculadas.add(idDisciplina);
            novasMatriculas.add(matriculaRepository.save(matricula));
        }

        return novasMatriculas;
    }

    // UC02 - Cancelar matrícula em uma turma (libera a vaga)
    @Transactional
    public void cancelarMatricula(Long idMatricula) {
        Matricula matricula = matriculaRepository.findById(idMatricula)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Matrícula não encontrada."));

        if (matricula.getStatus() != StatusMatricula.MATRICULADA) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Apenas matrículas ativas podem ser canceladas.");
        }

        matricula.setStatus(StatusMatricula.CANCELADA);
        matriculaRepository.save(matricula);
    }

    // UC02 - Consultar grade horária atual do aluno
    public GradeAlunoDTO consultarGradeAluno(Long idAluno, String semestre) {
        String sem = (semestre == null || semestre.isBlank()) ? "2026/1" : semestre;

        Aluno aluno = alunoRepository.findById(idAluno)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Aluno não encontrado."));

        List<Matricula> matriculas = matriculaRepository
                .findByAlunoIdAndTurmaSemestreAndStatus(idAluno, sem, StatusMatricula.MATRICULADA);

        List<ItemGradeAlunoDTO> itensGrade = matriculas.stream()
                .map(m -> {
                    Turma t = m.getTurma();
                    return new ItemGradeAlunoDTO(
                            m.getId(),
                            t.getId(),
                            t.getDisciplina().getId(),
                            t.getDisciplina().getNome(),
                            t.getDisciplina().getPeriodo(),
                            t.getProfessor().getNome() + " " + t.getProfessor().getSobrenome(),
                            t.getHorario(),
                            t.getSemestre(),
                            m.getStatus().name()
                    );
                })
                .collect(Collectors.toList());

        int cargaSemanal = itensGrade.size() * 2;
        int cargaSemestral = itensGrade.size() * 30;

        return new GradeAlunoDTO(
                aluno.getId(),
                aluno.getNome() + " " + aluno.getSobrenome(),
                aluno.getPeriodoAtual(),
                itensGrade.size(),
                cargaSemanal,
                cargaSemestral,
                itensGrade
        );
    }
}