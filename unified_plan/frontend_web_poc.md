# Frontend Web (POC)

## 1. Goal
Validate the core prompt-engineering loop: write Scripture -> compile to Doctrine Policy -> AI acts -> deterministic outcome, with fast iteration and clear debugging.

## 2. Technology Stack
*   **Engine**: **Babylon.js** (Recommended).
    *   **Visual Style**: **2.5D Isometric** (Orthographic 3D Camera).
    *   *Why?* Reuses 3D assets for Unity while keeping a crisp board-game look.
    *   *Alternative*: **Phaser** (only if using pre-rendered 2D sprites).
*   **State Management**: Zustand or Redux.
*   **UI Overlay**: React.

## 3. Asset Sources (Free for POC)
*   **Models**:
    *   **KayKit** (Itch.io): *Medieval Hex* and *Dungeon* packs.
    *   **Kenney.nl**: *Hexagon Kit*.
*   **UI**:
    *   **Kenney.nl**: *UI Pack RPG*.

## 4. Backend Stubs
Since the real backend might be in development, the POC will use **Mock Services**.

*   **Mock Data**:
    *   `mock_gamestate.json`: Fixed initial state.
    *   `mock_api.js`: Intercepts API calls.
*   **Policy Compiler Stub**:
    *   Local template-based compiler that turns Scripture into a JSON Doctrine Policy.
    *   Enforces a small **Policy Complexity Budget**, rule precedence, and validates schema.
*   **Simulation**:
    *   Deterministic client-side turn simulation (fixed turn limit + VP tie-break).

## 5. Scope of POC
1.  **Scripture Editor**: Simple templates, linting warnings, and compile button.
2.  **Policy Preview**: JSON view + complexity meter + "Rules Fired" list.
3.  **2.5D Map View**:
    *   **Camera**: Fixed angle (Isometric 45-degree), Orthographic projection.
    *   **Grid**: Hexagonal.
4.  **Agent Behavior**: AI acts from policy rules (no random AI).
5.  **Turn End**: Advance deterministic turns to a fixed limit, resolve winner by VP.
6.  **Oracle Feed (Optional)**: Mock inner monologue stream for spectator flavor.

## 6. Implementation Steps
1.  **Setup**: `npm create vite@latest` (React + TS).
2.  **Install**: `npm install @babylonjs/core`.
3.  **Camera Setup**: Configure `ArcRotateCamera` in `ORTHOGRAPHIC_CAMERA` mode.
4.  **Grid**: Render hex meshes.
5.  **Compiler Stub**: Convert Scripture templates into JSON policy + complexity score.
6.  **Deterministic Sim**: Apply policy rules to units and resources each turn.
7.  **UI**: Policy preview + rules fired timeline + compile errors.
