import type { TerrainType } from '../../systems/HexGrid'

export type DecorationKind = 'tree' | 'rock'

export type DecorationInstance = {
  kind: DecorationKind
  x: number
  z: number
  scale: number
  rotation: number
}

export type AssetManifest = {
  decorations?: {
    tree?: string[]
    rock?: string[]
  }
  terrain?: Partial<Record<TerrainType, string[]>>
}

export type AssetStatus = {
  loaded: number
  total: number
  failed: number
}
