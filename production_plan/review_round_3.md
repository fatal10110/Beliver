# Plan Review (Round 3) - External Review Integration

**Date**: 2026-01-31
**Subject**: Architecture Shift to "Compiler + Policy Engine".

---

## 1. The Core Pivot
Following the External Review, we have fundamentally shifted the backend architecture from a "Real-Time LLM" model to a "Compiler" model.

*   **Old Model**: Turn -> Send State to LLM -> LLM decides Action -> Turn Resolves.
    *   *Risk*: Non-deterministic, expensive, slow.
*   **New Model**: User writes Scripture -> **Compiler (LLM)** -> **Policy (JSON)** -> Turn Resolves (Deterministic).
    *   *Benefit*: Instant replays, anti-cheat, zero runtime lag.

## 2. Updated Plans
We have updated the following planning documents to reflect this new reality:

*   **`concept.md`**: Now describes the **Trial** (Single Player) vs **Season** (Multiplayer) loop and explicitly mentions the **Compilation** step.
*   **`production_plan/backend/phase_2_game_logic/tasks.md`**: Added the **Policy Executor** (Deterministic Rule Engine).
*   **`production_plan/ai_agents/phase_2_simple_llm/tasks.md`**: Renamed to **Scripture Compilation Pipeline**. The "AI" is now a build-time tool, not a runtime player.

## 3. Safety & Theme
*   **Sandbox**: The Policy engine only accepts strict JSON schemas. No user code runs on the server.
*   **Disclaimer**: Added a note in `concept.md` ensuring players understand the fictionalized nature of the factions to mitigate religious sensitivity/moderation risks.

## 4. Next Steps
We are effectively ready to build. The "Real Game" plan is solid, safe, and scalable.
