import classes from "./Menu.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { secoesDoPerfil } from "./navegacao";
import { sair } from "../services/sessao";

const SidebarLink = styled(NavLink)`
  text-decoration: none;
  color: #344054;
  padding: 8px 12px;
  border-radius: 8px;
  display: block;

  &.active {
    background-color: #d3f0e5;
    color: var(--color3);
    font-weight: 600;
  }

  @media only screen and (max-width: 769px){
    padding: 3px;
  }
`;


const Menu = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sair();
    navigate('/');
  };

  return (
    <div className={classes.menuContainer}>
      {secoesDoPerfil().map((secao) => (
        <div key={secao.titulo}>
          <h3>{secao.titulo}</h3>
          <ul>
            {secao.links.map((link) => (
              <li key={link.to}><SidebarLink className={({ isActive }) => isActive ? 'active' : ''} to={link.to}>{link.texto}</SidebarLink></li>
            ))}
          </ul>
        </div>
      ))}
      <button type="button" className={classes.sair} onClick={handleLogout}>Sair da conta</button>
    </div>
  );
};

export default Menu;
