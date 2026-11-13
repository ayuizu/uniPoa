// 20/10 Ayumi: falta direcionar corretamente os Links
import classes from "./Header.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faStethoscope, faCapsules, faSyringe, faHeartPulse, faWeightScale, faCalendar, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const HeaderIn = () => {

  const navigate = useNavigate();

  const [menuActive, setMenuActive] = useState(false); // Estado para controlar o menu
  const handleMenuToggle = () => {
    setMenuActive((prev) => !prev); // Alterna o estado
  };

  const handleLogout = () => {
    // Remove o token do localStorage
    localStorage.removeItem('token');
    // Redireciona para a página de login
    navigate('/login');
  };

  return (
    <header>
      <div className={classes.headerLogo}>
      <Link to="/user">
          <h1>UniPOA</h1>
          </Link>
      </div>
      <div className={classes.headerNav}>
        <button className={classes.menuToggle} onClick={handleMenuToggle} ><FontAwesomeIcon className={classes.icon} icon={faBars} /></button>
        <nav className={ menuActive ? `${classes.active}` : ""}>
          <ul className={classes.divButtons}>
            <li><button className={classes.toggleLink}><Link to="/symptoms"><FontAwesomeIcon className={classes.icon} icon={faStethoscope} /> Sintomas</Link></button></li>
            <li><button className={classes.toggleLink}><Link to="/medicines"><FontAwesomeIcon className={classes.icon} icon={faCapsules} /> Medicamentos</Link></button></li>
            <li><button className={classes.toggleLink}><Link to="/vaccines"><FontAwesomeIcon className={classes.icon} icon={faSyringe} /> Vacinas</Link></button></li>
            <li><button className={classes.toggleLink}><Link to="/bloodPressure"><FontAwesomeIcon className={classes.icon} icon={faHeartPulse} /> Pressão arterial</Link></button></li>
            <li><button className={classes.toggleLink}><Link to="/weight"><FontAwesomeIcon className={classes.icon} icon={faWeightScale} /> Peso</Link></button></li>
            <li><button className={classes.toggleLink}><Link to="/appointments"><FontAwesomeIcon className={classes.icon} icon={faCalendar} /> Consultas</Link></button></li>
            <li><button id={classes.buttonPurple}><Link className={classes.headerLink} to="/profile">Meu Perfil</Link></button></li>
            <li><button id={classes.buttonGreen} type='button' onClick={()=>handleLogout()}><Link className={classes.headerLink} to="/">Sair<FontAwesomeIcon className={classes.icon} icon={faArrowRightFromBracket} /></Link></button></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default HeaderIn;
