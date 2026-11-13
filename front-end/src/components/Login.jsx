import { useNavigate } from 'react-router-dom';
import classes from './Login.module.css';

const Login = () => {
  const navigate = useNavigate();

  const handleLoginAluno = () => {
    localStorage.setItem('isAdmin', 'false');
    navigate('/user'); // Ajuste para a rota inicial do aluno, se necessário
  };

  const handleLoginAdmin = () => {
    localStorage.setItem('isAdmin', 'true');
    navigate('/profile'); // Ajuste para a rota inicial do administrador, se necessário
  };

  return (
    <div className={classes.content}>
      <h1 className={classes.loginTitle}>Acesso ao Portal UniPOA</h1>
      <p className={classes.loginSubtitle}>Selecione o perfil para continuar:</p>

      <div className={classes.cardsContainer}>
        <div className={classes.cardLogin}>
          <h2>Aluno</h2>
          <p>
            Acesse sua grade curricular, realize matrícula, rematrícula e
            acompanhe suas disciplinas.
          </p>
          <button
            type="button"
            className={classes.btnLogin}
            onClick={handleLoginAluno}
          >
            Entrar como aluno
          </button>
        </div>

        <div className={classes.cardLogin}>
          <h2>Administrador</h2>
          <p>
            Gerencie turmas, disciplinas, vagas e cadastros acadêmicos da
            universidade.
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