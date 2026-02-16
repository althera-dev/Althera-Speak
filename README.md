# Althera Speak

Full-stack application built with **React + Vite + shadcn/ui** on the frontend and **Elysia + Drizzle ORM + Zod** on the backend, with **PostgreSQL** as the database.

## Tech Stack

### Frontend
- [React 19](https://react.dev) + [TypeScript](https://typescriptlang.org)
- [Vite](https://vite.dev) (bundler)
- [Tailwind CSS v4](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com) (component library)

### Backend
- [Elysia](https://elysiajs.com) (Bun web framework)
- [Drizzle ORM](https://orm.drizzle.team) (TypeScript ORM)
- [Zod](https://zod.dev) (schema validation)
- [PostgreSQL 16](https://postgresql.org)

### Infrastructure
- [Bun](https://bun.sh) (runtime & package manager)
- [Docker](https://docker.com) + Docker Compose

## Prerequisites

- [Bun](https://bun.sh) >= 1.0
- [Docker](https://docker.com) & Docker Compose (for database / production)

## Getting Started

### 1. Install dependencies

```bash
bun install
```

### 2. Start the database

```bash
docker compose -f docker-compose.dev.yml up -d
```

### 3. Run database migrations

```bash
bun run db:push
```

### 4. Start development servers

```bash
bun run dev
```

This starts both frontend (http://localhost:5173) and backend (http://localhost:3000) concurrently.

## Available Scripts

| Command | Description |
|---|---|
| `bun run dev` | Start frontend + backend in development mode |
| `bun run dev:frontend` | Start only the frontend dev server |
| `bun run dev:backend` | Start only the backend dev server |
| `bun run build` | Build both frontend and backend |
| `bun run db:generate` | Generate Drizzle migrations |
| `bun run db:migrate` | Run Drizzle migrations |
| `bun run db:studio` | Open Drizzle Studio (database GUI) |

## Docker (Production)

Build and run the entire stack with Docker Compose:

```bash
docker compose up --build
```

This will start:
- **PostgreSQL** on port `5432`
- **Backend (Elysia)** on port `3000`
- **Frontend (nginx)** on port `80`

Access the app at http://localhost.

## Project Structure

```
althera-speak/
├── frontend/                 # React + Vite + shadcn/ui
│   ├── src/
│   │   ├── components/ui/    # shadcn/ui components
│   │   ├── lib/              # Utility functions
│   │   ├── App.tsx           # Main app component
│   │   ├── main.tsx          # Entry point
│   │   └── index.css         # Global styles + Tailwind
│   ├── components.json       # shadcn/ui config
│   ├── vite.config.ts        # Vite config (with proxy)
│   └── package.json
├── backend/                  # Elysia + Drizzle ORM
│   ├── src/
│   │   ├── db/
│   │   │   ├── index.ts      # Database connection
│   │   │   └── schema.ts     # Drizzle schema
│   │   ├── routes/
│   │   │   ├── health.ts     # Health check endpoint
│   │   │   └── users.ts      # User CRUD endpoints
│   │   └── index.ts          # Server entry point
│   ├── drizzle.config.ts     # Drizzle Kit config
│   └── package.json
├── docker-compose.yml        # Production Docker setup
├── docker-compose.dev.yml    # Dev database only
├── Dockerfile.frontend       # Frontend multi-stage build
├── Dockerfile.backend        # Backend multi-stage build
├── nginx.conf                # Nginx config for SPA + API proxy
└── package.json              # Root workspace config
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| GET | `/api/users` | List all users |
| GET | `/api/users/:id` | Get user by ID |
| POST | `/api/users` | Create a new user |
| DELETE | `/api/users/:id` | Delete a user |

## Adding shadcn/ui Components

```bash
cd frontend
bunx shadcn@latest add <component-name>
```

For example:
```bash
bunx shadcn@latest add card input dialog
```
