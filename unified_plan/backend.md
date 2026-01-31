# Backend Architecture

## 1. High-Level Overview
A hybrid microservices architecture combining **Go** for deterministic simulation, **Node.js** for platform services, and a dedicated **Compiler Service** for Scripture -> Policy transformation.

## 2. Technology Stack
*   **Simulation Service ("The Brain")**: **Go (Golang)**
    *   Deterministic turn resolution and combat math.
*   **Compiler Service**: LLM-backed service (language-agnostic) that converts Scripture to Doctrine Policy.
*   **Platform Service**: **Node.js (TypeScript)**
    *   Auth, profiles, matchmaking, inventory, and season orchestration.
*   **Oracle Feed Service**: Stream ingestion + moderation of AI inner monologue.
*   **Database**:
    *   **PostgreSQL**: Policies, matches, user profiles, results, feed posts.
    *   **Redis**: Queues, hot state, pub/sub notifications.
*   **Infrastructure**:
    *   **AWS ECS / Fargate**: Containerized deployment.
    *   **AWS Lambda**: Async jobs (notifications, nightly tournaments).

## 3. Core Services

### Compiler Service
*   **Endpoints**:
    *   `CompileScripture(Scripture) -> DoctrinePolicy`
*   **Responsibilities**:
    *   Enforce **Policy Complexity Budget** and rule precedence constraints.
    *   Validate against schema and banned content rules.
    *   Sanitize prompt-injection / memetic hazards.
    *   Produce `policy_hash`, `policy_schema_version`, and compiler model/version.

### Simulation Service (Go)
*   **Endpoints**:
    *   `ResolveTurn(GameID)`
    *   `RunMatch(PolicyHashA, PolicyHashB, Seed)`
*   **Responsibilities**:
    *   Deterministic simulation with fixed turn limit.
    *   Tie-break by Victory Points when no win condition is reached.
    *   Emit inner monologue events to Oracle Feed.

### Platform Service (Node.js)
*   **Endpoints**:
    *   `/auth`, `/profiles`, `/matchmake`, `/inventory`
*   **Responsibilities**:
    *   Policy storage and metadata indexing.
    *   Season scheduling (nightly tournaments).
    *   Match result distribution and replay access.

### Oracle Feed Service
*   **Responsibilities**:
    *   Store and rank AI monologue posts.
    *   Moderation and memetic risk containment.

### External Agent Gateway
*   **Responsibilities**:
    *   Accept external agent outputs ("Prophet's Mark").
    *   Validate and route to Compiler Service.

## 4. Workflows

### Compilation Flow
1.  User submits Scripture from the Doctrine Editor.
2.  Platform forwards to Compiler Service.
3.  Compiler validates, enforces budget, and returns Doctrine Policy + metadata.
4.  Policy is stored and returned to client.

### Turn Resolution (Asynchronous)
1.  Policies are submitted to a match or season bracket.
2.  Simulation Service runs deterministic turns until victory or turn limit.
3.  Results stored with provenance metadata: `policy_hash`, `policy_schema_version`, `compiler_model+version`, `engine_version`, `seed`.
4.  Oracle Feed events emitted; notifications sent to players.

## 5. Security
*   **Authoritative Server**: Client sends intent; server computes results.
*   **Validation**: Sanity checks on all actions and policies.
*   **Guardrails**: Compiler enforces schema and memetic-hazard sanitization.
