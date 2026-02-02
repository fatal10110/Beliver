# Assets (Local Only)

This folder is intentionally lightweight in Git. The game expects 3D assets to be
present locally for development, but the source packs should be downloaded from
their official sites due to licensing and size.

## Required Packs (POC)
- KayKit (Itch.io): Medieval Hex Pack
- KayKit (Itch.io): Dungeon Pack
- Kenney.nl: Hexagon Kit
- Kenney.nl: UI Pack RPG (optional for HUD polish)

## Suggested Layout
Place the unzipped packs into the following directories:

- apps/client/public/assets/kaykit/medieval_hex/
- apps/client/public/assets/kaykit/dungeon/
- apps/client/public/assets/kenney/hexagon_kit/
- apps/client/public/assets/kenney/ui_pack_rpg/ (optional)

Keep the internal folder structure as provided by the pack author (textures,
meshes, materials, etc.). The Babylon loaders will reference these paths.

## Manifest
Update `apps/client/public/assets/manifest.json` with the exact model paths you
want the scene to load. Use absolute paths under `/assets/...` so Vite can serve
them. If a folder name contains spaces, keep the space (do not URL-encode it),
for example:

```
{
  "decorations": {
    "tree": ["/assets/kenney/hexagon_kit/models_glb/unit-tree.glb"],
    "rock": ["/assets/kenney/hexagon_kit/models_glb/stone-rocks.glb"]
  },
  "units": {
    "acolyte": ["/assets/kenney/hexagon_kit/models_glb/unit-house.glb"],
    "guardian": ["/assets/kenney/hexagon_kit/models_glb/unit-tower.glb"],
    "ranger": ["/assets/kenney/hexagon_kit/models_glb/unit-mansion.glb"]
  }
}
```

## Notes
- These asset folders are ignored by Git.
- The scene falls back to primitive placeholders if a manifest path is missing.
- Unit models are tinted at runtime; use neutral materials when possible.
- If your pack uses spaces in folder names, you can create a no-space alias folder
  (example: `models_glb`) to avoid URL encoding issues.
