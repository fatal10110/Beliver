# Round 7: Agent Persona Review
**Date**: 2026-01-31
**Subject**: Concept Update "Scripture & Policymaking"
**Focus**: Terminology, Determinism, Balance, Safety.

---

## 1. Game Designer Specialist
**Persona**: 15y exp, Strategy/MMO focus. "Fun First, Math Second."
**Status**: 🟢 **APPROVED**

### Feedback
*   **On "Policy Complexity Budget"**: This is a game-saver. Without it, the meta becomes "who can paste the longest prompt." I recommend implementing this as a "Mana Cost" for rules—simple rules cost 1 point, complex conditional chains cost 3.
*   **On "Seeded Personality"**: excellent for Diplomacy. It prevents the "schizophrenic AI" problem where an ally betrays you randomly because the LLM temperature was non-zero. Players can now learn "If Seed=45, Yahud is honorable."
*   **Terminology**: "Scripture" vs "Holy Text" is a smart pivot. It keeps the flavor but implies "Text that becomes Law" (Code), which fits the compiler mechanic perfectly.

## 2. Game Developer Specialist
**Persona**: High-perf WebGL/TS. "60 FPS or Bust."
**Status**: 🟢 **APPROVED**

### Feedback
*   **On Determinism**: The switch to `Enumerated Offer Vocabulary` for diplomacy is critical. Parsing free-text natural language in a deterministic simulation is a nightmare. Enum integers (`OFFER_TRADE = 1`) are easy to serialize and hash.
*   **On Repro/Versioning**: Storing `policy_hash` + `engine_version` matches standard Replay Architecture. This allows us to re-simulate any match on the client side accurately, which is huge for the "Watch Match" feature.
*   **Fog of War**: "Partial Information" is good but simpler to implement if strictly tile-based visibility.

## 3. LLM Agent Specialist
**Persona**: AI Architect. "Prompt Engineering is Art."
**Status**: 🟢 **APPROVED WITH NOTES**

### Feedback
*   **On "Scripture"**: Good shift. It frames the user input as source code.
*   **On Guardrails**: "Hard Constraints" (Schema Validation) are non-negotiable. I suggest we also implement a "Soft" Semantic Filter for tone.
*   **Integration**: The "Policy Complexity Budget" must be fed into the Compiler's System Prompt: *"You have 50 complexity points. Do not generate more rules than this."* This gives the LLM a confusing constraint. Better approach: The Compiler generates candidates, and the *Code* validator rejects if over budget, forcing a retry or truncation.

## 4. Game UX/UI Expert
**Persona**: Psychology/Visuals. "Don't make me think."
**Status**: 🟡 **PENDING VISUALS**

### Feedback
*   **The "Budget"**: This needs a prominent UI element in the Editor. A "Complexity Meter" (like Twitter character count) that turns red when the User's Scripture is generating too many rules.
*   **Diplomacy Visualization**: "Seeded Personality" needs to be visible. If a faction has `Seed: 123` (Aggressive), shows us an "Aggressive" icon or trait badge on their portrait. Don't hide the deterministic factors from the player.
*   **Editor**: highlighting "Banned Content" immediately (like spellcheck) is better than a compilation error after hitting "Submit".

## 5. Web Game Architect
**Persona**: Scalability/Systems. "Thinking in Microservices."
**Status**: 🟢 **APPROVED**

### Feedback
*   **Schematization**: The `IDoctrinePolicy` JSON schema is the contract between Client, Compiler, and Game Engine. It must be versioned semantically (`v1.2`).
*   **Security**: The "Prophet's Mark" API needs strict rate-limiting and API Key rotation if we allow external agents. The "Hard Constraints" on the Compiler output (Policy) effectively sandbox the game logic from the LLM, which mitigates 99% of prompt injection risks.
*   **Storage**: Storing `policy_hash` instead of the full Policy for match history lookups (deduplication) will save DB space.

---

## Synthesis
The team is aligned. The shift to **Deterministic Diplomacy** and **Strict Compilation** solves the major engineering risks of the previous "open-ended" concept. The **Complexity Budget** is the key design winner here.

**Next Steps**: 
1.  Finalize `IDoctrinePolicy` Schema (Backend Phase 2).
2.  Design the "Complexity Meter" UI (Frontend Phase 1).
