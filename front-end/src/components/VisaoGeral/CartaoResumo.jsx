import classes from './VisaoGeral.module.css';

// Cartão com um número de destaque. Ex.: "Disciplinas matriculadas: 5"
const CartaoResumo = ({ rotulo, valor, detalhe }) => {
  return (
    <div className={classes.cartaoResumo}>
      <span className={classes.rotulo}>{rotulo}</span>
      <div>
        <strong>{valor}</strong>
        {detalhe && <small>{detalhe}</small>}
      </div>
    </div>
  );
};

export default CartaoResumo;
