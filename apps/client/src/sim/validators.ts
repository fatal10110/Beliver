import type { Action, GameState, ResourceStockpile } from 'shared-types'
import { ActionType, ResourceType, UnitType } from 'shared-types'
import type { BuildingType } from './actions'

const getActionCost = (action: Action): ResourceStockpile => {
  switch (action.type) {
    case ActionType.Build: {
      const building = (action.payload?.building as BuildingType | undefined) ?? 'farm'
      if (building === 'farm') {
        return {
          [ResourceType.Wood]: 2,
        }
      }
      if (building === 'mine') {
        return {
          [ResourceType.Wood]: 2,
          [ResourceType.Food]: 1,
        }
      }
      return {
        [ResourceType.Wood]: 2,
        [ResourceType.Faith]: 1,
      }
    }
    case ActionType.Train: {
      const unitType = (action.payload?.unitType as UnitType | undefined) ?? UnitType.Guardian
      return unitType === UnitType.Acolyte
        ? { [ResourceType.Faith]: 2, [ResourceType.Food]: 1 }
        : { [ResourceType.Food]: 2, [ResourceType.Devotion]: 1 }
    }
    case ActionType.Pray:
      return {}
    case ActionType.Harvest:
      return {}
    case ActionType.Move:
      return { [ResourceType.Devotion]: 1 }
    case ActionType.Wait:
    default:
      return {}
  }
}

export const validateAction = (state: GameState, action: Action): boolean => {
  const cost = getActionCost(action)
  return Object.entries(cost).every(([key, value]) => {
    const typedKey = key as ResourceType
    return (state.resources[typedKey] ?? 0) >= value
  })
}
