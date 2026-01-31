# Plan Review (Round 5) - Deep Dive & Gap Analysis

**Date**: 2026-01-31
**Subject**: Integration of External GPT Review + Internal Agent Analysis.

---

## 1. External Review Synthesis (GPT)
The external reviewer correctly identified **Technical Specificity Gaps** in our "Compiler" architecture.
*   **Gap 1**: Missing Schema for "Policy".
*   **Gap 2**: Missing "Compiler Trust" (Versioning).
*   **Gap 3**: "Personality" parameters must be deterministic seeds.
*   **Gap 4**: Diplomacy needs a controlled vocabulary, not free-text.

---

## 2. Internal Agent Response

### 🤖 Web Game Architect
**Status**: **AGREES & AMPLIFIES**
> "The external note on **Versioning** is critical. If we update the game engine, old compiled Policies might break or behave differently. We need a `engine_version` + `compiler_version` lock in the database."
*   **Action**: Add schema versioning and hash locking to Backend Phase 2.

### 🎨 Game Designer
**Status**: **AGREES**
> "Diplomacy vocabulary is a great constraint. Instead of 'AI chats with AI', we should have a standardized **Treaty Protocol** (e.g., `OFFER_TRADE { GIVE: 10_GOLD, GET: 5_FAITH }`). This makes the Policy writing much clearer."
*   **Action**: Define `DiplomacyAction` enum in Game Engine.

### 🧠 LLM Agent Specialist
**Status**: **AGREES**
> "The 'Compiler Trust' point is vital. We cannot trust the user's scripture OR the LLM's raw output. The Compiler must have a **Linting Layer** that rejects invalid JSON before it ever reaches the engine."
*   **Action**: Add "Strict Schema Validation" (Zod) to AI Phase 2.

### 🛠️ Game Developer
**Status**: **AGREES**
> "Running the Trial locally via WASM/Shared Module is smart. It saves server costs. We should ensure `packages/game-engine` is isomorphic (runs in Node and Browser)."
*   **Action**: Verify `packages/game-engine` has no Node-only dependencies.

### 👁️ UX/UI Expert
**Status**: **AGREES**
> "Decision Traces > Inner Monologue. Players need to see *why* a rule fired. 'I attacked because [AggressionRule] returned 0.9'."
*   **Action**: Update Frontend Phase 2 to include "Decision Trace Debugger".

---

## 3. Implementation Plan Updates

We will immediately update the Production Plan to close these gaps:

1.  **Backend Phase 2**:
    *   Define `IDoctrinePolicy` Schema.
    *   Define `DiplomacyVocabulary` (Enum).
    *   Implement `DeterministicSeed` handling.
2.  **AI Agents Phase 2**:
    *   Add **Compiler Versioning** (Pin Model + Schema).
    *   Add **Linter** task.
3.  **Frontend**:
    *   Add **Decision Trace Inspector** task.
4.  **Concept**:
    *   Fix typos ("Conguest").
    *   Clarify Match Pacing.
