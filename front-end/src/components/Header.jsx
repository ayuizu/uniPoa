// 20/10 Ayumi: falta formatar o <Link>

import classes from "./Header.module.css";
import { useState } from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";


function Header() {
  const [menuActive, setMenuActive] = useState(false); // Estado para controlar o menu
  
  const handleMenuToggle = () => {
    setMenuActive((prev) => !prev); // Alterna o estado
  };

  return (
    <header>
      <div className={classes.headerLogo}>
      <Link to="/">
          <h1>UniPOA</h1>
          </Link>
      </div>
      <div className={classes.headerNav}>
      <button className={classes.menuToggle} onClick={handleMenuToggle} ><FontAwesomeIcon className={classes.icon} icon={faBars} /></button>
      <nav className={ menuActive ? `${classes.active}` : ""}>
          <ul className={classes.divButtons}>
            <li><button className={classes.headerButton}><Link className={classes.headerLink} to="/about">Sobre</Link></button></li>
            <li><button className={classes.headerButton}><Link className={classes.headerLink} to="/contact">Contato</Link></button></li>
            <li><button className={classes.headerButton}><Link className={classes.headerLink} to="/faq">FAQ</Link></button></li>
            <li><button id={classes.buttonPurple}><Link to="/login">Login</Link></button></li>
            <li><button id={classes.buttonGreen}><Link to="/register">Cadastre-se</Link></button></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
export default Header;
