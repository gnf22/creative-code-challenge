# Desafio Creative Code back-end

  - [O Desafio](#o-desafio)
  - [Tecnologias Utilizadas](#tecnologias-utilizadas)
  - [Clonando o Projeto](#clonando-o-projeto)
  - [Configurando o Banco](#configurando-o-banco)
  - [Gerando Migrations](#gerando-migrations)
  - [Iniciando o Projeto](#iniciando-o-projeto)
  - [Rotas da API](#rotas-da-api)
  - [Executando testes](#executando-testes)
  
  
 <p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/gnf22/creative-code-challenge.svg">

  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/gnf22/creative-code-challenge.svg">


  <img alt="Repository size" src="https://img.shields.io/github/languages/code-size/gnf22/creative-code-challenge.svg">
  
  <a href="https://github.com/gnf22/dsdeliver-sds2/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/gnf22/creative-code-challenge.svg">
  </a>

  <a href="https://github.com/gnf22/dsdeliver-sds2/commits/master">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/gnf22/creative-code-challenge.svg">
  </a>

  <img alt="GitHub" src="https://img.shields.io/github/license/gnf22/creative-code-challenge.svg">
</p>

### O Desafio

O desafio consiste em desenvolver uma API rest que permita o CRUD de Usuários e Endereços.

## Tecnologias Utilizadas

Este projeto utiliza as seguintes tecnologias:

-  [NodeJS](https://github.com/nodejs/node)
-  [Express](https://github.com/expressjs/express)
-  [TypeORM](https://github.com/typeorm/typeorm)
-  [Jest](https://github.com/facebook/jest)
-  [ViaCEP](https://viacep.com.br/)
-  [Tsyringe](https://github.com/microsoft/tsyringe)
-  [Typescript](https://github.com/microsoft/TypeScript)
-  [Eslint](https://github.com/eslint/eslint)
-  [Prettier](https://github.com/prettier/prettier)


     
### Clonando o Projeto

Requisitos:
  - Git
  - Node.JS
  - npm ou yarn

```bash
#Clone este repositório:
git clone https://github.com/gnf22/creative-code-challenge.git

#Escolha a pasta gerada do projeto:
cd creative-code-challenge

#Instale as dependências:

#Com yarn:
yarn

#Ou com npm:
npm install
```

### Configurando o Banco
1. Na pasta raíz do projeto, você deve criar um arquivo .env com as seguintes variáveis como no exemplo abaixo, realizando a configuração de acordo com suas credenciais. (Necessário ser um banco postgres)

<img src="./img/env-example.png" style="margin-left: 100px"
     alt="Creative Code" width="300">
     
### Gerando Migrations
```bash
#Após realizar as configurações acima, você deve agora rodar o comando para gerar as tabelas do banco.

#Com yarn:
yarn typeorm migration:run

#Ou com npm:
npm run typeorm migration:run
```

### Iniciando o Projeto
```bash
#Após todo esse passo a passo, agora você pode executar o projeto.

#Com o yarn:
yarn dev:server

#Ou com o npm:
npm run dev:server

#O projeto estará rodando em:
http://localhost:3333
```

### Rotas da API
## User

Model
```ts
enum EthnicityRole {
  BRANCO = 'branco',
  PRETO = 'preto',
  AMARELO = 'amarelo',
  PARDO = 'pardo',
  INDIGENA = 'indígena',
  NENHUM = 'nenhum',
}

id: string;

telephone: string;

email: string;

age: number;

weight: number;

ethnicity: EthnicityRole

created_at: Date;

updated_at: Date
```


#### 1. Adicionar usuário:  **POST** `http://localhost:3333/users` 
Corpo da requisição:
```json
{
	"name": "Gustavo",
	"telephone": "1194529284",
	"email": "gustavo@gmail.com",
	"age": 20,
	"weight": 1.70,
	"ethnicity": "branco"
}
```

Cadastro com sucesso: **STATUS: 200 OK**
```json
{
  "id": "b4fbf0d8-e529-46e0-9024-f7da82126403",
  "ethnicity": "branco",
  "name": "Gustavo",
  "telephone": "1194529284",
  "email": "gustavo@gmail.com",
  "age": 20,
  "weight": 1.7,
  "created_at": "2021-03-08T15:52:58.484Z",
  "updated_at": "2021-03-08T15:52:58.484Z"
}
```

E-mail já utilizado: **STATUS: 409 CONFLICT**
```json
{
  "status": "error",
  "message": "E-mail already in use. Choose another"
  }
```

#### 2. Autenticação de usuário:  **POST** `http://localhost:3333/sessions` 
```json
{
	"email": "gustavo@gmail.com",
}
```

Autenticação com sucesso: **STATUS: 200 OK**
```
No body returned for response
```

Autenticação com usuário inexistente: **STATUS: 404 NOT FOUND**
```json
{
  "status": "error",
  "message": "User does not exist."
}
```

Para utilizar todas as rotas abaixo (Inclusive as de Address) é necessário ter realizado a autenticação acima de autenticação. Segue um tutorial de como utilizar:
1. Realize a requisição de autenticação: **POST** `http://localhost:3333/sessions

<img src="./img/req-auth.png" style="margin-left: 100px"
     alt="request" width="300">

2. No seu console, acesse o link gerado (Sublinhado em vermelho)

<img src="./img/console-link.png" style="margin-left: 100px"
     alt="console" width="300">
     
3. Copie o token gerado (Sublinhado em vermelho)

<img src="./img/token.png" style="margin-left: 100px"
     alt="token" width="300">
     
4. Na requisição desejada, escolha a opção Bearer e cole o token gerado no e-mail

<img src="./img/bearer.png" style="margin-left: 100px"
     alt="bearer" width="300">
     
Erros possíveis ao tentar utilizar rotas autenticadas:


Autenticação sem o token: **STATUS: 401 UNAUTHORIZED**
```json
{
  "status": "error",
  "message": "JWT token is missing"
}
```

Autenticação com token inválido ou que já venceu (Prazo de 24 horas): **STATUS: 401 UNAUTHORIZED**
```json
{
  "status": "error",
  "message": "Invalid JWT token"
}
```

#### 3. Alteração de usuário:  **PUT** `http://localhost:3333/users` 
Corpo da requisição
```json
{
	"name": "Guilherme",
	"telephone": "647674",
	"email": "gui@gmail.com",
	"age": 12,
	"weight": 1.70,
	"ethnicity": "branco"
}
```

Alterado com sucesso: **STATUS: 200 OK**
```json
{
  "id": "a82ececf-cf96-439c-af51-1719e20905bf",
  "ethnicity": "branco",
  "name": "Guilherme",
  "telephone": "647674",
  "email": "gui@gmail.com",
  "age": 12,
  "weight": 1.7,
  "created_at": "2021-03-08T17:09:12.423Z",
  "updated_at": "2021-03-08T19:17:53.744Z"
}
```

Alterar usuário que não existe: **STATUS: 404 NOT FOUND**
```json
{
  "status": "error",
  "message": "User does not exist"
}
```

Alterar usuário com e-mail em uso: **STATUS: 409 CONFLICT**
```json
{
  "status": "error",
  "message": "User does not exist"
}
```

#### 4. Consulta de usuários:  **GET** `http://localhost:3333/users`
Consulta com sucesso: **STATUS: 200 OK**
```json
[
  {
    "id": "6b029086-3dcc-40fe-8701-f9f9ba1727ba",
    "ethnicity": "branco",
    "name": "Gustavo",
    "telephone": "11930087625",
    "email": "gust@gmail.com",
    "age": 10,
    "weight": "1.40",
    "created_at": "2021-03-08T00:48:05.065Z",
    "updated_at": "2021-03-08T00:48:05.065Z"
  },
  {
    "id": "76045c24-2979-4831-b786-44209595c8b8",
    "ethnicity": "branco",
    "name": "Guilherme",
    "telephone": "11930087625",
    "email": "gui@gmail.com",
    "age": 10,
    "weight": "1.40",
    "created_at": "2021-03-08T08:16:38.572Z",
    "updated_at": "2021-03-08T08:16:38.572Z"
  },
  {
    "id": "a82ececf-cf96-439c-af51-1719e20905bf",
    "ethnicity": "branco",
    "name": "Carlos",
    "telephone": "647674",
    "email": "carlos@gmail.com",
    "age": 12,
    "weight": "1.70",
    "created_at": "2021-03-08T17:09:12.423Z",
    "updated_at": "2021-03-08T19:19:43.976Z"
  }
]
```

Consulta com usuário que não existe: **STATUS: 404 NOT FOUND**
```json
{
  "status": "error",
  "message": "You are not authenticated."
}
```

#### 5. Exclusão de usuário:  **DELETE** `http://localhost:3333/users`
Exclusão com sucesso: **STATUS: 200 OK**
```
No body returned for response
```

Exclusão com usuário que não existe: **STATUS: 404 NOT FOUND**

```json
{
  "status": "error",
  "message": "User does not exist."
}
```

## Address

Model
```ts
id: string;

user_id: string;

address: string;

number: number;

complement?: string;

cep: string;

city: string;

state: string;

created_at: Date;

updated_at: Date
```

#### 1. Adicionar novo endereço:  **POST** `http://localhost:3333/addresses` 
Corpo da requisição:
```json
{
	"cep": "05001200",
	"number": 1000
}
```

Cadastro com sucesso: **STATUS: 200 OK**
```json
{
  "id": "862cb376-c4ae-41e2-8f6d-54eefa117989",
  "user_id": "6b029086-3dcc-40fe-8701-f9f9ba1727ba",
  "address": "Avenida Francisco Matarazzo",
  "number": 1000,
  "complement": "de 1701/1702 ao fim",
  "cep": "05001200",
  "city": "São Paulo",
  "state": "SP",
  "created_at": "2021-03-08T19:39:05.614Z",
  "updated_at": "2021-03-08T19:39:05.614Z"
}
```

Enviar cep com número diferente de 8 dígitos: **STATUS: 422 UNPROCESSABLE ENTITY**
```json
{
  "status": "error",
  "message": "Digite um CEP com 8 dígitos."
}
```

Enviar cep inválido: **STATUS: 422 UNPROCESSABLE ENTITY**
```json
{
  "status": "error",
  "message": "Digite um CEP Válido."
}
```

Criar endereço com usuário inexistente: **STATUS: 404 NOT FOUND**
```json
{
  "status": "error",
  "message": "User does not exist."
}
```

#### 2. Consultar endereços:  **GET** `http://localhost:3333/addresses`

Consulta com sucesso: **STATUS: 200 OK**
```json
[
  {
    "id": "17bd3950-ee7d-4315-9242-98311b05de11",
    "user_id": "208de6e2-fdcb-48ed-9eee-e244cd5ea035",
    "address": "Rua do Terceiro Lago",
    "number": 542,
    "complement": "",
    "cep": "04870060",
    "city": "São Paulo",
    "state": "SP",
    "created_at": "2021-03-07T21:47:01.124Z",
    "updated_at": "2021-03-07T21:47:01.124Z",
    "user": {
      "id": "208de6e2-fdcb-48ed-9eee-e244cd5ea035",
      "ethnicity": "branco",
      "name": "Boi",
      "telephone": "11930087625",
      "email": "gnferreira2001@gmail.com",
      "age": 10,
      "weight": "1.40",
      "created_at": "2021-03-07T07:07:10.564Z",
      "updated_at": "2021-03-07T07:07:10.564Z"
    }
  }
]
```

#### 3. Alterar endereço:  **PUT** `http://localhost:3333/addresses/:id`

Query params
`http://localhost:3333/addresses/bebba36a-c565-44ae-941f-4727ea91cda4`

Corpo da requisição:
```json
{
	"cep": "05001200",
	"number": 1000
}
```

```json
{
  "id": "862cb376-c4ae-41e2-8f6d-54eefa117989",
  "user_id": "6b029086-3dcc-40fe-8701-f9f9ba1727ba",
  "address": "Avenida Francisco Matarazzo",
  "number": 1000,
  "complement": "de 1701/1702 ao fim",
  "cep": "05001200",
  "city": "São Paulo",
  "state": "SP",
  "created_at": "2021-03-08T19:39:05.614Z",
  "updated_at": "2021-03-08T19:39:05.614Z"
}
```

Alterado com sucesso: **STATUS: 200 OK**
```json
{
  "id": "862cb376-c4ae-41e2-8f6d-54eefa117989",
  "user_id": "6b029086-3dcc-40fe-8701-f9f9ba1727ba",
  "address": "Avenida Francisco Matarazzo",
  "number": 1000,
  "complement": "de 1701/1702 ao fim",
  "cep": "05001200",
  "city": "São Paulo",
  "state": "SP",
  "created_at": "2021-03-08T19:39:05.614Z",
  "updated_at": "2021-03-08T19:39:05.614Z"
}
```

Enviar cep com número diferente de 8 dígitos: **STATUS: 422 UNPROCESSABLE ENTITY**
```json
{
  "status": "error",
  "message": "Digite um CEP com 8 dígitos."
}
```

Enviar cep inválido: **STATUS: 422 UNPROCESSABLE ENTITY**
```json
{
  "status": "error",
  "message": "Digite um CEP Válido."
}
```

Alterar endereço com endereço inexistente: **STATUS: 404 NOT FOUND**
```json
{
  "status": "error",
  "message": "Address not found."
}
```

#### 4. Excluir endereço:  **DELETE** `http://localhost:3333/addresses/:id`

Query params
`http://localhost:3333/addresses/bebba36a-c565-44ae-941f-4727ea91cda4`

Exclusão com sucesso: **STATUS: 200 OK**
```
No body returned for response
```

Exclusão com endereço que não existe: **STATUS: 404 NOT FOUND**

```json
{
  "status": "error",
  "message": "Address not found."
}
```


## Executando testes
1. Para executar os testes no projeto, siga os seguintes passos:
```bash
# Execute o script de testes

#Com yarn:
yarn test

#Ou com npm:
yarn run test
```

2. Você pode visualizar uma interface amigável com os resultados dos testes acessando coverage/lcov-report/index.html
