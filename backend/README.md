# Backend - CRUD de Usuários

Backend desenvolvido com Node.js, TypeScript, seguindo os padrões DDD (Domain-Driven Design) e Clean Architecture.

## Estrutura

```
src/
├── domain/              # Camada de domínio (entidades e interfaces)
│   ├── entities/
│   └── repositories/
├── application/         # Camada de aplicação (casos de uso)
│   └── use-cases/
├── infrastructure/      # Camada de infraestrutura (implementações)
│   ├── database/
│   └── repositories/
└── presentation/        # Camada de apresentação (controllers e rotas)
    ├── controllers/
    └── routes/
```

## Instalação

```bash
npm install
```

## Executar

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm run build
npm start
```

A API estará disponível em `http://localhost:3000`

## Endpoints

- `POST /api/users` - Criar usuário
- `GET /api/users` - Listar todos os usuários
- `GET /api/users/:id` - Buscar usuário por ID
- `PUT /api/users/:id` - Atualizar usuário
- `DELETE /api/users/:id` - Excluir usuário

