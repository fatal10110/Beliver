import type { HexTile } from '../../systems/HexGrid'
import type { DecorationInstance } from './types'

const createSeededRng = (seedValue: number) => {
  let seed = seedValue >>> 0
  return () => {
    seed = (seed * 1664525 + 1013904223) >>> 0
    return seed / 0xffffffff
  }
}

export const buildDecorations = (tiles: HexTile[], seed: number, size: number): DecorationInstance[] => {
  const decorations: DecorationInstance[] = []

  tiles.forEach((tile) => {
    const rng = createSeededRng(seed ^ (tile.q * 92837111) ^ (tile.r * 689287499))

    if (tile.terrain === 'forest') {
      const roll = rng()
      if (roll < 0.42) {
        const count = roll > 0.32 ? 2 : 1
        for (let i = 0; i < count; i += 1) {
          decorations.push({
            kind: 'tree',
            x: tile.x + (rng() - 0.5) * size * 0.7,
            z: tile.z + (rng() - 0.5) * size * 0.7,
            scale: 0.75 + rng() * 0.5,
            rotation: rng() * Math.PI * 2,
          })
        }
      }
    }

    if (tile.terrain === 'ridge') {
      const roll = rng()
      if (roll < 0.35) {
        decorations.push({
          kind: 'rock',
          x: tile.x + (rng() - 0.5) * size * 0.6,
          z: tile.z + (rng() - 0.5) * size * 0.6,
          scale: 0.6 + rng() * 0.4,
          rotation: rng() * Math.PI * 2,
        })
      }
    }
  })

  return decorations
}
