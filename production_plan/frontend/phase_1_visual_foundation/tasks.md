# Frontend Phase 1: Visual Foundation (Monorepo)

**Goal**: Setup `apps/client` with the Doctrine Editor + basic Babylon.js rendering.

## 1. Client App Setup
- [x] **Init Vite**: In `apps/client`, ensure Vite + React + TS is setup.
- [x] **Dependencies**: `npm install @babylonjs/core @babylonjs/loaders zustand`.
- [x] **Shared Types**: Add `"shared-types": "workspace:*"` to `package.json`.
- [x] **Layout**: Implement "Toggle Mode" for focus:
    - **Editor Mode**: Full-screen Monaco Editor.
    - **Game Mode**: Full-screen Babylon Canvas.
    - **Split Mode**: Optional 50/50 split for large screens.
    - **UI Components**:
        - "Complexity Meter" placeholder (Rule Budget gauge).
        - "Policy Preview" panel (JSON/DSL placeholder).
        - "Rules Fired" timeline placeholder.
    - **Note**: Monaco editor integration is pending; textarea placeholder used for Phase 0/1 scaffold.

## 2. 2.5D Camera Rig
- [x] **Scene Component**: Create `components/GameScene.tsx`.
- [x] **Camera**: Implement `ArcRotateCamera` (Orthographic).
    - Lock rotation to 45 degrees for isometric view.
    - Disable user rotation (fixed angle).

## 3. Hex Grid Rendering
- [x] **Mesh Builder**: Create `systems/HexGrid.ts`.
- [x] **Coordinates**: Use shared `Hex` definitions (or replicate logic locally).
- [x] **Instancing**: Render 20x20 grid of Hex meshes.
    - Use efficient `ThinInstance` for performance.

## 4. Asset Pipeline
- [x] **Import**: Add KayKit assets to `apps/client/public/assets`.
    - **Note**: Packs are downloaded locally (see `apps/client/public/assets/README.md`).
- [x] **GLTF Loader**: Use `@babylonjs/loaders`.
- [x] **Decorators**: Randomly place Trees/Rocks on "Forest" or "Mountain" tiles.
    - **Note**: Uses primitives unless `apps/client/public/assets/manifest.json` points to models.
