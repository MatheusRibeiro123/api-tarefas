📋 Aplicativo de Gerência de Tarefas

Aplicação completa de gerenciamento de tarefas com autenticação de usuários, desenvolvida com Flask no backend e interface web integrada para interação.

🚀 Status do projeto

✅ Backend finalizado e funcional
✅ Frontend funcional (interface simples)
🌐 Aplicação publicada online
🏁 Projeto concluído (versão atual)

🌍 Acesse o projeto

👉 Link da aplicação:

https://api-tarefas-uwya.onrender.com

📌 Basta acessar o link no navegador para utilizar a aplicação.

🎯 Objetivo

Este projeto foi desenvolvido com o objetivo de praticar e consolidar conhecimentos em backend, incluindo:

criação de APIs REST
autenticação com JWT
organização de rotas com Flask
integração com banco de dados
relacionamento entre entidades
operações CRUD completas
boas práticas de desenvolvimento
🔐 Autenticação

A aplicação utiliza autenticação baseada em JWT (flask_jwt_extended).

Login retorna um access_token
Rotas protegidas com @jwt_required()
Identificação do usuário via get_jwt_identity()

⚙️ Funcionalidades
👤 Usuário
✅ Cadastro de usuário (/auth/register)
✅ Login (/auth/login)

✅ Obter usuário logado (/auth/me)
📋 Tarefas
✅ Criar tarefa
✅ Listar tarefas do usuário autenticado
✅ Buscar tarefa específica
✅ Atualizar tarefa
✅ Deletar tarefa

📌 Todas as tarefas são vinculadas ao usuário autenticado (multiusuário seguro).

💻 Frontend

O projeto conta com uma interface web simples desenvolvida em HTML, CSS e JavaScript, integrada ao Flask.

O frontend foi criado com auxílio de ferramentas de IA, com o objetivo de permitir a visualização e testes da aplicação.
O foco principal do projeto está na construção do backend e na lógica da aplicação.

🔗 Principais Rotas
🔐 Autenticação
POST /auth/register
POST /auth/login
GET /auth/me
📋 Tarefas
POST /task/tarefas
GET /task/tarefas
GET /task/tarefas/<id>
PUT /task/tarefas/<id>
DELETE /task/tarefas/<id>
🧠 Conceitos aplicados
JWT (JSON Web Token)
Hash de senha
Controle de acesso por usuário
Separação de responsabilidades (rotas, models, database)
Tratamento de erros
Validação de dados
Relacionamento entre tabelas
🛠️ Tecnologias utilizadas
Python
Flask
Flask-JWT-Extended
SQLAlchemy
SQLite
HTML, CSS e JavaScript
▶️ Como utilizar
🌐 Acessar online (recomendado)

A aplicação já está disponível online:

https://api-tarefas-uwya.onrender.com

👉 Basta acessar o link no navegador.

💻 Executar localmente (opcional)

⚠️ O frontend é servido pelo Flask, não utilize Live Server.

Clone o repositório:
git clone https://github.com/MatheusRibeiro123/api-tarefas
Acesse a pasta:
cd seu-repo
Crie e ative a virtualenv:
python -m venv venv
venv\Scripts\activate
Instale as dependências:
pip install -r requirements.txt
Execute o projeto:
python run.py
Acesse no navegador:
http://127.0.0.1:5000
💡 Observações
O banco de dados local e o da aplicação online são independentes
O campo status das tarefas utiliza String (ex: "pendente", "concluída")
O ID do usuário no JWT é armazenado como string e convertido para int nas rotas
Projeto estruturado com foco em backend, mas com frontend funcional integrado
🚀 Possíveis melhorias futuras
🔹 Melhorias na interface do usuário
🔹 Implementação de filtros e categorias
🔹 Paginação de tarefas
🔹 Versão com frontend em React
🔹 Migração para banco de dados em produção (PostgreSQL)

👨‍💻 Autor

Matheus Ribeiro

Imagens de demonstração das funcionalidades do sistema: