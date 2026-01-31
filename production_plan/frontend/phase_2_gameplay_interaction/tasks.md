# Frontend Phase 2: Gameplay Interaction

**Goal**: Implement the user controls for playing the game (Select, Move, End Turn).

## 1. Unit Management
- [ ] **Unit Renderer**: Create `UnitManager` class.
    - Spawn Unit models at specific Hex coordinates.
    - Support "Faction Colors" (change material color of flags/shields).
- [ ] **Selection State**: Use Zustand store `useGameStore`.
    - Track `selectedUnitId` and `selectedHex`.
    - Update UI when selection changes.

## 2. Movement Logic (Client-Side Prediction)
- [ ] **Path Visualization**: When unit selected + mouse hover target:
    - Draw a line or highlight tiles along the path.
- [ ] **Move Command**: On right-click target:
    - Animate Unit mesh (Slide/Walk) to new position.
    - Update local state immediately (Optimistic UI).

## 3. HUD Implementation (React)
- [ ] **Layout**: Create specific HUD layers over the Canvas (pointer-events: none).
- [ ] **Resource Bar**: Top bar showing Food, Wood, Faith counts.
- [ ] **Action Panel**: Bottom-right panel showing context-sensitive buttons (Move, Build, Pray) for selected unit.
- [ ] **Turn Controls**: "End Turn" button.
    - Visual feedback (Spinner) while waiting for "AI" turn.
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
- [ ] **Sound FX**: Simple trigger for Move, Select, Click sounds.
