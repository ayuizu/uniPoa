// Sessão simples no localStorage: o enunciado pede login sem autenticação (só escolher o perfil)

export function entrarComoAluno(aluno) {
  localStorage.setItem('isAdmin', 'false');
  localStorage.setItem('idAluno', String(aluno.id));
  localStorage.setItem('nomeUsuario', `${aluno.nome} ${aluno.sobrenome}`);
}

export function entrarComoAdmin() {
  localStorage.setItem('isAdmin', 'true');
  localStorage.removeItem('idAluno');
  localStorage.setItem('nomeUsuario', 'Administrador');
}

export function sair() {
  localStorage.removeItem('isAdmin');
  localStorage.removeItem('idAluno');
  localStorage.removeItem('nomeUsuario');
}

export const estaLogado = () => localStorage.getItem('isAdmin') !== null;
export const isAdmin = () => localStorage.getItem('isAdmin') === 'true';
export const idAlunoLogado = () => Number(localStorage.getItem('idAluno')) || null;
export const nomeUsuario = () => localStorage.getItem('nomeUsuario') ?? '';
