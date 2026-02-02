# 2026-02-02 - Switched fog to screen-space layer overlay

Summary:
- Replaced fog ground mesh with a full-screen layer using the dynamic fog texture.
- Removed fog depth interactions entirely to eliminate diagonal slicing artifacts.

Key Files:
- apps/client/src/components/GameScene.tsx
