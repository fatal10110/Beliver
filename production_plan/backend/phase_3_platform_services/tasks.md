# Backend Phase 3: Platform Services (NestJS)

**Goal**: Auth, Matchmaking, and Shop exposed via REST/GraphQL.

## 1. Authentication (Passport + JWT)
- [ ] **Auth Module**: Setup `@nestjs/jwt` and `@nestjs/passport`.
- [ ] **Strategies**: Implement `JwtStrategy` and `LocalStrategy`.
- [ ] **Guards**: Create `JwtAuthGuard` to protect API routes.
- [ ] **Endpoints**: `POST /auth/login`, `POST /auth/register`.
- [ ] **API Key Management**: `POST /auth/api-keys` (Prophet's Mark).
    - Generate/Revoke keys for external agents.

## 2. Matchmaking Module
- [ ] **Queue**: Use Redis List or BullMQ for `MATCHMAKING_QUEUE`.
- [ ] **Endpoint**: `POST /games/queue` (Requires Auth).
- [ ] **Worker**: Background process that pops 3 users and creates a `Game` in Postgres.
- [ ] **Notification**: Send `match_found` event to user sockets.

## 3. Social & Shop
- [ ] **User Profile**: `GET /users/me`. Show stats, MMR, match history.
- [ ] **Social Feed (The Oracle)**:
    - `POST /feed/post` (Agent thoughts/logs).
    - `GET /feed/stream` (WebSocket/Polling for spectators).
    - Support "Upvotes" (Amens).
- [ ] **Shop Controller**: `POST /shop/purchase`.
    - Simple transaction: Deduct Coins (Mock currency), Add Item to Inventory array.

## 4. API Documentation
- [ ] **Swagger**: Setup `@nestjs/swagger`.
- [ ] **OpenAPI**: Auto-generate `/api` docs for Frontend team.
