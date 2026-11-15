// Código de horário da turma: primeiro dígito = dia da semana (2 a 6), segundo = turno (1 a 6). Ex.: 21 = segunda, 08:00-10:00

export const DIAS = [
  { codigo: 2, nome: 'Segunda' },
  { codigo: 3, nome: 'Terça' },
  { codigo: 4, nome: 'Quarta' },
  { codigo: 5, nome: 'Quinta' },
  { codigo: 6, nome: 'Sexta' },
];

export const TURNOS = [
  { codigo: 1, faixa: '08:00 – 10:00' },
  { codigo: 2, faixa: '10:00 – 12:00' },
  { codigo: 3, faixa: '13:00 – 15:00' },
  { codigo: 4, faixa: '15:00 – 17:00' },
  { codigo: 5, faixa: '18:00 – 20:00' },
  { codigo: 6, faixa: '20:00 – 22:00' },
];

export const montarHorario = (dia, turno) => dia * 10 + turno;

export function descreverHorario(horario) {
  const dia = DIAS.find((d) => d.codigo === Math.floor(horario / 10));
  const turno = TURNOS.find((t) => t.codigo === horario % 10);
  return dia && turno ? `${dia.nome}, ${turno.faixa}` : `Horário ${horario}`;
}
