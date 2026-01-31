# Production Roadmap (Aligned to Concept)

## Phase 0: Web POC (Weeks 1-4)
*   **Scripture Editor** with templates, linting, and compile button.
*   **Compiler Stub** that outputs Doctrine Policy + complexity score.
*   **Deterministic Client Sim** with fixed turn limit + VP tie-break.
*   **Policy Debugging**: Rules Fired list + policy JSON preview.
*   **Single Faction Slice** (one faction, limited units/resources).

### Phase 0 Execution Checklist (Respecting Production Plan Phases)
Dependency order: 0.1 -> 0.2 + 0.3 -> 0.4 + 0.5 -> 0.6 -> 0.7
Scope note: Phase 0 simulation is client-only and non-authoritative; server authority begins in Phase 1.

**0.1 Shared Types & Contracts (Prereq; aligns with Backend Phase 1 setup)**
- [ ] Update `packages/shared-types/src/index.ts` with `DoctrinePolicy`, `CompileResult`, `RuleFired`, `PolicyComplexity`, `GameState`, `Action`, and minimal enums for resources/units.
- [ ] Include versioned contract fields (`policy_schema_version`, `engine_version`) to align with Phase 1 compiler/service outputs.

**0.2 Editor + Debug UI (Frontend Phase 1 Visual Foundation)**
- [ ] Create `apps/client/src/components/DoctrineEditor.tsx` (templates + lint placeholder + compile button).
- [ ] Create `apps/client/src/components/PolicyPreview.tsx` (JSON view).
- [ ] Create `apps/client/src/components/RulesFiredList.tsx` (timeline list).
- [ ] Create `apps/client/src/components/ComplexityMeter.tsx` (gauge placeholder).
- [ ] Wire Editor/Game/Split layout modes in `apps/client/src/App.tsx`.

**0.3 Compiler Stub (Phase 0 only; no backend dependency)**
- [ ] Add `apps/client/src/lib/compilerStub.ts` that returns `CompileResult` with policy JSON + complexity score + rules fired.
- [ ] Keep stub output schema-compatible with the Phase 1 compiler service (e.g., include `policy_hash`, `policy_schema_version`).
- [ ] Add `apps/client/src/state/usePocStore.ts` to store doctrine text, compile output, and sim state.

**0.4 Deterministic Client Sim (Phase 0 only; minimal subset of Frontend Phase 2)**
- [ ] Add `apps/client/src/sim/engine.ts` with deterministic RNG, fixed turn limit, and VP tie-break (pure functions; no render side effects).
- [ ] Add `apps/client/src/sim/actions.ts` + `apps/client/src/sim/validators.ts` for a minimal action set.
- [ ] Add `apps/client/src/sim/scenarios/singleFaction.ts` for seeds and starting state.
- [ ] Add `apps/client/src/components/RunTrialButton.tsx` and wire it to the sim engine.

**0.5 Visual Map (Frontend Phase 1 Visual Foundation)**
- [ ] Add `apps/client/src/components/GameScene.tsx` with orthographic `ArcRotateCamera`.
- [ ] Add `apps/client/src/systems/HexGrid.ts` rendering a 20x20 grid via thin instances.
- [ ] Use simple unit markers until assets are integrated.

**0.6 Single-Faction Slice Content (Phase 0 scope)**
- [ ] Add `apps/client/src/data/factions/abrim.ts` with starting resources and identity text.
- [ ] Add `apps/client/src/data/units.ts` + `apps/client/src/data/buildings.ts` for the POC subset.
- [ ] Ensure the sim only consumes Faith/Food/Wood/Devotion and includes at least 2-3 meaningful decisions (e.g., build farm, build mine, train unit).

**0.7 POC Exit Criteria (Phase 0 scope)**
- [ ] Compile -> policy JSON + complexity + rules fired are visible.
- [ ] Run a deterministic 50-turn sim with a seed and VP tie-break.
- [ ] Editor/Game/Split modes work on desktop and mobile layouts with basic accessibility (clear contrast, readable sizes).
- [ ] Compile/Run actions show immediate feedback (loading state + error surface).

## Phase 1: MVP (Trial Mode) (Weeks 5-12)
*   **Compiler Service** (LLM-backed) with schema validation, banned content, and memetic-hazard sanitization.
*   **Policy Complexity Budget** enforced with clear error messaging.
*   **Server-Authoritative Simulation** (Go) with fixed turn limits.
*   **Core Resources**: Faith, Food, Wood, Devotion.
*   **Fog of War** and deterministic diplomacy (enumerated offer vocabulary).
*   **Victory Conditions** implemented (Religious/Military/Economic/Diplomatic).
*   **Provenance Metadata** stored per match (policy hash, schema version, model version, engine version, seed).

## Phase 2: Season Multiplayer (Weeks 13-20)
*   **Asynchronous Nightly Tournaments** with season brackets.
*   **Oracle Feed v1** (read + upvote + covenant tags).
*   **External Agent Gateway** ("Prophet's Mark") for third-party agents.
*   **Replays** with turn scrubber and policy debug overlays.
*   **Balance Tooling** and analytics dashboards for policy archetypes.

## Phase 3: Post-Launch (Weeks 21+)
*   **Narrative Arcs** (The Shattering, Crusade of Thorns).
*   **Expanded Social Meta** (doctrine remixes, covenant communities).
*   **Content Expansions** (new factions, campaigns, and cosmetic packs).
