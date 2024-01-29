# Seja Bem vindo(a) ao repo Mr. Cleaner!!!

## 🚧 Sobre o projeto
Este projeto trata-se de um desafio da Facilita Jurídico, que consiste em dois níveis. Um CRUD simples e uma resolução de algoritimo. 

## Tudo bem, mas como eu rodo isso dai 🧐?
O projeto conta com docker, então basta rodar o seguinte comando na raiz do projeto:
```bash
docker-compose up --build
```
O projeto conta com 3 serviços, sendo eles:
- **BACKEND**: Um backend feito em NodeJS com Express e TypeScript.
- **FRONTEND**: Um frontend feito em NextJS com TypeScript.
- **DATABASE**: Um banco de dados Postgres.

Ao rodar o docker-compose os 3 serviços já irão subir e ficarão disponíveis nas seguintes portas:
- **BACKEND**: http://localhost:4000
- **FRONTEND**: http://localhost:3000
- **DATABASE**: http://localhost:5432

Simples e rápido, não é mesmo ? 😄

Obs.: O serviço de backend já conta com o seed básico de um usuário.
- **Usuário**: admin@mail.com
- **Senha**: 123456

# 🛠 SOBRE OS SERVIÇOS

## ⚙️BACKEND
O Backend foi feito em NodeJS com Express e TypeScript. Foi utilizado orientação a objetos e DI (Injeção de dependências) para forçar uma baixa coesão entre os componentes.
Não foram implementados os procotoclos (interfaces) e por se tratar de um simples desafio, porém caso necessário possuo este conhecimento também. A arquitetura escolhida foi o MSC (Model, Service e Controller), porém possuo
conhecimentos de arquiteturas mais complexas e novas como Clean Architecture e Arquitetura Hexagonal.
Apesar de no descritivo possuir um adendo sobre o uso de ORM, eu optei por utilizar o Prisma, por possuir uma integração excelente com o TypeScript e garantir um ótimo TypeSafety mapeando o banco em objetos e entidades. Porém para evitar quaisquer problemas
ou dúvidas sobre o conhecimento em SQL, dentro do projeto existe uma pasta chamada sql que possui TODAS as queries existentes no projeto
e os DDLs para criação das tabelas.

## 🖥️ FRONTEND
O Frontend foi feito em NextJS com TypeScript. Foi utilizado o padrão de components and pages. Os components são altamente flexiveis através de suas props, podendo ser expandidos seguindo o conceito de LISKOV.

## 📝 DATABASE
O banco de dados utilizado foi o POSTGRES como pedido no descritivo do projeto. Não possuia experiência com o mesmo, porém foi uma ótima oportunidade para aprender e conhecer mais sobre o mesmo. O banco foi criado através do docker-compose.

# TECONOLOGIAS UTILIZADAS
## BACKEND
- NodeJS
- Express
- JWT
- Bcrypt
- Express Validator
- TypeScript
- Prisma
- Docker


## FRONTEND
- NextJS
- TypeScript
- Module CSS
- SASS
- Docker
- Axios
- Validator


