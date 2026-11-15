import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './VisaoGeral.module.css';

// Atalho colorido para outra página. cor: 'roxo' ou 'verde'
const AcessoRapido = ({ to, icone, titulo, descricao, cor = 'roxo' }) => {
  return (
    <Link to={to} className={`${classes.acesso} ${classes[cor]}`}>
      <span className={classes.acessoIcone}><FontAwesomeIcon icon={icone} /></span>
      <span>
        <strong>{titulo}</strong>
        <small>{descricao}</small>
      </span>
    </Link>
  );
};

export default AcessoRapido;
