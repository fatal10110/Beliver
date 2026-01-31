# Frontend Phase 1: Visual Foundation (Monorepo)

**Goal**: Setup `apps/client` with the Doctrine Editor + basic Babylon.js rendering.

## 1. Client App Setup
- [ ] **Init Vite**: In `apps/client`, ensure Vite + React + TS is setup.
- [ ] **Dependencies**: `npm install @babylonjs/core @babylonjs/react zustand`.
- [ ] **Shared Types**: Add `"shared-types": "workspace:*"` to `package.json`.
- [ ] **Layout**: Implement "Toggle Mode" for focus:
    - **Editor Mode**: Full-screen Monaco Editor.
    - **Game Mode**: Full-screen Babylon Canvas.
    - **Split Mode**: Optional 50/50 split for large screens.
    - **UI Components**:
        - "Complexity Meter" placeholder (Rule Budget gauge).
        - "Policy Preview" panel (JSON/DSL placeholder).
        - "Rules Fired" timeline placeholder.

## 2. 2.5D Camera Rig
- [ ] **Scene Component**: Create `components/GameScene.tsx`.
- [ ] **Camera**: Implement `ArcRotateCamera` (Orthographic).
    - Lock rotation to 45 degrees for isometric view.
    - Disable user rotation (fixed angle).

## 3. Hex Grid Rendering
- [ ] **Mesh Builder**: Create `systems/HexGrid.ts`.
- [ ] **Coordinates**: Use shared `Hex` definitions (or replicate logic locally).
- [ ] **Instancing**: Render 20x20 grid of Hex meshes.
    - Use efficient `ThinInstance` for performance.

## 4. Asset Pipeline
- [ ] **Import**: Add KayKit assets to `apps/client/public/assets`.
- [ ] **GLTF Loader**: Use `@babylonjs/loaders`.
- [ ] **Decorators**: Randomly place Trees/Rocks on "Forest" or "Mountain" tiles.
