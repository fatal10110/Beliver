import type { Action, GameState, ResourceStockpile } from 'shared-types'
import { ActionType, ResourceType, UnitType } from 'shared-types'
import { getBuildingDefinition, type BuildingType } from '../data/buildings'
import { getUnitDefinition } from '../data/units'

const getActionCost = (action: Action): ResourceStockpile => {
  switch (action.type) {
    case ActionType.Build: {
      const building = (action.payload?.building as BuildingType | undefined) ?? 'farm'
      const definition = getBuildingDefinition(building)
      return definition.cost
    }
    case ActionType.Train: {
      const unitType = (action.payload?.unitType as UnitType | undefined) ?? UnitType.Guardian
      return getUnitDefinition(unitType).cost
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
