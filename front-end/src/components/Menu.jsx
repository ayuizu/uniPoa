import classes from "./Menu.module.css";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { linksDoPerfil } from "./navegacao";
import { isAdmin, nomeUsuario } from "../services/sessao";

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
      <h2>{isAdmin() ? "Área Administrativa" : "Área do Aluno"}</h2>
      <p className={classes.usuario}>{nomeUsuario()}</p>
        <ul>
          {linksDoPerfil().map((link) => (
            <li key={link.to}><SidebarLink className={({ isActive }) => isActive ? 'active' : ''} to={link.to}><FontAwesomeIcon className={classes.icon} icon={link.icone} /> {link.texto}</SidebarLink></li>
          ))}
      </ul>
    </div>
  );
};

export default Menu;
