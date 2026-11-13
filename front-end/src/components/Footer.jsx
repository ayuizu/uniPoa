import Logo from "../assets/logo.png";
import classes from "./Footer.module.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faTelegram } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer>
      <div className={classes.footer}>
        <div className={classes.footerIcons}>
          <img src={Logo} alt="Health Card" />
        </div>
        <div className={classes.contentInfo}>
          <div className={classes.contentDiv}>
            <ul>
              <li><a className={classes.link} href="/">Home</a></li>
              <li><a className={classes.link} href="/about">Sobre</a></li>
              <li><a className={classes.link} href="/contact">Contato</a></li>
              <li><a className={classes.link} href="/faq">FAQ</a></li>
            </ul>
          </div>
          <div className={classes.contentDiv}>
            <ul>
              <li><a className={classes.link} href="/login">Login</a></li>
              <li><a className={classes.link} href="/register">Cadastre-se</a></li>
            </ul>
            <div className={classes.contactIconsDiv}>
              <a href="#" className={`${classes.contactIcon} ${classes.link}`}><FontAwesomeIcon icon={faWhatsapp} style={{color: "#1C4650",}} size="xl" /></a>
              <a href="#" className={`${classes.contactIcon} ${classes.link}`}><FontAwesomeIcon icon={faTelegram} style={{color: "#1C4650",}} size="xl" /> </a>
              <a href="#" className={`${classes.contactIcon} ${classes.link}`}><FontAwesomeIcon icon={faInstagram} style={{color: "#1C4650",}} size="xl" /> </a>
              <a href="#" className={`${classes.contactIcon} ${classes.link}`}><FontAwesomeIcon icon={faXTwitter} style={{color: "#1C4650",}} size="xl" /> </a>
            </div>
          </div>

          <p className={classes.copyrightText}>
            Copyright © 2026 UniPOA. Todos os direitos reservados.
          </p>
          
        </div>
      </div>
    </footer>
  );
}

export default Footer;
