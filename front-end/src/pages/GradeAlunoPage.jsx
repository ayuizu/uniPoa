import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AreaLogada from '../components/AreaLogada';
import Dialog from '../components/Dialog';
import GradeSemanal from '../components/GradeSemanal/GradeSemanal';
import classes from '../components/Academico.module.css';
import { descreverHorario } from '../utils/horario';
import { idAlunoLogado } from '../services/sessao';
import { SEMESTRE_ATUAL, consultarGradeAluno, cancelarMatricula, mensagemErro } from '../services/api';

// UC02 - Grade semanal do aluno, com opção de cancelar cada matrícula
const GradeAlunoPage = () => {
    const idAluno = idAlunoLogado();
    const navigate = useNavigate();

    const [grade, setGrade] = useState(null);
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');

    const [cancelando, setCancelando] = useState(null);
    const [enviando, setEnviando] = useState(false);
    const [erroCancelamento, setErroCancelamento] = useState('');

    const carregar = useCallback(async () => {
        try {
            setGrade(await consultarGradeAluno(idAluno));
            setErro('');
        } catch (error) {
            setErro(mensagemErro(error));
        }
    }, [idAluno]);

    useEffect(() => {
        carregar();
    }, [carregar]);

    const abrirCancelamento = (item) => {
        setErroCancelamento('');
        setCancelando(item);
    };

    const confirmarCancelamento = async () => {
        setEnviando(true);
        try {
            await cancelarMatricula(cancelando.idMatricula);
            setSucesso(`Matrícula em ${cancelando.nomeDisciplina} cancelada. A vaga foi liberada.`);
            setCancelando(null);
            await carregar();
        } catch (error) {
            setErroCancelamento(mensagemErro(error));
        } finally {
            setEnviando(false);
        }
    };

    return (
        <AreaLogada
            titulo="Minha grade horária"
            subtitulo="Visualize suas aulas e confira seus horários durante a semana."
            acao={<span className={classes.chipSemestre}>Semestre {SEMESTRE_ATUAL}</span>}
        >
            {erro && <p className={classes.alertaErro}>{erro}</p>}
            {sucesso && <p className={classes.alertaSucesso}>{sucesso}</p>}

            {grade && (
                <>
                    <div className={`${classes.cartao} ${classes.faixaResumo}`}>
                        <div><span>Aluno</span><strong>{grade.nomeAluno} · {grade.periodoAtual}º período</strong></div>
                        <div><span>Disciplinas</span><strong>{grade.totalDisciplinas} matriculada(s)</strong></div>
                        <div><span>Carga horária</span><strong>{grade.cargaHorariaSemanal} horas semanais · {grade.cargaHorariaSemestral} no semestre</strong></div>
                    </div>

                    {grade.turmas.length === 0 ? (
                        <div className={`${classes.cartao} ${classes.vazio}`}>
                            Você ainda não está matriculado em nenhuma turma neste semestre.
                            <br /><br />
                            <button className="buttonPurple" onClick={() => navigate('/matricula')}>Fazer matrícula</button>
                        </div>
                    ) : (
                        <>
                            <div className={classes.cartao}>
                                <h2>Horários da semana</h2>
                                <p className={classes.descricaoCartao}>As disciplinas são exibidas conforme as matrículas confirmadas.</p>
                                <GradeSemanal
                                    turmas={grade.turmas}
                                    renderTurma={(item) => (
                                        <>
                                            <strong>{item.nomeDisciplina}</strong>
                                            <span>{item.nomeProfessor}</span>
                                            <button onClick={() => abrirCancelamento(item)}>Cancelar</button>
                                        </>
                                    )}
                                />
                                <p className={classes.dica}>Dica: para trocar de turma, cancele a matrícula aqui e escolha outra em Realizar matrícula.</p>
                            </div>
                            <div className={classes.acoes}>
                                <button className="buttonPurple" onClick={() => navigate('/matricula')}>
                                    Editar matrícula
                                </button>
                            </div>
                        </>
                    )}
                </>
            )}

            <Dialog isOpen={Boolean(cancelando)} onClose={() => setCancelando(null)}>
                {cancelando && (
                    <>
                        <h2>Cancelar matrícula</h2>
                        <p>
                            Deseja cancelar sua matrícula em <strong>{cancelando.nomeDisciplina}</strong> ({descreverHorario(cancelando.horario)})?
                            A vaga será liberada para outros alunos.
                        </p>
                        {erroCancelamento && <p className={classes.alertaErro}>{erroCancelamento}</p>}
                        <div className={classes.acoes}>
                            <button className={classes.botaoSecundario} onClick={() => setCancelando(null)}>Voltar</button>
                            <button className={classes.botaoPerigo} onClick={confirmarCancelamento} disabled={enviando}>
                                {enviando ? 'Cancelando...' : 'Cancelar matrícula'}
                            </button>
                        </div>
                    </>
                )}
            </Dialog>
        </AreaLogada>
    );
};

export default GradeAlunoPage;
