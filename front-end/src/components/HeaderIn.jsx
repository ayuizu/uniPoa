import classes from "./Header.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { linksDoPerfil, paginaInicialDoPerfil } from "../utils/navegacao";
import { sair, nomeUsuario, descricaoUsuario, iniciais } from "../services/sessao";

const HeaderIn = () => {

  const navigate = useNavigate();

  const [menuActive, setMenuActive] = useState(false); // Estado para controlar o menu
  const handleMenuToggle = () => {
    setMenuActive((prev) => !prev); // Alterna o estado
  };

  const handleLogout = () => {
    sair();
    navigate('/');
  };

  return (
    <header className={classes.headerIn}>
      <div className={classes.headerLogo}>
      <Link to={paginaInicialDoPerfil()}>
          <h1>UniPOA</h1>
          </Link>
          <span className={classes.headerSubtitulo}>Portal de Matrículas</span>
      </div>
      <div className={classes.headerNav}>
        <div className={classes.usuario}>
          <span className={classes.avatar}>{iniciais(nomeUsuario())}</span>
          <div>
            <strong>{nomeUsuario()}</strong>
            <span>{descricaoUsuario()}</span>
          </div>
        </div>
        <button className={classes.menuToggle} onClick={handleMenuToggle} ><FontAwesomeIcon className={classes.icon} icon={faBars} /></button>
        <nav className={`${classes.navMobile} ${menuActive ? classes.active : ""}`}>
          <ul className={classes.divButtons}>
            {linksDoPerfil().map((link) => (
              <li key={link.to}><button className={classes.toggleLink}><Link to={link.to}><FontAwesomeIcon className={classes.icon} icon={link.icone} /> {link.texto}</Link></button></li>
            ))}
            {/* No computador o "Sair da conta" fica no menu lateral */}
            <li className={classes.somenteMobile}><button id={classes.buttonGreen} type='button' onClick={handleLogout}><span className={classes.headerLink}>Sair <FontAwesomeIcon className={classes.icon} icon={faArrowRightFromBracket} /></span></button></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default HeaderIn;
