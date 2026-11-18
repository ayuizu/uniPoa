# Portal de Matrículas — UniPOA

Este projeto foi desenvolvido como parte da avaliação da disciplina Desenvolvimento Front-End da Unisinos (2026/02) pelos alunos ADRIANNE AYUMI IZU, EMILLY KENNIELI PIMENTEL DA SILVA e GUSTAVO SANDRIN DATTEIN.

Veja mais sobre as especificações em [Documentação](./ESPECIFICACOES.md)

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
  - Spring Validation para validação de dados e regras de negócio
  - Spring Web para comunicação REST entre Front-End e Back-End

##### Softwares
- IDE: IntelliJ IDEA

### Banco de Dados
##### Linguagem:
- MySQL

##### Softwares:
- MySQL Workbench para modelagem do banco de dados
- Docker para conteinerização do banco de dados

---

# Portal de Matrículas — UniPOA

Este projeto foi desenvolvido como parte da avaliação da disciplina Desenvolvimento Front-End da Unisinos (2026/02) pelos alunos Adrianne Ayumi Izu, Emilly Kennieli Pimentel da Silva e Gustavo Sandrin Dattein.

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
  - Spring Validation para validação de dados e regras de negócio
  - Spring Web para comunicação REST entre Front-End e Back-End

##### Softwares
- IDE: IntelliJ IDEA
- Bruno e Postman para testar endpoints (requisições)

### Banco de Dados
##### Linguagem:
- MySQL

##### Softwares:
- MySQL Workbench para modelagem do banco de dados
- Docker para conteinerização do banco de dados

### APIs
Veja mais sobre as APIs na [Documentação da API](./APIDOC.md)

---

## Deploy Local

### Pré-requisitos
* **Docker** e **Docker Compose** instalados e em execução
* **Java JDK 17+**
* **Node.js 18+** e **npm**

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/ayuizu/uniPoa
   cd uniPoa
   ```

### Conectando
1. Como rodar o banco de dados (MySQL via Docker)
   ```bash
    cd back-end/docker
    docker compose up -d
    ```

      Para resetar o banco e rodar do zero use
    ```bash
    cd back-end/docker
    docker compose down -v && docker compose up -d
    ```
      
2. Como rodar o back-end (Spring Boot)
   ```bash
    cd back-end
    ./mvnw spring-boot:run
    ```
    Ou
    ```PowerShell
    cd back-end
    .\mvnw.cmd spring-boot:run
    ```
    Para validar rapidamente no navegador: http://localhost:8080/api/turmas

3. Como rodar o front-end (React + Vite)
    ```bash
    cd front-end
    npm install
    npm run dev
    ```

### Desconectando
1. Como descontactar front-end

  Vá até o terminal e digite
    ```
    Ctrl + C
    ```

2. Como descontectar back-end

  Vá até o terminal e digite
    ```
    Ctrl + C
    ```

3. Como desconectar o banco de dados

      a. Apenas parar o banco
      ```bash
      cd back-end/docker
      docker compose stop
      ```

      b. Parar e remover o container
      ```bash
      cd back-end/docker
      docker compose down
      ```

      c. Parar e apagar tudo
      ```bash
      cd back-end/docker
      docker compose down -v
      ```
