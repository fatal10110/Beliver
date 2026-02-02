# 2026-02-02 - Disabled fog depth write to remove terrain slicing

Summary:
- Disabled depth writes on the fog material so it no longer cuts across terrain tiles.
- Keeps fog overlay rendering after terrain without affecting tile depth.

Key Files:
- apps/client/src/components/GameScene.tsx
