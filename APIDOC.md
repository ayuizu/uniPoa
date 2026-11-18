# Documentação da API REST — Portal de Matrículas UniPOA

**Base URL:** `http://localhost:8080`

---

## 1. Turmas (`TurmaController` — `/api/turmas`)

### 1.1. Listar Turmas Disponíveis (UC01 / UC03)
Retorna as turmas ofertadas em um semestre, calculando vagas disponíveis, lista de pré-requisitos e indicando se um aluno específico possui elegibilidade para cursá-la.

* **Método:** `GET`
* **Endpoint:** `/api/turmas`
* **Query Params:**
  * `semestre` *(String, opcional, padrão: `"2026/1"`)* — Semestre letivo desejado.
  * `idAluno` *(Long, opcional)* — ID do aluno para avaliar se ele já cumpriu os pré-requisitos (`elegivel`).
* **Request Body:** *Nenhum*

#### Saída (`200 OK`)
```json
[
  {
    "id": 4,
    "idDisciplina": 5,
    "nomeDisciplina": "Programação Orientada a Objetos",
    "periodoDisciplina": 3,
    "nomeProfessor": "Carlos Mendes",
    "horario": 25,
    "vagasMax": 30,
    "vagasDisponiveis": 27,
    "semestre": "2026/1",
    "preRequisitos": [
      "Estruturas de Dados"
    ],
    "elegivel": true
  },
  {
    "id": 7,
    "idDisciplina": 7,
    "nomeDisciplina": "Desenvolvimento Web Full-Stack",
    "periodoDisciplina": 3,
    "nomeProfessor": "Ricardo Almeida",
    "horario": 56,
    "vagasMax": 20,
    "vagasDisponiveis": 9,
    "semestre": "2026/1",
    "preRequisitos": [
      "Banco de Dados I",
      "Programação Orientada a Objetos"
    ],
    "elegivel": false
  }
]
```

---

### 1.2. Criar Nova Turma (UC03)
Cadastra uma nova turma no sistema validando quantidade de vagas (`> 0`), código de horário (`21` a `66`) e conflito de horário do professor no mesmo semestre.

* **Método:** `POST`
* **Endpoint:** `/api/turmas/criar`
* **Path / Query Params:** *Nenhum*
* **Request Body (`CriarTurmaDTO`):**
```json
{
  "idProfessor": 1,
  "idDisciplina": 2,
  "horario": 32,
  "vagasMax": 30,
  "semestre": "2026/1"
}
```

#### Saída (`201 Created`)
```json
{
  "id": 21,
  "professor": {
    "id": 1,
    "nome": "Carlos",
    "sobrenome": "Mendes",
    "createdAt": "2026-03-01T10:00:00Z",
    "updatedAt": "2026-03-01T10:00:00Z"
  },
  "disciplina": {
    "id": 2,
    "nome": "Matemática Discreta",
    "periodo": 1,
    "createdAt": "2026-03-01T10:00:00Z",
    "updatedAt": "2026-03-01T10:00:00Z"
  },
  "horario": 32,
  "vagasMax": 30,
  "semestre": "2026/1",
  "createdAt": "2026-03-10T14:22:00Z",
  "updatedAt": "2026-03-10T14:22:00Z"
}
```

---

### 1.3. Consultar Grade Horária e Carga Horária do Professor (UC04)
Retorna todas as turmas alocadas para um professor no semestre e calcula sua carga horária semanal (2h por turma) e semestral (30h por turma).

* **Método:** `GET`
* **Endpoint:** `/api/turmas/professor/{idProfessor}`
* **Path Params:**
  * `idProfessor` *(Long, obrigatório)* — ID do professor.
* **Query Params:**
  * `semestre` *(String, opcional, padrão: `"2026/1"`)* — Semestre letivo.
* **Request Body:** *Nenhum*

#### Saída (`200 OK`)
```json
{
  "idProfessor": 1,
  "nomeProfessor": "Carlos Mendes",
  "cargaHorariaSemanal": 4,
  "cargaHorariaSemestral": 60,
  "turmas": [
    {
      "id": 1,
      "idDisciplina": 1,
      "nomeDisciplina": "Algoritmos e Programação I",
      "periodoDisciplina": 1,
      "nomeProfessor": "Carlos Mendes",
      "horario": 21,
      "vagasMax": 40,
      "vagasDisponiveis": 36,
      "semestre": "2026/1",
      "preRequisitos": [],
      "elegivel": true
    },
    {
      "id": 4,
      "idDisciplina": 5,
      "nomeDisciplina": "Programação Orientada a Objetos",
      "periodoDisciplina": 3,
      "nomeProfessor": "Carlos Mendes",
      "horario": 25,
      "vagasMax": 30,
      "vagasDisponiveis": 27,
      "semestre": "2026/1",
      "preRequisitos": [
        "Estruturas de Dados"
      ],
      "elegivel": true
    }
  ]
}
```

---

## 2. Matrículas (`MatriculaController` — `/api/matriculas`)

### 2.1. Realizar Matrícula em Lote ou Individual (UC01)
Efetiva a matrícula de um aluno em uma ou mais turmas selecionadas, validando pré-requisitos, choque de horário (com turmas atuais e entre as selecionadas), duplicidade de disciplina e disponibilidade de vagas.

* **Método:** `POST`
* **Endpoint:** `/api/matriculas/criar`
* **Path / Query Params:** *Nenhum*
* **Request Body (`RealizarMatriculaDTO`):**
```json
{
  "idAluno": 1,
  "idsTurmas": [4, 6]
}
```

#### Saída (`201 Created`)
```json
[
  {
    "id": 145,
    "aluno": {
      "id": 1,
      "nome": "Mariana",
      "sobrenome": "Silva",
      "periodoAtual": 3
    },
    "turma": {
      "id": 4,
      "horario": 25,
      "vagasMax": 30,
      "semestre": "2026/1"
    },
    "status": "MATRICULADA",
    "createdAt": "2026-03-10T15:00:00Z",
    "updatedAt": "2026-03-10T15:00:00Z"
  },
  {
    "id": 146,
    "aluno": {
      "id": 1,
      "nome": "Mariana",
      "sobrenome": "Silva",
      "periodoAtual": 3
    },
    "turma": {
      "id": 6,
      "horario": 45,
      "vagasMax": 25,
      "semestre": "2026/1"
    },
    "status": "MATRICULADA",
    "createdAt": "2026-03-10T15:00:00Z",
    "updatedAt": "2026-03-10T15:00:00Z"
  }
]
```

---

### 2.2. Consultar Grade Horária do Aluno (UC02)
Retorna os dados do aluno, o total de disciplinas ativas no semestre, carga horária e a lista formatada de turmas matriculadas (com `idMatricula` para permitir o cancelamento).

* **Método:** `GET`
* **Endpoint:** `/api/matriculas/aluno/{idAluno}`
* **Path Params:**
  * `idAluno` *(Long, obrigatório)* — ID do aluno.
* **Query Params:**
  * `semestre` *(String, opcional, padrão: `"2026/1"`)* — Semestre letivo.
* **Request Body:** *Nenhum*

#### Saída (`200 OK`)
```json
{
  "idAluno": 27,
  "nomeAluno": "Arthur Nogueira",
  "periodoAtual": 1,
  "totalDisciplinas": 2,
  "cargaHorariaSemanal": 4,
  "cargaHorariaSemestral": 60,
  "turmas": [
    {
      "idMatricula": 1,
      "idTurma": 1,
      "idDisciplina": 1,
      "nomeDisciplina": "Algoritmos e Programação I",
      "periodoDisciplina": 1,
      "nomeProfessor": "Carlos Mendes",
      "horario": 21,
      "semestre": "2026/1",
      "status": "MATRICULADA"
    },
    {
      "idMatricula": 2,
      "idTurma": 8,
      "idDisciplina": 2,
      "nomeDisciplina": "Matemática Discreta",
      "periodoDisciplina": 1,
      "nomeProfessor": "Juliana Ferreira",
      "horario": 51,
      "semestre": "2026/1",
      "status": "MATRICULADA"
    }
  ]
}
```

---

### 2.3. Cancelar Matrícula (UC02)
Altera o status de uma matrícula ativa para `CANCELADA`, liberando imediatamente a vaga na turma correspondente.

* **Método:** `DELETE`
* **Endpoint:** `/api/matriculas/{idMatricula}`
* **Path Params:**
  * `idMatricula` *(Long, obrigatório)* — ID do registro de matrícula.
* **Query Params / Request Body:** *Nenhum*

#### Saída (`204 No Content`)
*Corpo vazio.*

---

## 3. Dados Acadêmicos Auxiliares (`AcademicoController` — `/api/academico`)

### 3.1. Listar Todos os Professores
Utilizado para popular menus de seleção (`<select>`) nas telas administrativas (UC03 e UC04).

* **Método:** `GET`
* **Endpoint:** `/api/academico/professores`
* **Params / Body:** *Nenhum*

#### Saída (`200 OK`)
```json
[
  {
    "id": 1,
    "nome": "Carlos",
    "sobrenome": "Mendes",
    "createdAt": "2026-03-01T10:00:00Z",
    "updatedAt": "2026-03-01T10:00:00Z"
  },
  {
    "id": 2,
    "nome": "Fernanda",
    "sobrenome": "Costa",
    "createdAt": "2026-03-01T10:00:00Z",
    "updatedAt": "2026-03-01T10:00:00Z"
  }
]
```

---

### 3.2. Listar Todas as Disciplinas
Utilizado para popular o campo de disciplina no formulário de criação de turma (UC03).

* **Método:** `GET`
* **Endpoint:** `/api/academico/disciplinas`
* **Params / Body:** *Nenhum*

#### Saída (`200 OK`)
```json
[
  {
    "id": 1,
    "nome": "Algoritmos e Programação I",
    "periodo": 1,
    "createdAt": "2026-03-01T10:00:00Z",
    "updatedAt": "2026-03-01T10:00:00Z"
  },
  {
    "id": 2,
    "nome": "Matemática Discreta",
    "periodo": 1,
    "createdAt": "2026-03-01T10:00:00Z",
    "updatedAt": "2026-03-01T10:00:00Z"
  }
]
```

---

### 3.3. Buscar Dados de um Aluno
Retorna as informações cadastrais de um aluno específico para exibição no cabeçalho do portal.

* **Método:** `GET`
* **Endpoint:** `/api/academico/alunos/{id}`
* **Path Params:**
  * `id` *(Long, obrigatório)* — ID do aluno.
* **Query Params / Request Body:** *Nenhum*

#### Saída (`200 OK`)
```json
{
  "id": 1,
  "nome": "Mariana",
  "sobrenome": "Silva",
  "periodoAtual": 3,
  "createdAt": "2026-03-01T10:00:00Z",
  "updatedAt": "2026-03-01T10:00:00Z"
}
```

---

## 4. Tabela de Referência — Códigos de Horário (`horario`)

O campo `horario` é um inteiro de 2 dígitos: **1º dígito = Dia da semana (`2` a `6`)** e **2º dígito = Turno/Slot (`1` a `6`)**.

| Dígito Dia | Dia da Semana | Dígito Slot | Faixa de Horário |
| :---: | :--- | :---: | :--- |
| `2` | Segunda-feira | `1` | 08:00 – 10:00 |
| `3` | Terça-feira | `2` | 10:00 – 12:00 |
| `4` | Quarta-feira | `3` | 13:00 – 15:00 |
| `5` | Quinta-feira | `4` | 15:00 – 17:00 |
| `6` | Sexta-feira | `5` | 18:00 – 20:00 |
| — | — | `6` | 20:00 – 22:00 |

---

## 5. Tratamento de Erros HTTP

Quando uma validação falha, o Spring Boot retorna o status HTTP correspondente com a descrição no campo `message`:

* **`400 Bad Request`**: Regra de negócio violada (pré-requisito não cumprido, disciplina já concluída, horário inválido, vagas `<= 0`).
* **`404 Not Found`**: Recurso não encontrado (ID de aluno, professor, disciplina, turma ou matrícula inexistente).
* **`409 Conflict`**: Choque de horário do aluno, choque de horário do professor, aluno já matriculado na mesma disciplina ou turma sem vagas disponíveis.

#### Exemplo de Saída de Erro (`400` / `404` / `409`)
```json
{
  "timestamp": "2026-03-10T15:10:00.000+00:00",
  "status": 409,
  "error": "Conflict",
  "message": "Choque de horário detectado para a disciplina: Engenharia de Software",
  "path": "/api/matriculas/criar"
}
```