FROM docker.io/library/node:24-bookworm-slim AS build

WORKDIR /app
RUN npm install --global pnpm@12.11.2
RUN apt-get update \
  && apt-get install --no-install-recommends --yes openssl \
  && rm -rf /var/lib/apt/lists/*

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json apps/api/package.json
COPY apps/web/package.json apps/web/package.json
COPY packages/database/package.json packages/database/package.json
COPY packages/domain/package.json packages/domain/package.json
COPY packages/ui/package.json packages/ui/package.json
COPY packages/types/package.json packages/types/package.json
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm --filter @anggit-mono/api... build \
  && pnpm deploy --filter @anggit-mono/api --prod /runtime \
  && cp -r apps/api/dist /runtime/dist \
  && cp -r packages/database/dist /runtime/node_modules/.pnpm/@anggit-mono+database@*/node_modules/@anggit-mono/database/dist \
  && cp -r packages/domain/dist /runtime/node_modules/.pnpm/@anggit-mono+domain@*/node_modules/@anggit-mono/domain/dist

FROM build AS migration

CMD ["pnpm", "--filter", "@anggit-mono/database", "exec", "prisma", "migrate", "deploy"]

FROM docker.io/oven/bun:1.4.3 AS runtime

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=4000
COPY --from=build --chown=bun:bun /runtime ./
USER bun

EXPOSE 4000
CMD ["bun", "dist/main.js"]
