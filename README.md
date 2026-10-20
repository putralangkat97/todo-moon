# Anggit Mono boilerplate

A full-stack TypeScript monorepo boilerplate with Next.js, NestJS, Prisma, PostgreSQL, and shared UI. The home page fetches a hello message from the API. A shared Prisma package is ready for PostgreSQL when you need it; the database schema has no models yet.

| Directory | What lives there |
| --- | --- |
| `apps/api` | NestJS API and its database service |
| `apps/web` | Next.js app using shared UI components |
| `packages/database` | Prisma schema, generated client, and PostgreSQL connection |
| `packages/domain` | Code shared by the API and web app |
| `packages/types` | TypeScript types shared by the API and web app |
| `packages/ui` | Reusable React components |

## Get started

You need Node.js 24 and pnpm 12. PostgreSQL is optional for the hello demo.

From the repository root:

```bash
pnpm install
pnpm dev
```

Open <http://localhost:3000>. The web app fetches `Hello, you!` from <http://localhost:4000/hello> through its server component. The API's `/` route still returns a sample greeting. Neither app needs a database to run this demo. If the API is hosted elsewhere, set `API_URL` in `apps/web/.env.local` to its base URL (for example, `API_URL=https://api.example.com`).

### Development with the local database

The optional Compose database uses PostgreSQL 18. To run PostgreSQL in Docker while running the web and API with `pnpm dev`:

```bash
docker compose -f compose.yaml -f compose.database.yaml up -d db
pnpm dev
```

The database is available at `127.0.0.1:5432`. For Prisma commands or API database access from the host, create `packages/database/.env`:

```dotenv
DATABASE_URL=postgresql://app:change-this-password@127.0.0.1:5432/app
```

Stop only PostgreSQL when finished:

```bash
docker compose -f compose.yaml -f compose.database.yaml stop db
```

If the full Docker stack is already running, stop only its `api` and `web` services before starting `pnpm dev`; keep `db` running.

## Deploy with Docker

Docker Compose runs the web and API as separate services, so you can rebuild one without restarting the others. The production containers run on Bun; Node.js and pnpm are not required on the server.

Create a `.env` file from the template and edit the values for your server:

```bash
cp .env.example .env
```

Build and start the application:

```bash
docker compose up -d --build
```

The web app is available on port `3000` and the API on port `4000` on the server itself. By default, both ports bind to localhost so an external reverse proxy can handle public traffic. Set `BIND_ADDRESS=0.0.0.0` when direct network access is intentional. To deploy a web-only change, rebuild only that service:

```bash
docker compose up -d --build web
```

The default stack expects PostgreSQL to be provided separately. To run a local PostgreSQL container instead, add these values to `.env`:

```dotenv
POSTGRES_USER=app
POSTGRES_PASSWORD=change-this-password
POSTGRES_DB=app
```

Then start both Compose files:

```bash
docker compose -f compose.yaml -f compose.database.yaml up -d --build
```

Stop the same stack with the same files:

```bash
docker compose -f compose.yaml -f compose.database.yaml down
```

Using `docker compose down` without `compose.database.yaml` does not see the `db` service and may leave it attached to the project network.

The database data is stored in the `postgres-data` Docker volume. A Docker volume is not a backup; use the backup commands below or an external PostgreSQL service for production.

### Migrations, backups, and operations

Create and review migrations during development:

```bash
pnpm --filter @anggit-mono/database exec prisma migrate dev --name init
```

Apply committed migrations to a deployment with the one-off Docker migration service. It does not run during normal application startup:

```bash
docker compose --env-file .env.production \
  -p anggit-mono-production \
  -f compose.yaml -f compose.database.yaml \
  --profile tools run --rm migrate
```

For an external PostgreSQL server, set `DATABASE_URL` in the environment file and omit `compose.database.yaml`.

Back up an external PostgreSQL database with:

```bash
pg_dump --format=custom --file=backup.dump "$DATABASE_URL"
```

Restore it into an empty database with:

```bash
pg_restore --clean --if-exists --dbname="$DATABASE_URL" backup.dump
```

For the optional Compose database, run the same commands through the container:

```bash
docker compose -f compose.yaml -f compose.database.yaml exec -T db \
  sh -c 'pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" --format=custom' > backup.dump
docker compose -f compose.yaml -f compose.database.yaml exec -T db \
  sh -c 'pg_restore -U "$POSTGRES_USER" -d "$POSTGRES_DB" --clean --if-exists' < backup.dump
```

Inspect application logs and health status with:

```bash
docker compose -p anggit-mono-production logs -f api
docker compose -p anggit-mono-production ps
```

### Reverse proxy and HTTPS

Compose intentionally does not choose a proxy. Put Apache, Nginx, Caddy, or Traefik in front of the localhost-bound ports, terminate TLS there, and forward requests to:

- web: `http://127.0.0.1:3000`
- API: `http://127.0.0.1:4000`

Forward the original `Host`, `X-Forwarded-For`, and `X-Forwarded-Proto` headers. Configure certificates, HTTP-to-HTTPS redirects, firewall rules, and renewal according to the proxy you choose.

If browser or mobile clients call the API from another origin, set `CORS_ORIGINS` to a comma-separated allowlist, for example `https://app.example.com,https://staging.example.com`. Leave it empty when the API is only called server-to-server.

### Redeploy an environment

Keep one environment file per deployment, such as `.env.staging` and `.env.production`. Use a different Compose project name for each environment so their containers, networks, and local database volumes stay separate.

For an environment using an external PostgreSQL server:

```bash
docker compose --env-file .env.staging -p anggit-mono-staging up -d --build
docker compose --env-file .env.production -p anggit-mono-production up -d --build
```

Set different `WEB_PORT` and `API_PORT` values in `.env.staging` if staging runs on the same server as production. The defaults are `3000` and `4000`.

For an environment using the optional PostgreSQL container:

```bash
docker compose --env-file .env.staging -p anggit-mono-staging \
  -f compose.yaml -f compose.database.yaml up -d --build
docker compose --env-file .env.production -p anggit-mono-production \
  -f compose.yaml -f compose.database.yaml up -d --build
```

After changing only the web or API code, rebuild only that service:

```bash
docker compose --env-file .env.production -p anggit-mono-production \
  -f compose.yaml -f compose.database.yaml up -d --build web
docker compose --env-file .env.production -p anggit-mono-production \
  -f compose.yaml -f compose.database.yaml up -d --build api
```

Use the matching project name and Compose files when stopping an environment:

```bash
docker compose --env-file .env.production -p anggit-mono-production \
  -f compose.yaml -f compose.database.yaml down
```

## Build your app

1. Add API routes and services in `apps/api`. Fetch them from Next.js server components in `apps/web`, as the home page does. Put reusable React components in `packages/ui` and shared code in `packages/domain`.
2. When you need PostgreSQL, use an available PostgreSQL server or the local PostgreSQL 18 Compose service. Copy `packages/database/.env.example` to `packages/database/.env` and set `DATABASE_URL` to your connection string; an exported `DATABASE_URL` takes precedence.
3. Add models to [`packages/database/prisma/schema.prisma`](packages/database/prisma/schema.prisma). For a new, empty database, create and apply the first migration with `pnpm --filter @anggit-mono/database exec prisma migrate dev --name init`.
4. Put shared API/web contracts in `packages/types` and import them with `@anggit-mono/types`.
5. Regenerate and compile the shared client with `pnpm --filter @anggit-mono/database build`. Register `DatabaseService` from `apps/api/src/database.service.ts` in `AppModule`, then inject it into services that query through Prisma. Restart `pnpm dev` after changing the schema.

If browser code calls the API directly across ports or domains, [allow the web origin with NestJS CORS](https://docs.nestjs.com/security/cors).

If your PostgreSQL database already has tables, run `pnpm --filter @anggit-mono/database exec prisma db pull` to bring them into the Prisma schema. [Baseline the existing database](https://www.prisma.io/docs/orm/v7/prisma-migrate/workflows/baselining) before using Prisma Migrate for those tables; the `migrate dev --name init` step above is for an empty database. Hosted databases may also need [a configured shadow database](https://www.prisma.io/docs/orm/prisma-migrate/understanding-prisma-migrate/shadow-database) for `migrate dev`.

## Reference

The monorepo structure and setup are based on [How to start monorepo with NextJS + NestJS using pnpm workspaces](https://gist.github.com/leandroluk/ead95513d3666326d364248ae98eb2e3).

`pnpm build` builds the workspace; `pnpm lint` and `pnpm tsc` check it.

## Versioning

Releases use Git tags matching the root package version, such as `v0.1.0`:

```bash
git tag -a v0.1.0 -m "Release v0.1.0"
git push origin v0.1.0
```

Use semantic versioning for future releases and update the root `package.json` version before creating the matching tag.
