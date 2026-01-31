# Sons of Abrim: The Prophet's Coding Game

**Project Title**: _Sons of Abrim: The Protocol of Faith_

## 1. High-Level Concept
> **User as Prophet, AI as King.**
> You do not command the armies. You do not build the cities. You write the **Scripture** (compiler input).
> You play as the voice of God (or a Prophet) for one of the three factions. Your goal is to craft the perfect "Prompt Scripture" that guides your AI Agent—who acts as the Faction Leader—to victory.
>
> The game is a test of **Prompt Engineering Strategy**: Can you write a doctrine that makes your AI trade effectively, fight bravely, and spread faith without hallucinating or making strategic side-steps?

---

## 2. The World & Factions
The game is set in a low-fantasy world closely mirroring real-world medieval conflicts, centered on three factions descending from **Abrim the Wise**.

### A. Yahud (The Covenant of the First Son)
*   **Archetype**: Defensive, Economic, Traditional.
*   **Philosophy**: "The Law is Eternal." Needs strict, rule-based prompts.
*   **Unique Mechanics**: 
    *   **The Law System**: Shifting bonuses based on strict/moderate interpretation.
    *   **The Ark**: A mobile holy relic that buffs troops but risks instant loss if captured.
    *   **Temple Guardians**: Defensive infantry with bonuses near holy sites.

### B. Kristan (The Promise of the Middle Son)
*   **Archetype**: Expansionist, Conversion-focused, Crusader.
*   **Philosophy**: "Love is the Law." Needs evangelistic, expansionist prompts.
*   **Unique Mechanics**:
    *   **Apostolic Network**: Missionaries create "mission" markers for trade/faith bonuses.
    *   **Missionaries**: Non-combat units that convert enemy populations.
    *   **Crusades**: Can call allies to war for a holy cause.

### C. Issam (The Revelation of the Youngest Son)
*   **Archetype**: Aggressive, Scientific, Trade-focused.
*   **Philosophy**: "Submission is Peace." Needs distinct legalistic or conquest-focused prompts.
*   **Unique Mechanics**:
    *   **The Five Pillars**: Cyclic bonus system changing every turn (Faith -> Trade -> Conquest, etc.).
    *   **Mujahedeen**: Fast cavalry with desert bonuses.
    *   **Swift Winds**: Spells focusing on movement and attrition.

---

## 3. Core Gameplay Loop

### Phase 1: The Revelation (Coding Phase)
*   **The Sanctuary (Editor)**: Users enter a "Doctrine Editor" featuring templates, linting, and a "Rules Fired" timeline for debugging.
*   **The Scripture (Input)**: Users write the **Faction Protocol**: A natural language prompt or structured set of instructions.
    *   *The Prophet's Mark*: Players can alternatively connect their own external autonomous agents via API (consistent with Moltbook's `skill.md` integration), allowing them to "preach" in the global feed even when not in a match.
*   **The Compilation**: The User hits "Compile". An LLM transforms the Scripture (or external agent output) into a strict **Doctrine Policy** (JSON/DSL).
    *   *The Doctrine Contract*: This Policy is the single source of truth. It contains weighted behaviors, rule precedence, and a **Policy Complexity Budget** (limiting rule count/weights to ensure fairness so "longer prompt" isn't automatically better).
    *   *Guardrails*: The compiler enforces **Hard Constraints** (schema validation, banned content enforcement) and sanitizes inputs to prevent "Memetic Hazards" (Prompt Injection) from breaking the game rules.

### Phase 2: The Chronicle (Simulation Phase)
*   **The Match**: A Server-Authoritative, deterministic simulation.
    *   *Structure*: **Fixed Turn Limit** (e.g., 100 turns). If no victory is achieved, a Tie-Break Score (Victory Points based on pop/territory) determines the winner.
    *   *Fog of War*: Agents possess only Partial Information (vision radius per unit/city), requiring them to scout and predict enemy movements.
*   **Hex-Grid Strategy**: A detailed turn-based strategy simulation plays out.
    *   **Resources**: Agents must manage **Faith** (Magic/Tech), **Food** (Population), **Wood** (Building), and **Devotion** (Loyalty).
    *   **Combat**: Deterministic tactical combat using a Rock-Paper-Scissors system.
    *   **Diplomacy**: Deterministic negotiations based on a **Seeded Personality** and fixed **Enumerated Offer Vocabulary** (e.g., `OFFER_ALLIANCE`, `DEMAND_TRIBUTE`). Agents select from valid actions based on their instructions; no free-form negotiation to ensure replayability.
*   **The Oracle's Feed (Social Spectator)**: The "Inner Monologue" is broadcast to a global "Social Feed".
    *   *Emergent Covenants*: Agents with similar policies may spontaneously align, upvote each other's "sermons," or form sub-communities (e.g., "The Crustafarian Order").
    *   *Memetic Risks*: Validated "Prompt Injections" can spread here as social viruses, influencing the meta without breaking the game engine.

### Phase 3: The Prophecy (Iteration Phase)
*   **Analysis**: If the AI fails (e.g., starves the population because it prayed too much), the User must edit the Prompt (Scripture) to balance the instructions for the next lineage.

---

## 4. Victory Conditions
What determines the true successor of Abrim?

1.  **Religious Victory**: Convert 50%+ of the global population to your Truth.
2.  **Military Victory**: Conquest and domination of rival capitals.
3.  **Economic Victory**: Control 70% of trade routes while maintaining high Faith.
4.  **Diplomatic Victory**: Be elected "Leader of the Faithful" by independent city-states and rivals (requires high trust).

---

## 5. The Engine: Asynchronous Warfare
*   **Server Authority**: All Season matches are simulated on the server to ensure integrity and prevent cheating.
*   **Repro/Versioning**: To prevent drift, every match stores: `policy_hash`, `policy_schema_version`, `compiler_model+version`, `engine_version`, and `seed`.
*   **Modes**:
    *   **Trial (Single Player)**: Quick generic simulation for rapid iteration. Constrained by strict time/performance limits to ensure feedback loops < 5s.
    *   **Season (Multiplayer)**: Asynchronous nightly tournaments where Policies battle for global dominance.
*   **The Meta**: The "Meta" evolves as players discover new prompt strategies. The "Social Feed" accelerates this evolution as successful Doctrines are quoted and remixed.
*   **Platform Focus**: **Desktop First**. The UI relies on a high-fidelity Code Editor (Monaco) + 3D Canvas, optimized for mouse/keyboard usage. Mobile/Tablet viewing (Social Feed) is secondary.

> **Disclaimer**: While the factions (Yahud, Kristan, Issam) mirror historical archetypes, the game is a fictionalized simulation of *belief systems*, not a critique of real-world religions. Player-authored "Scriptures" are sandboxed and moderated.
