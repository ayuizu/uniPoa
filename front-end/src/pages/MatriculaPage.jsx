import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AreaLogada from '../components/AreaLogada';
import Modal from '../components/Modal';
import classes from '../components/Academico.module.css';
import { descreverHorario } from '../components/horario';
import { idAlunoLogado } from '../services/sessao';
import {
    SEMESTRE_ATUAL, listarTurmas, consultarGradeAluno, matricular, mensagemErro,
} from '../services/api';

// UC01 - Aluno seleciona turmas e confirma a matrícula
const MatriculaPage = () => {
    const idAluno = idAlunoLogado();

    const [turmas, setTurmas] = useState([]);
    const [matriculadas, setMatriculadas] = useState([]);
    const [selecionadas, setSelecionadas] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');

    const [confirmando, setConfirmando] = useState(false);
    const [enviando, setEnviando] = useState(false);
    const [erroConfirmacao, setErroConfirmacao] = useState('');

    const carregar = useCallback(async () => {
        try {
            const [listaTurmas, grade] = await Promise.all([
                listarTurmas(idAluno),
                consultarGradeAluno(idAluno),
            ]);
            listaTurmas.sort((a, b) =>
                a.periodoDisciplina - b.periodoDisciplina || a.nomeDisciplina.localeCompare(b.nomeDisciplina));
            setTurmas(listaTurmas);
            setMatriculadas(grade.turmas);
            setErro('');
        } catch (error) {
            setErro(mensagemErro(error));
        } finally {
            setCarregando(false);
        }
    }, [idAluno]);

    useEffect(() => {
        carregar();
    }, [carregar]);

    const turmasSelecionadas = turmas.filter((t) => selecionadas.includes(t.id));

    // Mesmas regras do back-end, aplicadas antes do envio para orientar o aluno
    const motivoBloqueio = (turma) => {
        if (matriculadas.some((m) => m.idTurma === turma.id)) return 'Você já está matriculado nesta turma';
        if (matriculadas.some((m) => m.idDisciplina === turma.idDisciplina)) return 'Você já cursa esta disciplina em outra turma';
        if (!turma.elegivel) return 'Pré-requisitos pendentes';
        if (turma.vagasDisponiveis <= 0) return 'Sem vagas disponíveis';
        if (matriculadas.some((m) => m.horario === turma.horario)) return 'Choque de horário com sua grade';

        const outras = turmasSelecionadas.filter((t) => t.id !== turma.id);
        if (outras.some((t) => t.idDisciplina === turma.idDisciplina)) return 'Disciplina já selecionada em outra turma';
        if (outras.some((t) => t.horario === turma.horario)) return 'Choque de horário com outra turma selecionada';
        return null;
    };

    const alternarSelecao = (idTurma) => {
        setSucesso('');
        setSelecionadas((atual) =>
            atual.includes(idTurma) ? atual.filter((id) => id !== idTurma) : [...atual, idTurma]);
    };

    const abrirConfirmacao = () => {
        setErroConfirmacao('');
        setConfirmando(true);
    };

    const confirmarMatricula = async () => {
        setEnviando(true);
        setErroConfirmacao('');
        try {
            await matricular(idAluno, selecionadas);
            setSucesso(`Matrícula realizada em ${selecionadas.length} disciplina(s).`);
            setSelecionadas([]);
            setConfirmando(false);
            await carregar();
        } catch (error) {
            setErroConfirmacao(mensagemErro(error));
        } finally {
            setEnviando(false);
        }
    };

    return (
        <AreaLogada titulo="Matrícula" subtitulo={`Turmas disponíveis no semestre ${SEMESTRE_ATUAL}`}>
            {erro && <p className={classes.alertaErro}>{erro}</p>}
            {sucesso && (
                <p className={classes.alertaSucesso}>
                    {sucesso}
                    <Link to="/grade">Ver minha grade</Link>
                </p>
            )}

            {carregando ? (
                <p className={classes.vazio}>Carregando turmas...</p>
            ) : (
                <>
                    <div className={classes.barraAcoes}>
                        <span>{selecionadas.length} turma(s) selecionada(s)</span>
                        <button
                            className="buttonPurple"
                            onClick={abrirConfirmacao}
                            disabled={selecionadas.length === 0}
                        >
                            Matricular
                        </button>
                    </div>

                    <div className={`${classes.cartao} ${classes.tabelaWrapper}`}>
                        <table className={classes.tabela}>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Disciplina</th>
                                    <th>Professor</th>
                                    <th>Horário</th>
                                    <th>Vagas</th>
                                    <th>Pré-requisitos</th>
                                    <th>Situação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {turmas.map((turma) => {
                                    const selecionada = selecionadas.includes(turma.id);
                                    const motivo = motivoBloqueio(turma);
                                    const bloqueada = Boolean(motivo) && !selecionada;
                                    const classeLinha = selecionada
                                        ? classes.linhaSelecionada
                                        : bloqueada ? classes.linhaBloqueada : '';
                                    return (
                                        <tr key={turma.id} className={classeLinha}>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    aria-label={`Selecionar ${turma.nomeDisciplina}`}
                                                    checked={selecionada}
                                                    disabled={bloqueada}
                                                    onChange={() => alternarSelecao(turma.id)}
                                                />
                                            </td>
                                            <td>
                                                {turma.nomeDisciplina}
                                                <span className={classes.periodo}>{turma.periodoDisciplina}º período</span>
                                            </td>
                                            <td>{turma.nomeProfessor}</td>
                                            <td>{descreverHorario(turma.horario)}</td>
                                            <td>{turma.vagasDisponiveis} de {turma.vagasMax}</td>
                                            <td>
                                                {turma.preRequisitos.length === 0
                                                    ? '—'
                                                    : turma.preRequisitos.map((nome) => <span key={nome} className={classes.tag}>{nome}</span>)}
                                            </td>
                                            <td>
                                                {motivo && !selecionada
                                                    ? <span className={classes.situacaoBloqueada}>{motivo}</span>
                                                    : <span className={classes.situacaoOk}>{selecionada ? 'Selecionada' : 'Disponível'}</span>}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        {turmas.length === 0 && <p className={classes.vazio}>Nenhuma turma ofertada neste semestre.</p>}
                    </div>
                </>
            )}

            <Modal isOpen={confirmando} onClose={() => setConfirmando(false)}>
                <h2>Confirmar matrícula</h2>
                <p>Você será matriculado nas seguintes turmas do semestre {SEMESTRE_ATUAL}:</p>
                <ul className={classes.listaConfirmacao}>
                    {turmasSelecionadas.map((turma) => (
                        <li key={turma.id}>
                            <strong>{turma.nomeDisciplina}</strong>
                            <span>{descreverHorario(turma.horario)} · {turma.nomeProfessor}</span>
                        </li>
                    ))}
                </ul>
                {erroConfirmacao && <p className={classes.alertaErro}>{erroConfirmacao}</p>}
                <div className={classes.acoes}>
                    <button className={classes.botaoSecundario} onClick={() => setConfirmando(false)}>
                        Voltar e editar
                    </button>
                    <button className="buttonPurple" onClick={confirmarMatricula} disabled={enviando}>
                        {enviando ? 'Enviando...' : 'Confirmar matrícula'}
                    </button>
                </div>
            </Modal>
        </AreaLogada>
    );
};

export default MatriculaPage;
