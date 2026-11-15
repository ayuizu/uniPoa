import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Login.module.css';
import { listarAlunos, mensagemErro } from '../services/api';
import { entrarComoAluno, entrarComoAdmin } from '../services/sessao';

const Login = () => {
  const navigate = useNavigate();

  // Sem autenticação: o aluno só escolhe com qual cadastro quer entrar
  const [alunos, setAlunos] = useState([]);
  const [idAluno, setIdAluno] = useState('');
  const [erro, setErro] = useState('');

  useEffect(() => {
    listarAlunos()
      .then((lista) => {
        setAlunos(lista);
        if (lista.length > 0) setIdAluno(String(lista[0].id));
      })
      .catch((error) => setErro(mensagemErro(error)));
  }, []);

  const handleLoginAluno = () => {
    const aluno = alunos.find((a) => String(a.id) === idAluno);
    entrarComoAluno(aluno);
    navigate('/matricula');
  };

  const handleLoginAdmin = () => {
    entrarComoAdmin();
    navigate('/turmas');
  };

  return (
    <div className={classes.content}>
      <h1 className={classes.loginTitle}>Acesso ao Portal UniPOA</h1>
      <p className={classes.loginSubtitle}>Selecione o perfil para continuar:</p>

      <div className={classes.cardsContainer}>
        <div className={classes.cardLogin}>
          <h2>Aluno</h2>
          <p>
            Realize sua matrícula nas turmas do semestre e acompanhe sua
            grade horária.
          </p>
          {erro ? (
            <p className={classes.erro}>{erro}</p>
          ) : (
            <select
              className={classes.selectAluno}
              aria-label="Aluno"
              value={idAluno}
              onChange={(e) => setIdAluno(e.target.value)}
            >
              {alunos.map((aluno) => (
                <option key={aluno.id} value={aluno.id}>
                  {aluno.nome} {aluno.sobrenome} ({aluno.periodoAtual}º período)
                </option>
              ))}
            </select>
          )}
          <button
            type="button"
            className={classes.btnLogin}
            onClick={handleLoginAluno}
            disabled={!idAluno}
          >
            Entrar como aluno
          </button>
        </div>

        <div className={classes.cardLogin}>
          <h2>Administrador</h2>
          <p>
            Crie turmas para matrícula e consulte a grade horária de cada
            professor.
          </p>
          <button
            type="button"
            className={classes.btnLogin}
            onClick={handleLoginAdmin}
          >
            Entrar como administrador
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
