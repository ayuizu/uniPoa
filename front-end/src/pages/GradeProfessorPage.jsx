import { useEffect, useState } from 'react';
import AreaLogada from '../components/AreaLogada';
import GradeSemanal from '../components/GradeSemanal/GradeSemanal';
import classes from '../components/Academico.module.css';
import { SEMESTRE_ATUAL, listarProfessores, consultarGradeProfessor, mensagemErro } from '../services/api';

// UC04 - Administrador consulta a grade horária e a carga horária de um professor
const GradeProfessorPage = () => {
    const [professores, setProfessores] = useState([]);
    const [idProfessor, setIdProfessor] = useState('');
    const [grade, setGrade] = useState(null);
    const [erro, setErro] = useState('');

    useEffect(() => {
        listarProfessores()
            .then(setProfessores)
            .catch((error) => setErro(mensagemErro(error)));
    }, []);

    useEffect(() => {
        if (!idProfessor) return;
        consultarGradeProfessor(idProfessor)
            .then((dados) => {
                setGrade(dados);
                setErro('');
            })
            .catch((error) => setErro(mensagemErro(error)));
    }, [idProfessor]);

    const selecionarProfessor = (e) => {
        setGrade(null);
        setIdProfessor(e.target.value);
    };

    return (
        <AreaLogada titulo="Grade por professor" subtitulo={`Semestre ${SEMESTRE_ATUAL}`}>
            {erro && <p className={classes.alertaErro}>{erro}</p>}

            <div className={classes.cartao}>
                <div className={classes.campo} style={{ maxWidth: 360 }}>
                    <label htmlFor="professor">Professor</label>
                    <select id="professor" value={idProfessor} onChange={selecionarProfessor}>
                        <option value="">Selecione um professor</option>
                        {professores.map((p) => <option key={p.id} value={p.id}>{p.nome} {p.sobrenome}</option>)}
                    </select>
                </div>
            </div>

            {grade && (
                <>
                    <div className={classes.resumo}>
                        <div className={classes.resumoItem}><span>Professor</span><strong>{grade.nomeProfessor}</strong></div>
                        <div className={classes.resumoItem}><span>Turmas</span><strong>{grade.turmas.length}</strong></div>
                        <div className={classes.resumoItem}><span>Carga semanal</span><strong>{grade.cargaHorariaSemanal} h</strong></div>
                        <div className={classes.resumoItem}><span>Carga semestral</span><strong>{grade.cargaHorariaSemestral} h</strong></div>
                    </div>

                    {grade.turmas.length === 0 ? (
                        <p className={`${classes.cartao} ${classes.vazio}`}>Nenhuma turma atribuída a este professor no semestre.</p>
                    ) : (
                        <div className={classes.cartao}>
                            <GradeSemanal
                                turmas={grade.turmas}
                                renderTurma={(turma) => (
                                    <>
                                        <strong>{turma.nomeDisciplina}</strong>
                                        <span>{turma.vagasMax - turma.vagasDisponiveis} de {turma.vagasMax} vagas ocupadas</span>
                                    </>
                                )}
                            />
                        </div>
                    )}
                </>
            )}
        </AreaLogada>
    );
};

export default GradeProfessorPage;
