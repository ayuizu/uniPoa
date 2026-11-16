import classes from './GradeSemanal.module.css';
import { DIAS, TURNOS, montarHorario } from '../horario';

// Grade semanal: colunas = dias da semana, linhas = turnos. renderTurma desenha o conteúdo de cada turma na célula
// compacta: versão menor, com dias abreviados (usada na Visão geral)

// Cada disciplina recebe sempre a mesma cor
const CORES = ['roxo', 'verde', 'azul', 'rosa', 'laranja', 'turquesa'];

const GradeSemanal = ({ turmas, renderTurma, compacta = false }) => {
  return (
    <div className={classes.wrapper}>
      <table className={`${classes.grade} ${compacta ? classes.compacta : ''}`}>
        <thead>
          <tr>
            <th className={classes.colunaHorario}>Horário</th>
            {DIAS.map((dia) => <th key={dia.codigo}>{compacta ? dia.sigla : dia.nome}</th>)}
          </tr>
        </thead>
        <tbody>
          {TURNOS.map((turno) => (
            <tr key={turno.codigo}>
              <th scope="row" className={classes.colunaHorario}>{turno.curta}</th>
              {DIAS.map((dia) => {
                const horario = montarHorario(dia.codigo, turno.codigo);
                return (
                  <td key={dia.codigo}>
                    {turmas
                      .filter((turma) => turma.horario === horario)
                      .map((turma, i) => (
                        <div key={i} className={`${classes.turma} ${classes[CORES[turma.idDisciplina % CORES.length]]}`}>{renderTurma(turma)}</div>
                      ))}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GradeSemanal;
