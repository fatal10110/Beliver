# Production Implementation Roadmap

**Architecture**: Modular Monolith (NestJS + React + Turborepo).
**Goal**: Build "Sons of Abrim: The Prophet's Game".

This is the master entry point for the implementation. The project is divided into 4 key categories, with detailed task lists in their respective folders.

## 1. Backend (NestJS Monolith)
Located in [`production_plan/backend`](./backend)

*   **Phase 1: Core Engine Skeleton** - [View Tasks](./backend/phase_1_core_engine/tasks.md)
    *   Goal: Setup NestJS, Turborepo, and basic Game Gateways.
*   **Phase 2: Game Logic Implementation** - [View Tasks](./backend/phase_2_game_logic/tasks.md)
    *   Goal: Implement Hex Math, Deterministic Turn Resolution, and Resources.
*   **Phase 3: Platform Services** - [View Tasks](./backend/phase_3_platform_services/tasks.md)
    *   Goal: Auth, Matchmaking, and Shop modules.

## 2. Frontend (React + Babylon.js)
Located in [`production_plan/frontend`](./frontend)

*   **Phase 1: Visual Foundation** - [View Tasks](./frontend/phase_1_visual_foundation/tasks.md)
    *   Goal: Split-screen UI (Monaco Editor + Babylon Canvas) and Hex Rendering.
*   **Phase 2: Gameplay Interaction** - [View Tasks](./frontend/phase_2_gameplay_interaction/tasks.md)
    *   Goal: Selection, Movement visualization, and HUD.
*   **Phase 3: Backend Integration** - [View Tasks](./frontend/phase_3_backend_integration/tasks.md)
    *   Goal: Connect to Socket.io gateway and display Authoritative State.

## 3. AI & Agents (The Oracle)
Located in [`production_plan/ai_agents`](./ai_agents)

*   **Phase 1: Mock Agent** - [View Tasks](./ai_agents/phase_1_mock_agent/tasks.md)
    *   Goal: Regex-based "Mock LLM" service for free local testing.
*   **Phase 2: Simple LLM Integration** - [View Tasks](./ai_agents/phase_2_simple_llm/tasks.md)
    *   Goal: Connect `langchain` to OpenAI/Ollama.
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
- [ ] **Phase 0: Architecture Pivot** (Completed)
- [ ] **Phase 1: Foundation (Backend Phase 1 + Frontend Phase 1)**
- [ ] **Phase 2: The Oracle (AI Phase 1)**
- [ ] **Phase 3: Game Loop (Backend Phase 2 + Frontend Phase 2)**
