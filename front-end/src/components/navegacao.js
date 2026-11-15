import { faHouse, faListCheck, faCalendarDays, faChalkboard, faChalkboardUser } from "@fortawesome/free-solid-svg-icons";
import { isAdmin } from "../services/sessao";

// Seções do menu da área logada (Menu lateral e HeaderIn no celular). Só entram páginas que já existem
export function secoesDoPerfil() {
  return isAdmin()
    ? [
        {
          titulo: "Institucional",
          links: [
            { to: "/user", texto: "Visão geral", icone: faHouse },
            { to: "/turmas", texto: "Gerenciar turmas", icone: faChalkboard },
            { to: "/grade-professor", texto: "Grade por professor", icone: faChalkboardUser },
          ],
        },
      ]
    : [
        {
          titulo: "Portal do aluno",
          links: [{ to: "/user", texto: "Visão geral", icone: faHouse }],
        },
        {
          titulo: "Vida acadêmica",
          links: [
            { to: "/matricula", texto: "Realizar matrícula", icone: faListCheck },
            { to: "/grade", texto: "Minha grade horária", icone: faCalendarDays },
          ],
        },
      ];
}

export const linksDoPerfil = () => secoesDoPerfil().flatMap((secao) => secao.links);

export const paginaInicialDoPerfil = () => "/user";
