import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { faPlus, faChalkboardUser } from '@fortawesome/free-solid-svg-icons';
import CartaoResumo from './CartaoResumo';
import AcessoRapido from './AcessoRapido';
import academico from '../Academico.module.css';
import classes from './VisaoGeral.module.css';
import { descreverHorarioCurto } from '../horario';
import { listarDisciplinas, listarProfessores, listarTurmas, mensagemErro } from '../../services/api';

const TURMAS_NA_PREVIA = 5;

// Visão geral do administrador: totais do semestre, prévia das turmas e atalhos
const VisaoGeralAdmin = () => {
  const [dados, setDados] = useState(null);
  const [erro, setErro] = useState('');

  useEffect(() => {
    Promise.all([listarDisciplinas(), listarProfessores(), listarTurmas()])
      .then(([disciplinas, professores, turmas]) => {
        turmas.sort((a, b) => a.horario - b.horario);
        setDados({ disciplinas: disciplinas.length, professores: professores.length, turmas });
      })
      .catch((error) => setErro(mensagemErro(error)));
  }, []);

  if (erro) return <p className={academico.alertaErro}>{erro}</p>;
  if (!dados) return <p className={academico.vazio}>Carregando...</p>;

  const matriculasAtivas = dados.turmas.reduce((soma, t) => soma + (t.vagasMax - t.vagasDisponiveis), 0);

  return (
    <>
      <div className={classes.cartoes}>
        <CartaoResumo rotulo="Disciplinas" valor={dados.disciplinas} detalhe="cadastradas" />
        <CartaoResumo rotulo="Professores" valor={dados.professores} detalhe="cadastrados" />
        <CartaoResumo rotulo="Turmas ofertadas" valor={dados.turmas.length} detalhe="no semestre" />
        <CartaoResumo rotulo="Matrículas ativas" valor={matriculasAtivas} detalhe="no semestre" />
      </div>

      <div className={classes.colunas}>
        <section className={`${academico.cartao} ${academico.tabelaWrapper}`}>
          <h2>Turmas ofertadas</h2>
          <p className={classes.descricao}>Consulte e gerencie as ofertas cadastradas.</p>
          <table className={academico.tabela}>
            <thead>
              <tr>
                <th>Disciplina</th>
                <th>Professor</th>
                <th>Horário</th>
                <th>Vagas</th>
              </tr>
            </thead>
            <tbody>
              {dados.turmas.slice(0, TURMAS_NA_PREVIA).map((turma) => (
                <tr key={turma.id}>
                  <td>{turma.nomeDisciplina}</td>
                  <td>{turma.nomeProfessor}</td>
                  <td>{descreverHorarioCurto(turma.horario)}</td>
                  <td>{turma.vagasMax - turma.vagasDisponiveis} / {turma.vagasMax}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {dados.turmas.length === 0 && <p className={academico.vazio}>Nenhuma turma ofertada neste semestre.</p>}
          <Link to="/turmas" className={classes.verMais}>Ver todas as turmas →</Link>
        </section>

        <section className={academico.cartao}>
          <h2>Ações rápidas</h2>
          <AcessoRapido to="/turmas" icone={faPlus} titulo="Criar turma" descricao="Adicionar uma oferta ao semestre" cor="roxo" />
          <AcessoRapido to="/grade-professor" icone={faChalkboardUser} titulo="Grade por professor" descricao="Consultar horários e carga horária" cor="verde" />
        </section>
      </div>
    </>
  );
};

export default VisaoGeralAdmin;
