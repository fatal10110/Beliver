export type TerrainType = 'plains' | 'forest' | 'ridge' | 'oasis'

export type HexTile = {
  id: string
  q: number
  r: number
  x: number
  y: number
  points: string
  terrain: TerrainType
}

const SQRT3 = Math.sqrt(3)

const normalizeSeed = (value: number) => (value >>> 0) / 0xffffffff

export const axialToPixel = (q: number, r: number, size: number) => {
  return {
    x: size * SQRT3 * (q + r / 2),
    y: size * 1.5 * r,
  }
}

const hexCorner = (centerX: number, centerY: number, size: number, index: number) => {
  const angle = (Math.PI / 180) * (60 * index - 30)
  return {
    x: centerX + size * Math.cos(angle),
    y: centerY + size * Math.sin(angle),
  }
}

const hexPoints = (centerX: number, centerY: number, size: number) => {
  const points = []
  for (let i = 0; i < 6; i += 1) {
    const corner = hexCorner(centerX, centerY, size, i)
    points.push(`${corner.x.toFixed(2)},${corner.y.toFixed(2)}`)
  }
  return points.join(' ')
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
      const { x, y } = axialToPixel(q, r, size)
      const id = `hex-${q}-${r}`
      tiles.push({
        id,
        q,
        r,
        x,
        y,
        points: hexPoints(x, y, size),
        terrain: pickTerrain(q, r, seed),
      })
    }
  }

  return tiles
}

export const getGridBounds = (tiles: HexTile[], size: number) => {
  const xs = tiles.map((tile) => tile.x)
  const ys = tiles.map((tile) => tile.y)
  const minX = Math.min(...xs) - size * 1.2
  const maxX = Math.max(...xs) + size * 1.2
  const minY = Math.min(...ys) - size * 1.2
  const maxY = Math.max(...ys) + size * 1.2
  return { minX, minY, width: maxX - minX, height: maxY - minY }
}
