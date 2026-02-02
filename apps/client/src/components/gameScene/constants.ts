import type { TerrainType } from '../../systems/HexGrid'

export const TERRAIN_COLORS: Record<TerrainType, string> = {
  plains: '#b9a984',
  forest: '#5a7a58',
  ridge: '#8a7f72',
  oasis: '#4a8a88',
}

export const TERRAIN_HEIGHTS: Record<TerrainType, number> = {
  plains: 0.18,
  forest: 0.18,
  ridge: 0.18,
  oasis: 0.18,
}
