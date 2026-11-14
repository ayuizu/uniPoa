package com.unipoa.app.services;

import com.unipoa.app.dtos.CriarTurmaDTO;
import com.unipoa.app.dtos.GradeProfessorDTO;
import com.unipoa.app.dtos.TurmaDisponivelDTO;
import com.unipoa.app.entities.*;
import com.unipoa.app.entities.enums.StatusMatricula;
import com.unipoa.app.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class TurmaService {

    @Autowired
    private TurmaRepository turmaRepository;

    @Autowired
    private ProfessorRepository professorRepository;

    @Autowired
    private DisciplinaRepository disciplinaRepository;

    @Autowired
    private PreRequisitoRepository preRequisitoRepository;

    @Autowired
    private MatriculaRepository matriculaRepository;

    // UC03 - Criar nova turma para matrícula
    public Turma criarTurma(CriarTurmaDTO dto) {
        validarCodigoHorario(dto.getHorario());

        if (dto.getVagasMax() == null || dto.getVagasMax() <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A quantidade de vagas deve ser maior que zero.");
        }

        String semestre = (dto.getSemestre() == null || dto.getSemestre().isBlank()) ? "2026/1" : dto.getSemestre();

        Professor professor = professorRepository.findById(dto.getIdProfessor())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Professor não encontrado."));

        Disciplina disciplina = disciplinaRepository.findById(dto.getIdDisciplina())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Disciplina não encontrada."));

        // Regra UC03: Validar se o professor já possui turma nesse horário/semestre
        if (turmaRepository.existsByProfessorIdAndHorarioAndSemestre(professor.getId(), dto.getHorario(), semestre)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "O professor já possui uma turma alocada neste dia e horário.");
        }

        Turma turma = new Turma();
        turma.setProfessor(professor);
        turma.setDisciplina(disciplina);
        turma.setHorario(dto.getHorario());
        turma.setVagasMax(dto.getVagasMax());
        turma.setSemestre(semestre);

        return turmaRepository.save(turma);
    }

    // Listagem de turmas disponíveis (Admin ou Aluno com validação de elegibilidade)
    public List<TurmaDisponivelDTO> listarTurmasDisponiveis(String semestre, Long idAluno) {
        String sem = (semestre == null || semestre.isBlank()) ? "2026/1" : semestre;
        List<Turma> turmas = turmaRepository.findBySemestre(sem);

        Set<Long> disciplinasConcluidas = (idAluno != null)
                ? matriculaRepository.findByAlunoIdAndStatus(idAluno, StatusMatricula.CONCLUIDA)
                .stream()
                .map(m -> m.getTurma().getDisciplina().getId())
                .collect(Collectors.toSet())
                : Set.of();

        return turmas.stream()
                .map(t -> mapToDTO(t, idAluno, disciplinasConcluidas))
                .collect(Collectors.toList());
    }

    // UC04 - Consultar grade horária e carga horária por professor
    public GradeProfessorDTO consultarGradeProfessor(Long idProfessor, String semestre) {
        String sem = (semestre == null || semestre.isBlank()) ? "2026/1" : semestre;

        Professor professor = professorRepository.findById(idProfessor)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Professor não encontrado."));

        List<Turma> turmas = turmaRepository.findByProfessorIdAndSemestre(idProfessor, sem);
        List<TurmaDisponivelDTO> turmasDTO = turmas.stream()
                .map(t -> mapToDTO(t, null, Set.of()))
                .collect(Collectors.toList());

        int cargaSemanal = turmas.size() * 2;
        int cargaSemestral = turmas.size() * 30;

        return new GradeProfessorDTO(
                professor.getId(),
                professor.getNome() + " " + professor.getSobrenome(),
                cargaSemanal,
                cargaSemestral,
                turmasDTO
        );
    }

    private TurmaDisponivelDTO mapToDTO(Turma turma, Long idAluno, Set<Long> disciplinasConcluidas) {
        long matriculados = matriculaRepository.countByTurmaIdAndStatus(turma.getId(), StatusMatricula.MATRICULADA);
        long vagasDisponiveis = Math.max(0, turma.getVagasMax() - matriculados);

        List<PreRequisito> prereqs = preRequisitoRepository.findByDisciplinaId(turma.getDisciplina().getId());
        List<String> nomesPrereqs = prereqs.stream()
                .map(p -> p.getPreRequisito().getNome())
                .collect(Collectors.toList());

        boolean elegivel = true;
        if (idAluno != null) {
            elegivel = prereqs.stream()
                    .allMatch(p -> disciplinasConcluidas.contains(p.getPreRequisito().getId()));
        }

        return new TurmaDisponivelDTO(
                turma.getId(),
                turma.getDisciplina().getId(),
                turma.getDisciplina().getNome(),
                turma.getDisciplina().getPeriodo(),
                turma.getProfessor().getNome() + " " + turma.getProfessor().getSobrenome(),
                turma.getHorario(),
                turma.getVagasMax(),
                vagasDisponiveis,
                turma.getSemestre(),
                nomesPrereqs,
                elegivel
        );
    }

    private void validarCodigoHorario(Integer horario) {
        if (horario == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Horário é obrigatório.");
        }
        int dia = horario / 10;
        int slot = horario % 10;
        if (dia < 2 || dia > 6 || slot < 1 || slot > 6) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Código de horário inválido. Use dia (2 a 6) + turno (1 a 6), ex.: 21.");
        }
    }
}