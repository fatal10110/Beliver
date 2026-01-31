# Frontend Web (POC)

## 1. Goal
Evaluate the core fun factor of the game loop (Manage -> Expand -> Faith -> Conflict) without the overhead of a full engine build. Rapid iteration on mechanics.

## 2. Technology Stack
*   **Engine**: **Babylon.js** (Recommended).
    *   **Visual Style**: **2.5D Isometric** (using Orthographic 3D Camera).
    *   *Why?* This achieves the crisp "Isomorphic" look the user wants while still using **3D models**, which can be reused in the final Unity production.
    *   *Alternative*: **Phaser** (if using pre-rendered 2D sprites), but this duplicate work creates assets that can't be used in the 3D Unity version.
*   **State Management**: Zustand or Redux.
*   **UI Overlay**: React.

## 3. Asset Sources (Free for POC)
*   **Models**:
    *   **KayKit** (Itch.io): *Medieval Hex* and *Dungeon* packs.
        *   *Tip*: Using these low-poly 3D models with an Orthographic camera creates a perfect "Settlers" or "Civilization 2" aesthetic.
    *   **Kenney.nl**: *Hexagon Kit*.
*   **UI**:
    *   **Kenney.nl**: *UI Pack RPG*.

## 4. Backend Stubs
Since the real backend might be in development, the POC will use **Mock Services**.

*   **Mock Data**:
    *   `mock_gamestate.json`: Fixed initial state.
    *   `mock_api.js`: Intercepts API calls.
*   **Simulation**:
    *   The "Game Logic" will be written in **JavaScript/TypeScript** directly in the client for this phase.

## 5. Scope of POC
1.  **Lobby**: Simple name entry.
2.  **2.5D Map View**:
    *   **Camera**: Fixed angle (Isometric 45-degree), Orthographic projection (no perspective distortion).
    *   **Grid**: Hexagonal.
3.  **Unit Control**: Raycast click on Hex -> Move Unit mesh.
4.  **Turn End**: Advance turn.
5.  **simple AI**: Random enemy movement.

## 6. Implementation Steps
1.  **Setup**: `npm create vite@latest` (React + TS).
2.  **Install**: `npm install @babylonjs/core`.
3.  **Camera Setup**: Configure `ArcRotateCamera` in `ORTHOGRAPHIC_CAMERA` mode.
4.  **Grid**: Render Hex meshes.
5.  **Import**: Load KayKit GLTF models, scale them to fit hexes.
