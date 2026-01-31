# Production Implementation Roadmap

**Architecture**: Hybrid services (NestJS Platform + Go Simulation + LLM Compiler) with React client in a Turborepo.
2**Goal**: Build "Sons of Abrim: The Prophet's Game".

This is the master entry point for the implementation. The project is divided into 4 key categories, with detailed task lists in their respective folders.
For cross-phase goals (Web POC -> MVP -> Season -> Post-Launch), see `unified_plan/production_roadmap.md`.

## Phase Alignment (How to Read This Plan)
Each domain has its own phases below, but Phase 0 (Web POC) is a cross-domain slice that pulls from:
- Frontend Phase 1 (Editor + debug UI + basic map)
- Client-only sim stub (deterministic, non-authoritative)
- Compiler stub (client-side only)
The detailed Phase 0 execution checklist lives in `unified_plan/production_roadmap.md`.

## 1. Backend (Platform + Simulation)
Located in [`production_plan/backend`](./backend)

*   **Phase 1: Platform Skeleton (NestJS)** - [View Tasks](./backend/phase_1_core_engine/tasks.md)
    *   Goal: Setup NestJS platform service, DB, and core gateways.
*   **Phase 2: Simulation Service (Go)** - [View Tasks](./backend/phase_2_game_logic/tasks.md)
    *   Goal: Implement deterministic hex sim, policy executor, and turn resolution.
*   **Phase 3: Platform Services** - [View Tasks](./backend/phase_3_platform_services/tasks.md)
    *   Goal: Auth, matchmaking, policy storage, Oracle feed, and shop.

## 2. Frontend (React + Babylon.js)
Located in [`production_plan/frontend`](./frontend)

*   **Phase 1: Visual Foundation** - [View Tasks](./frontend/phase_1_visual_foundation/tasks.md)
    *   Goal: Split-screen UI (Monaco Editor + Babylon Canvas) and Hex Rendering.
*   **Phase 2: Gameplay Interaction** - [View Tasks](./frontend/phase_2_gameplay_interaction/tasks.md)
    *   Goal: Selection, Movement visualization, and HUD.
*   **Phase 3: Backend Integration** - [View Tasks](./frontend/phase_3_backend_integration/tasks.md)
    *   Goal: Connect to Socket.io gateway and display Authoritative State.

## 3. AI & Agents (Compiler + Oracle)
Located in [`production_plan/ai_agents`](./ai_agents)

*   **Phase 1: Mock Agent** - [View Tasks](./ai_agents/phase_1_mock_agent/tasks.md)
    *   Goal: Regex-based "Mock LLM" service for free local testing.
*   **Phase 2: Scripture Compiler Service** - [View Tasks](./ai_agents/phase_2_simple_llm/tasks.md)
    *   Goal: Compile Scripture into Doctrine Policy with guardrails and budget enforcement.
*   **Phase 3: Advanced Logic** - [View Tasks](./ai_agents/phase_3_advanced_logic/tasks.md)
    *   Goal: Faction personalities and RAG memory.

## 4. Infrastructure (DevOps)
Located in [`production_plan/infrastructure`](./infrastructure)

*   **Phase 1: Local Dev Environment** - [View Tasks](./infrastructure/phase_1_local_dev/tasks.md)
    *   Goal: Docker Compose with Postgres, Redis, and hot-reloading Monorepo.
*   **Phase 2: Cloud Foundation** - [View Tasks](./infrastructure/phase_2_cloud_foundation/tasks.md)
    *   Goal: AWS/GCP deployment pipeline.

---

## Task Progress Tracking
- [x] **Phase 0a: Architecture Pivot** (Completed)
- [ ] **Phase 0b: Web POC (Client-Only Slice)** (Editor + compiler stub + deterministic client sim)
- [ ] **Phase 1: Foundation (Backend Phase 1 + Frontend Phase 1)**
- [ ] **Phase 2: The Oracle (AI Phase 1)**
- [ ] **Phase 3: Game Loop (Backend Phase 2 + Frontend Phase 2)**
