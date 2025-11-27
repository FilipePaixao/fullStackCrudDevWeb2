# CRUD de Usuários

Sistema completo de CRUD de usuários desenvolvido com:
- **Backend**: Node.js + TypeScript com DDD e Clean Architecture
- **Frontend**: Angular + TypeScript
- **Banco de Dados**: SQLite
- **Autenticação**: JWT Token

## Estrutura do Projeto

```
crudUserForDevWeb2/
├── backend/          # API REST com Node.js + TypeScript
└── frontend/         # Aplicação Angular
```

## Como executar

### Backend

1. Entre na pasta do backend:
```bash
cd backend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente (crie um arquivo `.env`):
```env
PORT=3000
DB_PATH=./database.sqlite
JWT_SECRET=your-secret-key-change-in-production
```

4. Execute o servidor:
```bash
npm run dev
```

O backend estará rodando em `http://localhost:3000`

### Frontend

1. Entre na pasta do frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Execute a aplicação:
```bash
npm start
```

O frontend estará rodando em `http://localhost:4200`

## Funcionalidades

### Autenticação
- ✅ Registro de usuário
- ✅ Login com JWT
- ✅ Proteção de rotas com middleware
- ✅ Guard de autenticação no frontend
- ✅ Logout

### CRUD de Usuários
- ✅ Criar usuário (protegido)
- ✅ Listar usuários (protegido)
- ✅ Buscar usuário por ID (protegido)
- ✅ Atualizar usuário (protegido)
- ✅ Excluir usuário (protegido)
- ✅ Validação de email
- ✅ Validação de campos obrigatórios
- ✅ Hash de senhas com bcrypt

### UI/UX
- ✅ Design moderno com gradientes
- ✅ Animações suaves
- ✅ Interface responsiva
- ✅ Feedback visual para ações
- ✅ Modais elegantes
- ✅ Tabelas interativas

## Endpoints da API

### Autenticação
- `POST /api/auth/register` - Registrar novo usuário
- `POST /api/auth/login` - Fazer login

### Usuários (Protegidos - requer JWT)
- `GET /api/users` - Listar todos os usuários
- `GET /api/users/:id` - Buscar usuário por ID
- `POST /api/users` - Criar usuário
- `PUT /api/users/:id` - Atualizar usuário
- `DELETE /api/users/:id` - Excluir usuário

## Tecnologias

### Backend
- Node.js
- TypeScript
- Express
- TypeORM
- SQLite
- JWT (jsonwebtoken)
- bcryptjs
- DDD (Domain-Driven Design)
- Clean Architecture

### Frontend
- Angular 17
- TypeScript
- RxJS
- HTTP Client
- Angular Router
- Angular Animations

