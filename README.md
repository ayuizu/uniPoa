# Portal de Matrículas — UniPOA

Este projeto foi desenvolvido como parte da avaliação da disciplina Desenvolvimento Front-End da Unisinos (2026/02) pelos alunos Adrianne Izu, [], [], [] e [].

O objetivo do projeto é desenvolver uma aplicação web que centralize e simplifique o processo de matrícula e gestão acadêmica dos estudantes da universidade **UniPOA**, tornando o acompanhamento curricular mais ágil e organizado. As principais funcionalidades desenvolvidas incluem:
a) Visão do aluno:
- Realização de matrícula
- Consulta e seleção de disciplinas disponíveis no semestre
- Visualização de grade horária
b) Visão institucional:
- Criação de turmas
- Visualização de grade horária por professor

---

## Tecnologias Utilizadas

### Front-End
##### Linguagens e Bibliotecas:
- HTML
- CSS
- JavaScript
- React
  - Vite para inicialização e build do projeto
  - Axios para requisições HTTP à API
  - React Router para gerenciamento de rotas
  - CSS Modules / Styled Components para estilização

##### Softwares
- IDE: Visual Studio Code

### Back-End
##### Linguagens e Frameworks:
- Java 17
- Spring Framework
  - Spring Boot
  - Lombok para geração de Getters, Setters e Construtores
  - Spring Security para autenticação e autorização com Token JWT (JSON Web Token)
  - Spring Validation para validação de dados e regras de negócio
  - Spring Web para comunicação REST entre Front-End e Back-End

##### Softwares
- IDE: IntelliJ IDEA
- Bruno e Postman para testar endpoints (requisições)

### Banco de Dados
##### Linguagem:
- MySQL

![ERM](./assets/unipoa_ERM.png)

##### Softwares:
- MySQL Workbench para modelagem do banco de dados
- Docker para conteinerização do banco de dados

---

## Deploy Local

1. **Clone o repositório:**
   ```bash
   git clone <LINK_DESTE_REPOSITORIO>