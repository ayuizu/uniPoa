# Guia de Configuração do Banco de Dados via Docker — Portal de Matrículas UniPOA

Este guia explica como o banco de dados MySQL (`unipoa_matriculas`) está configurado para inicialização automática via Docker Compose utilizando o arquivo de dump salvo no repositório, facilitando o compartilhamento do ambiente entre toda a equipe.

---

## 1. Estrutura de Pastas

Os arquivos de configuração do Docker e os scripts de inicialização do banco ficam organizados dentro de `back-end/docker/`:

```text
back-end/
└── docker/
    ├── docker-compose.yaml
    └── init/
        └── dump_unipoa.sql   (ou 01_schema.sql e 02_data.sql)
```

> **Importante:** Evite caracteres especiais (como `;`) nos nomes das pastas, pois o Docker Compose utiliza dois-pontos e ponto-e-vírgula como separadores no mapeamento de volumes. Utilize sempre a estrutura padrão `docker/init/`.

---

## 2. Configuração do `docker-compose.yaml`

O arquivo `docker-compose.yaml` mapeia a pasta local `./init` para o diretório especial `/docker-entrypoint-initdb.d` dentro do container MySQL. Sempre que um container é iniciado pela primeira vez, o MySQL executa automaticamente (em ordem alfabética) todos os arquivos `.sql` encontrados nessa pasta.

```yaml
services:
  mysql:
    image: mysql:8.0
    container_name: unipoa-mysql
    ports:
      - "3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: 123
      MYSQL_DATABASE: unipoa_matriculas
      MYSQL_USER: admin
      MYSQL_PASSWORD: 123
    volumes:
      - mysql_data:/var/lib/mysql
      - ./init:/docker-entrypoint-initdb.d

volumes:
  mysql_data:
```

---

## 3. Como Subir o Banco de Dados (Primeira Execução)

1. Certifique-se de que o **Docker Desktop** está em execução.
2. Abra o terminal na pasta `back-end/docker`:
   ```bash
   cd back-end/docker
   ```
3. Suba o container em segundo plano (`-d`):
   ```bash
   docker compose up -d
   ```
4. Aguarde cerca de 15 a 20 segundos para a criação das tabelas e inserção dos dados iniciais. Para acompanhar o progresso e confirmar que não houve erros no script SQL, execute:
   ```bash
   docker logs unipoa-mysql
   ```
   Quando aparecer a mensagem `ready for connections` no final do log, o banco estará pronto para uso.

---

## 4. Persistência de Dados vs. Reset do Banco

* **Uso normal do sistema:** Todos os novos registros criados pela aplicação (novas matrículas, turmas ou cancelamentos) ficam salvos no volume local `mysql_data`. Mesmo que você pare o container (`docker compose stop`) ou reinicie o computador, os dados continuam salvos localmente.
* **Atualizar dados compartilhados (Reset):** Como a pasta `init/` só é lida na criação de um volume novo, caso alguém da equipe atualize o arquivo `.sql` no GitHub, basta baixar as alterações (`git pull`) e recriar o volume local com os comandos:
  ```bash
  docker compose down -v
  docker compose up -d
  ```
  *(A flag `-v` remove o volume `mysql_data` antigo, forçando o MySQL a importar novamente o dump atualizado).*

---

## 5. Como Gerar um Novo Dump pelo DBeaver (Para Compartilhar no GitHub)

Caso precise exportar o estado atual do seu banco local para atualizar o arquivo na pasta `docker/init/`:

1. No **Database Navigator** do DBeaver, clique com o botão direito sobre o banco **`unipoa_matriculas`**.
2. Selecione **Tools** → **Dump database**.
3. Marque todas as tabelas desejadas (`aluno`, `professor`, `disciplina`, `pre_requisito`, `turma`, `matricula`) e clique em **Next**.
4. Nas opções de saída, defina a pasta de destino como `back-end/docker/init/` e clique em **Start**.
5. Abra o arquivo `.sql` gerado e garanta que a primeira linha contenha:
   ```sql
   USE unipoa_matriculas;
   ```
6. Faça o commit e push do arquivo atualizado para o repositório.