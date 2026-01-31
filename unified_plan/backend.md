# Backend Architecture

## 1. High-Level Overview
A hybrid microservices architecture combining **Go** for high-performance game logic and **Node.js** for API/Platform services.

## 2. Technology Stack
*   **Game Server (The "Brain")**: **Go (Golang)**
    *   Handles Turn Resolution, Combat Math, Validation.
    *   Deterministic simulation.
    *   Why Go? Speed, concurrency, strong typing for complex logic.
*   **API / Platform Service**: **Node.js (TypeScript)**
    *   Handles Auth, Matchmaking, User Profiles, Shop, Leaderboards.
    *   Why Node? Fast development, rich ecosystem for web APIs.
*   **Database**:
    *   **PostgreSQL**: Primary persistent storage (User accounts, Game history, finished Game State).
    *   **Redis**: Hot storage (Active game sessions, cache, pub/sub for notifications).
*   **Infrastructure**:
    *   **AWS ECS / Fargate**: Containerized deployment.
    *   **AWS Lambda**: Serverless functions for async tasks (email notifications, daily rewards).

## 3. Core Services

### Game Logic Service (Go)
*   **Endpoints**: gRPC or Internal HTTP.
*   **Responsibilities**:
    *   `ResolveTurn(GameID)`: Fetches actions, calculates outcome, writes new state.
    *   `ValidateAction(Action)`: Checks if a move is legal before accepting it.

### Platform Service (Node.js)
*   **Endpoints**: REST / GraphQL.
*   **Responsibilities**:
    *   `/auth`: Login/Signup (JWT).
    *   `/matchmake`: Queue players.
    *   `/inventory`: Manage user items.

## 4. Workflows

### Turn Resolution (Asynchronous)
1.  Players submit actions to Node.js API -> Written to Redis "Pending Actions" list.
2.  When all players ready OR timer expires: Node.js triggers Go Game Service.
3.  Go Service pulls state + actions.
4.  Go Service executes deterministic logic.
5.  New State saved to Postgres & Redis.
6.  Notification sent to players via WebSocket.

## 5. Security
*   **Authoritative Server**: Client sends *intent* ("Move Unit A to (1,1)"), Server calculates *result*.
*   **Validation**: Sanity checks on all inputs (resources, distance, cooldowns).
