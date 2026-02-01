# Implementation Progress

**Last Updated**: 2026-02-01
**Overall Status**: 🏗️ **Phase 1: Foundation (In Progress)**

This document tracks the high-level completion status of the project. It must be updated whenever a significant implementation step is completed.

---

## 1. Foundation & Infrastructure
*   **Status**: ✅ **COMPLETE**
*   **Progress**:
    *   [x] **Monorepo Setup**: Turborepo, pnpm/npm workspaces configured.
    *   [x] **App Scaffolding**: `apps/server` (NestJS) and `apps/client` (Vite+React) created.
    *   [x] **Shared Packages**: `packages/shared-types` linked and building.
    *   [x] **Infrastructure**: `docker-compose.yml` (Postgres/Redis) created.
    *   [x] **CI/Build**: `turbo build` verified green.

## 2. Backend Implementation (Platform + Simulation)
*   **Status**: 🟡 **PENDING (Phase 1)**
*   **Phases**:
    *   [ ] **Phase 1: Platform Skeleton** (Gateways, DB, Auth)
    *   [ ] **Phase 2: Simulation Service** (Hex Math, Game Loop, Policy Executor)
    *   [ ] **Phase 3: Platform Services** (Matchmaking, Policy Storage, Oracle Feed)

## 3. Frontend Implementation
*   **Status**: 🟡 **PENDING (Phase 1)**
*   **Phases**:
    *   [ ] **Phase 1: Visual Foundation** (Toggle Layout, Babylon Setup, Hex Grid)
    *   [ ] **Phase 2: Gameplay Interaction** (Playback, Inspector, Decision Trace)
    *   [ ] **Phase 3: Integration** (Socket Connection, State Sync)

## 4. AI & Agents (Compiler + Oracle)
*   **Status**: ⚪ **NOT STARTED**
*   **Phases**:
    *   [ ] **Phase 1: Mock Agent** (Regex/Stub)
    *   [ ] **Phase 2: Scripture Compiler** (LLM Pipeline, Policy Schema)
    *   [ ] **Phase 3: Advanced Logic** (RAG, Personality)

---

## Phase 0: Web POC Checklist (Cross-Domain)
*   **Status**: 🟢 **COMPLETE**
*   **Scope**: Client-only POC to validate Scripture -> Policy -> Deterministic Trial loop.
*   **Checklist**:
    *   [x] **Shared Types & Contracts**: Doctrine policy + compile result + minimal game state types.
    *   [x] **Doctrine Editor UI**: Templates, lint/compile controls, and status feedback.
    *   [x] **Policy Debugging UI**: Complexity meter, policy preview, rules fired list.
    *   [x] **Compiler Stub**: Deterministic stub output with policy hash + complexity budget.
    *   [x] **Client Simulation Stub**: Deterministic 50-turn loop with VP tie-break.
    *   [x] **Trial Controls**: Run trial button + feedback + run summary.
    *   [x] **Visual Map Preview**: Hex grid rendering + unit markers.
    *   [x] **Decorators**: Deterministic trees/rocks on forest/ridge tiles.
    *   [x] **Single-Faction Slice**: Abrim data + units/buildings + resource flow.
    *   [x] **POC Exit Criteria**: Compile output visible + 50-turn deterministic run + responsive layouts.

## Recent Updates
*   **2026-02-01**: Switched Prisma to the Postgres driver adapter and added pg typings to restore server boot.
*   **2026-02-01**: Added Redis module, CacheService, and RedisIoAdapter for backend session persistence and WebSocket scaling.
*   **2026-02-01**: Marked Phase 0 POC exit criteria as complete after confirming compile output, deterministic 50-turn trial, and responsive layouts.
*   **2026-02-01**: Added headless visual review script (Playwright) for capturing POC screenshots.
*   **2026-02-01**: Stabilized Babylon scene lifecycle to stop map blinking and boosted unit visibility under the fog overlay.
*   **2026-01-31**: Initialized Monorepo Foundation. Apps and Shared Packages are building.
*   **2026-01-31**: Updated `concept.md` & Production Plan with Deterministic Diplomacy, Complexity Budget, and Agent Persona Review (Round 7).
*   **2026-01-31**: Implemented Backend Database Layer (Prisma + Postgres) & Initial Persistence Service.
*   **2026-01-31**: Aligned Production Plan to hybrid services (Platform + Simulation + Compiler) and doctrine-first loop.
*   **2026-01-31**: Added Simulation + Compiler stubs, shared schemas, and docker-compose services for local dev.
*   **2026-01-31**: Added Phase 0 doctrine editor layout, debug UI scaffolding, and expanded shared types for doctrine policy contracts.
*   **2026-01-31**: Implemented Phase 0 compiler stub, deterministic client simulation, and trial run UI plumbing.
*   **2026-01-31**: Added Phase 0 hex-grid visual map preview plus VP breakdown and deterministic turn log panels.
*   **2026-01-31**: Added Phase 0 single-faction content data (Abrim, units, buildings) and wired sim costs/yields to it.
*   **2026-01-31**: Fixed client dev import of `shared-types` by aliasing the source module for Vite/TS.
*   **2026-01-31**: Added Babylon-based GameScene with orthographic camera and thin-instanced hex grid, plus Phase 1 visual foundation checklist updates.
*   **2026-01-31**: Added game-engine scaffold entrypoint and forced external linking for simulation dev to avoid macOS LC_UUID errors.
*   **2026-01-31**: Removed invalid `@babylonjs/react` dependency and aligned Phase 1 dependency list to installed packages.
*   **2026-02-01**: Added deterministic terrain decorators and GLTF loader wiring for the Phase 1 asset pipeline.
*   **2026-02-01**: Added Phase 0 Web POC checklist to clarify cross-domain plan progress.
*   **2026-02-01**: Created core NestJS feature modules and global config setup for Phase 1 backend.
*   **2026-02-01**: Implemented GameGateway with join/submit handlers and socket.io CORS configuration.
*   **2026-02-01**: Switched Prisma client generation to CJS outputs and copied generated runtime assets into server builds.
*   **2026-02-01**: Adjusted server TypeScript config to remove incompatible package-exports resolution flag for Nest builds.
*   **2026-02-01**: Added turn playback controls and wired simulation timeline into the Babylon scene.
*   **2026-02-01**: Made Move actions update unit positions for visible per-turn playback changes.
*   **2026-02-01**: Added per-turn action readout and movement highlight pulses in the map preview.
*   **2026-02-01**: Resolved client build errors by relaxing TS erasable syntax and allowing partial resource deltas.
*   **2026-02-01**: Fixed a CSS syntax error in the GameScene legend styles.
*   **2026-02-01**: Spread newly trained units around the spawn point so training visibly changes the map.
*   **2026-02-01**: Added unit selection state with an inspector panel and map click selection.
*   **2026-02-01**: Added UnitManager rendering, selected-unit path visualization, and a resource HUD bar.
*   **2026-02-01**: Added Action Panel commands and Decision Trace Debugger UI for turn explanations.
*   **2026-02-01**: Added fog-of-war overlay, floating text feedback, sound cues, and the Oracle feed widget.
*   **2026-02-01**: Fixed fog-of-war canvas typing to resolve client build errors.

## Technical Debt & Constraints
*   **Prisma Generation**: Client is generated to `src/generated/client` instead of `node_modules`. This is a workaround for Monorepo/NestJS build issues. Long-term fix required.
*   **Game State Typing**: The `Game` entity uses `Json` type. Phase 2 implementations must cast this to `IGameState` (from shared-types) at the service boundary.
