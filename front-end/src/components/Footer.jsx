import { Link } from 'react-router-dom';
import classes from './Footer.module.css';

function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes.mainArea}>
        <div className={classes.identity}>
          <h2>UniPOA</h2>
          <p>Portal acadêmico para facilitar sua jornada universitária.</p>
        </div>

        <nav className={classes.navigation} aria-label="Navegação do rodapé">
          <ul>
            <li><Link className={classes.link} to="/about">Sobre</Link></li>
            <li><Link className={classes.link} to="/contact">Contato</Link></li>
            <li><Link className={classes.link} to="/faq">FAQ</Link></li>
          </ul>
        </nav>
      </div>

      <div className={classes.footerBottom}>
        <p>© 2026 UniPOA. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
