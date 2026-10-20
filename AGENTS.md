# Repository Guidelines

## Project Structure & Module Organization

This is a pnpm monorepo. `apps/api` contains the NestJS service and API tests; `apps/web` contains the Next.js app and page tests. Shared code lives in `packages/domain`, reusable React components and styles in `packages/ui`, and Prisma schema/client code in `packages/database`. Keep app-specific code in its app and promote code to a package only when it is shared. The root `src` is a minimal TypeScript entry point.

## Build, Test, and Development Commands

Use Node.js 24 and pnpm 12. Run `pnpm install` after checkout, then `pnpm dev` to build shared packages and start the apps in watch mode. Use `pnpm build` for workspace builds, `pnpm lint` for lint checks, and `pnpm tsc` for TypeScript compilation. Run `pnpm test` for workspace Vitest suites; `pnpm test:ci` runs CI test scripts, including API coverage. PostgreSQL is optional for the sample app; see `README.md` before configuring the database.

## Coding Style & Naming Conventions

Use TypeScript and follow the existing package patterns. `.editorconfig` specifies two spaces, LF endings, and a final newline; Prettier and ESLint use Google TypeScript Style (`gts`). Name React components and types in PascalCase, functions and variables in camelCase, and tests beside their subject as `*.test.ts(x)` or `*.spec.ts`.

## Testing Guidelines

Add or update focused Vitest tests alongside changed behavior. API tests use `*.spec.ts`; web tests use `*.test.tsx`. Run the relevant package's test script while iterating, then `pnpm test` before submitting. The API `test:ci` script enables coverage; no repository-wide coverage threshold is configured.

## Commit & Pull Request Guidelines

Commits follow Conventional Commits, enforced by commitlint; use prefixes such as `feat:`, `fix:`, `docs:`, or `refactor:` with a concise imperative summary. Pull requests should describe the change and its motivation, link related issues, list validation commands, and include screenshots for visible UI changes.

## Security & Configuration

Keep secrets out of source control. Use local environment files described in `README.md` and its examples; PostgreSQL credentials belong in `DATABASE_URL`. Review Prisma schema or migration changes carefully before applying them to a non-empty database.
