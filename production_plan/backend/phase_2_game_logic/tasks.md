# Backend Phase 2: Game Logic Implementation (NestJS)

**Goal**: Implement the deterministic simulation rules in `packages/game-engine`.

## 1. Game Engine Package
- [ ] **Package Setup**: Create `packages/game-engine`.
- [ ] **Hex Math**: Implement `Hex` class and `Grid` class (Axial coordinates).
- [ ] **State Interfaces**: Define `IGameState`, `IUnit`, `IPlayer`.

## 2. Policy Executor (Deterministic AI)
- [ ] **Policy Schema**: Define `IDoctrinePolicy` interface (JSON Schema/Zod).
    - `version`: string (e.g., "1.0.0").
    - `weights`: { "build_farm": 0.8, "attack_enemy": 0.2 }.
    - `rules`: List of Condition-Action pairs.
    - `complexity_usage`: number (tracked against budget).
    - `seeded_personality`: number (seed for diplomatic RNG).
- [ ] **Diplomacy Vocabulary**: Define `DiplomacyAction` Enum.
    - `OFFER_TRADE`, `DECLARE_WAR`, `REQUEST_ALLIANCE`.
    - `OFFER_TRADE`, `DECLARE_WAR`, `REQUEST_ALLIANCE`.
    - `OFFER_TRADE`, `DECLARE_WAR`, `REQUEST_ALLIANCE`.
    - No free-form text allowed. Strictly deterministic.
    - **Seeded Personality**: Implement seeded RNG for diplomatic responses (e.g., Aggressiveness, Trust).
- [ ] **Match Scoping**:
    - [ ] **Turn Limit**: Implement Hard Stop at Turn 100.
    - [ ] **Tie-Break**: Implement `calculateVictoryPoints(state)` for draws.
- [ ] **Evaluator**: Implement `evaluatePolicy(state, policy, seed) -> Action`.
    - Must be purely deterministic based on State + Policy + Seed.
- [ ] **Repro Metadata**: Implement storage for `policy_hash`, `compiler_model_version`, `engine_version`.
- [ ] **Policy Complexity Budget**: Implement validator to limit rule count/weights (e.g., max 50 rules).

## 3. Turn Resolution System
- [ ] **Action Reducers**: Implement pure functions `applyAction(state, action) -> newState`.
- [ ] **Validation**: Implement `validateAction(state, action) -> boolean`.
- [ ] **Tick Processor**: Implement `processTurn(state, policies[]) -> state`.
    - Loop: For each agent -> `evaluatePolicy` -> `validateAction` -> `applyAction`.

## 4. Server Integration
- [ ] **Job Processing**: Setup `BullMQ` processor.
    - On 'ProcessTurn': Load State & Policies -> Run `processTurn` -> Save to DB.
    - Emit `game_updated` event via WebSocket.
    - **Constraint**: Ensure `state` fetched from DB is cast to `IGameState` before processing.
