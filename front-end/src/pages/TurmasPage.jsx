import { useCallback, useEffect, useState } from 'react';
import AreaLogada from '../components/AreaLogada';
import classes from '../components/Academico.module.css';
import { DIAS, TURNOS, montarHorario, descreverHorario } from '../components/horario';
import {
    SEMESTRE_ATUAL, listarProfessores, listarDisciplinas, listarTurmas, criarTurma, mensagemErro,
} from '../services/api';

const FORM_VAZIO = { idProfessor: '', idDisciplina: '', dia: '', turno: '', vagasMax: '30' };

// UC03 - Administrador cria turmas e vê as já ofertadas no semestre
const TurmasPage = () => {
    const [professores, setProfessores] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);
    const [turmas, setTurmas] = useState([]);
    const [erro, setErro] = useState('');

    const [form, setForm] = useState(FORM_VAZIO);
    const [salvando, setSalvando] = useState(false);
    const [erroForm, setErroForm] = useState('');
    const [sucesso, setSucesso] = useState('');

    const carregarTurmas = useCallback(async () => {
        const lista = await listarTurmas();
        lista.sort((a, b) => a.horario - b.horario);
        setTurmas(lista);
    }, []);

    useEffect(() => {
        Promise.all([listarProfessores(), listarDisciplinas(), carregarTurmas()])
            .then(([listaProfessores, listaDisciplinas]) => {
                setProfessores(listaProfessores);
                setDisciplinas(listaDisciplinas);
            })
            .catch((error) => setErro(mensagemErro(error)));
    }, [carregarTurmas]);

    const atualizarCampo = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErroForm('');
        setSucesso('');
    };

    const salvar = async (e) => {
        e.preventDefault();
        if (!form.idProfessor || !form.idDisciplina || !form.dia || !form.turno) {
            setErroForm('Preencha professor, disciplina, dia e horário.');
            return;
        }
        if (Number(form.vagasMax) <= 0) {
            setErroForm('A quantidade de vagas deve ser maior que zero.');
            return;
        }

        const horario = montarHorario(Number(form.dia), Number(form.turno));
        setSalvando(true);
        try {
            await criarTurma({
                idProfessor: Number(form.idProfessor),
                idDisciplina: Number(form.idDisciplina),
                horario,
                vagasMax: Number(form.vagasMax),
            });
            const disciplina = disciplinas.find((d) => String(d.id) === form.idDisciplina);
            setSucesso(`Turma de ${disciplina.nome} criada para ${descreverHorario(horario)}.`);
            setForm(FORM_VAZIO);
            await carregarTurmas();
        } catch (error) {
            setErroForm(mensagemErro(error));
        } finally {
            setSalvando(false);
        }
    };

    return (
        <AreaLogada titulo="Gerenciamento de turmas" subtitulo={`Semestre ${SEMESTRE_ATUAL}`}>
            {erro && <p className={classes.alertaErro}>{erro}</p>}

            <form className={classes.cartao} onSubmit={salvar}>
                <h2>Nova turma</h2>
                <div className={classes.formGrid}>
                    <div className={classes.campo}>
                        <label htmlFor="idProfessor">Professor</label>
                        <select id="idProfessor" name="idProfessor" value={form.idProfessor} onChange={atualizarCampo}>
                            <option value="">Selecione</option>
                            {professores.map((p) => <option key={p.id} value={p.id}>{p.nome} {p.sobrenome}</option>)}
                        </select>
                    </div>
                    <div className={classes.campo}>
                        <label htmlFor="idDisciplina">Disciplina</label>
                        <select id="idDisciplina" name="idDisciplina" value={form.idDisciplina} onChange={atualizarCampo}>
                            <option value="">Selecione</option>
                            {disciplinas.map((d) => <option key={d.id} value={d.id}>{d.nome} ({d.periodo}º período)</option>)}
                        </select>
                    </div>
                    <div className={classes.campo}>
                        <label htmlFor="vagasMax">Vagas</label>
                        <input id="vagasMax" name="vagasMax" type="number" min="1" value={form.vagasMax} onChange={atualizarCampo} />
                    </div>
                    <div className={classes.campo}>
                        <label htmlFor="dia">Dia da semana</label>
                        <select id="dia" name="dia" value={form.dia} onChange={atualizarCampo}>
                            <option value="">Selecione</option>
                            {DIAS.map((d) => <option key={d.codigo} value={d.codigo}>{d.nome}</option>)}
                        </select>
                    </div>
                    <div className={classes.campo}>
                        <label htmlFor="turno">Horário</label>
                        <select id="turno" name="turno" value={form.turno} onChange={atualizarCampo}>
                            <option value="">Selecione</option>
                            {TURNOS.map((t) => <option key={t.codigo} value={t.codigo}>{t.faixa}</option>)}
                        </select>
                    </div>
                    <div className={classes.campo}>
                        <label>Semestre</label>
                        <span className={classes.campoInfo}>{SEMESTRE_ATUAL}</span>
                    </div>
                </div>

                {erroForm && <p className={classes.alertaErro} style={{ marginTop: 20 }}>{erroForm}</p>}
                {sucesso && <p className={classes.alertaSucesso} style={{ marginTop: 20 }}>{sucesso}</p>}

                <div className={classes.acoes}>
                    <button type="submit" className="buttonPurple" disabled={salvando}>
                        {salvando ? 'Salvando...' : 'Criar turma'}
                    </button>
                </div>
            </form>

            <div className={`${classes.cartao} ${classes.tabelaWrapper}`}>
                <h2>Turmas disponíveis para matrícula ({turmas.length})</h2>
                <table className={classes.tabela}>
                    <thead>
                        <tr>
                            <th>Disciplina</th>
                            <th>Professor</th>
                            <th>Horário</th>
                            <th>Vagas</th>
                            <th>Pré-requisitos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {turmas.map((turma) => (
                            <tr key={turma.id}>
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
                            </tr>
                        ))}
                    </tbody>
                </table>
                {turmas.length === 0 && <p className={classes.vazio}>Nenhuma turma criada neste semestre.</p>}
            </div>
        </AreaLogada>
    );
};

export default TurmasPage;
