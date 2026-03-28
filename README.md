# 📋 Aplicativo de Gerência de Tarefas

API REST desenvolvida com Flask para gerenciamento de tarefas, com autenticação de usuários utilizando JWT.

---

## 🚀 Status do projeto

✅ Backend finalizado e funcional
🔄 Próxima etapa: desenvolvimento do front-end

---

## 🎯 Objetivo

Este projeto foi desenvolvido com o objetivo de praticar e consolidar conhecimentos em backend, incluindo:

* criação de APIs REST
* autenticação com JWT
* organização de rotas com Flask
* integração com banco de dados
* relacionamento entre entidades
* operações CRUD completas
* boas práticas de desenvolvimento

---

## 🔐 Autenticação

A API utiliza autenticação baseada em JWT (`flask_jwt_extended`).

* Login retorna um `access_token`
* Rotas protegidas com `@jwt_required()`
* Identificação do usuário via `get_jwt_identity()`

---

## ⚙️ Funcionalidades

### 👤 Usuário

* ✅ Cadastro de usuário (`/auth/register`)
* ✅ Login (`/auth/login`)
* ✅ Obter usuário logado (`/auth/me`)

### 📋 Tarefas

* ✅ Criar tarefa
* ✅ Listar tarefas do usuário autenticado
* ✅ Buscar tarefa específica
* ✅ Atualizar tarefa
* ✅ Deletar tarefa

📌 Todas as tarefas são vinculadas ao usuário autenticado (multiusuário seguro).

---

## 🔗 Principais Rotas

### 🔐 Autenticação

* `POST /auth/register`
* `POST /auth/login`
* `GET /auth/me`

### 📋 Tarefas

* `POST /task/tarefas`
* `GET /task/tarefas`
* `GET /task/tarefas/<id>`
* `PUT /task/tarefas/<id>`
* `DELETE /task/tarefas/<id>`

---

## 🧠 Conceitos aplicados

* JWT (JSON Web Token)
* Hash de senha
* Controle de acesso por usuário
* Separação de responsabilidades (rotas, models, database)
* Tratamento de erros
* Validação de dados
* Relacionamento entre tabelas

---

## 🛠️ Tecnologias utilizadas

* Python
* Flask
* Flask-JWT-Extended
* SQLAlchemy
* SQLite

---

## 💡 Observações

* O campo `status` das tarefas utiliza `String` (ex: "pendente", "concluída")
* O ID do usuário no JWT é armazenado como `string` e convertido para `int` nas rotas
* Projeto estruturado visando evolução para front-end e aplicação completa

---

## 🚀 Próximos passos

* 🔹 Desenvolvimento do front-end (HTML, CSS, JavaScript)
* 🔹 Integração completa com a API
* 🔹 Possível migração para React
* 🔹 Deploy da aplicação

---

## 👨‍💻 Autor

Matheus Ribeiro
