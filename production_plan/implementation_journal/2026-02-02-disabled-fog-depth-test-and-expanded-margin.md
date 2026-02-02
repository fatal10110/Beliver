# 2026-02-02 - Disabled fog depth test and expanded margin

Summary:
- Disabled fog depth testing to prevent any depth-based clipping over terrain.
- Expanded fog margin based on grid bounds to keep edges outside the view.

Key Files:
- apps/client/src/components/GameScene.tsx
