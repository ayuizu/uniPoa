// Falta ajustar os links

import classes from "./Menu.module.css";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStethoscope, faCapsules, faSyringe, faHeartPulse, faWeightScale, faCalendar } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const SidebarLink = styled(NavLink)`
  text-decoration: none;
  color: #333;
  padding: 10px;
  display: block;

  &.active {
    color: var(--color1);
    font-size: 1.125rem;
  }

  @media only screen and (max-width: 769px){
    padding: 3px;
  }
`;


const Menu = () => {

  return (
    <div className={classes.menuContainer}>
      <h2>Meus Dados de Saúde </h2>
        <ul>
          <li><SidebarLink className={({ isActive }) => isActive ? 'active' : ''} to="/symptoms"><FontAwesomeIcon className={classes.icon} icon={faStethoscope} /> Sintomas</SidebarLink></li>
          <li><SidebarLink className={({ isActive }) => isActive ? 'active' : ''} to="/medicines"><FontAwesomeIcon className={classes.icon} icon={faCapsules} /> Medicamentos</SidebarLink></li>
          <li><SidebarLink className={({ isActive }) => isActive ? 'active' : ''} to="/vaccines"><FontAwesomeIcon className={classes.icon} icon={faSyringe} /> Vacinas</SidebarLink></li>
          <li><SidebarLink className={({ isActive }) => isActive ? 'active' : ''} to="/bloodPressure"><FontAwesomeIcon className={classes.icon} icon={faHeartPulse} /> Pressão arterial</SidebarLink></li>
          <li><SidebarLink className={({ isActive }) => isActive ? 'active' : ''} to="/weight"><FontAwesomeIcon className={classes.icon} icon={faWeightScale} /> Peso</SidebarLink></li>
          <li><SidebarLink className={({ isActive }) => isActive ? 'active' : ''} to="/appointments"><FontAwesomeIcon className={classes.icon} icon={faCalendar} /> Consultas</SidebarLink></li>
      </ul>
    </div>
  );
};

export default Menu;