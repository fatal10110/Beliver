# Backend Phase 2: Simulation Service (Go)

**Goal**: Implement the deterministic simulation rules in a Go service and expose a stable API to the Platform Service.

## 1. Simulation Service (Go)
- [ ] **Service Setup**: Create `apps/simulation` as a Go module.
- [ ] **Hex Math**: Implement `Hex` and `Grid` (axial coordinates).
- [ ] **State Structs**: Define `GameState`, `Unit`, `Player`, `City`.
- [ ] **Serialization**: JSON encode/decode for API requests and replays.

## 2. Policy Executor (Deterministic AI)
- [ ] **Policy Schema**: Define `DoctrinePolicy` (shared JSON schema).
    - `version`: string (e.g., "1.0.0").
    - `weights`: `{ "build_farm": 0.8, "attack_enemy": 0.2 }`.
    - `rules`: ordered Condition-Action pairs with **rule precedence**.
    - `complexity_usage`: number (tracked against budget).
    - `seeded_personality`: number (seed for diplomatic RNG).
- [ ] **Diplomacy Vocabulary**: Define `DiplomacyAction` enum.
    - `OFFER_TRADE`, `DECLARE_WAR`, `REQUEST_ALLIANCE`, `DEMAND_TRIBUTE`, `OFFER_ALLIANCE`.
    - No free-form text allowed. Strictly deterministic.
    - **Seeded Personality**: Implement seeded RNG for diplomatic responses.
- [ ] **Evaluator**: Implement `evaluatePolicy(state, policy, seed) -> Action`.
    - Must be purely deterministic based on State + Policy + Seed.
- [ ] **Policy Complexity Budget**: Enforce max rule count/weights (e.g., max 50 rules).

## 3. Match Scoping
- [ ] **Turn Limit**: Implement hard stop at Turn 100.
- [ ] **Tie-Break**: Implement `calculateVictoryPoints(state)` for draws.
- [ ] **Repro Metadata**: Store `policy_hash`, `policy_schema_version`, `compiler_model_version`, `engine_version`, `seed`.

## 4. Turn Resolution System
- [ ] **Action Reducers**: Implement pure functions `applyAction(state, action) -> newState`.
- [ ] **Validation**: Implement `validateAction(state, action) -> boolean`.
- [ ] **Tick Processor**: Implement `processTurn(state, policies[]) -> state`.
    - Loop: For each agent -> `evaluatePolicy` -> `validateAction` -> `applyAction`.

## 5. Service Integration
- [ ] **API**: Expose `RunMatch` and `ResolveTurn` endpoints (HTTP or gRPC).
- [ ] **Job Bridge**: Platform Service submits jobs (queue or RPC) with `policy_hash` + `seed`.
- [ ] **Events**: Emit `game_updated` results back to Platform for sockets/replays.
