## Instruções de uso

Este projeto deve ser rodado utilizando o docker-compose. Para isso, basta executar o comando abaixo na raiz do projeto:

```bash
docker-compose up --build
```

O docker-compose conta com 3 serviços:

- **app**: Serviço principal da aplicação, feita em TypeScript, e NodeJS (Express) utilizando a arquitetura MSC (Model, Service e Controller) responsável por expor a API e realizar a comunicação com o banco de dados. Vale ressaltar que apesar de uma arquitetura simples, neste projeto ainda é utilzado o conceito de DI (Dependency Injection) para a injeção de dependências.

- **db**: Serviço de banco de dados, responsável por armazenar os dados da aplicação.
- **front** Serviço de front-end, feito em NextJS 13 responsável por expor a interface web da aplicação.

### SEEDS
Vale ressaltar que não é necessário rodar nenhum seed para que a aplicação funcione, pois o banco de dados já é populado com alguns dados iniciais assim que rodado o comando de up do docker-compose. Porém caso algo aconteça de errado e seja necessário rodar os comandos manualmente, o projeto possui uma pasta chamada sql, contendo TODAS as queries do projeto e os DDLs necessários para a criação do banco de dados.
