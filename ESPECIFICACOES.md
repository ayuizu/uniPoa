# ESPECIFICAÇÕES

## CASOS DE USO
- UC01 - Como aluno quero ver a lista de turmas disponíveis para matrícula
- UC02 - Como aluno quero me matricular em uma turma cumprindo requisitos e sem colisão de horário
- UC03 - Como aluno quero consultar minha grade horária com as turmas matriculadas
- UC04 - Como aluno quero remover uma turma das minhas matrículas
- UC05 - Como administrador institucional quero criar uma nova turma para matrícula sem colisão de horários para o professor
- UC06 - Como administrador institucional quero ver a grade e carga horária por professor 


## TELAS

### GERAL
- Home (nav, hero session, footer)
- Login (só botão com entrar como Aluno ou entrar como Admin), sem cadastro, sem autenticação

### ALUNO
#### Página de Matrícula
- Lista de turmas disponíveis (com horário, professor, semestre/pre-requisitos, vagas disponíveis) para seleção (só habilitar se aluno tiver pre-requisitos)
- Botão "Matricular": habilita só se tiver disciplina selecionada - valida horários disponíveis do aluno, se há vagas disponíveis
- Modal/popup de confirmação de matrícula: listar disciplinas selecionadas, botões "Voltar/Editar" e "Confirmar Matrícula"
#### Grade de turmas matriculadas
- Grade semanal com as disciplinas (colunas = dia da semana, linhas = horários)
- Opção de editar/cancelar matrícula em cada turma

### ADMIN (institucional)
#### Gerenciamento de turmas
- Forms para selecionar professor, disciplina, dia da semana, horário, quantidade de vagas. Ao salvar validar se professor tem horário disponível
- Lista de turmas já disponíveis para matrícula

#### Grade de turmas por professor
- Filtro/dropwdown com professores
- Info de carga horária total
- Grade semanal com as disciplinas (colunas = dia da semana, linhas = horários)

## MODELO

### DISCIPLINA
Long id\
String nome\
int periodo\
List<PreRequisito> preRequisitos\
List<Turma> turmas\

### PREREQUISITO
Long id\
Disciplina disciplina\
Disciplina preRequisito\

### TURMA
Long id\
Professor professor\
Disciplina disciplina\
int horario\
int vagasMax\
String semestre\
List<Matricula> matriculas\

Sendo horário:
- primeiro digito = semana (2 a 6),
- segundo digito = horário (1 = 8:00-10:00, 2 = 10:00-12:00, 3 = 13:00-15:00, 4 = 15:00-17:00, 5 = 18:00-20:00. 6 = 20:00-22:00)

### PROFESSOR
Long id\
String nome\
String sobrenome\
List<Turma> turmas\

### ALUNO
Long id\
String nome\
String sobrenome\
int periodoAtual\
List<Matricula> matriculas\

### MATRICULA
Long id\
Aluno aluno\
Turma turma\
StatusMatricula status\

StatusMatrucila {MATRICULADA, CONCLUIDA, CANCELADA}



