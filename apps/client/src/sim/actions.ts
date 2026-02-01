import type { Action, GameState, ResourceStockpile, Unit } from 'shared-types'
import { ActionType, ResourceType, UnitType } from 'shared-types'
import { getBuildingDefinition, type BuildingType } from '../data/buildings'
import { getUnitDefinition } from '../data/units'

const clamp = (value: number) => (value < 0 ? 0 : value)

const GRID_WRAP = 20
const MOVE_DIRECTIONS: Array<[number, number]> = [
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
]

const nextUnitId = (state: GameState) => `unit-${state.turn}-${state.units.length + 1}`

const applyResourceDelta = (resources: ResourceStockpile, delta: Partial<ResourceStockpile>) => {
  const next: ResourceStockpile = { ...resources }
  Object.entries(delta).forEach(([key, value]) => {
    if (typeof value !== 'number') {
      return
    }
    const typedKey = key as ResourceType
    next[typedKey] = clamp((next[typedKey] ?? 0) + value)
  })
  return next
}

const createUnit = (state: GameState, unitType: UnitType, ownerId: string): Unit => {
  const definition = getUnitDefinition(unitType)
  const spawnIndex = state.units.length % MOVE_DIRECTIONS.length
  const [dx, dy] = MOVE_DIRECTIONS[spawnIndex]
  return {
    id: nextUnitId(state),
    type: unitType,
    owner_id: ownerId,
    x: wrapCoord(10 + dx),
    y: wrapCoord(10 + dy),
    hp: definition.baseHp,
  }
}

const wrapCoord = (value: number) => ((value % GRID_WRAP) + GRID_WRAP) % GRID_WRAP

const moveUnit = (state: GameState): Unit[] => {
  if (state.units.length === 0) return state.units

  const index = state.turn % state.units.length
  const [dx, dy] = MOVE_DIRECTIONS[state.turn % MOVE_DIRECTIONS.length]
  const unit = state.units[index]
  const next = {
    ...unit,
    x: wrapCoord(unit.x + dx),
    y: wrapCoord(unit.y + dy),
  }

  return state.units.map((entry, i) => (i === index ? next : entry))
}

export const applyAction = (state: GameState, action: Action): GameState => {
  let resources = state.resources
  let units = state.units

  switch (action.type) {
    case ActionType.Build: {
      const building = (action.payload?.building as BuildingType | undefined) ?? 'farm'
      const definition = getBuildingDefinition(building)
      resources = applyResourceDelta(resources, definition.cost)
      resources = applyResourceDelta(resources, definition.yield)
      break
    }
    case ActionType.Train: {
      const unitType = (action.payload?.unitType as UnitType | undefined) ?? UnitType.Guardian
      const ownerId = action.actor_id ?? 'abrim'
      units = [...units, createUnit(state, unitType, ownerId)]
      const definition = getUnitDefinition(unitType)
      resources = applyResourceDelta(resources, definition.cost)
      break
    }
    case ActionType.Pray: {
      resources = applyResourceDelta(resources, {
        [ResourceType.Faith]: 3,
        [ResourceType.Devotion]: 2,
      })
      break
    }
    case ActionType.Harvest: {
      resources = applyResourceDelta(resources, {
        [ResourceType.Food]: 2,
        [ResourceType.Wood]: 1,
      })
      break
    }
    case ActionType.Move: {
      resources = applyResourceDelta(resources, {
        [ResourceType.Devotion]: -1,
      })
      units = moveUnit(state)
      break
    }
    case ActionType.Wait:
    default:
      break
  }

  return {
    ...state,
    resources,
    units,
  }
}
