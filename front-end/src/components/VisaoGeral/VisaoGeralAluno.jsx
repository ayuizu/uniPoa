import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { faPlus, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import CartaoResumo from './CartaoResumo';
import AcessoRapido from './AcessoRapido';
import GradeSemanal from '../GradeSemanal/GradeSemanal';
import academico from '../Academico.module.css';
import classes from './VisaoGeral.module.css';
import { idAlunoLogado, iniciais } from '../../services/sessao';
import { SEMESTRE_ATUAL, consultarGradeAluno, mensagemErro } from '../../services/api';

// Visão geral do aluno: resumo do semestre, mini grade da semana e atalhos
const VisaoGeralAluno = () => {
  const idAluno = idAlunoLogado();
  const [grade, setGrade] = useState(null);
  const [erro, setErro] = useState('');

  useEffect(() => {
    consultarGradeAluno(idAluno)
      .then(setGrade)
      .catch((error) => setErro(mensagemErro(error)));
  }, [idAluno]);

  if (erro) return <p className={academico.alertaErro}>{erro}</p>;
  if (!grade) return <p className={academico.vazio}>Carregando...</p>;

  return (
    <>
      <div className={`${academico.cartao} ${classes.perfil}`}>
        <span className={classes.avatar}>{iniciais(grade.nomeAluno)}</span>
        <div>
          <strong>{grade.nomeAluno}</strong>
          <span>Período atual: {grade.periodoAtual}º</span>
        </div>
        <span className={classes.pilula}>Semestre {SEMESTRE_ATUAL}</span>
      </div>

      <div className={classes.cartoes}>
        <CartaoResumo rotulo="Disciplinas matriculadas" valor={grade.totalDisciplinas} />
        <CartaoResumo rotulo="Carga horária semanal" valor={`${grade.cargaHorariaSemanal}h`} />
        <CartaoResumo rotulo="Período atual" valor={`${grade.periodoAtual}º`} />
        <Link to="/grade" className={classes.cartaoDestaque}>Ver disciplinas →</Link>
      </div>

      <div className={classes.colunas}>
        <section className={academico.cartao}>
          <h2>Minha semana</h2>
          <p className={classes.descricao}>Resumo das disciplinas matriculadas.</p>
          {grade.turmas.length === 0 ? (
            <p className={academico.vazio}>Você ainda não tem turmas neste semestre.</p>
          ) : (
            <GradeSemanal
              compacta
              turmas={grade.turmas}
              renderTurma={(item) => (
                <>
                  <strong>{item.nomeDisciplina}</strong>
                  <span>{item.nomeProfessor.split(' ')[0]}</span>
                </>
              )}
            />
          )}
          <Link to="/grade" className={classes.verMais}>Ver grade completa →</Link>
        </section>

        <section className={academico.cartao}>
          <h2>Acesso rápido</h2>
          <AcessoRapido to="/matricula" icone={faPlus} titulo="Realizar matrícula" descricao="Consulte turmas disponíveis" cor="roxo" />
          <AcessoRapido to="/grade" icone={faCalendarDays} titulo="Minha grade horária" descricao="Consulte suas turmas ativas" cor="verde" />
          <h3 className={classes.tituloAviso}>Pré-requisitos</h3>
          <div className={classes.aviso}>
            <strong>Antes de se matricular</strong>
            <p>Confira se você concluiu os pré-requisitos das disciplinas desejadas.</p>
          </div>
        </section>
      </div>
    </>
  );
};

export default VisaoGeralAluno;
