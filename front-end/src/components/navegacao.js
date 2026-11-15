import { faListCheck, faCalendarDays, faChalkboard, faChalkboardUser } from "@fortawesome/free-solid-svg-icons";
import { isAdmin } from "../services/sessao";

// Links da área logada, compartilhados pelo HeaderIn e pelo Menu lateral
export function linksDoPerfil() {
  return isAdmin()
    ? [
        { to: "/turmas", texto: "Turmas", icone: faChalkboard },
        { to: "/grade-professor", texto: "Grade por professor", icone: faChalkboardUser },
      ]
    : [
        { to: "/matricula", texto: "Matrícula", icone: faListCheck },
        { to: "/grade", texto: "Minha grade", icone: faCalendarDays },
      ];
}

export const paginaInicialDoPerfil = () => (isAdmin() ? "/turmas" : "/matricula");
