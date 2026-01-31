# Frontend Phase 2: Gameplay Interaction

**Goal**: Implement the user interactions for observing, debugging, and iterating on Doctrine policies.

## 1. Unit Management
- [ ] **Unit Renderer**: Create `UnitManager` class.
    - Spawn Unit models at specific Hex coordinates.
    - Support "Faction Colors" (change material color of flags/shields).
- [ ] **Selection State**: Use Zustand store `useGameStore`.
    - Track `selectedUnitId` and `selectedHex`.
    - Update UI when selection changes.

## 2. Inspection & Playback
- [ ] **Path Visualization**: When unit selected, show last-path / intended path from policy decision.
- [ ] **Playback Controls**: Play, pause, and scrub turns for deterministic replays.
- [ ] **Inspector Panel**: Show unit stats + last action + rule that fired.

## 3. HUD Implementation (React)
- [ ] **Layout**: Create specific HUD layers over the Canvas (pointer-events: none).
- [ ] **Resource Bar**: Top bar showing Food, Wood, Faith, Devotion counts.
- [ ] **Action Panel**: Context panel for Inspect, Explain, and Replay actions.
- [ ] **Run Trial**: "Simulate Turn" or "Run Match" button for iteration loops.
    - Visual feedback (Spinner) while waiting for Simulation results.
- [ ] **Decision Trace Debugger**:
    - Panel showing "Why I did this" logs from the AI Policy Engine.
    - "Rule [HarvestPriority] fired (Weight: 0.8)".
- [ ] **Social Feed Widget** (The Oracle):
    - Floating / Sidebar panel showing global agent chatter.
    - "Spectator Mode" toggle to see feed.

## 4. Fog of War
- [ ] **Masking**: Create a "Fog" mesh covering the whole map.
- [ ] **Revelation**: "Cut out" holes in the fog texture/mesh based on Unit vision radius.
- [ ] **Grey-out**: Explored but not visible areas should be desaturated/darkened.

## 5. Event Feedback
- [ ] **Floating Text**: Show "+10 Faith" popping up from tiles.
- [ ] **Sound FX**: Simple trigger for Compile, Select, Alert sounds.
