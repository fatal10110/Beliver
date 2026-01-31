# Plan Review (Round 2) - "The Council of Five"

**Date**: 2026-01-31
**Subject**: Review of `production_plan/` (NestJS/Monorepo V2) and `concept.md`.

---

## 1. Game Designer Review
**Agent**: Strategy Specialist
**Status**: **APPROVED WITH NOTES**

> "The shift to 'User as Prophet' is a brilliant pivot for the genre. It solves the 'Micro-management hell' of mobile strategy by delegating it to the AI."

*   **Strengths**:
    *   **The "Sanctuary" Loop**: Writing scripture -> watching it fail -> rewriting is a perfect core loop for an iterative strategy game.
    *   **Factions**: The Law/Love/Submission pillars map well to distinct prompt engineering styles (Constraint vs. Creativity vs. Instruction).
*   **Concerns**:
    *   **Turn Pacing**: In `concept.md`, it says "Asynchronous Battles" happening "overnight". But in `production_plan`, we are building a `Socket.io` real-time gateway. We need to decide: Is this a 10-minute active match (Clash Royale style) or a daily turn-based game (Civ by email)? *Recommendation: Stick to active sessions (10-20 min) for the VC. Asynchronous requires push notifications and retention hooks we don't have yet.*
    *   **The "Black Box" Problem**: If the AI loses, the player needs to know *why*. `ai_agents/phase_3_advanced_logic/tasks.md` mentions "Chain of Thought" logging—this is **critical**. Without clear logs ("I didn't attack because I was afraid of the Hill bonus"), the player cannot learn to write better prompts.

---

## 2. Web Game Architect Review
**Agent**: Systems & Infrastructure
**Status**: **APPROVED**

> "Moving from Go to NestJS modules within a Monorepo is the pragmatic choice for a team of this size. Typesharing between Client/Server is a huge velocity booster."

*   **Architecture**:
    *   **Monorepo**: Turborepo is correctly identified. Ensure `shared-types` is strictly pure TS (no node/browser dependencies) to avoid build hell.
    *   **NestJS Monolith**: Good decision to start with a Modular Monolith. We can split `AiWorker` into a microservice later if CPU usage spikes from Regex parsing/LLM calls.
*   **Risks**:
    *   **Redis Dependency**: The plan relies heavily on Redis for "Hot State". Ensure we have a persistent fallback (Postgres) on every turn end, otherwise a Redis crash kills all active games.
    *   **Socket Scalability**: NestJS Gateways are stateful. When we scale to 2+ instances, we will need a Redis Adapter for `Socket.io` to broadcast events across nodes. Add this to Infra Phase 2.

---

## 3. Game Developer Review
**Agent**: Web & Graphics Specialist
**Status**: **conditional APPROVAL**

> "Babylon.js in a split pane with Monaco Editor is going to be heavy on the browser main thread. We need to be careful."

*   **Frontend**:
    *   **Performance**: running a Code Editor (Monaco is heavy) AND a 3D Canvas (Babylon) side-by-side matches the "Sanctuary" vision, but we must ensure the Babylon engine pauses rendering when the user is focused on the Code Editor to save battery/fans.
    *   **Asset Pipeline**: The plan mentions "KayKit Models". These are low poly, which is good. Ensure we use `.glb` with Draco compression.
*   **Missing Item**:
    *   **Mobile Support**: The plan ignores mobile. A Split-Screen UI (Editor + Game) is impossible on a phone. We need a "Tablet First" or "Desktop Only" decision in `concept.md`.

---

## 4. LLM Agent Specialist Review
**Agent**: AI Orchestration
**Status**: **APPROVED**

> "The 'Mock LLM' approach using Regex/Keywords for Phase 1 is the smartest thing in this entire plan. It saves $$$ and allows deterministic testing."

*   **AI Implementation**:
    *   **The Regex Parser**: This needs to be robust. If I write "Please build a farm", the regex needs to catch `build` and `farm`.
    *   **Feedback Loop**: The plan mentions "Retry logic for hallucinations". This is vital. The Agent needs to tell the LLM: "Action invalid: No resources. Try again."
    *   **Personality**: The "Faction Personalities" in Phase 3 are good, but we should inject them earlier. Even the Mock Regex bot should have a "flavor" (e.g., Yahud bot refuses to build non-kosher buildings).

---

## 5. UI/UX Expert Review
**Agent**: Interface Specialist
**Status**: **REQUESTING CHANGES**

> "The 'Sanctuary' (Editor) and 'Chronicle' (Game View) are competing for attention. The UX needs to clarify the MODE."

*   **Critique**:
    *   **Mode confusion**: The user writes code (Mode A), then watches a simulation (Mode B). The UI should not be a static split-screen. It should be a **Toggle** or **Drawer**.
        *   *Writing Mode*: Editor is full screen. Game is minimized.
        *   *Watching Mode*: Game is full screen. Logs overlay the bottom.
    *   **Feedback**: When I edit the prompt and hit "Submit", I need immediate visual confirmation that the AI's "brain" has changed. A particle effect or a "Neural Synapse Rewiring" animation is needed to sell the fantasy of being a Prophet.

---

## Consensus Actions
1.  **Clarify Turn Pacing**: Define in `game_design.md` if this is Real-Time (Socket) or Async (Email-style). (Architect recommends Real-Time for POC).
2.  **UI Refine**: Switch Frontend Task Phase 1 to "Collapsible/Toggle Layout" instead of static Split-Screen for better focus.
3.  **Redis Adapter**: Add Redis Adapter to Backend Phase 1 Tasks for future-proofing sockets.
