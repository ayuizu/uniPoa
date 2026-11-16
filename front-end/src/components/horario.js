// Código de horário da turma: primeiro dígito = dia da semana (2 a 6), segundo = turno (1 a 6). Ex.: 21 = segunda, 08:00-10:00

export const DIAS = [
  { codigo: 2, nome: 'Segunda', sigla: 'Seg' },
  { codigo: 3, nome: 'Terça', sigla: 'Ter' },
  { codigo: 4, nome: 'Quarta', sigla: 'Qua' },
  { codigo: 5, nome: 'Quinta', sigla: 'Qui' },
  { codigo: 6, nome: 'Sexta', sigla: 'Sex' },
];

export const TURNOS = [
  { codigo: 1, faixa: '08:00 – 10:00', curta: '08–10h' },
  { codigo: 2, faixa: '10:00 – 12:00', curta: '10–12h' },
  { codigo: 3, faixa: '13:00 – 15:00', curta: '13–15h' },
  { codigo: 4, faixa: '15:00 – 17:00', curta: '15–17h' },
  { codigo: 5, faixa: '18:00 – 20:00', curta: '18–20h' },
  { codigo: 6, faixa: '20:00 – 22:00', curta: '20–22h' },
];

export const montarHorario = (dia, turno) => dia * 10 + turno;

export function descreverHorario(horario) {
  const dia = DIAS.find((d) => d.codigo === Math.floor(horario / 10));
  const turno = TURNOS.find((t) => t.codigo === horario % 10);
  return dia && turno ? `${dia.nome}, ${turno.faixa}` : `Horário ${horario}`;
}

// Versão curta para tabelas e cartões. Ex.: 21 -> "Seg · 08–10h"
export function descreverHorarioCurto(horario) {
  const dia = DIAS.find((d) => d.codigo === Math.floor(horario / 10));
  const turno = TURNOS.find((t) => t.codigo === horario % 10);
  return dia && turno ? `${dia.sigla} · ${turno.curta}` : `Horário ${horario}`;
}
