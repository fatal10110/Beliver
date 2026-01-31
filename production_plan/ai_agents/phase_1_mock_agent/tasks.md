# AI Agents Phase 1: Mock Agent (The "Stupid" AI)

**Goal**: Create deterministic, predictable opponents for testing the game loop without LLM costs.

## 1. Agent Interface
- [ ] **Define Interface**: Create `pkg/ai/agent.go`.
    - `type Agent interface { Decide(gameState GameState) []Action }`.
- [ ] **Integration**: Hook this into the Backend Turn Resolver.

## 2. Seeded Random Bot
- [ ] **Logic**: Create `pkg/ai/random_bot.go` with deterministic seeded RNG.
    - Generate list of *all* valid moves (using `ValidateAction`).
    - Pick N random actions.
- [ ] **Use Case**: Stress testing backend validation and stability.

## 3. Scripted Strategy Bots (Behavior Trees)
- [ ] **Economic Bot**: Prioritizes `Build(Farm)` and `Build(Mine)`.
    - "If Food < 10, Build Farm".
- [ ] **Aggro Bot**: Prioritizes `Build(Barracks)` and `Training`.
    - "If Units < 5, Train; Else, Move towards Enemy".
- [ ] **Testing**: Verify these bots can actually win against an idle player.
