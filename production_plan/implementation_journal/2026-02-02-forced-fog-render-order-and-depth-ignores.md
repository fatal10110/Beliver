# 2026-02-02 - Forced fog render order and depth ignores

Summary:
- Forced the fog material to ignore depth and removed any depth write behavior.
- Lifted the fog plane and made it always active to prevent diagonal slicing artifacts.

Key Files:
- apps/client/src/components/GameScene.tsx
