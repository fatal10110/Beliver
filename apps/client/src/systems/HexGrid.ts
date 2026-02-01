export type TerrainType = 'plains' | 'forest' | 'ridge' | 'oasis'

export type HexTile = {
  id: string
  q: number
  r: number
  x: number
  z: number
  terrain: TerrainType
}

export type GridBounds = {
  minX: number
  maxX: number
  minZ: number
  maxZ: number
  width: number
  height: number
}

const SQRT3 = Math.sqrt(3)

const normalizeSeed = (value: number) => (value >>> 0) / 0xffffffff

export const axialToWorld = (q: number, r: number, size: number) => {
  return {
    x: size * SQRT3 * (q + r / 2),
    z: size * 1.5 * r,
  }
}

const pickTerrain = (q: number, r: number, seed: number): TerrainType => {
  const hash = (q * 92837111) ^ (r * 689287499) ^ seed
  const roll = normalizeSeed(hash)
  if (roll < 0.12) return 'oasis'
  if (roll < 0.35) return 'forest'
  if (roll < 0.5) return 'ridge'
  return 'plains'
}

export const buildHexGrid = (columns: number, rows: number, size: number, seed: number): HexTile[] => {
  const tiles: HexTile[] = []

  for (let r = 0; r < rows; r += 1) {
    for (let q = 0; q < columns; q += 1) {
      const { x, z } = axialToWorld(q, r, size)
      const id = `hex-${q}-${r}`
      tiles.push({
        id,
        q,
        r,
        x,
        z,
        terrain: pickTerrain(q, r, seed),
      })
    }
  }

  return tiles
}

export const getGridBounds = (tiles: HexTile[], size: number): GridBounds => {
  const xs = tiles.map((tile) => tile.x)
  const zs = tiles.map((tile) => tile.z)
  const minX = Math.min(...xs) - size * 1.2
  const maxX = Math.max(...xs) + size * 1.2
  const minZ = Math.min(...zs) - size * 1.2
  const maxZ = Math.max(...zs) + size * 1.2
  return { minX, maxX, minZ, maxZ, width: maxX - minX, height: maxZ - minZ }
}

export const getGridOffset = (bounds: GridBounds) => ({
  x: -((bounds.minX + bounds.maxX) / 2),
  z: -((bounds.minZ + bounds.maxZ) / 2),
})
