import { useMemo } from 'react'
import type { Unit } from 'shared-types'
import { UnitType } from 'shared-types'
import { axialToPixel, buildHexGrid, getGridBounds } from '../systems/HexGrid'

const TERRAIN_COLORS = {
  plains: '#b9a984',
  forest: '#5a7a58',
  ridge: '#8a7f72',
  oasis: '#4a8a88',
}

const UNIT_COLORS: Record<UnitType, string> = {
  [UnitType.Acolyte]: '#e1c17b',
  [UnitType.Guardian]: '#d0854c',
  [UnitType.Ranger]: '#6f8f7d',
}

type GameSceneProps = {
  columns?: number
  rows?: number
  size?: number
  seed?: number
  units?: Unit[]
}

const GameScene = ({ columns = 20, rows = 20, size = 16, seed = 7123, units = [] }: GameSceneProps) => {
  const tiles = useMemo(() => buildHexGrid(columns, rows, size, seed), [columns, rows, size, seed])
  const bounds = useMemo(() => getGridBounds(tiles, size), [tiles, size])

  const unitMarkers = units.map((unit) => {
    const { x, y } = axialToPixel(unit.x, unit.y, size)
    return { id: unit.id, x, y, type: unit.type }
  })

  return (
    <div className="game-scene">
      <svg className="game-scene__svg" viewBox={`${bounds.minX} ${bounds.minY} ${bounds.width} ${bounds.height}`}>
        <g className="game-scene__grid">
          {tiles.map((tile) => (
            <polygon
              key={tile.id}
              points={tile.points}
              fill={TERRAIN_COLORS[tile.terrain]}
              stroke="#2d2a25"
              strokeWidth={0.6}
              opacity={0.9}
            />
          ))}
        </g>
        <g className="game-scene__units">
          {unitMarkers.map((unit) => (
            <g key={unit.id}>
              <circle cx={unit.x} cy={unit.y} r={size * 0.32} fill={UNIT_COLORS[unit.type]} stroke="#1d1a16" strokeWidth={0.8} />
              <circle cx={unit.x} cy={unit.y} r={size * 0.12} fill="#1d1a16" opacity={0.6} />
            </g>
          ))}
        </g>
      </svg>
      <div className="game-scene__legend">
        <span>Plains</span>
        <span>Forest</span>
        <span>Ridge</span>
        <span>Oasis</span>
      </div>
    </div>
  )
}

export default GameScene
