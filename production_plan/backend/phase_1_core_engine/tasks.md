# Backend Phase 1: Platform Skeleton (NestJS) + Simulation Scaffold

**Goal**: Setup the Platform Service (NestJS) and scaffold the Simulation Service (Go).

## 1. Monorepo Setup (Turborepo)
- [x] **Init Project**: `npx create-turbo@latest`.
- [x] **Workspace Config**: Define `apps/client`, `apps/server`, `packages/shared-types`.
- [x] **Shared Types**: Create `packages/shared-types/src/index.ts`.
    - Export `GameState`, `ActionType`, `Faction` enums.
    - Setup `tsconfig.json` to allow imports from `apps/*`.

## 2. NestJS Initialization (Platform Service)
- [x] **Init Server**: `nest new apps/server`.
- [x] **Modules**: Create feature modules:
    - `GameModule` (Logic)
    - `ApiModule` (HTTP Endpoints)
    - `GatewayModule` (WebSockets)
- [x] **Config**: Setup `@nestjs/config` for `.env` (Postgres URL, Redis Host).

## 3. Database Layer (Prisma)
- [x] **Setup**: `npm install prisma --save-dev`.
- [x] **Schema**: Define `schema.prisma`.
    - `User`: id, email, passwordHash.
    - `Game`: id, status, currentTurn, state (JSON).
- [x] **Migration**: `npx prisma migrate dev --name init`.
- [x] **Service**: Implement `PrismaService`.

## 4. Game Gateway (Socket.io)
- [x] **Gateway Setup**: Create `GameGateway` with `@WebSocketGateway()`.
- [x] **Events**: Implement handlers:
    - `@SubscribeMessage('join_game')`
    - `@SubscribeMessage('submit_turn')`
- [x] **CORS**: Configure CORS to allow `localhost:3000` (Client).

## 5. Persistence (Redis)
- [ ] **Redis Module**: Setup connection to Redis.
- [ ] **Session Store**: Implement `CacheService` to store active `GameState` for quick access during turns.
- [ ] **Socket Adapter**: Configure `RedisIoAdapter` for scaling WebSocket gateways.

## 6. Simulation Service Scaffold (Go)
- [x] **Init Service**: Create `apps/simulation` (Go module) with a basic HTTP server.
- [x] **Contracts**: Define shared JSON schema for `GameState`, `Action`, and `DoctrinePolicy`.
- [x] **Integration Stub**: Platform Service can request `RunMatch` with `policy_hash` + `seed`.
