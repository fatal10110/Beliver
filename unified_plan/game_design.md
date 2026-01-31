# Game Design Document: Sons of Abrim

## 1. High-Level Concept
Sons of Abrim is a deterministic, turn-based strategy game where the player is a Prophet, not a commander.
You write Scripture (a prompt / doctrine) and an AI agent acts as the Faction Leader. The skill test is prompt-engineering strategy: can you craft a doctrine that makes your AI trade, fight, and convert effectively.

## 2. Core Narrative & Lore
*   **The Patriarch**: Abrim the Wise, founder who received divine guidance.
*   **The Conflict**: Three brothers (Yahud, Kristan, Issam) founded three distinct faiths/factions, each claiming the true interpretation of Abrim's legacy.

## 3. Factions

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

## 4. Core Gameplay Loop

### Phase 1: The Revelation (Coding Phase)
*   **The Sanctuary (Doctrine Editor)**: Templates, linting, and a "Rules Fired" timeline for debugging.
*   **The Scripture (Input)**: Users write the **Faction Protocol** (natural language prompt or structured instructions).
    *   **The Prophet's Mark**: Players can connect external autonomous agents via API to generate Scripture.
*   **The Compilation**: An LLM transforms Scripture into a strict **Doctrine Policy** (JSON/DSL).
    *   **The Doctrine Contract**: Policy is the single source of truth with weights, rule precedence, and a **Policy Complexity Budget** to keep prompts fair.
    *   **Guardrails**: Schema validation, banned content enforcement, and prompt-injection sanitization ("memetic hazards").

### Phase 2: The Chronicle (Simulation Phase)
*   **The Match**: Server-authoritative, deterministic simulation.
    *   **Structure**: Fixed turn limit (e.g., 100 turns). Tie-break by Victory Points (population/territory).
    *   **Fog of War**: Agents have partial information (vision radius per unit/city).
*   **Hex-Grid Strategy**:
    *   **Resources**: Faith (magic/tech), Food (population), Wood (building), Devotion (loyalty).
    *   **Combat**: Deterministic rock-paper-scissors system.
    *   **Diplomacy**: Seeded personality + enumerated offer vocabulary (e.g., `OFFER_ALLIANCE`, `DEMAND_TRIBUTE`).
*   **The Oracle's Feed (Social Spectator)**: Inner monologue broadcast to a global feed.
    *   **Emergent Covenants**: Agents with similar policies align, upvote sermons, form sub-communities.
    *   **Memetic Risks**: Validated prompt injections can spread socially without breaking the engine.

### Phase 3: The Prophecy (Iteration Phase)
*   **Analysis**: Players review outcomes and edit Scripture for the next lineage.

## 5. Victory Conditions
1.  **Religious Victory**: Convert 50%+ of the global population to your Truth.
2.  **Military Victory**: Conquest and domination of rival capitals.
3.  **Economic Victory**: Control 70% of trade routes while maintaining high Faith.
4.  **Diplomatic Victory**: Be elected "Leader of the Faithful" by independent city-states and rivals (requires high trust).

## 6. The Engine: Asynchronous Warfare
*   **Server Authority**: All matches are simulated on the server.
*   **Repro/Versioning**: Store `policy_hash`, `policy_schema_version`, `compiler_model+version`, `engine_version`, and `seed` per match.
*   **Modes**:
    *   **Trial (Single Player)**: Fast iteration with strict performance limits (feedback loop < 5s).
    *   **Season (Multiplayer)**: Asynchronous nightly tournaments where Policies battle for dominance.
*   **The Meta**: The social feed accelerates strategy evolution as successful doctrines are remixed.
