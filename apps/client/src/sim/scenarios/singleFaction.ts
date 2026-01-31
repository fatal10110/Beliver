import type { GameState, Unit } from 'shared-types'
import { FACTION_ABRIM } from '../../data/factions/abrim'
import { getUnitDefinition } from '../../data/units'

export const POC_PLAYER_ID = FACTION_ABRIM.id
export const DEFAULT_POC_SEED = 7123

const createStartingUnits = (): Unit[] => {
  return FACTION_ABRIM.startingUnits.map((unitType, index) => {
    const definition = getUnitDefinition(unitType)
    return {
      id: `unit-${index + 1}`,
      type: unitType,
      owner_id: POC_PLAYER_ID,
      x: 10 + index,
      y: 10,
      hp: definition.baseHp,
    }
  })
}

export const createSingleFactionState = (seed: number = DEFAULT_POC_SEED): GameState => ({
  turn: 0,
  max_turns: 50,
  seed,
  resources: { ...FACTION_ABRIM.startingResources },
  units: createStartingUnits(),
  victory_points: {
    [POC_PLAYER_ID]: 0,
  },
})
