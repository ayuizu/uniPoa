import axios from 'axios';

// Em desenvolvimento, o Vite encaminha /api para o back-end (ver vite.config.js)
const api = axios.create({ baseURL: '/api' });

export const SEMESTRE_ATUAL = '2026/1';

// Extrai a mensagem de erro enviada pelo back-end (ResponseStatusException)
export function mensagemErro(error) {
  const status = error.response?.status;
  if (error.response?.data?.message) return error.response.data.message;
  if (!error.response || status === 500 || status === 502 || status === 504) {
    return 'Não foi possível conectar ao servidor. Verifique se o back-end está rodando.';
  }
  return 'Ocorreu um erro inesperado. Tente novamente.';
}

const dados = (response) => response.data;

// Acadêmico
export const listarAlunos = () => api.get('/academico/alunos').then(dados);
export const listarProfessores = () => api.get('/academico/professores').then(dados);
export const listarDisciplinas = () => api.get('/academico/disciplinas').then(dados);

// Turmas
export const listarTurmas = (idAluno) =>
  api.get('/turmas', { params: { semestre: SEMESTRE_ATUAL, idAluno } }).then(dados);

export const criarTurma = (turma) =>
  api.post('/turmas', { ...turma, semestre: SEMESTRE_ATUAL }).then(dados);

export const consultarGradeProfessor = (idProfessor) =>
  api.get(`/turmas/professor/${idProfessor}`, { params: { semestre: SEMESTRE_ATUAL } }).then(dados);

// Matrículas
export const matricular = (idAluno, idsTurmas) =>
  api.post('/matriculas/criar', { idAluno, idsTurmas }).then(dados);

export const consultarGradeAluno = (idAluno) =>
  api.get(`/matriculas/aluno/${idAluno}`, { params: { semestre: SEMESTRE_ATUAL } }).then(dados);

export const cancelarMatricula = (idMatricula) => api.delete(`/matriculas/${idMatricula}`);
