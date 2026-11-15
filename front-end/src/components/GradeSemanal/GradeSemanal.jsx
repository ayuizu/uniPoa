import classes from './GradeSemanal.module.css';
import { DIAS, TURNOS, montarHorario } from '../horario';

// Grade semanal: colunas = dias da semana, linhas = turnos. renderTurma desenha o conteúdo de cada turma na célula
const GradeSemanal = ({ turmas, renderTurma }) => {
  return (
    <div className={classes.wrapper}>
      <table className={classes.grade}>
        <thead>
          <tr>
            <th className={classes.colunaHorario}>Horário</th>
            {DIAS.map((dia) => <th key={dia.codigo}>{dia.nome}</th>)}
          </tr>
        </thead>
        <tbody>
          {TURNOS.map((turno) => (
            <tr key={turno.codigo}>
              <th scope="row" className={classes.colunaHorario}>{turno.faixa}</th>
              {DIAS.map((dia) => {
                const horario = montarHorario(dia.codigo, turno.codigo);
                return (
                  <td key={dia.codigo}>
                    {turmas
                      .filter((turma) => turma.horario === horario)
                      .map((turma, i) => (
                        <div key={i} className={classes.turma}>{renderTurma(turma)}</div>
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
