import type { Action, GameState, ResourceStockpile, Unit } from 'shared-types'
import { ActionType, ResourceType, UnitType } from 'shared-types'

export type BuildingType = 'farm' | 'mine' | 'shrine'

const clamp = (value: number) => (value < 0 ? 0 : value)

const nextUnitId = (state: GameState) => `unit-${state.turn}-${state.units.length + 1}`

const applyResourceDelta = (resources: ResourceStockpile, delta: ResourceStockpile) => {
  const next: ResourceStockpile = { ...resources }
  Object.entries(delta).forEach(([key, value]) => {
    const typedKey = key as ResourceType
    next[typedKey] = clamp((next[typedKey] ?? 0) + value)
  })
  return next
}

const createUnit = (state: GameState, unitType: UnitType, ownerId: string): Unit => ({
  id: nextUnitId(state),
  type: unitType,
  owner_id: ownerId,
  x: 10,
  y: 10,
  hp: 10,
})

export const applyAction = (state: GameState, action: Action): GameState => {
  let resources = state.resources
  let units = state.units

  switch (action.type) {
    case ActionType.Build: {
      const building = (action.payload?.building as BuildingType | undefined) ?? 'farm'
      if (building === 'farm') {
        resources = applyResourceDelta(resources, {
          [ResourceType.Wood]: -2,
          [ResourceType.Food]: 4,
          [ResourceType.Devotion]: 1,
        })
      } else if (building === 'mine') {
        resources = applyResourceDelta(resources, {
          [ResourceType.Wood]: 1,
          [ResourceType.Food]: -1,
        })
      } else {
        resources = applyResourceDelta(resources, {
          [ResourceType.Faith]: 2,
          [ResourceType.Devotion]: 2,
          [ResourceType.Wood]: -2,
        })
      }
      break
    }
    case ActionType.Train: {
      const unitType = (action.payload?.unitType as UnitType | undefined) ?? UnitType.Guardian
      const ownerId = action.actor_id ?? 'abrim'
      units = [...units, createUnit(state, unitType, ownerId)]
      if (unitType === UnitType.Acolyte) {
        resources = applyResourceDelta(resources, {
          [ResourceType.Faith]: -2,
          [ResourceType.Food]: -1,
        })
      } else {
        resources = applyResourceDelta(resources, {
          [ResourceType.Food]: -2,
          [ResourceType.Devotion]: -1,
        })
      }
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
