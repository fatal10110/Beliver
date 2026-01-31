# Infrastructure Phase 1: Local Development (Turborepo)

**Goal**: Run the full stack with `docker-compose` or `pnpm dev`.

## 1. Docker Development
- [ ] **Compose File**: `docker-compose.yml` at root.
    - `postgres`: Port 5432.
    - `redis`: Port 6379.
- [ ] **Env Vars**: `.env.docker` for containers.

## 2. Turborepo Pipelines
- [ ] **Build**: Configure `turbo.json`:
    - `"build"`: Depends on `^build`.
    - `"dev"`: Runs `apps/client` (Vite) and `apps/server` (Nest Start) in parallel.
- [ ] **Pruning**: Use `turbo prune --docker` for creating efficient Docker images later.

## 3. Database Management
- [ ] **Seeding**: Create `prisma/seed.ts` in `apps/server`.
    - Creates default Admin user.
    - Creates a Test Game.
- [ ] **Studio**: Run `npx prisma studio` to inspect DB visually.

## 4. Hot Reloading
- [ ] **Backend**: NestJS supports HMR, ensure it works inside the monorepo.
- [ ] **Frontend**: Vite HMR should work out of the box with `pnpm dev`.
