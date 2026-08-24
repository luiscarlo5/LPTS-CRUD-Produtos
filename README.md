# Desafio LAB — CRUD de Produtos

Aplicação full-stack de cadastro, consulta, atualização e remoção de produtos, com upload de imagem. Composta por uma API REST em NestJS, um frontend em Angular e um banco PostgreSQL, orquestrados via Docker Compose.

## Como subir a aplicação via Docker

Pré-requisitos: Docker e Docker Compose.

```bash
# 1. Copie o arquivo de variáveis de ambiente de exemplo
cp .env.example .env

# 2. Suba os três serviços (postgres, backend, frontend)
docker compose up -d --build
```

- Frontend: http://localhost:4200
- Backend (API): http://localhost:3001
- Postgres: exposto em `localhost:5433` (útil para conectar com um client de banco)

Para acompanhar os logs: `docker compose logs -f`.
Para derrubar: `docker compose down` (os dados do Postgres persistem no volume `desafio-lab-pgdata`; use `docker compose down -v` para apagá-los também).

### Variáveis de ambiente

O `.env` na raiz é compartilhado pelos três serviços via `docker-compose.yml`:

| Variável | Descrição |
|---|---|
| `POSTGRES_USER` / `POSTGRES_PASSWORD` / `POSTGRES_DB` | Credenciais do banco |
| `POSTGRES_PORT` | Porta do Postgres exposta no host |
| `NEST_PORT` | Porta em que a API NestJS roda |
| `FRONTEND_PORT` | Porta em que o Angular roda |

### Rodando sem Docker (desenvolvimento local)

```bash
# Backend
cd BACKEND
npm install
npm run dev:nest        # http://localhost:3001

# Frontend (em outro terminal)
cd FRONTEND/project-lpts
npm install
npm start                # http://localhost:4200
```

Nesse modo, o backend usa `BACKEND/.env` (copie de `BACKEND/.env.example`) e o Postgres precisa estar acessível em `localhost:5433` — pode ser o mesmo container do `docker compose up`, subindo só o serviço `postgres`.

## Tecnologias utilizadas

**Backend**
- [NestJS](https://nestjs.com/) 11 (Express)
- [Prisma ORM](https://www.prisma.io/) 7, com driver adapter (`@prisma/adapter-pg`) para PostgreSQL
- [Multer](https://github.com/expressjs/multer) para upload de imagens (multipart/form-data)
- TypeScript, executado via [`tsx`](https://github.com/privatenumber/tsx)

**Frontend**
- [Angular](https://angular.dev/) 19 (standalone components, sem NgModules)
- [Angular Material](https://material.angular.dev/)
- [Tailwind CSS](https://tailwindcss.com/) 4
- RxJS

**Infraestrutura**
- PostgreSQL 16
- Docker / Docker Compose

## Decisões de arquitetura

### Backend: Clean Architecture / DDD

O backend é organizado em camadas, com dependências apontando sempre para dentro (domínio não conhece infraestrutura):

```
src/
├── domain/         # Entidades, Value Objects e contratos de repositório
│   ├── entities/
│   ├── vos/
│   └── repositories/    (interface IProductRepository)
├── application/     # Casos de uso e DTOs — regra de negócio da aplicação
│   ├── usecases/         (create, get, get-all, update, delete)
│   └── dto/
└── infra/           # Detalhes técnicos: HTTP, banco, upload
    ├── http/nestjs/       (controllers, módulos)
    ├── database/          (PrismaService, implementações do repositório)
    └── upload/            (config do multer)
```

O repositório de produtos é uma interface (`IProductRepository`) no domínio, com duas implementações na camada de infra: `PrismaProductRepository` (produção, Postgres) e `InMemoryProductRepository` (útil para testes, sem dependência de banco). A troca entre elas é feita por injeção de dependência no `ProductModule`, sem alterar os casos de uso.

### Upload de imagem

As imagens de produto são recebidas via `multipart/form-data` (`FileInterceptor` do NestJS + `multer`), salvas em disco em `BACKEND/src/infra/upload/` com nome de arquivo baseado em hash (evita colisão/sobrescrita), e servidas estaticamente pelo próprio Nest em `/upload/*`. O caminho relativo é o que fica salvo no banco (`imagePath`); o frontend monta a URL completa somando o host do backend.

### Docker Compose: isolamento de rede

- `postgres` e `backend` compartilham uma rede **privada** (`backend-net`) — o backend acessa o banco pelo nome do serviço (`postgres:5432`), e nenhum outro container consegue alcançar o Postgres diretamente.
- `frontend` fica fora dessa rede. Ele não precisa falar com o backend via rede interna do Docker: quem faz as chamadas HTTP à API é o navegador do usuário (aplicação client-side), através das portas publicadas no host — por isso o isolamento de rede entre frontend e backend não quebra a aplicação.
- O CORS do backend é restrito à origem do frontend (`FRONTEND_ORIGIN`, configurável via `.env`), em vez de aceitar qualquer origem.

### Frontend: componentes standalone + roteamento por URL

Cada tela do CRUD (cadastro, consulta, atualização, remoção) é um componente Angular standalone com sua própria rota. A tela inicial é renderizada condicionalmente com base na URL atual (`router.url`), evitando duplicar estado entre o roteador e um controle manual de visibilidade — isso também faz o botão de voltar/avançar do navegador funcionar corretamente.
