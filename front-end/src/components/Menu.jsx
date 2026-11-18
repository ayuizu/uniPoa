import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import classes from "./Menu.module.css";
import { secoesDoPerfil } from "../utils/navegacao";
import { sair } from "../services/sessao";

const Menu = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sair();
    navigate("/");
  };

  return (
    <nav className={classes.menuContainer} aria-label="Menu lateral">
      {secoesDoPerfil().map((secao) => (
        <div key={secao.titulo} className={classes.secao}>
          <h3>{secao.titulo}</h3>
          <ul>
            {secao.links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    isActive
                      ? `${classes.sidebarLink} ${classes.active}`
                      : classes.sidebarLink
                  }
                >
                  {link.icone && (
                    <FontAwesomeIcon
                      icon={link.icone}
                      className={classes.icone}
                    />
                  )}
                  <span>{link.texto}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <button type="button" className={classes.sair} onClick={handleLogout}>
        <FontAwesomeIcon
          icon={faRightFromBracket}
          className={classes.icone}
        />
        <span>Sair da conta</span>
      </button>
    </nav>
  );
};

export default Menu;